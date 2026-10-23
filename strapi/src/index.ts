import type { Core } from '@strapi/strapi';
import { seedArticles } from './seed/articles';

const ARTICLE_UID = 'api::article.article';

const EXTRA_LOCALES = [
  { code: 'fr', name: 'French (fr)' },
  { code: 'ar', name: 'Arabic (ar)' },
  { code: 'pl', name: 'Polish (pl)' },
];

const PUBLIC_ACTIONS = [`${ARTICLE_UID}.find`, `${ARTICLE_UID}.findOne`];

async function ensureLocales(strapi: Core.Strapi) {
  const localesService = strapi.plugin('i18n').service('locales');
  const existing: Array<{ code: string }> = await localesService.find();

  for (const locale of EXTRA_LOCALES) {
    if (!existing.some((item) => item.code === locale.code)) {
      await localesService.create(locale);
    }
  }
}

/** Lets anonymous visitors read published articles through the REST API. */
async function ensurePublicReadAccess(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    return;
  }

  for (const action of PUBLIC_ACTIONS) {
    const exists = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: publicRole.id } });

    if (!exists) {
      await strapi.db
        .query('plugin::users-permissions.permission')
        .create({ data: { action, role: publicRole.id } });
    }
  }
}

async function seedDemoArticles(strapi: Core.Strapi) {
  const documents = strapi.documents(ARTICLE_UID);
  const count = await documents.count({});

  if (count > 0) {
    return;
  }

  for (const article of seedArticles) {
    const { en, ...others } = article.translations;
    const created = await documents.create({
      locale: 'en',
      data: { ...en, slug: article.slug },
    });

    for (const [locale, translation] of Object.entries(others)) {
      await documents.update({
        documentId: created.documentId,
        locale,
        // Non-localized fields (slug, cover) must be repeated when creating a localization.
        data: { ...translation, slug: article.slug },
      });
    }

    await documents.publish({ documentId: created.documentId, locale: '*' });
  }

  strapi.log.info(`Seeded ${seedArticles.length} demo articles.`);
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicReadAccess(strapi);

    if (process.env.SEED_DEMO_CONTENT === 'false') {
      return;
    }

    await ensureLocales(strapi);
    await seedDemoArticles(strapi);
  },
};

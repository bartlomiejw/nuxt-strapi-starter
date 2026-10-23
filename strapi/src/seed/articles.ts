/**
 * Demo content seeded on first start (see `src/index.ts`).
 * Each article has a shared slug and per-locale translations.
 */

type TextNode = { type: 'text'; text: string; bold?: boolean; italic?: boolean; code?: boolean };
type Inline = TextNode | { type: 'link'; url: string; rel: string; target: string; children: TextNode[] };
type Block =
  | { type: 'paragraph'; children: Inline[] }
  | { type: 'heading'; level: 2 | 3; children: Inline[] }
  | { type: 'list'; format: 'ordered' | 'unordered'; children: { type: 'list-item'; children: Inline[] }[] }
  | { type: 'quote'; children: Inline[] }
  | { type: 'code'; language?: string; children: TextNode[] };

export interface SeedTranslation {
  title: string;
  excerpt: string;
  content: Block[];
}

export interface SeedArticle {
  slug: string;
  translations: Partial<Record<'en' | 'fr' | 'ar' | 'pl', SeedTranslation>> & { en: SeedTranslation };
}

const text = (value: string, marks: Omit<TextNode, 'type' | 'text'> = {}): TextNode => ({ type: 'text', text: value, ...marks });
const p = (...children: Inline[]): Block => ({ type: 'paragraph', children });
const h2 = (value: string): Block => ({ type: 'heading', level: 2, children: [text(value)] });
const ul = (...items: string[]): Block => ({
  type: 'list',
  format: 'unordered',
  children: items.map((item) => ({ type: 'list-item', children: [text(item)] })),
});

export const seedArticles: SeedArticle[] = [
  {
    slug: 'welcome-to-the-starter',
    translations: {
      en: {
        title: 'Welcome to the Nuxt Strapi Starter',
        excerpt: 'What this starter gives you out of the box and how the pieces fit together.',
        content: [
          p(text('This article is served by '), text('Strapi 5', { bold: true }), text(' and rendered on the server by '), text('Nuxt 4', { bold: true }), text('.')),
          h2('What is included'),
          ul('Typed REST integration through a Nitro API layer', 'Localised content with a shared slug per article', 'Friendly states when the CMS is unavailable'),
          { type: 'quote', children: [text('Edit this article in the Strapi admin panel and refresh the page to see the change.')] },
        ],
      },
      pl: {
        title: 'Witaj w Nuxt Strapi Starter',
        excerpt: 'Co ten starter daje od razu i jak łączą się jego elementy.',
        content: [
          p(text('Ten artykuł pochodzi ze '), text('Strapi 5', { bold: true }), text(' i jest renderowany na serwerze przez '), text('Nuxt 4', { bold: true }), text('.')),
          h2('Co zawiera'),
          ul('Typowana integracja REST przez warstwę API Nitro', 'Lokalizowane treści ze wspólnym slugiem artykułu', 'Przyjazne komunikaty, gdy CMS jest niedostępny'),
          { type: 'quote', children: [text('Edytuj ten artykuł w panelu Strapi i odśwież stronę, aby zobaczyć zmianę.')] },
        ],
      },
      fr: {
        title: 'Bienvenue dans le Nuxt Strapi Starter',
        excerpt: 'Ce que ce starter offre d’emblée et comment les éléments s’articulent.',
        content: [
          p(text('Cet article est servi par '), text('Strapi 5', { bold: true }), text(' et rendu côté serveur par '), text('Nuxt 4', { bold: true }), text('.')),
          h2('Ce qui est inclus'),
          ul('Intégration REST typée via une couche API Nitro', 'Contenu localisé avec un slug partagé par article', 'Des états clairs lorsque le CMS est indisponible'),
        ],
      },
      ar: {
        title: 'مرحباً بك في Nuxt Strapi Starter',
        excerpt: 'ما الذي يقدمه هذا القالب مباشرة وكيف تترابط أجزاؤه.',
        content: [
          p(text('يُقدَّم هذا المقال من '), text('Strapi 5', { bold: true }), text(' ويُعرض من جهة الخادم بواسطة '), text('Nuxt 4', { bold: true }), text('.')),
          h2('ما الذي يتضمنه'),
          ul('تكامل REST مضبوط الأنواع عبر طبقة API في Nitro', 'محتوى مترجم مع معرّف رابط مشترك لكل مقال', 'رسائل واضحة عند تعذر الوصول إلى نظام المحتوى'),
        ],
      },
    },
  },
  {
    slug: 'graceful-degradation',
    translations: {
      en: {
        title: 'Designing for a CMS that is down',
        excerpt: 'How the front end keeps working — and stays honest — when Strapi is unreachable.',
        content: [
          p(text('All CMS requests go through the Nitro server. Network failures become a '), text('503', { code: true }), text(' and the page renders a friendly message with a retry button instead of crashing.')),
          h2('Why a server layer?'),
          ul('The optional API token never reaches the browser', 'Responses are normalised into a small, typed shape', 'Media URLs are made absolute for the browser'),
          { type: 'code', language: 'bash', children: [text('docker compose stop strapi\npnpm dev  # open /blog')] },
        ],
      },
      pl: {
        title: 'Projektowanie pod niedostępny CMS',
        excerpt: 'Jak front-end działa dalej — i pozostaje uczciwy — gdy Strapi jest nieosiągalne.',
        content: [
          p(text('Wszystkie zapytania do CMS przechodzą przez serwer Nitro. Błędy sieci zamieniają się w '), text('503', { code: true }), text(', a strona pokazuje przyjazny komunikat z przyciskiem ponowienia.')),
          h2('Po co warstwa serwerowa?'),
          ul('Opcjonalny token API nigdy nie trafia do przeglądarki', 'Odpowiedzi są normalizowane do małego, typowanego kształtu', 'Adresy mediów są zamieniane na bezwzględne'),
        ],
      },
      fr: {
        title: 'Concevoir pour un CMS indisponible',
        excerpt: 'Comment le front-end continue de fonctionner lorsque Strapi est injoignable.',
        content: [
          p(text('Toutes les requêtes vers le CMS passent par le serveur Nitro. Les erreurs réseau deviennent une '), text('503', { code: true }), text(' et la page affiche un message clair avec un bouton pour réessayer.')),
        ],
      },
      ar: {
        title: 'التصميم لنظام محتوى متوقف',
        excerpt: 'كيف تستمر الواجهة في العمل عندما يتعذر الوصول إلى Strapi.',
        content: [
          p(text('تمر جميع طلبات نظام المحتوى عبر خادم Nitro. تتحول أخطاء الشبكة إلى '), text('503', { code: true }), text(' وتعرض الصفحة رسالة واضحة مع زر لإعادة المحاولة.')),
        ],
      },
    },
  },
  {
    slug: 'trunk-based-workflow',
    translations: {
      en: {
        title: 'A trunk-based workflow with required checks',
        excerpt: 'Short-lived branches, squash merges and a CI pipeline that guards main. (English only — switch the language to see the empty state.)',
        content: [
          p(text('Every pull request runs lint, type checking, unit tests, a production build and Playwright end-to-end tests. Only green pull requests are squash-merged into '), text('main', { code: true }), text('.')),
          p(text('Read more in the '), { type: 'link', url: 'https://trunkbaseddevelopment.com/', rel: 'noopener noreferrer', target: '_blank', children: [text('trunk-based development guide')] }, text('.')),
        ],
      },
    },
  },
];

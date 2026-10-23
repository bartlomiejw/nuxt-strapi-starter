/** Sets localised title/description and their Open Graph counterparts. */
export function usePageSeo(input: { title: MaybeRefOrGetter<string>, description: MaybeRefOrGetter<string> }) {
  useSeoMeta({
    title: () => toValue(input.title),
    description: () => toValue(input.description),
    ogTitle: () => toValue(input.title),
    ogDescription: () => toValue(input.description),
  })
}

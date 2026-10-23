<script setup lang="ts">
import type { VNode } from 'vue'
import type { StrapiBlock, StrapiInlineNode, StrapiTextNode } from '#shared/types/strapi'

/**
 * Renders Strapi "Blocks" rich text as Vue VNodes.
 * No `v-html` is used, so content is escaped by Vue and safe from XSS.
 */
const props = defineProps<{ blocks: StrapiBlock[] }>()

const SAFE_URL = /^(?:https?:|mailto:|\/|#)/i

function renderText(node: StrapiTextNode, key: number): VNode | string {
  let output: VNode | string = node.text

  if (node.code) output = h('code', output)
  if (node.bold) output = h('strong', output)
  if (node.italic) output = h('em', output)
  if (node.underline) output = h('u', output)
  if (node.strikethrough) output = h('s', output)

  return typeof output === 'string' ? output : h(output, { key })
}

function renderInline(nodes: StrapiInlineNode[]): Array<VNode | string> {
  return nodes.map((node, index) => {
    if (node.type === 'link') {
      const href = SAFE_URL.test(node.url) ? node.url : undefined
      const external = href ? /^https?:/i.test(href) : false

      return h('a', {
        key: index,
        href,
        ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
      }, node.children.map(renderText))
    }

    return renderText(node, index)
  })
}

function renderBlock(block: StrapiBlock, key: number): VNode | null {
  switch (block.type) {
    case 'paragraph':
      return h('p', { key }, renderInline(block.children))
    case 'heading':
      // The page title is the only <h1>; demote content headings by one level.
      return h(`h${Math.min(block.level + 1, 6)}`, { key }, renderInline(block.children))
    case 'quote':
      return h('blockquote', { key }, renderInline(block.children))
    case 'code':
      return h('pre', { key }, h('code', block.children.map(child => child.text).join('')))
    case 'list':
      return h(block.format === 'ordered' ? 'ol' : 'ul', { key }, block.children.map((item, index) => h('li', { key: index }, renderInline(item.children))))
    case 'image':
      return h('img', {
        key,
        src: block.image.url,
        alt: block.image.alternativeText ?? '',
        width: block.image.width ?? undefined,
        height: block.image.height ?? undefined,
        loading: 'lazy',
        class: 'rounded-lg',
      })
    default:
      return null
  }
}

const Rendered = () => h('div', { class: 'prose-content' }, props.blocks.map(renderBlock))
</script>

<template>
  <Rendered />
</template>

import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import StrapiBlocks from '~/components/blog/StrapiBlocks.vue'

describe('StrapiBlocks', () => {
  it('renders rich text without injecting HTML', async () => {
    const wrapper = await mountSuspended(StrapiBlocks, {
      props: {
        blocks: [
          { type: 'heading', level: 2, children: [{ type: 'text', text: 'Title' }] },
          { type: 'paragraph', children: [{ type: 'text', text: '<script>alert(1)</script>', bold: true }] },
          { type: 'paragraph', children: [{ type: 'link', url: 'javascript:alert(1)', children: [{ type: 'text', text: 'bad link' }] }] },
          { type: 'list', format: 'ordered', children: [{ type: 'list-item', children: [{ type: 'text', text: 'One' }] }] },
        ],
      },
    })

    expect(wrapper.find('h3').text()).toBe('Title')
    expect(wrapper.find('strong').text()).toBe('<script>alert(1)</script>')
    expect(wrapper.find('script').exists()).toBe(false)
    expect(wrapper.find('a').attributes('href')).toBeUndefined()
    expect(wrapper.find('ol li').text()).toBe('One')
  })
})

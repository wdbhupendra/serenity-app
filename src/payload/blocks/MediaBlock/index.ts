import type { Block } from 'payload/types'

import { invertBackground } from '../../fields/invertBackground'
import link from '../../fields/link'
import richText from '../../fields/richText'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  fields: [
    invertBackground,
    {
      name: 'style',
      type: 'select',
      label: 'Style?',
      defaultValue: 'banner',
      required: true,
      options: [
        {
          label: 'Banner',
          value: 'banner',
        },
        {
          label: 'Right Image with text',
          value: 'right_iwt',
        },
        {
          label: 'Left Image with text',
          value: 'left_iwt',
        },
      ],
    },
    {
      name: 'position',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Fullscreen',
          value: 'fullscreen',
        },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Heading',
    },
    richText({
      required: false,
    }),
    {
      name: 'enableLink',
      type: 'checkbox',
      label: 'Button?',
    },
    link({
      overrides: {
        admin: {
          condition: (_, { enableLink }) => Boolean(enableLink),
        },
      },
    }),
  ],
}

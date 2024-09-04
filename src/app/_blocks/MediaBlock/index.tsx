import React from 'react'
import { StaticImageData } from 'next/image'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'mediaBlock' }> & {
  staticImage?: StaticImageData
  id?: string
  enableLink: boolean
  richText?: any
  link?: any
  title?: string
  style?: string
}

export const MediaBlock: React.FC<Props> = props => {
  const {
    id,
    title,
    media,
    position = 'default',
    staticImage,
    enableLink = false,
    richText = null,
    link = null,
    style = 'banner',
  } = props

  let mediaStyle = 'iwt_style' + style
  let caption: any
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div className={`${classes.mediaBlock} ${classes[mediaStyle]}`}>
      {style === 'banner' ? (
        <div className={classes.bannerStyle}>
          {position === 'fullscreen' && (
            <div className={classes.fullscreen}>
              <Media resource={media} src={staticImage} />
            </div>
          )}
          {position === 'default' && (
            <Gutter>
              <Media resource={media} src={staticImage} />
            </Gutter>
          )}
          {caption && (
            <Gutter className={classes.caption}>
              <RichText content={caption} />
            </Gutter>
          )}
          <div key={id} className={classes.mediaContent}>
            {title && <h1 className={classes.bannerHeading}>{title}</h1>}
            {richText && <RichText className={classes.bannerDescription} content={richText} />}
            {enableLink && <CMSLink className={classes.link} {...link} />}
          </div>
        </div>
      ) : position === 'default' ? (
        <Gutter>
          <div className={classes.imageWithTextStyle}>
            <div className={classes.iwtMainWrapper}>
              <div className={classes.iwtMediaItem}>
                <div className={classes.iwtMediaCover}>
                  <Media resource={media} src={staticImage} />
                </div>
              </div>
              <div className={classes.iwtContentItem}>
                <div key={id} className={classes.mediaContent}>
                  {title && <div className={classes.bannerHeading}>{title}</div>}
                  {richText && (
                    <RichText className={classes.bannerDescription} content={richText} />
                  )}
                  {enableLink && <CMSLink className={classes.link} {...link} />}
                </div>
              </div>
            </div>
          </div>
        </Gutter>
      ) : (
        <div className={classes.fullscreen}>
          <div className={classes.imageWithTextStyle}>
            <div className={classes.iwtMainWrapper}>
              <div className={classes.iwtMediaItem}>
                <div className={classes.iwtMediaCover}>
                  <Media resource={media} src={staticImage} />
                </div>
              </div>
              <div className={classes.iwtContentItem}>
                <div key={id} className={classes.mediaContent}>
                  {title && <div className={classes.bannerHeading}>{title}</div>}
                  {richText && (
                    <RichText className={classes.bannerDescription} content={richText} />
                  )}
                  {enableLink && <CMSLink className={classes.link} {...link} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

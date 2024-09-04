import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import heroBanner from './../../../payload/seed/heroBanner.png'
import '../../_css/home.scss'

import { Page } from '../../../payload/payload-types'
import { staticHome } from '../../../payload/seed/home-static'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Blocks } from '../../_components/Blocks'
import { Hero } from '../../_components/Hero'
import { generateMeta } from '../../_utilities/generateMeta'

// Payload Cloud caches all files through Cloudflare, so we don't need Next.js to cache them as well
// This means that we can turn off Next.js data caching and instead rely solely on the Cloudflare CDN
// To do this, we include the `no-cache` header on the fetch requests used to get the data for this page
// But we also need to force Next.js to dynamically render this page on each request for preview mode to work
// See https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
// If you are not using Payload Cloud then this line can be removed, see `../../../README.md#cache`
export const dynamic = 'force-dynamic'

export default async function Page({ params: { slug = 'home' } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // so swallow the error here and simply render the page with fallback data where necessary
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }

  // if no `home` page exists, render a static one using dummy content
  // you should delete this code once you have a home page in the CMS
  // this is really only useful for those who are demoing this template
  if (!page && slug === 'home') {
    page = staticHome
  }

  if (!page) {
    return notFound()
  }

  const { hero, layout } = page

  return (
    <React.Fragment>
      <header>
        <div className="logo">
          <img
            src="https://cdn.shopify.com/s/files/1/0693/1929/5190/files/logomark.png?v=1725363837"
            alt="logo"
          />
        </div>
        <nav>
          <ul>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/about">About us</a>
            </li>
            <li>
              <a href="/contact">Contact us</a>
            </li>
          </ul>
        </nav>
        <div className="header-search">
          <input type="text" placeholder="Search" />
        </div>
      </header>

      <section className="hero-section">
        <img
          src="https://cdn.shopify.com/s/files/1/0693/1929/5190/files/heroBanner.png?v=1725362668"
          alt="Serene Tree"
          height={'50%'}
          width={'100%'}
        />
        <div className="banner-content">
          {' '}
          <h1>Where regional expertise meets local advantage in serene harmony</h1>
          <p>Your corporate health solutions redefined.</p>
          <button>Contact us</button>
        </div>
      </section>

      <section className="introduction-section">
        <div className="into-text">
          {' '}
          <h2>Introducing Serenity Health Partners</h2>
          <p>
            Innovative, accessible, and transparent health insurance solutions inspired by Japanese
            philosophy of <span className="red-txt">holistic well-being</span>, and values of{' '}
            <span className="red-txt">customer service excellence</span>.
          </p>
          <button>Contact us</button>
        </div>
        <div className="features">
          <div className="feature">
            <img
              src="https://cdn.shopify.com/s/files/1/0693/1929/5190/files/icon-read.svg?v=1725363837"
              alt="firstFeature"
            />
            <div className="feature-in">
              {' '}
              <h3>Customized protection</h3>
              <p>
                Enjoy tailored health solutions that nurture every aspect of your life, akin to
                nature's perfect balance.
              </p>
            </div>
          </div>
          <div className="feature">
            <img
              src="https://cdn.shopify.com/s/files/1/0693/1929/5190/files/icon-read.svg?v=1725363837"
              alt="secondFeature"
            />
            <div className="feature-in">
              {' '}
              <h3>Greater accessibility</h3>
              <p>
                Access comprehensive, cost-effective health insurance designed to meet diverse needs
                across Asia.
              </p>
            </div>
          </div>
          <div className="feature">
            <img
              src="https://cdn.shopify.com/s/files/1/0693/1929/5190/files/icon-read.svg?v=1725363837"
              alt="thirdFeature"
            />
            <div className="feature-in">
              {' '}
              <h3>Excellent customer service</h3>
              <p>
                Expect reliable and efficient claims processing that reflects Japanese principles of
                service excellence
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="work-section"
        style={{
          backgroundImage: `url(https://cdn.shopify.com/s/files/1/0693/1929/5190/files/Vector-leaves.svg?v=1725363837)`,
        }}
      >
        <div className="work-section-txt">
          <h2>Why work with us</h2>
          <p>
            We are committed to guiding our clients toward holistic health, combining stability,
            adaptability and passion to achieve balance and overall well-being.
          </p>
          <span className="work-small">
            This mission drives our company’s three core principles.
          </span>
        </div>
      </section>

      <section className="core-values-section">
        <h2>Core Values</h2>
        <div className="values">
          <div className="value-card">
            <h3>Making insurance accessible</h3>
            <div className="value-txt">
              <img
                src="https://cdn.shopify.com/s/files/1/0693/1929/5190/files/insurance-accessible.svg?v=1725363837"
                alt="coreOne"
              />
              <p>
                We address rising medical costs by providing predictable rates through advanced
                product design, underwriting, and claims management. Our robust cost containment
                strategies ensure stable pricing and overall health insurance stability.
              </p>
            </div>
          </div>
          <div className="value-card">
            <h3>Transparency and accountability</h3>
            <div className="value-txt">
              {' '}
              <img
                src="https://cdn.shopify.com/s/files/1/0693/1929/5190/files/trans-acc.svg?v=1725363838"
                alt="coreOne"
              />
              <p>
                We prioritise clear policy language and reliable claims payments to build trust. Our
                commitment to integrity ensures a positive experience for both partners and
                customers, leveraging our team’s expertise to tackle challenges and seize
                opportunities effectively.
              </p>
            </div>
          </div>
          <div className="value-card">
            <h3>Integrity and professional responsibility</h3>
            <div className="value-txt">
              {' '}
              <img
                src="https://cdn.shopify.com/s/files/1/0693/1929/5190/files/responsibility.svg?v=1725363838"
                alt="coreOne"
              />
              <p>
                We uphold the highest standards in protecting individuals and maintaining market
                integrity and regulatory compliance across Asia’s health insurance sector. 
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="plans-section">
        <h2>SerenityPlus</h2>
        <div className="plans-wrap">
          <div className="plans">
            <div className="plan-card">
              <h3>Essential: Bamboo</h3>
              <p>
                Expect strength, flexibility, and adaptability with this foundational plan. It
                provides essential coverage to support resilience and well-being, ensuring your
                basic health needs are met.
              </p>
            </div>
            <div className="plan-card">
              <h3>Comprehensive: Maple</h3>
              <p>
                Expect strength, flexibility, and adaptability with this foundational plan. It
                provides essential coverage to support resilience and well-being, ensuring your
                basic health needs are met.
              </p>
            </div>
            <div className="plan-card">
              <h3>Premier: Pine</h3>
              <p>
                Expect strength, flexibility, and adaptability with this foundational plan. It
                provides essential coverage to support resilience and well-being, ensuring your
                basic health needs are met.
              </p>
            </div>
            <div className="plan-card">
              <h3>Elite: Sakura</h3>
              <p>
                Expect strength, flexibility, and adaptability with this foundational plan. It
                provides essential coverage to support resilience and well-being, ensuring your
                basic health needs are met.
              </p>
            </div>
          </div>
          <div className="plans-img">
            {' '}
            <img
              src="https://cdn.shopify.com/s/files/1/0693/1929/5190/files/serenity-plus-img.jpg?v=1725363840"
              alt="SerenityPlus"
            />
          </div>
        </div>
      </section>

      <section className="linkedin-section">
        <h2>Latest on LinkedIn</h2>
        <div className="linkedin-posts">
          <div className="post">
            <img
              src="https://cdn.shopify.com/s/files/1/0693/1929/5190/files/blog-img1.jpg?v=1725363839"
              alt="linkedIn"
            />
            <p className="date">12 Aug 2024</p>
            <p className="blog-txt">
              Body text lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="post">
            <img
              src="https://cdn.shopify.com/s/files/1/0693/1929/5190/files/blog-img2.jpg?v=1725363839"
              alt="post"
            />
            <p className="date">5 Sep 2024</p>
            <p className="blog-txt">
              Body text lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="post">
            <img
              src="https://cdn.shopify.com/s/files/1/0693/1929/5190/files/blog-img3.jpg?v=1725363839"
              alt="post"
            />
            <p className="date">20 Sep 2024</p>
            <p className="blog-txt">
              Body text lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </section>

      <section
        className="contact-section"
        style={{
          backgroundImage: `url(https://cdn.shopify.com/s/files/1/0693/1929/5190/files/getintouch-img.svg?v=1725363837)`,
        }}
      >
        <div className="git-sec">
          <h2>Get in touch</h2>
          <p>Connect with our experts for a tailored plan</p>
          <button>Contact us</button>
        </div>
      </section>

      <footer>
        <div className="partners">
          <p>In partnership with</p>
          <img
            src="https://cdn.shopify.com/s/files/1/0693/1929/5190/files/logomark-msig.svg?v=1725363837"
            alt="MSIG"
          />
        </div>
        <ul className="footer-link">
          <li>
            <a href="/privacy">Home</a>
          </li>
          <li>
            <a href="/terms">Product</a>
          </li>
          <li>
            <a href="/privacy">About Us</a>
          </li>
          <li>
            <a href="/terms">Contact</a>
          </li>
        </ul>

        <div className="footer-bottom">
          <div className="copyright">
            {' '}
            <p>© 2024 Serenity</p>
          </div>
          <div className="legal-link">
            {' '}
            <ul>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms">Terms of Use</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </React.Fragment>
  )
}

export async function generateStaticParams() {
  try {
    const pages = await fetchDocs<Page>('pages')
    return pages?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    // don't throw an error if the fetch fails
    // this is so that we can render static fallback pages for the demo
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }

  if (!page) {
    if (slug === 'home') page = staticHome
  }

  return generateMeta({ doc: page })
}

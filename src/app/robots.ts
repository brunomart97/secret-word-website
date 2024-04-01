import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ''
    },
    sitemap: 'https://zignix.com/sitemap.xml'
  }
}

/**
 * Social Media Metadata Component
 * Generates Open Graph and Twitter Card meta tags for social sharing
 * Optimized for Pinterest, Instagram, Facebook, Twitter/X
 */

import Head from 'next/head'

export interface SocialMetaProps {
  title: string
  description: string
  image: string
  url: string
  type?: 'website' | 'article' | 'product' | 'book'
  author?: string
  publishDate?: string
  price?: string
  keywords?: string[]
}

export function SocialMeta({
  title,
  description,
  image,
  url,
  type = 'website',
  author,
  publishDate,
  price,
  keywords = [],
}: SocialMetaProps) {
  // Ensure absolute URLs
  const absoluteUrl = url.startsWith('http') ? url : `https://selfactualize.life${url}`
  const absoluteImage = image.startsWith('http') ? image : `https://selfactualize.life${image}`

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {author && <meta name="author" content={author} />}

      {/* Open Graph / Facebook / Instagram */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="The Self Actualized Life" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={absoluteUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:creator" content="@selfactualized" />
      <meta name="twitter:site" content="@selfactualized" />

      {/* Pinterest */}
      <meta name="pinterest:description" content={description} />
      <meta name="pinterest-rich-pin" content="true" />

      {/* Product-specific meta tags */}
      {type === 'product' && price && (
        <>
          <meta property="og:price:amount" content={price} />
          <meta property="og:price:currency" content="USD" />
          <meta property="product:price:amount" content={price} />
          <meta property="product:price:currency" content="USD" />
        </>
      )}

      {/* Book-specific meta tags */}
      {type === 'book' && (
        <>
          <meta property="og:type" content="book" />
          {author && <meta property="book:author" content={author} />}
          {publishDate && <meta property="book:release_date" content={publishDate} />}
        </>
      )}

      {/* Article-specific meta tags */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishDate && <meta property="article:published_time" content={publishDate} />}
        </>
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={absoluteUrl} />
    </Head>
  )
}

/**
 * Helper function to generate social meta for a book
 */
export function generateBookMeta(book: {
  title: string
  subtitle: string
  description: string
  coverImage: string
  slug: string
  author?: string
  price: number
  publishDate?: string
}) {
  return {
    title: `${book.title} - ${book.subtitle}`,
    description: book.description.slice(0, 200) + '...',
    image: book.coverImage,
    url: `/books/${book.slug}`,
    type: 'book' as const,
    author: book.author,
    publishDate: book.publishDate,
    price: (book.price / 100).toFixed(2),
    keywords: [
      'self-actualization',
      'personal growth',
      'transformation',
      'self-help',
      'philosophy',
      'psychology',
      book.title,
    ],
  }
}

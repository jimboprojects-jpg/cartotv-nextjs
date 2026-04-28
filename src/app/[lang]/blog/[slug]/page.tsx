import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, User, Tag } from 'lucide-react'
import { getAllPosts, getPostBySlug } from '@/data/blog/posts'
import { SideMenu } from '@/components/ui/SideMenu'
import { languages } from '@/i18n/config'

interface Props { params: { lang: string; slug: string } }

export async function generateStaticParams() {
  const posts = getAllPosts()
  return languages.flatMap(l => posts.map(p => ({ lang: l.code, slug: p.slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  const altLangs: Record<string,string> = {}
  languages.forEach(l => { altLangs[l.code] = `https://cartotv.com/${l.code}/blog/${params.slug}` })
  return {
    title: `${post.title} | CartoTV Blog`,
    description: post.description,
    alternates: { canonical: `https://cartotv.com/en/blog/${params.slug}`, languages: altLangs },
    openGraph: { title: post.title, description: post.description, type: 'article', publishedTime: post.date },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()
  const jsonLd = {
    '@context':'https://schema.org','@type':'BlogPosting',
    'headline':post.title,'description':post.description,'datePublished':post.date,
    'author':{'@type':'Organization','name':post.author},
    'publisher':{'@type':'Organization','name':'CartoTV','url':'https://cartotv.com'},
    'mainEntityOfPage':`https://cartotv.com/${params.lang}/blog/${post.slug}`,
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-background text-foreground">
        <SideMenu />
        <article className="max-w-3xl mx-auto px-4 py-20">
          <Link href={`/${params.lang}/blog`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />Back to Blog
          </Link>
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(post.date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readingTime} min read</span>
            </div>
          </header>
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content }} />
          {post.tags?.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-sm text-muted-foreground">
                  <Tag className="w-3 h-3" />{tag}
                </span>
              ))}
            </div>
          )}
          <div className="mt-10 pt-6 border-t border-border">
            <Link href={`/${params.lang}/blog`} className="inline-flex items-center gap-2 text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" />Back to Blog
            </Link>
          </div>
        </article>
      </div>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import { getAllPosts } from '@/data/blog/posts'
import { SideMenu } from '@/components/ui/SideMenu'

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    title: 'Blog – Free Live TV Streaming Tips & Guides | CartoTV',
    description: 'Discover the best free TV channels from around the world. Tips, guides, and country-by-country reviews to help you find great free television online.',
    alternates: { canonical: `https://cartotv.com/${params.lang}/blog` },
  }
}

export default function BlogPage({ params }: { params: { lang: string } }) {
  const posts = getAllPosts()
  const jsonLd = { '@context':'https://schema.org','@type':'Blog','name':'CartoTV Blog','url':`https://cartotv.com/${params.lang}/blog`,
    'blogPost': posts.map(p => ({ '@type':'BlogPosting','headline':p.title,'description':p.description,'datePublished':p.date,'url':`https://cartotv.com/${params.lang}/blog/${p.slug}` }))
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-background text-foreground">
        <SideMenu />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="mb-12">
            <Link href={`/${params.lang}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />Back to Globe
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground">Guides, tips, and reviews to help you discover the best free TV channels worldwide.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map(post => (
              <Link key={post.slug} href={`/${params.lang}/blog/${post.slug}`}
                className="group block p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTime} min read</span>
                </div>
                <h2 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2 line-clamp-2">{post.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0,3).map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
                      <Tag className="w-2.5 h-2.5" />{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

'use client'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { countries } from '@/data/countries'
import { Input } from '@/components/ui/input'

export function WatchIndexClient({ lang }: { lang: string }) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const filtered = useMemo(() => !search ? countries : countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase())), [search])
  return (
    <>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search countries..." value={search} onChange={e=>setSearch(e.target.value)} className="pl-9" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {filtered.map(c => (
          <button key={c.name} onClick={() => router.push(`/${lang}/watch/${c.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}`)}
            className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-left">
            <img src={c.flag} alt={c.name} className="w-8 h-6 object-cover rounded shadow-sm" onError={e=>{(e.target as HTMLImageElement).style.display='none'}} />
            <span className="text-sm font-medium truncate">{c.name}</span>
          </button>
        ))}
      </div>
    </>
  )
}

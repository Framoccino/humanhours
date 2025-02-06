import { useState } from 'react'
import { useRouter } from 'next/router'
import { SearchSuggestions } from './SearchSuggestions'

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSelect = (service: string) => {
    router.push(`/services/${service.toLowerCase().replace(' ', '-')}`)
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="What do you want to do today?"
        className="w-full px-4 py-3 bg-black/60 backdrop-blur-md rounded-lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchSuggestions query={query} onSelect={handleSelect} />
    </div>
  )
} 
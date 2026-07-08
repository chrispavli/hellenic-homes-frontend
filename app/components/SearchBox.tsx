'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = query.trim() ? `?search=${encodeURIComponent(query.trim())}` : '';
    router.push(`/properties${params}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by location, region or property type..."
        className="flex-1 px-5 py-3 rounded-l-xl border border-stone-300 text-stone-800 text-sm focus:outline-none focus:border-sky-400 bg-white"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-r-xl transition-colors"
      >
        Search
      </button>
    </form>
  );
}

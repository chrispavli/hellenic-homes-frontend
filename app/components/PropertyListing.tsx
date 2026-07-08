'use client';

import { useState } from 'react';
import Link from 'next/link';
import PropertyCard from './PropertyCard';

type SortOption = 'newest' | 'price_asc' | 'price_desc';

interface Property {
  id: number;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  acf: {
    price: string;
    region: string;
    bedrooms: string;
    bathrooms: string;
    property_type: string;
    listing_type: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
  };
}

function GridIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function PropertyRow({ property }: { property: Property }) {
  const { acf, title, _embedded } = property;
  const image = _embedded?.['wp:featuredmedia']?.[0];
  const num = parseInt(acf.price, 10);
  const price = isNaN(num)
    ? acf.price
    : acf.listing_type === 'rental'
    ? `€${num.toLocaleString('en-GB')} / month`
    : `€${num.toLocaleString('en-GB')}`;

  return (
    <Link href={`/properties/${property.id}`} className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex gap-0 block">
      <div className="w-48 shrink-0 relative bg-gradient-to-br from-sky-100 to-blue-200">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.source_url}
            alt={image.alt_text || title.rendered}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-3xl">🏡</span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col justify-between flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-stone-800">{title.rendered}</h3>
            <p className="text-sm text-stone-500 mt-0.5">{acf.region}</p>
          </div>
          <span className="shrink-0 px-2.5 py-0.5 bg-sky-100 text-sky-800 rounded-md text-xs font-semibold">
            {acf.listing_type === 'rental' ? 'Rent' : 'Sale'}
          </span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-4 text-sm text-stone-500">
            <span>{acf.bedrooms} bed</span>
            <span>{acf.bathrooms} bath</span>
            {acf.property_type && <span className="capitalize">{acf.property_type}</span>}
          </div>
          <p className="text-lg font-bold text-stone-800">{price}</p>
        </div>
      </div>
    </Link>
  );
}

function Section({
  title,
  properties,
  view,
}: {
  title: string;
  properties: Property[];
  view: 'grid' | 'list';
}) {
  if (properties.length === 0) return null;
  return (
    <section className="mb-12">
      {title && <h2 className="text-xl font-semibold text-stone-700 mb-5">{title}</h2>}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {properties.map((p) => (
            <PropertyRow key={p.id} property={p} />
          ))}
        </div>
      )}
    </section>
  );
}

function sortProperties(properties: Property[], sort: SortOption): Property[] {
  return [...properties].sort((a, b) => {
    if (sort === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sort === 'price_asc') return parseInt(a.acf.price, 10) - parseInt(b.acf.price, 10);
    if (sort === 'price_desc') return parseInt(b.acf.price, 10) - parseInt(a.acf.price, 10);
    return 0;
  });
}

export default function PropertyListing({
  properties,
  initialSearch = '',
  totalCount,
}: {
  properties: Property[];
  initialSearch?: string;
  totalCount?: number;
}) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState<SortOption>('newest');
  const [search, setSearch] = useState(initialSearch);

  const filtered = properties.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.title.rendered.toLowerCase().includes(q) ||
      p.acf.region.toLowerCase().includes(q) ||
      p.acf.property_type.toLowerCase().includes(q)
    );
  });

  const sorted = sortProperties(filtered, sort);

  const count = totalCount ?? properties.length;

  return (
    <div>
      {/* Header + toolbar in blue band */}
      <div className="bg-sky-900 border-b border-sky-950 mb-8">
        <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-end justify-between gap-6">
          {/* Left: search + title */}
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by location or type..."
              autoComplete="off"
              className="w-full sm:w-96 border border-sky-700 rounded-lg px-4 py-2 text-sm text-stone-700 bg-white outline-none ring-0 focus:ring-0 focus:border-white mb-4"
            />
            <h1 className="text-xl font-semibold text-white mb-0.5">
              {search.trim() ? `Results for "${search.trim()}"` : 'All Properties'}
            </h1>
            <p className="text-sky-300 text-sm">{count} {count === 1 ? 'property' : 'properties'} available</p>
          </div>
          {/* Right: sort + view toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="border border-sky-700 rounded-lg px-3 py-2 text-sm text-stone-700 bg-white outline-none focus:border-white"
            >
              <option value="newest">Recently Added</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
            <div className="flex border border-sky-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setView('grid')}
                className={`p-2 transition-colors ${view === 'grid' ? 'bg-stone-800 text-white' : 'bg-white text-stone-400 hover:text-stone-600'}`}
                aria-label="Grid view"
              >
                <GridIcon />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 transition-colors ${view === 'list' ? 'bg-stone-800 text-white' : 'bg-white text-stone-400 hover:text-stone-600'}`}
                aria-label="List view"
              >
                <ListIcon />
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Section title="" properties={sorted} view={view} />

        {filtered.length === 0 && (
          <p className="text-stone-400 text-center py-20">
            {search ? `No properties found for "${search}".` : 'No properties found.'}
          </p>
        )}
      </div>
    </div>
  );
}

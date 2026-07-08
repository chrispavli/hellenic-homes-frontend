'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SearchBox from './SearchBox';

interface HeroSlide {
  id: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
  };
}

export default function HeroSlide() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch('/api/hero-slides');
        if (!res.ok) return;
        const slides: HeroSlide[] = await res.json();
        const images = slides
          .map((s) => s._embedded?.['wp:featuredmedia']?.[0]?.source_url)
          .filter(Boolean) as string[];
        if (images.length > 0) {
          setImageUrl(images[Math.floor(Math.random() * images.length)]);
        }
      } catch {
        // fall back to gradient
      }
    }
    fetchSlides();
  }, []);

  return (
    <div
      className="relative bg-gradient-to-br from-sky-900 via-sky-800 to-blue-900 text-white min-h-[480px]"
      style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {/* Dark overlay so text stays readable over photos */}
      {imageUrl && <div className="absolute inset-0 bg-black/50" />}

      <div className="relative max-w-6xl mx-auto px-6 py-28 flex flex-col items-center text-center gap-8">
        <div>
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Find your dream home<br />in Greece & Cyprus
          </h1>
          <p className="text-sky-200 text-lg max-w-xl mx-auto">
            Browse villas, apartments and houses for sale and rent across Greece and Cyprus.
          </p>
        </div>
        <SearchBox />
        <Link href="/properties" className="text-sky-300 text-sm hover:text-white transition-colors underline underline-offset-4">
          Browse all properties
        </Link>
      </div>
    </div>
  );
}

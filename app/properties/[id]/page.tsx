import { notFound } from 'next/navigation';
import Link from 'next/link';

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

async function getProperty(id: string): Promise<Property | null> {
  try {
    const res = await fetch(
      `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/properties/${id}?_embed`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

const typeLabel: Record<string, string> = {
  villa: 'Villa',
  apartment: 'Apartment',
  house: 'House',
};

function formatPrice(price: string, listingType: string): string {
  const num = parseInt(price, 10);
  if (isNaN(num)) return price;
  const formatted = num.toLocaleString('en-GB');
  return listingType === 'rental' ? `€${formatted} / month` : `€${formatted}`;
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) notFound();

  const { acf, title, content, _embedded } = property;
  const images = _embedded?.['wp:featuredmedia'] ?? [];
  const mainImage = images[0];

  return (
    <div>
      {/* Header band */}
      <div className="bg-sky-900">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link href="/properties" className="text-sky-300 text-sm hover:text-white transition-colors inline-flex items-center gap-1 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to properties
          </Link>
          <h1 className="text-xl font-bold text-white mb-1">{title.rendered}</h1>
          <p className="text-sky-200">{acf.region}{acf.property_type ? ` · ${typeLabel[acf.property_type] ?? acf.property_type}` : ''}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Main image */}
            {mainImage && (
              <div className="rounded-2xl overflow-hidden mb-6 aspect-video relative bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mainImage.source_url}
                  alt={mainImage.alt_text || title.rendered}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Description */}
            {content.rendered ? (
              <div
                className="prose prose-stone max-w-none"
                dangerouslySetInnerHTML={{ __html: content.rendered }}
              />
            ) : (
              <p className="text-stone-400">No description available.</p>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="border border-stone-200 rounded-2xl p-6 bg-white shadow-sm sticky top-6">
              <div className="mb-4 pb-4 border-b border-stone-100">
                <span className={`inline-block px-3 py-1 rounded-md text-sm font-semibold mb-3 ${
                  acf.listing_type === 'rental' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                }`}>
                  {acf.listing_type === 'rental' ? 'For Rent' : 'For Sale'}
                </span>
                <p className="text-3xl font-bold text-stone-800">
                  {formatPrice(acf.price, acf.listing_type)}
                </p>
              </div>

              <div className="space-y-3 mb-6 text-sm text-stone-600">
                <div className="flex justify-between">
                  <span className="text-stone-400">Region</span>
                  <span className="font-medium">{acf.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Type</span>
                  <span className="font-medium">{typeLabel[acf.property_type] ?? acf.property_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Bedrooms</span>
                  <span className="font-medium">{acf.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Bathrooms</span>
                  <span className="font-medium">{acf.bathrooms}</span>
                </div>
              </div>

              <button className="w-full bg-sky-900 hover:bg-sky-800 text-white font-semibold py-3 rounded-xl transition-colors">
                Enquire About This Property
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

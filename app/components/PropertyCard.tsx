import Link from 'next/link';

interface Property {
  id: number;
  title: { rendered: string };
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

export default function PropertyCard({ property }: { property: Property }) {
  const { acf, title, _embedded } = property;
  const image = _embedded?.['wp:featuredmedia']?.[0];

  return (
    <Link href={`/properties/${property.id}`} className="bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group block">
      <div className="h-44 relative bg-gradient-to-br from-sky-100 to-blue-200">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.source_url}
            alt={image.alt_text || title.rendered}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-4xl">🏡</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-base font-semibold text-stone-800 leading-snug">
            {title.rendered}
          </h3>
          <span className="shrink-0 px-2.5 py-0.5 bg-sky-100 text-sky-800 rounded-md text-xs font-semibold">
            {acf.listing_type === 'rental' ? 'Rent' : 'Sale'}
          </span>
        </div>

        <p className="text-sm text-stone-500 mb-1">{acf.region}</p>

        {acf.property_type && (
          <p className="text-xs text-stone-400 mb-3">
            {typeLabel[acf.property_type] ?? acf.property_type}
          </p>
        )}

        <div className="flex gap-4 text-sm text-stone-500 mb-4">
          <span>{acf.bedrooms} bed</span>
          <span>{acf.bathrooms} bath</span>
        </div>

        <p className="text-lg font-bold text-stone-800">
          {formatPrice(acf.price, acf.listing_type)}
        </p>
      </div>
    </Link>
  );
}

import PropertyCard from './components/PropertyCard';

interface Property {
  id: number;
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
}

async function getProperties(): Promise<Property[]> {
  const res = await fetch(
    `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/properties?per_page=100`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const properties = await getProperties();

  const forSale = properties.filter((p) => p.acf.listing_type === 'sale');
  const forRent = properties.filter((p) => p.acf.listing_type === 'rental');

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-stone-800 mb-2">
          Find your home in the Greek islands
        </h1>
        <p className="text-stone-500 text-lg">
          {properties.length} {properties.length === 1 ? 'property' : 'properties'} available across the Aegean
        </p>
      </div>

      {forSale.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-stone-700 mb-5">Properties for Sale</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {forSale.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}

      {forRent.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-stone-700 mb-5">Properties for Rent</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {forRent.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}

      {properties.length === 0 && (
        <p className="text-stone-400 text-center py-20">No properties found.</p>
      )}
    </div>
  );
}

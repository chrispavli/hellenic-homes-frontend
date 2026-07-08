import PropertyListing from '../components/PropertyListing';

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

async function getProperties(): Promise<Property[]> {
  try {
    const res = await fetch(
      `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/properties?per_page=100&_embed`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const properties = await getProperties();
  const { search } = await searchParams;

  return (
    <PropertyListing
      properties={properties}
      initialSearch={search ?? ''}
      totalCount={properties.length}
    />
  );
}

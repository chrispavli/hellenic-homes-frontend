import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/hero_slide?_embed&per_page=20`,
      { cache: 'no-store' }
    );
    if (!res.ok) return NextResponse.json([]);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([]);
  }
}

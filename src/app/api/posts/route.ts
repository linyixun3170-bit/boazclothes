import { NextResponse } from "next/server";

export async function GET() {
  try {
    const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://boazclothes.com";

    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/posts?per_page=10&_embed`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 600 },
      }
    );

    if (!response.ok) {
      return NextResponse.json([], { status: 200 });
    }

    const posts = await response.json();
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

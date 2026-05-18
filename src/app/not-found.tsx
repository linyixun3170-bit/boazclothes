"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-6">
      <span className="text-caption text-warm-gray mb-6">404</span>
      <h1 className="font-heading text-5xl md:text-7xl text-dark mb-6 text-center">
        Page Not Found
      </h1>
      <p className="text-body-lg text-warm-gray mb-12 text-center max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn-capsule">
        Back to Home
      </Link>
    </div>
  );
}

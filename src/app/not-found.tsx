import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-[var(--secondary-color)] mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          We couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-[var(--primary-color)] text-white px-6 py-3 rounded-md hover:bg-[var(--primary-dark)] transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
} 
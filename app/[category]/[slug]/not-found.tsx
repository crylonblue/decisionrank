import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          Ranking Not Found
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          The ranking you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-zinc-900 px-6 py-3 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Back to Rankings
        </Link>
      </div>
    </div>
  );
}


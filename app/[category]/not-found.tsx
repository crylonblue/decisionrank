import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">Category Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The category you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-md border border-input bg-card px-4 py-2 text-sm font-medium text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}


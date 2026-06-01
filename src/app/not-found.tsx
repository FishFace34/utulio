import Link from 'next/link';
import Container from '@/components/layout/Container';

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="mb-2 text-sm font-medium text-zinc-500">404</p>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900">Page not found</h1>
      <p className="mx-auto mb-8 max-w-md text-zinc-500">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have moved or been
        deleted.
      </p>
      <Link
        href="/"
        className="inline-flex h-10 items-center justify-center rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
      >
        Back to homepage
      </Link>
    </Container>
  );
}

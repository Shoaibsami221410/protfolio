import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="text-primary font-mono text-xs tracking-widest mb-4">ERROR 404</div>
      <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
        Page not found.
      </h1>
      <p className="text-muted font-light mb-10">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}

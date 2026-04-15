import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-500 mb-6">Page not found</p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go Home
      </Link>
    </div>
  );
}
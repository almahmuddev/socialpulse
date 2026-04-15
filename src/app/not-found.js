// import Link from "next/link";

// export default function NotFound() {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen text-center">
//       <h1 className="text-4xl font-bold mb-4">404</h1>
//       <p className="text-gray-500 mb-6">Page not found</p>
//       <Link
//         href="/"
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Go Home
//       </Link>
//     </div>
//   );
// }


//    COMMENTED FOR ERROR HANDLING



import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
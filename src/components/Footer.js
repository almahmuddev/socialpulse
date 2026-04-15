

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} SocialPulse. All rights reserved.
      </div>
    </footer>
  );
}
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          School Management System
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage school information with ease
        </p>
        <div className="space-x-4">
          <Link
            href="/addSchool"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Add School
          </Link>
          <Link
            href="/showSchools"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
          >
            View Schools
          </Link>
        </div>
      </div>
    </div>
  );
}
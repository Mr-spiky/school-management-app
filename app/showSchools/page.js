import Image from 'next/image';
import Link from 'next/link';
import { query } from '@/lib/database';

async function getSchools() {
  try {
    const schools = await query('SELECT id, name, address, city, image FROM schools');
    return schools;
  } catch (error) {
    console.error('Error fetching schools:', error);
    return [];
  }
}

export default async function ShowSchools() {
  const schools = await getSchools();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Schools Directory</h1>
          <Link 
            href="/addSchool" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Add New School
          </Link>
        </div>
        
        {schools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No schools found. Add a school to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {schools.map((school) => (
              <div key={school.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={`/schoolImages/${school.image}`}
                    alt={school.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{school.name}</h2>
                  <p className="text-gray-600 mb-1">{school.address}</p>
                  <p className="text-gray-600">{school.city}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default function SchoolCard({ school }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg transition-transform duration-200 hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img
          src={school.image || '/school-placeholder.jpg'}
          alt={school.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 truncate">{school.name}</h3>
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>{school.address}, {school.city}, {school.state}</span>
        </div>
      </div>
    </div>
  );
}
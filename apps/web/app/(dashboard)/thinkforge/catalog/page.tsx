export default function CatalogPage() {
  const tracks = [
    'Software Development',
    'Data Science',
    'Product Management',
    'Digital Marketing',
    'Cybersecurity',
    'Cloud Computing'
  ];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-slate-900">Course Catalog</h2>
      <p className="text-slate-600">Browse all 6 career tracks and start your journey.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {tracks.map((track) => (
          <div key={track} className="aif-card hover:border-blue-500 transition-colors cursor-pointer">
            <h3 className="font-bold text-sm">{track}</h3>
            <p className="text-xs text-slate-500 mt-2">12 Modules • 48 Hours</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import OfficeCard from '../components/OfficeCard';
import useOffices from '../hooks/useOffices';

export default function Home() {
  const { offices, loading, error } = useOffices();

  if (loading) return <p className="text-center text-gray-600">Loading offices...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Offices & Services</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {offices.map((office) => (
          <OfficeCard key={office.id} office={office} />
        ))}
      </div>
    </div>
  );
}

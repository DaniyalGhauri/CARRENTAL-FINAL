export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Our Services
        </h1>
        <p className="text-gray-700 text-center mb-10">
          Explore a wide range of professional car rental solutions designed to meet your every need.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Service 1 */}
          <div className="bg-gray-50 border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Daily Rentals</h2>
            <p className="text-gray-600">
              Affordable and convenient daily car rentals for short-term use. Ideal for city trips or business travel.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-gray-50 border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Long-Term Leasing</h2>
            <p className="text-gray-600">
              Flexible monthly and yearly plans for individuals and corporate clients needing long-term mobility.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-gray-50 border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Luxury & Premium Cars</h2>
            <p className="text-gray-600">
              High-end vehicles for weddings, VIP transport, and events to travel in style and comfort.
            </p>
          </div>

          {/* Service 4 */}
          <div className="bg-gray-50 border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">Chauffeur Service</h2>
            <p className="text-gray-600">
              Professional drivers for stress-free travel experiences with safety and convenience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

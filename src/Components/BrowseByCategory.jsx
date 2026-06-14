const categories = [
  { id: 1, name: "Used Cars", icon: "🚗", count: "1,200+ listings", link: "/used-cars" },
  { id: 2, name: "New Cars", icon: "🚙", count: "300+ listings", link: "/new-cars" },
  { id: 3, name: "Trucks", icon: "🚛", count: "450+ listings", link: "/trucks" },
  { id: 4, name: "Motorcycles", icon: "🏍️", count: "800+ listings", link: "/motorcycles" },
];

const BrowseByCategory = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Browse by Category</h2>
        <p className="text-center text-gray-400 text-sm mb-8">What are you looking for?</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => {
            return (
              <a key={cat.id} href={cat.link} className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl hover:border-[#DB1408] hover:shadow-md transition-all duration-200 group">
                <span className="text-4xl mb-3">{cat.icon}</span>
                <h3 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-[#DB1408] transition">{cat.name}</h3>
                <span className="text-xs text-[#DB1408] font-semibold">{cat.count}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
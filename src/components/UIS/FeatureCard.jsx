function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 hover:-translate-y-2 border border-gray-100">
      <div className="bg-orange-100 bg-opacity-10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
        {/* w-14 h-14 */}
        <Icon className="text-orange-500" size={32} />
        {/* text-orange-500 text-2xl */}
      </div>

      <h3 className="text-xl font-bold text-[#111827] mb-3">{title}</h3>

      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard;

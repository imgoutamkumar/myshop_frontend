// components/shop/TrustBadges.tsx
const badges = [
  { title: "Designed with Love", desc: "Every piece crafted carefully.", icon: "✨" },
  { title: "Sustainable", desc: "Eco-friendly packaging.", icon: "🌱" },
  { title: "Easy Returns", desc: "15-day no questions asked.", icon: "💌" },
  { title: "Free Shipping", desc: "On orders above ₹999.", icon: "🎀" },
];

const TrustBadges = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-y border-stone-200">
      {badges.map((badge, index) => (
        <div key={index} className="flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center text-2xl shadow-sm">
            {badge.icon}
          </div>
          <div>
            <h4 className="text-stone-800 font-medium mb-1">{badge.title}</h4>
            <p className="text-stone-500 text-sm font-light">{badge.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
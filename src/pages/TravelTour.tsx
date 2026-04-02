import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Globe, ArrowRight, MapPin, Shield, Info, DollarSign, Lock } from "lucide-react";
import { travelCountries } from "../data/travelAdvice";
import { cn } from "../lib/utils";

export default function TravelTour() {
  const activeCountries = travelCountries.filter(c => c.isActive);
  const comingSoonCountries = travelCountries.filter(c => !c.isActive);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=1920" 
            alt="Travel background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm border border-blue-500/30">
              <Globe className="w-4 h-4" />
              <span>Travel & Tour Advice</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Explore the World with <span className="text-blue-500">Confidence</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Get expert travel advice, cultural insights, and safety tips for your next destination. 
              We activate countries one by one as we establish local partnerships to ensure you get the best advice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Active Countries */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeCountries.map((country, index) => (
            <motion.div
              key={country.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-blue-200/30 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={country.image} 
                  alt={country.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <span className="text-4xl">{country.flag}</span>
                  <h3 className="text-2xl font-bold text-white">{country.name}</h3>
                </div>
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  ACTIVE
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed">
                  {country.description}
                </p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Expert" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-slate-400">Local experts on ground</span>
                </div>
                <Link 
                  to={`/travel/${country.id}`}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-all group/btn"
                >
                  View Travel Advice
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Expanding Our Horizons</h2>
            <p className="text-slate-500 max-w-xl">
              We are currently working with partners in these countries to bring you the most accurate and up-to-date travel advice.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-400 bg-slate-100 px-4 py-2 rounded-full">
            <Lock className="w-4 h-4" />
            <span>Activation in progress</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {comingSoonCountries.map((country, index) => (
            <motion.div
              key={country.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{country.flag}</span>
                <h3 className="font-bold text-slate-900">{country.name}</h3>
              </div>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                {country.description}
              </p>
              <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 w-1/3 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why We Activate One by One */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-blue-600 rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Commitment to Quality</h2>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Unlike other platforms, we don't just scrape the web. We only activate a country once we have a dedicated team of local experts on the ground.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Shield, text: "Verified local safety reports" },
                  { icon: Info, text: "Up-to-the-minute cultural insights" },
                  { icon: DollarSign, text: "Real-world budget expectations" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block">
              <div className="aspect-square bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">100%</div>
                  <div className="text-blue-200 uppercase tracking-widest text-xs font-bold">Expert Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

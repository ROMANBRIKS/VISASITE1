import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Shield, 
  Info, 
  DollarSign, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Users,
  ChevronRight
} from "lucide-react";
import { travelCountries } from "../data/travelAdvice";
import { cn } from "../lib/utils";
import { HeroSlider } from "../components/HeroSlider";

export default function TravelCountryDetail() {
  const { countryId } = useParams();
  const navigate = useNavigate();
  const country = travelCountries.find(c => c.id === countryId);

  if (!country || !country.isActive) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
          <MapPin className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Country Not Found</h1>
        <p className="text-slate-500 mb-8 max-w-sm">
          We haven't activated travel advice for this destination yet. We're working on it!
        </p>
        <Link 
          to="/travel"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
        >
          Back to Travel & Tour
        </Link>
      </div>
    );
  }

  const categoryIcons = {
    safety: Shield,
    culture: Info,
    logistics: Truck,
    budget: DollarSign
  };

  const categoryColors = {
    safety: "bg-red-50 text-red-600 border-red-100",
    culture: "bg-purple-50 text-purple-600 border-purple-100",
    logistics: "bg-blue-50 text-blue-600 border-blue-100",
    budget: "bg-green-50 text-green-600 border-green-100"
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header */}
      <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
        {countryId === 'ghana' ? (
          <HeroSlider countryId="ghana" opacity={0.6} textColor="text-white" />
        ) : (
          <>
            <img 
              src={country.image} 
              alt={country.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          </>
        )}
        
        <div className="absolute top-8 left-6 md:left-12 z-20">
          <button 
            onClick={() => navigate('/travel')}
            className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute bottom-12 left-6 md:left-12 right-6 z-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl md:text-6xl">{country.flag}</span>
                <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
                  {country.name}
                </h1>
              </div>
              <p className="text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
                {country.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Advice Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
                Expert Travel Advice
              </h2>
              
              <div className="space-y-6">
                {country.advice.map((tip, index) => {
                  const Icon = categoryIcons[tip.category];
                  return (
                    <motion.div
                      key={tip.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border",
                          categoryColors[tip.category]
                        )}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-slate-900 text-lg">{tip.title}</h3>
                            <span className={cn(
                              "text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full",
                              categoryColors[tip.category]
                            )}>
                              {tip.category}
                            </span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">
                            {tip.content}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Local Partners Section */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6">Our Local Partners in {country.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {country.partners.map((partner, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold">{partner.name}</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">{partner.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-6">Quick Facts</h3>
              <div className="space-y-6">
                {[
                  { icon: Clock, label: "Timezone", value: country.timezone },
                  { icon: MapPin, label: "Capital", value: country.capital },
                  { icon: DollarSign, label: "Currency", value: country.currency },
                  { icon: Shield, label: "Safety Level", value: "High (Exercise Caution)" }
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-slate-500">
                      <stat.icon className="w-4 h-4" />
                      <span className="text-sm">{stat.label}</span>
                    </div>
                    <span className="font-bold text-slate-900 text-sm">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Box */}
            <div className="bg-amber-50 rounded-3xl p-6 border border-amber-100">
              <div className="flex items-center gap-3 text-amber-700 mb-4">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold">Travel Advisory</h3>
              </div>
              <p className="text-sm text-amber-800/80 leading-relaxed mb-4">
                Always check with your local embassy for the most up-to-date travel restrictions and requirements before booking your trip.
              </p>
              <button className="w-full py-3 bg-amber-600 text-white rounded-xl font-bold text-sm hover:bg-amber-700 transition-all">
                View Official Advisory
              </button>
            </div>

            {/* CTA */}
            <div className="bg-blue-600 rounded-3xl p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-4">Need a Visa?</h3>
              <p className="text-blue-100 text-sm mb-6">
                We can help you with your visa application for {country.name}.
              </p>
              <Link 
                to={`/country/${country.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all"
              >
                Check Eligibility
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

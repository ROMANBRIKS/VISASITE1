
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import SEO from "../components/SEO";
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight, 
  Info, 
  ShieldCheck, 
  Globe,
  MapPin,
  ExternalLink,
  Clock,
  Users
} from "lucide-react";
import { countries } from "../data/countries";
import { cn } from "../lib/utils";

export default function CountryDetail() {
  const { countryId } = useParams();
  const country = countries.find(c => c.id === countryId);

  if (!country) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Country Not Found</h1>
        <Link to="/" className="text-blue-600 font-bold flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <SEO 
        title={`${country.name} Visa Guides & Eligibility`} 
        description={`Comprehensive visa guides and eligibility checks for ${country.name}. Learn about work, study, and visit visas for ${country.name}.`}
        keywords={`${country.name} visa, ${country.name} immigration, ${country.name} work permit, ${country.name} study visa`}
      />
      {/* Country Header */}
      <section className="relative h-[50vh] flex items-end px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={country.landmark} 
            alt={country.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 pb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Destinations
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{country.flag}</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">{country.name}</h1>
          </div>
          <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
            {country.description}
          </p>
        </div>
      </section>

      {/* Visa Categories */}
      <section id="visa-categories" className="px-6 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100">
                <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <Globe className="w-8 h-8 text-blue-600" />
                  Visa Categories
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {country.visas.map((visa) => (
                    <Link 
                      key={visa.id} 
                      to={`/visa/${country.id}/${visa.id}`}
                      className="group flex flex-col md:flex-row items-start md:items-center justify-between p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-lg transition-all"
                    >
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{visa.name}</h3>
                        <p className="text-slate-500 mb-4 max-w-md">{visa.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {visa.benefits.slice(0, 2).map((benefit, i) => (
                            <span key={i} className="px-3 py-1 bg-white border border-slate-100 rounded-full text-xs font-medium text-slate-600 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-green-500" />
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 md:mt-0 flex items-center gap-4">
                        <span className="text-sm font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          View Details <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-blue-500" />
                  Why {country.name}?
                </h3>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-bold mb-1">Global Recognition</p>
                      <p className="text-sm text-slate-400">Highly respected immigration system with clear pathways.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-bold mb-1">Efficient Processing</p>
                      <p className="text-sm text-slate-400">Streamlined digital application systems for most visas.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-bold mb-1">Supportive Community</p>
                      <p className="text-sm text-slate-400">Large international community and integration support.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-10 rounded-[2.5rem] border border-blue-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Need Help?</h3>
                <p className="text-slate-600 mb-8">
                  Not sure which visa category fits your situation? Use our smart eligibility check or talk to our AI consultant.
                </p>
                <button 
                  onClick={() => document.getElementById('visa-categories')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  Check Eligibility
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

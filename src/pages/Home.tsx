
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import SEO from "../components/SEO";
import { 
  ArrowRight, 
  Search, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Users, 
  ChevronRight,
  CheckCircle2,
  Download
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { countries } from "../data/countries";
import { cn } from "../lib/utils";

export default function Home() {
  const navigate = useNavigate();
  const [entryMode, setEntryMode] = useState<'none' | 'unsure' | 'know'>('none');
  
  // Smart Entry State
  const [purpose, setPurpose] = useState("");
  const [duration, setDuration] = useState("");
  const [region, setRegion] = useState("");
  
  const [suggestion, setSuggestion] = useState<{ countryId: string, visaId: string, countryName: string, visaName: string } | null>(null);
  
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState("");

  const handleUnsureSubmit = () => {
    // Intelligent suggestion logic based on supported countries
    let suggestedCid = "united-states";
    let suggestedVid = "temporary-work";

    if (purpose === "work") {
      if (region === "Europe") { suggestedCid = "germany"; suggestedVid = "national-visa-work"; }
      else if (region === "North America") { suggestedCid = "united-states"; suggestedVid = "temporary-work"; }
      else { suggestedCid = "uae"; suggestedVid = "green-visa"; }
    } else if (purpose === "study") {
      if (region === "Europe") { suggestedCid = "united-kingdom"; suggestedVid = "student-visa"; }
      else if (region === "North America") { suggestedCid = "canada"; suggestedVid = "study"; }
      else { suggestedCid = "china"; suggestedVid = "z-visa"; }
    } else if (purpose === "visit") {
      if (region === "Europe") { suggestedCid = "france"; suggestedVid = "short-stay"; }
      else if (region === "Asia") { suggestedCid = "turkey"; suggestedVid = "e-visa"; }
      else { suggestedCid = "south-africa"; suggestedVid = "critical-skills"; }
    }

    const country = countries.find(c => c.id === suggestedCid);
    const visa = country?.visas.find(v => v.id === suggestedVid);

    if (country && visa) {
      setSuggestion({
        countryId: suggestedCid,
        visaId: suggestedVid,
        countryName: country.name,
        visaName: visa.name
      });
    }
  };

  const handleKnowSubmit = () => {
    if (selectedCountry) {
      navigate(`/country/${selectedCountry}`);
    }
  };

  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      quote: "The eligibility check was a game-changer for my Canada study permit. It pointed out exactly what I was missing before I applied. Highly recommend!",
      name: "Oluwatobiloba Adeyemi",
      location: "Lagos, Nigeria",
      type: "Student Visa Applicant",
      initials: "OA",
      flag: "🇳🇬"
    },
    {
      quote: "Conseguir mi visa de nómada digital para España fue mucho más sencillo con su guía. La claridad en los requisitos financieros me ahorró meses de estrés.",
      name: "Valentina Restrepo",
      location: "Bogotá, Colombia",
      type: "Digital Nomad Applicant",
      initials: "VR",
      flag: "🇨🇴"
    },
    {
      quote: "Moving to Germany for a tech role seemed daunting until I used this platform. The step-by-step checklist ensured I didn't miss a single document.",
      name: "Sarah Jenkins",
      location: "New York, USA",
      type: "Skilled Worker Applicant",
      initials: "SJ",
      flag: "🇺🇸"
    },
    {
      quote: "The UK Skilled Worker guide was incredibly precise. It helped me navigate the sponsorship process from Ghana without any legal delays.",
      name: "Mensah Williams",
      location: "Accra, Ghana",
      type: "Skilled Worker Applicant",
      initials: "MW",
      flag: "🇬🇭"
    },
    {
      quote: "A transição para Portugal com o visto D7 foi muito tranquila. As informações sobre comprovação de renda passiva foram fundamentais.",
      name: "Lucas Oliveira",
      location: "São Paulo, Brazil",
      type: "Passive Income Applicant",
      initials: "LO",
      flag: "🇧🇷"
    },
    {
      quote: "Applying for the UAE Golden Visa from Berlin was seamless. The platform's breakdown of investment categories was exactly what I needed.",
      name: "Emma Schmidt",
      location: "Berlin, Germany",
      type: "Golden Visa Applicant",
      initials: "ES",
      flag: "🇩🇪"
    },
    {
      quote: "The Opportunity Card guide for Germany is the best resource for Egyptians. It explained the points system clearly and helped me secure my visa.",
      name: "Amira El-Sayed",
      location: "Cairo, Egypt",
      type: "Job Seeker Applicant",
      initials: "AE",
      flag: "🇪🇬"
    },
    {
      quote: "Obtener la visa TN para trabajar en EE.UU. como ingeniera mexicana fue directo gracias a sus plantillas de cartas de oferta.",
      name: "Mariana Gomez",
      location: "Mexico City, Mexico",
      type: "Professional Visa Applicant",
      initials: "MG",
      flag: "🇲🇽"
    },
    {
      quote: "Il processo per il Working Holiday in Australia è stato semplicissimo. La guida mi ha aiutato con l'assicurazione e i requisiti bancari.",
      name: "Alessandro Rossi",
      location: "Milan, Italy",
      type: "Working Holiday Applicant",
      initials: "AR",
      flag: "🇮🇹"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleGetGuide = (guide: { title: string, country: string, price: string }) => {
    // Map guide title to countryId and visaId
    const countryMap: Record<string, { cid: string, vid: string }> = {
      "United States": { cid: "united-states", vid: "temporary-work" },
      "Canada": { cid: "canada", vid: "economic" },
      "Germany": { cid: "germany", vid: "opportunity-card" },
      "United Kingdom": { cid: "united-kingdom", vid: "skilled-worker" },
      "France": { cid: "france", vid: "talent-passport" }
    };
    const mapping = countryMap[guide.country];
    if (mapping) {
      navigate('/checkout', { state: { type: 'guide', countryId: mapping.cid, visaId: mapping.vid } });
    }
  };

  return (
    <div className="flex flex-col gap-20 pb-20">
      <SEO 
        title="Find the Right Visa. Apply With Confidence." 
        description="Global Visa Platform - Expert-led visa guides, eligibility checks, and immigration support for 16+ countries. Trusted by 70,000+ applicants."
        keywords="visa guide, immigration support, eligibility check, student visa, work visa, digital nomad visa, global immigration"
      />
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-20"
            alt="Travel background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4" />
              Trusted by 70,000+ applicants
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Find the Right Visa. <br />
              <span className="text-blue-600">Apply With Confidence.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
              Serving for 15+ years with expert-led visa guides and eligibility checks. 
              Our data is updated as of January 2026 to ensure your success.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => {
                  setEntryMode('unsure');
                  document.getElementById('smart-entry')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2"
              >
                Find My Visa
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {
                  setEntryMode('know');
                  document.getElementById('smart-entry')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:border-blue-200 transition-all"
              >
                I Know Where I’m Going
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Smart Entry System */}
      <section id="smart-entry" className="px-6 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden">
            <div className="flex border-b border-slate-100">
              <button 
                onClick={() => { setEntryMode('unsure'); setSuggestion(null); }}
                className={cn(
                  "flex-1 py-6 text-center font-bold transition-all",
                  entryMode === 'unsure' ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:text-slate-600"
                )}
              >
                I’m Not Sure
              </button>
              <button 
                onClick={() => { setEntryMode('know'); setSuggestion(null); }}
                className={cn(
                  "flex-1 py-6 text-center font-bold transition-all",
                  entryMode === 'know' ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:text-slate-600"
                )}
              >
                I Know Where I’m Going
              </button>
            </div>

            <div className="p-10">
              <AnimatePresence mode="wait">
                {entryMode === 'unsure' ? (
                  suggestion ? (
                    <motion.div 
                      key="suggestion"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-8 py-4"
                    >
                      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">We Recommend: {suggestion.countryName}</h3>
                        <p className="text-slate-500">The <span className="font-bold text-blue-600">{suggestion.visaName}</span> seems like the best fit for your goals.</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                          onClick={() => navigate(`/visa/${suggestion.countryId}/${suggestion.visaId}`)}
                          className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                        >
                          View Visa Details
                        </button>
                        <button 
                          onClick={() => setSuggestion(null)}
                          className="px-10 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                        >
                          Start Over
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Purpose</label>
                          <select 
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          >
                            <option value="">Select Purpose</option>
                            <option value="work">Work</option>
                            <option value="study">Study</option>
                            <option value="visit">Visit</option>
                            <option value="family">Family</option>
                            <option value="relocation">Relocation</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Duration</label>
                          <select 
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          >
                            <option value="">Select Duration</option>
                            <option value="short">Short-term</option>
                            <option value="long">Long-term</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Region</label>
                          <select 
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                          >
                            <option value="">Select Region</option>
                            <option value="Europe">Europe</option>
                            <option value="North America">North America</option>
                            <option value="Asia">Asia</option>
                            <option value="Open">Open</option>
                          </select>
                        </div>
                      </div>
                      <button 
                        onClick={handleUnsureSubmit}
                        className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                      >
                        Get Suggestions
                      </button>
                    </motion.div>
                  )
                ) : entryMode === 'know' ? (
                  <motion.div 
                    key="know"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Country</label>
                        <select 
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        >
                          <option value="">Where are you going?</option>
                          {countries.map(c => (
                            <option key={c.id} value={c.id}>{c.flag} {c.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Purpose</label>
                        <select 
                          value={selectedPurpose}
                          onChange={(e) => setSelectedPurpose(e.target.value)}
                          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        >
                          <option value="">Why are you going?</option>
                          <option value="work">Work</option>
                          <option value="study">Study</option>
                          <option value="visit">Visit</option>
                          <option value="family">Family</option>
                        </select>
                      </div>
                    </div>
                    <button 
                      onClick={handleKnowSubmit}
                      className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                    >
                      Show Visa Types
                    </button>
                  </motion.div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-slate-500 text-lg">Select an option above to start your journey.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Country Grid */}
      <section id="countries" className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Explore Destinations</h2>
              <p className="text-slate-500 text-lg">We support 16 major countries with specialized visa guidance.</p>
            </div>
            <div className="flex gap-2">
              <div className="px-4 py-2 bg-slate-100 rounded-full text-sm font-bold text-slate-600">All Regions</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {countries.map((country) => (
              <Link 
                key={country.id} 
                to={`/country/${country.id}`}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={country.landmark} 
                    alt={country.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{country.flag}</span>
                    <h3 className="text-xl font-bold">{country.name}</h3>
                  </div>
                  <div className="space-y-1 mb-4">
                    {country.visas.slice(0, 3).map(v => (
                      <p key={v.id} className="text-xs text-white/70 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-blue-400" />
                        {v.name}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Explore <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-900 py-32 px-6 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8 leading-tight">Trusted by 70,000+ <br />Global Applicants</h2>
              <p className="text-slate-400 text-xl mb-12 leading-relaxed">
                For over 15 years, we've been the bridge between dreams and destinations. 
                Our platform provides the clarity and confidence needed to navigate complex immigration systems.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-bold text-blue-500 mb-2">15+</div>
                  <p className="text-slate-500 font-medium">Years of Service</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-500 mb-2">16</div>
                  <p className="text-slate-500 font-medium">Supported Countries</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={testimonialIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] w-full"
                >
                  <div className="flex gap-1 mb-8">
                    {[1,2,3,4,5].map(i => <ShieldCheck key={i} className="w-5 h-5 text-blue-500 fill-blue-500" />)}
                  </div>
                  <p className="text-2xl italic text-slate-200 mb-10 leading-relaxed font-serif">
                    "{testimonials[testimonialIndex].quote}"
                  </p>
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/20">
                        {testimonials[testimonialIndex].initials}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center text-sm shadow-md border border-slate-100">
                        {testimonials[testimonialIndex].flag}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-lg">{testimonials[testimonialIndex].name}</p>
                      <p className="text-sm text-slate-400">{testimonials[testimonialIndex].type} • {testimonials[testimonialIndex].location}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Progress Indicators */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      testimonialIndex === i ? "w-8 bg-blue-500" : "w-2 bg-slate-700 hover:bg-slate-600"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section id="guides" className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-600 text-xs font-bold uppercase tracking-wider mb-4">
              Updated January 2026
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Comprehensive Visa Guides</h2>
            <p className="text-slate-500 text-lg">Step-by-step instructions to ensure your application is perfect.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { title: "US H1-B Guide", country: "United States", price: "$35" },
              { title: "Canada Express Entry", country: "Canada", price: "$35" },
              { title: "Germany Opportunity Card", country: "Germany", price: "$35" },
              { title: "UK Skilled Worker", country: "United Kingdom", price: "$35" },
              { title: "France Talent Passport", country: "France", price: "$35" }
            ].map((guide, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all group flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Download className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{guide.title}</h3>
                  <p className="text-xs text-slate-500 mb-6">{guide.country} • Full Pack</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-slate-900">{guide.price}</span>
                  <button 
                    onClick={() => handleGetGuide(guide)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-blue-600 transition-all"
                  >
                    Get Guide
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

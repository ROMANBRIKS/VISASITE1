
import React, { useState } from "react";
import { motion } from "motion/react";
import SEO from "../components/SEO";
import { 
  Globe, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";
import { countries } from "../data/countries";
import { cn } from "../lib/utils";

import { AdSpace } from '../components/AdSpace';

import { CinematicBanner } from "../components/CinematicBanner";

export default function Countries() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.visas.some(v => v.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pb-20">
      <SEO 
        title="Supported Countries & Visa Options | VisaPlatform" 
        description="Explore the full list of countries supported by VisaPlatform and the various visa categories offered for each, including work, study, and tourism."
        keywords="visa countries, supported countries, visa types, global immigration, work visa, student visa"
      />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-20 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
              <Globe className="w-4 h-4" />
              Global Coverage
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
              Supported Countries & <br />
              <span className="text-blue-600">Visa Options</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              We provide expert guidance and eligibility checks for 16 major destinations. 
              Explore the visa categories available for each country and find your path.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search country or visa type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <CinematicBanner />

      {/* Countries List */}
      <section className="px-6 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-12">
            {filteredCountries.map((country, index) => (
              <React.Fragment key={country.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    {/* Country Info */}
                    <div className="p-10 bg-slate-50 lg:border-r border-slate-100">
                      <div className="flex items-center gap-4 mb-6">
                        <img 
                          src={`https://flagcdn.com/w80/${country.isoCode}.png`}
                          alt=""
                          className="w-12 h-8 object-cover rounded shadow-md"
                          referrerPolicy="no-referrer"
                        />
                        <h2 className="text-3xl font-bold text-slate-900">{country.name}</h2>
                      </div>
                      <p className="text-slate-600 mb-8 leading-relaxed">
                        {country.description}
                      </p>
                      <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                        <img 
                          src={country.landmark} 
                          alt={country.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <Link 
                        to={`/country/${country.id}`}
                        className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
                      >
                        View Country Guide <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>

                    {/* Visa List */}
                    <div className="lg:col-span-2 p-10">
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Available Visas</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {country.visas.map((visa) => (
                          <Link 
                            key={visa.id}
                            to={`/visa/${country.id}/${visa.id}`}
                            className="group p-6 bg-white border border-slate-100 rounded-3xl hover:border-blue-200 hover:shadow-lg transition-all"
                          >
                            <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {visa.name}
                            </h4>
                            <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                              {visa.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {visa.benefits.slice(0, 2).map((benefit, i) => (
                                <span key={i} className="px-2 py-1 bg-blue-50 text-[10px] font-bold text-blue-600 rounded-full flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" />
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
                {(index + 1) % 3 === 0 && index !== filteredCountries.length - 1 && (
                  <div className="my-12">
                    <AdSpace type="banner" />
                  </div>
                )}
              </React.Fragment>
            ))}

            {filteredCountries.length === 0 && (
              <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                <p className="text-slate-500 text-lg">No countries or visas found matching your search.</p>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-blue-600 font-bold"
                >
                  Clear Search
                </button>
              </div>
            )}
            
            <div className="mt-12">
              <AdSpace type="banner" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 mt-20">
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 -translate-x-1/2" />
          <h2 className="text-4xl md:text-5xl font-bold mb-8 relative z-10">Ready to start your journey?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto relative z-10">
            Our expert-led guides and smart eligibility checks are designed to ensure your success.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Link 
              to="/"
              className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl"
            >
              Find My Visa
            </Link>
            <Link 
              to="/auth"
              className="px-10 py-4 bg-blue-700 text-white rounded-2xl font-bold text-lg hover:bg-blue-800 transition-all border border-blue-500"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

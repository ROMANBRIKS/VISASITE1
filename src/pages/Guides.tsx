
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { 
  Download, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  Search,
  BookOpen,
  ShieldCheck,
  Zap,
  HelpCircle
} from "lucide-react";
import { useState } from "react";
import { countries } from "../data/countries";
import { cn } from "../lib/utils";
import { toast } from "sonner";

export default function Guides() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.visas.some(v => v.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDownload = (countryName: string, visaName: string, fileName?: string) => {
    toast.success(`Preparing your ${countryName} ${visaName} guide...`, {
      description: fileName ? `File: ${fileName}` : "Check your downloads folder in a few seconds.",
    });
    // Simulate download
    setTimeout(() => {
      if (fileName) {
        console.log(`Downloading file: ${fileName}`);
        toast.success(`Download started: ${fileName}`);
      } else {
        toast.success("Download started!");
      }
    }, 1500);
  };

  const guideBenefits = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Step-by-Step Walkthrough",
      description: "Detailed instructions from account creation to final submission."
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-500" />,
      title: "Document Checklist",
      description: "A comprehensive list of required documents tailored to your specific visa."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
      title: "Common Mistakes",
      description: "Expert tips on how to avoid the most frequent reasons for visa rejection."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-purple-500" />,
      title: "Interview Prep",
      description: "Sample questions and professional advice for your embassy interview."
    }
  ];

  return (
    <div className="pb-20">
      <SEO 
        title="Visa Application Guides & Downloads | VisaPlatform" 
        description="Download comprehensive, step-by-step visa application guides for 16 major countries. Get document checklists, interview tips, and expert advice."
        keywords="visa guides, download visa guide, visa application help, document checklist, immigration guide"
      />

      {/* Hero Section */}
      <section className="bg-slate-900 pt-20 pb-32 px-6 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Download className="w-4 h-4" />
              Resource Center
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
              Comprehensive <br />
              <span className="text-blue-500">Visa Guides</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              Don't leave your application to chance. Download our expert-crafted guides 
              to navigate the complex world of global immigration with confidence.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search for a country or visa guide..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-slate-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Download Section */}
      <section className="px-6 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guideBenefits.map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides List */}
      <section className="px-6 mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Available Guides</h2>
            <div className="text-sm text-slate-500 font-medium">
              Showing {filteredCountries.length} destinations
            </div>
          </div>

          <div className="space-y-12">
            {filteredCountries.map((country) => (
              <div key={country.id} className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{country.flag}</span>
                  <h3 className="text-2xl font-bold text-slate-900">{country.name}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(country.visas.length > 7 ? country.visas.slice(0, 6) : country.visas).map((visa) => (
                    <motion.div 
                      key={visa.id}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-8 flex flex-col"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-bold text-slate-900">{visa.name}</h4>
                          <span className="px-2 py-1 bg-slate-100 text-[10px] font-bold text-slate-500 rounded-md uppercase">Guide</span>
                        </div>
                        <p className="text-sm text-slate-500 mb-6 line-clamp-2">
                          {visa.description}
                        </p>
                        
                        <div className="space-y-3 mb-8">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visa Offers:</p>
                          {visa.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={() => handleDownload(country.name, visa.name, visa.fileName)}
                        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                      >
                        <Download className="w-5 h-5" />
                        Download Guide
                      </button>
                    </motion.div>
                  ))}

                  {/* See More Button for countries with many guides */}
                  {country.visas.length > 7 && (
                    <motion.div 
                      whileHover={{ y: -5 }}
                      className="bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center group cursor-pointer"
                      onClick={() => navigate(`/country/${country.id}/guides`)}
                    >
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                        <ChevronRight className="w-8 h-8 text-blue-600" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">See All {country.name} Guides</h4>
                      <p className="text-sm text-slate-500 mb-6">
                        Explore all {country.visas.length} visa application guides available for {country.name}.
                      </p>
                      <Link 
                        to={`/country/${country.id}/guides`}
                        className="text-blue-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all"
                      >
                        View More <ChevronRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>
            ))}

            {filteredCountries.length === 0 && (
              <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">No guides found for your search.</p>
                <button 
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-blue-600 font-bold"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="px-6 mt-24">
        <div className="max-w-7xl mx-auto bg-slate-50 rounded-[3rem] p-12 md:p-20 border border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Can't find what you're looking for?</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Our database is constantly expanding. If you need a guide for a country not listed here, 
                our consultant can generate a custom preliminary report for you.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all">
                  Request Custom Guide
                </button>
                <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                  Contact Support
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Verified Information</h4>
                    <p className="text-sm text-slate-500">Updated weekly with official data</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 bg-slate-100 rounded-full w-full" />
                  <div className="h-2 bg-slate-100 rounded-full w-3/4" />
                  <div className="h-2 bg-slate-100 rounded-full w-5/6" />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/5 blur-[100px] rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

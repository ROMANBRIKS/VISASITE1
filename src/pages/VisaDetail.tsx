
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import SEO from "../components/SEO";
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight, 
  Info, 
  ShieldCheck, 
  Globe,
  Download,
  CreditCard,
  ExternalLink,
  AlertCircle,
  Clock,
  Briefcase,
  GraduationCap,
  Users
} from "lucide-react";
import { countries } from "../data/countries";
import { cn } from "../lib/utils";

export default function VisaDetail() {
  const { countryId, visaId } = useParams();
  const navigate = useNavigate();
  const country = countries.find(c => c.id === countryId);
  const visa = country?.visas.find(v => v.id === visaId);

  if (!country || !visa) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Visa Not Found</h1>
        <Link to="/" className="text-blue-600 font-bold flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <SEO 
        title={`${visa.name} for ${country.name} | Guide & Eligibility`} 
        description={`Everything you need to know about the ${visa.name} for ${country.name}. Get expert-led guides and check your eligibility today.`}
        keywords={`${visa.name}, ${country.name} visa, ${country.name} immigration, ${country.name} ${visa.name} requirements`}
      />
      {/* Visa Header */}
      <section className="bg-slate-50 pt-32 pb-20 px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="flex-1">
              <Link to={`/country/${country.id}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors">
                <ArrowLeft className="w-5 h-5" /> Back to {country.name}
              </Link>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{country.flag}</span>
                <span className="text-sm font-bold text-blue-600 uppercase tracking-widest">{country.name} Visa</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight">{visa.name}</h1>
            </div>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/checkout', { state: { type: 'eligibility', countryId, visaId } })}
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2"
              >
                Check Eligibility
                <ShieldCheck className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/checkout', { state: { type: 'guide', countryId, visaId } })}
                className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:border-blue-200 transition-all flex items-center gap-2"
              >
                Download Guide
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Content */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-16">
              {/* Overview */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Info className="w-8 h-8 text-blue-600" />
                  Overview
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                  {visa.description} This visa category is designed for individuals who meet specific criteria set by the {country.name} immigration authorities. 
                  It provides a structured pathway for your stay, whether it's for short-term visits or long-term relocation.
                </p>
              </div>

              {/* Who it's for */}
              <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  Who It's For
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {visa.whoItIsFor}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-slate-700">Valid Passport Holders</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-slate-700">Clean Criminal Record</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-slate-700">Financial Sufficiency</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-slate-700">Health Requirements</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-blue-600" />
                  Key Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {visa.benefits.map((benefit, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-900 mb-1">{benefit}</p>
                        <p className="text-slate-500">Enjoy full rights and protections under this visa category.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-8 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4">
                <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <p className="font-bold text-amber-900 mb-1">Important Notice</p>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    This platform provides guidance and eligibility assessments based on current immigration data. 
                    The final decision rests solely with the {country.name} government. 
                    Always refer to official sources for the most up-to-date requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 sticky top-32">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Application Summary</h3>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-center py-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-600">Processing Time</span>
                    </div>
                    <span className="font-bold">4-8 Weeks</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-600">Gov. Fee</span>
                    </div>
                    <span className="font-bold">Varies</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-600">Validity</span>
                    </div>
                    <span className="font-bold">Up to 5 Years</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => navigate('/checkout', { state: { type: 'eligibility', countryId, visaId } })}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    Start Eligibility Check
                  </button>
                  <button 
                    onClick={() => navigate('/checkout', { state: { type: 'guide', countryId, visaId } })}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
                  >
                    Download Full Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

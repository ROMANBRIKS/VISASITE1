
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import SEO from "../components/SEO";
import { 
  Download, 
  CheckCircle2, 
  ArrowLeft,
  Zap,
  FileText,
  ShieldCheck,
  BookOpen
} from "lucide-react";
import { countries } from "../data/countries";
import { toast } from "sonner";
import { useEffect } from "react";

export default function CountryGuides() {
  const { countryId } = useParams();
  const navigate = useNavigate();
  const country = countries.find(c => c.id === countryId);

  useEffect(() => {
    if (!country) {
      navigate("/guides");
    }
  }, [country, navigate]);

  if (!country) return null;

  const handleDownload = (visaName: string, fileName?: string) => {
    toast.success(`Preparing your ${country.name} ${visaName} guide...`, {
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
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      title: "Step-by-Step Walkthrough",
      description: "Detailed instructions from account creation to final submission."
    },
    {
      icon: <FileText className="w-5 h-5 text-blue-500" />,
      title: "Document Checklist",
      description: "A comprehensive list of required documents tailored to your specific visa."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-green-500" />,
      title: "Common Mistakes",
      description: "Expert tips on how to avoid the most frequent reasons for visa rejection."
    },
    {
      icon: <BookOpen className="w-5 h-5 text-purple-500" />,
      title: "Interview Prep",
      description: "Sample questions and professional advice for your embassy interview."
    }
  ];

  return (
    <div className="pb-20">
      <SEO 
        title={`${country.name} Visa Application Guides | VisaPlatform`} 
        description={`Download all ${country.name} visa application guides. Step-by-step instructions for ${country.visas.map(v => v.name).join(", ")}.`}
        keywords={`${country.name} visa, visa guides, download visa guide, ${country.name} immigration`}
      />

      {/* Hero Section */}
      <section className="bg-slate-900 pt-20 pb-24 px-6 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <Link 
            to="/guides" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Guides
          </Link>
          
          <div className="flex items-center gap-6 mb-8">
            <span className="text-6xl">{country.flag}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {country.name} <br />
                <span className="text-blue-500">Visa Guides</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl">
                Explore our comprehensive collection of {country.visas.length} guides for {country.name}. 
                Everything you need for a successful application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="px-6 -mt-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {guideBenefits.map((benefit, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{benefit.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Guides List */}
      <section className="px-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {country.visas.map((visa) => (
              <motion.div 
                key={visa.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all p-10 flex flex-col"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-bold text-slate-900">{visa.name}</h4>
                    <span className="px-3 py-1 bg-blue-50 text-[10px] font-bold text-blue-600 rounded-full uppercase tracking-wider">Guide</span>
                  </div>
                  <p className="text-slate-500 mb-8 leading-relaxed">
                    {visa.description}
                  </p>
                  
                  <div className="space-y-4 mb-10">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">What's Included:</p>
                    {visa.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => handleDownload(visa.name, visa.fileName)}
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 group"
                >
                  <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Download Guide
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 mt-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Need Professional Assistance?</h2>
          <p className="text-lg text-slate-600 mb-10">
            While our guides are comprehensive, some cases require expert review. 
            Connect with our consultant for a personalized assessment.
          </p>
          <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200">
            Start Consultation
          </button>
        </div>
      </section>
    </div>
  );
}

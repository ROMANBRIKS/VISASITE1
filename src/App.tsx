import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  Search, 
  ShieldCheck, 
  Clock, 
  Users, 
  ChevronRight, 
  MessageSquare, 
  X, 
  Menu, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Download,
  CreditCard,
  User as UserIcon,
  LogOut
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { cn } from "./lib/utils";
import { countries, Country, VisaCategory } from "./data/countries";

// Components
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import VisaDetail from "./pages/VisaDetail";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Chatbot from "./components/Chatbot";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
            <Globe className="w-6 h-6" />
          </div>
          <span className={cn(
            "text-xl font-bold tracking-tight",
            isScrolled ? "text-slate-900" : "text-slate-900"
          )}>VisaPlatform</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/#countries" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Countries</Link>
          <Link to="/#guides" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Guides</Link>
          <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-all">
            <UserIcon className="w-4 h-4" />
            Dashboard
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-900">Home</Link>
            <Link to="/#countries" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-900">Countries</Link>
            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-900">Dashboard</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Globe className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900">VisaPlatform</span>
          </Link>
          <p className="text-slate-500 max-w-sm leading-relaxed">
            Helping 70,000+ applicants find their way to new opportunities. 
            Providing expert guidance and eligibility checks for 16 major countries.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="text-slate-500 hover:text-blue-600 transition-colors">Home</Link></li>
            <li><Link to="/#countries" className="text-slate-500 hover:text-blue-600 transition-colors">Countries</Link></li>
            <li><Link to="/dashboard" className="text-slate-500 hover:text-blue-600 transition-colors">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
          <ul className="space-y-4">
            <li><span className="text-slate-500">Privacy Policy</span></li>
            <li><span className="text-slate-500">Terms of Service</span></li>
            <li><span className="text-slate-500">Disclaimer</span></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-sm">© 2026 VisaPlatform. All rights reserved.</p>
        <p className="text-slate-400 text-sm italic">Not a government official website. We provide guidance and redirection to official sites.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:countryId" element={<CountryDetail />} />
            <Route path="/visa/:countryId/:visaId" element={<VisaDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
        <Toaster position="top-center" richColors />
      </div>
    </Router>
  );
}

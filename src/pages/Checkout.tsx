
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ShieldCheck, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  ExternalLink,
  ChevronRight,
  Globe,
  Lock,
  Loader2
} from "lucide-react";
import { auth, db, handleFirestoreError, OperationType } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp, updateDoc, addDoc, collection } from "firebase/firestore";
import { countries } from "../data/countries";
import { toast } from "sonner";
import { cn } from "../lib/utils";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'payment' | 'form' | 'result'>('payment');
  
  const { type, countryId, visaId } = location.state || {};
  const country = countries.find(c => c.id === countryId);
  const visa = country?.visas.find(v => v.id === visaId);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    passportNumber: "",
    nationality: "",
    currentResidence: "",
    educationLevel: "",
    workExperience: "",
    criminalRecord: "no",
    financialProof: "yes"
  });
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [isQualified, setIsQualified] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (!u) {
        navigate("/auth", { state: { from: location } });
      } else {
        setUser(u);
      }
    });
    return () => unsubscribe();
  }, [navigate, location]);

  if (!country || !visa) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Invalid Selection</h1>
        <Link to="/" className="text-blue-600 font-bold flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
      </div>
    );
  }

  const prices = {
    eligibility: 85,
    guide: 35
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // Simulate payment processing with a mock Paystack/Flutterwave experience
      toast.info("Connecting to secure payment gateway...");
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const appId = `VISA-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      setApplicationId(appId);

      // Create payment record
      const paymentRef = await addDoc(collection(db, "payments"), {
        userId: user?.uid,
        amount: prices[type as keyof typeof prices] || 0,
        currency: "USD",
        status: "completed",
        type,
        createdAt: serverTimestamp()
      });

      // Create application record
      const applicationRef = await addDoc(collection(db, "applications"), {
        userId: user?.uid,
        applicationId: appId,
        countryId,
        visaId,
        status: type === 'eligibility' ? "pending_assessment" : "completed",
        type,
        paymentId: paymentRef.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        formData: {}
      });

      toast.success("Payment Successful!");
      
      // Trigger payment confirmation email
      try {
        await fetch("/api/email/trigger", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "payment_confirmation",
            email: user?.email,
            data: { 
              type, 
              id: paymentRef.id,
              country: country.name,
              visa: visa.name
            }
          })
        });
      } catch (e) {
        console.error("Failed to trigger payment email", e);
      }

      if (type === 'eligibility') {
        setStep('form');
      } else {
        setStep('result');
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate eligibility algorithm
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const qualified = formData.criminalRecord === "no" && formData.financialProof === "yes";
      setIsQualified(qualified);
      
      // Update application
      // In a real app, you'd find the latest application or pass the ID
      setStep('result');
    } catch (error) {
      console.error("Form error:", error);
      toast.error("Failed to process eligibility. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 px-4">
          <div className="flex flex-col items-center gap-2">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
              step === 'payment' ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-green-500 text-white"
            )}>
              {step === 'payment' ? "1" : <CheckCircle2 className="w-6 h-6" />}
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Payment</span>
          </div>
          <div className="flex-1 h-px bg-slate-200 mx-4" />
          <div className="flex flex-col items-center gap-2">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
              step === 'form' ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : 
              step === 'result' ? "bg-green-500 text-white" : "bg-slate-200 text-slate-400"
            )}>
              {step === 'form' ? "2" : step === 'result' ? <CheckCircle2 className="w-6 h-6" /> : "2"}
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Details</span>
          </div>
          <div className="flex-1 h-px bg-slate-200 mx-4" />
          <div className="flex flex-col items-center gap-2">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
              step === 'result' ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-slate-200 text-slate-400"
            )}>
              3
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Result</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 'payment' && (
            <motion.div 
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12"
            >
              <div className="space-y-8">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center py-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-blue-600" />
                        <span className="text-slate-600">{country.name}</span>
                      </div>
                      <span className="font-bold">{visa.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                        <span className="text-slate-600">Service Type</span>
                      </div>
                      <span className="font-bold uppercase text-xs tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {type}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-2xl font-bold text-slate-900">
                    <span>Total</span>
                    <span>${prices[type as keyof typeof prices]}</span>
                  </div>
                </div>

                <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100 flex gap-4">
                  <Lock className="w-6 h-6 text-blue-600 shrink-0" />
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Secure checkout powered by Paystack. Your payment information is encrypted and never stored on our servers.
                  </p>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Payment Method</h2>
                <div className="space-y-4 mb-10">
                  <button className="w-full p-6 border-2 border-blue-600 bg-blue-50 rounded-2xl flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                      <div className="text-left">
                        <p className="font-bold text-slate-900">Card / Mobile Money</p>
                        <p className="text-xs text-slate-500">Paystack / Flutterwave</p>
                      </div>
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-blue-600" />
                  </button>
                  <button className="w-full p-6 border-2 border-slate-100 rounded-2xl flex items-center justify-between group hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-4">
                      <Globe className="w-6 h-6 text-slate-400" />
                      <div className="text-left">
                        <p className="font-bold text-slate-900">Cryptocurrency</p>
                        <p className="text-xs text-slate-500">BTC, ETH, USDT</p>
                      </div>
                    </div>
                  </button>
                </div>

                <button 
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Complete Payment"}
                </button>
              </div>
            </motion.div>
          )}

          {step === 'form' && (
            <motion.div 
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Eligibility Assessment</h2>
              <form onSubmit={handleFormSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name (as in Passport)</label>
                    <input 
                      required
                      type="text"
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Passport Number</label>
                    <input 
                      required
                      type="text"
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="A12345678"
                      value={formData.passportNumber}
                      onChange={e => setFormData({...formData, passportNumber: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nationality</label>
                    <input 
                      required
                      type="text"
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Your Country"
                      value={formData.nationality}
                      onChange={e => setFormData({...formData, nationality: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Education Level</label>
                    <select 
                      required
                      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={formData.educationLevel}
                      onChange={e => setFormData({...formData, educationLevel: e.target.value})}
                    >
                      <option value="">Select Level</option>
                      <option value="high-school">High School</option>
                      <option value="bachelors">Bachelor's Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="font-bold text-slate-900 mb-4">Do you have any criminal record in any country?</p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="criminal" value="no" checked={formData.criminalRecord === "no"} onChange={() => setFormData({...formData, criminalRecord: "no"})} className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">No</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="criminal" value="yes" checked={formData.criminalRecord === "yes"} onChange={() => setFormData({...formData, criminalRecord: "yes"})} className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Yes</span>
                      </label>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="font-bold text-slate-900 mb-4">Can you provide proof of sufficient funds for your stay?</p>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="funds" value="yes" checked={formData.financialProof === "yes"} onChange={() => setFormData({...formData, financialProof: "yes"})} className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="funds" value="no" checked={formData.financialProof === "no"} onChange={() => setFormData({...formData, financialProof: "no"})} className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Submit Assessment"}
                </button>
              </form>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 text-center"
            >
              {type === 'eligibility' ? (
                isQualified ? (
                  <>
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-2">You are Qualified!</h2>
                    <p className="text-slate-500 font-bold mb-8 uppercase tracking-widest text-xs">Application ID: {applicationId}</p>
                    <p className="text-xl text-slate-500 mb-12 max-w-lg mx-auto leading-relaxed">
                      Based on your assessment, you meet the primary requirements for the {visa.name} in {country.name}.
                    </p>
                    
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-12 text-left">
                      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                        Next Steps
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex gap-3 text-slate-600">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold border border-slate-200 shrink-0">1</div>
                          Gather all required documents listed in your dashboard.
                        </li>
                        <li className="flex gap-3 text-slate-600">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold border border-slate-200 shrink-0">2</div>
                          Complete the official government application form.
                        </li>
                        <li className="flex gap-3 text-slate-600">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold border border-slate-200 shrink-0">3</div>
                          Pay the official government processing fee.
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a 
                        href={visa.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2"
                      >
                        Apply on Official Website
                        <ExternalLink className="w-5 h-5" />
                      </a>
                      <Link 
                        to="/dashboard"
                        className="px-10 py-5 bg-slate-100 text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all flex items-center justify-center"
                      >
                        Go to Dashboard
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto mb-8">
                      <AlertCircle className="w-12 h-12" />
                    </div>
                    <h2 className="text-4xl font-bold text-slate-900 mb-2">Not Qualified Yet</h2>
                    <p className="text-slate-500 font-bold mb-8 uppercase tracking-widest text-xs">Application ID: {applicationId}</p>
                    <p className="text-xl text-slate-500 mb-12 max-w-lg mx-auto leading-relaxed">
                      Based on your assessment, there are some areas that need attention before you can apply successfully.
                    </p>
                    
                    <div className="bg-red-50 p-8 rounded-3xl border border-red-100 mb-12 text-left">
                      <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Identified Weak Areas
                      </h3>
                      <ul className="space-y-4">
                        {formData.criminalRecord === "yes" && (
                          <li className="flex gap-3 text-red-700">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold border border-red-200 shrink-0">!</div>
                            Criminal record history may lead to automatic rejection.
                          </li>
                        )}
                        {formData.financialProof === "no" && (
                          <li className="flex gap-3 text-red-700">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold border border-red-200 shrink-0">!</div>
                            Insufficient proof of funds is a major reason for visa denial.
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        onClick={() => setStep('payment')}
                        className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2"
                      >
                        Retry Later
                      </button>
                      <button 
                        onClick={() => {
                          // Switch to guide type
                          navigate('/checkout', { state: { type: 'guide', countryId, visaId }, replace: true });
                          window.location.reload();
                        }}
                        className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center"
                      >
                        Download Guide Instead
                      </button>
                    </div>
                  </>
                )
              ) : (
                <>
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-8">
                    <Download className="w-12 h-12" />
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900 mb-2">Guide Ready for Download</h2>
                  <p className="text-slate-500 font-bold mb-8 uppercase tracking-widest text-xs">Order ID: {applicationId}</p>
                  <p className="text-xl text-slate-500 mb-12 max-w-lg mx-auto leading-relaxed">
                    Your comprehensive application pack for {country.name} {visa.name} is now available.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2">
                      Download Full Guide (PDF)
                      <Download className="w-5 h-5" />
                    </button>
                    <Link 
                      to="/dashboard"
                      className="px-10 py-5 bg-slate-100 text-slate-900 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all flex items-center justify-center"
                    >
                      Go to Dashboard
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

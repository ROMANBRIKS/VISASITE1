
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  ExternalLink,
  ChevronRight,
  User as UserIcon,
  LogOut,
  CreditCard,
  FileText,
  Loader2,
  MessageSquare
} from "lucide-react";
import { auth, db, handleFirestoreError, OperationType } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc, collection, query, where, onSnapshot, updateDoc, serverTimestamp } from "firebase/firestore";
import { countries } from "../data/countries";
import { toast } from "sonner";
import { cn } from "../lib/utils";
import { sendEmailVerification } from "firebase/auth";

import { AdSpace } from '../components/AdSpace';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/auth");
        return;
      }

      // Fetch User Profile
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setUserProfile(data);
        
        // Check for inactivity (3 days = 259200000 ms)
        if (data.lastActive) {
          const lastActiveDate = data.lastActive.toDate();
          const now = new Date();
          const diff = now.getTime() - lastActiveDate.getTime();
          
          if (diff > 259200000) {
            // Trigger inactivity reminder
            try {
              await fetch("/api/email/trigger", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  type: "inactivity_reminder",
                  email: user.email,
                  data: { 
                    name: user.displayName,
                    country: "your saved destination"
                  }
                })
              });
            } catch (e) {
              console.error("Failed to trigger inactivity email", e);
            }
          }
        }

        // Update lastActive and verification status
        const updates: any = { lastActive: serverTimestamp() };
        if (data.emailVerified !== user.emailVerified) {
          updates.emailVerified = user.emailVerified;
        }
        await updateDoc(userRef, updates);
      }

      // Listen for Applications
      const q = query(collection(db, "applications"), where("userId", "==", user.uid));
      const unsubscribeApps = onSnapshot(q, (snapshot) => {
        const apps = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApplications(apps.sort((a: any, b: any) => b.createdAt?.toMillis() - a.createdAt?.toMillis()));
        setIsLoading(false);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "applications");
      });

      return () => unsubscribeApps();
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      toast.error("Failed to sign out.");
    }
  };

  const handleResendVerification = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        toast.success("Verification email sent!");
      } catch (error: any) {
        toast.error("Failed to send verification email. Please try again later.");
      }
    }
  };

  const handleRefreshVerification = async () => {
    if (auth.currentUser) {
      setIsRefreshing(true);
      try {
        await auth.currentUser.reload();
        const user = auth.currentUser;
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { emailVerified: user.emailVerified });
        setUserProfile(prev => ({ ...prev, emailVerified: user.emailVerified }));
        if (user.emailVerified) {
          toast.success("Email verified!");
        } else {
          toast.info("Email not yet verified. Please check your inbox.");
        }
      } catch (error) {
        toast.error("Failed to refresh status.");
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Verification Warning */}
        {userProfile && !userProfile.emailVerified && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-amber-900">Email Verification Required</p>
                <p className="text-sm text-amber-700">Please verify your email to access all features and receive updates.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                onClick={handleResendVerification}
                className="flex-1 md:flex-none px-6 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all text-sm"
              >
                Resend Email
              </button>
              <button 
                onClick={handleRefreshVerification}
                disabled={isRefreshing}
                className="flex-1 md:flex-none px-6 py-3 bg-white text-amber-600 border border-amber-200 rounded-xl font-bold hover:bg-amber-50 transition-all text-sm flex items-center justify-center gap-2"
              >
                {isRefreshing ? <Loader2 className="w-4 h-4 animate-spin" /> : "I've Verified"}
              </button>
            </div>
          </motion.div>
        )}

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome, {userProfile?.displayName?.split(' ')[0]}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100">
                <ShieldCheck className="w-4 h-4" />
                ID: {userProfile?.applicationId}
              </div>
              <span className="text-slate-400 text-sm">{userProfile?.email}</span>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 px-6 py-3 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <FileText className="w-7 h-7 text-blue-600" />
                Your Applications
              </h2>

              {applications.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <Globe className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-medium mb-6">You haven't started any applications yet.</p>
                  <Link to="/" className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                    Find a Visa
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {applications.map((app) => {
                    const country = countries.find(c => c.id === app.countryId);
                    const visa = country?.visas.find(v => v.id === app.visaId);
                    
                    return (
                      <div key={app.id} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-sm">
                              <img 
                                src={`https://flagcdn.com/w80/${country?.isoCode}.png`}
                                alt=""
                                className="w-10 h-7 object-cover rounded-sm"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-slate-900">{visa?.name}</h3>
                              <p className="text-sm text-slate-500">{country?.name} • {app.type === 'eligibility' ? 'Eligibility Check' : 'Full Guide'}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-4">
                            <div className={cn(
                              "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border",
                              app.status === 'paid' ? "bg-blue-50 text-blue-600 border-blue-100" :
                              app.status === 'qualified' ? "bg-green-50 text-green-600 border-green-100" :
                              app.status === 'not-qualified' ? "bg-red-50 text-red-600 border-red-100" :
                              app.status === 'completed' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                              "bg-slate-100 text-slate-500 border-slate-200"
                            )}>
                              {app.status?.replace('_', ' ')}
                            </div>
                            {app.type === 'guide' && app.status === 'completed' && (
                              <button 
                                onClick={() => {
                                  toast.success("Downloading guide...");
                                  // Mock download
                                  const link = document.createElement('a');
                                  link.href = '#';
                                  link.download = `${visa?.name.replace(/\s+/g, '_')}_Guide.pdf`;
                                  link.click();
                                }}
                                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-100"
                              >
                                <Download className="w-4 h-4" />
                                Download Guide
                              </button>
                            )}
                            {app.status === 'qualified' && (
                              <a 
                                href={visa?.officialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all text-sm"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Apply Now
                              </a>
                            )}
                            {app.type === 'guide' && app.status === 'paid' && (
                              <button 
                                className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-100"
                                title="Download Guide"
                              >
                                <Download className="w-5 h-5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <AdSpace type="sidebar" />
            
            <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-2xl font-bold mb-8">Account Summary</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <span className="text-slate-400">Total Apps</span>
                  </div>
                  <span className="font-bold">{applications.length}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-slate-400">Qualified</span>
                  </div>
                  <span className="font-bold">{applications.filter(a => a.status === 'qualified').length}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-blue-400" />
                    <span className="text-slate-400">Guides</span>
                  </div>
                  <span className="font-bold">{applications.filter(a => a.type === 'guide').length}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-10 rounded-[2.5rem] border border-blue-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Need Support?</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Our consultant is available 24/7 to help you with your application questions.
              </p>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Chat with Consultant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

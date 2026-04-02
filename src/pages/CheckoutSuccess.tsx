
import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle2, Download, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { collection, query, where, getDocs, limit, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const applicationIdParam = searchParams.get("application_id");
  const [user] = useAuthState(auth);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [application, setApplication] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!applicationIdParam || !user) {
      if (!applicationIdParam && !user) return; // Wait for auth
      if (!applicationIdParam) setStatus('error');
      return;
    }

    const verifyApplication = async () => {
      try {
        const docRef = doc(db, "applications", applicationIdParam);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const appData = docSnap.data();
          if (appData.userId === user.uid) {
            setApplication({ id: docSnap.id, ...appData });
            setStatus('success');
          } else {
            setStatus('error');
          }
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus('error');
      }
    };

    verifyApplication();
  }, [applicationIdParam, user]);

  const handleDownload = () => {
    if (!application?.id) return;
    window.open(`/api/guides/download/${application.id}`, '_blank');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-6" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Verifying Order...</h1>
        <p className="text-slate-500">Please wait while we confirm your request.</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-8">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Something went wrong</h1>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          We couldn't verify your order automatically. Please check your dashboard in a few minutes or contact support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/dashboard"
            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-8"
      >
        <CheckCircle2 className="w-12 h-12" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Order Successful!</h1>
        <p className="text-slate-600 mb-12 max-w-md mx-auto text-lg">
          Thank you for your request. Your resources are now ready for download.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {application?.type === 'guide' ? (
            <button 
              onClick={handleDownload}
              className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2"
            >
              Download Full Guide (PDF)
              <Download className="w-5 h-5" />
            </button>
          ) : (
            <Link 
              to="/dashboard"
              className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
          
          <Link 
            to="/"
            className="px-10 py-5 bg-slate-100 text-slate-600 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all flex items-center justify-center"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

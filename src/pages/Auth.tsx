
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Globe, 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { auth, googleProvider, db, generateApplicationId, handleFirestoreError, OperationType } from "../firebase";
import { signInWithPopup, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { cn } from "../lib/utils";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const fromPath = location.state?.from?.pathname || "/dashboard";
  const fromState = location.state?.from?.state || {};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Update verification status in Firestore if it changed
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().emailVerified !== user.emailVerified) {
          await updateDoc(userRef, { emailVerified: user.emailVerified });
        }
        navigate(fromPath, { state: fromState, replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate, fromPath, fromState]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create new user profile
        const newUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          applicationId: generateApplicationId(),
          role: "user",
          emailVerified: user.emailVerified,
          lastActive: serverTimestamp(),
          createdAt: serverTimestamp()
        };
        await setDoc(userRef, newUser);
        
        // Send verification email if not verified
        if (!user.emailVerified) {
          await sendEmailVerification(user);
          // Trigger custom transactional email
          try {
            await fetch("/api/email/trigger", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "signup_verification",
                email: user.email,
                data: { name: user.displayName }
              })
            });
          } catch (e) {
            console.error("Failed to trigger signup email", e);
          }
          toast.info("A verification email has been sent to your inbox.");
        }
        
        toast.success("Account created successfully!");
      } else {
        // Update verification status and lastActive for existing user
        const updates: any = { lastActive: serverTimestamp() };
        if (userSnap.data().emailVerified !== user.emailVerified) {
          updates.emailVerified = user.emailVerified;
        }
        await updateDoc(userRef, updates);
        toast.success("Welcome back!");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        toast.info("Sign-in popup was closed. Please try again if you'd like to continue.");
      } else {
        toast.error("Failed to sign in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-100">
            <Globe className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Join VisaPlatform</h1>
          <p className="text-slate-500">Secure your journey with expert guidance.</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100">
          <button 
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-4 px-6 border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-3 font-bold text-slate-700 hover:border-blue-200 hover:bg-slate-50 transition-all mb-8"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/layout/google.svg" alt="Google" className="w-6 h-6" />
            {isLoading ? "Signing in..." : "Continue with Google"}
          </button>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold text-slate-400">
              <span className="bg-white px-4">Secure Access</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="text-xs text-slate-500 leading-relaxed">
                Your data is encrypted and protected. We never share your personal information without consent.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
              <p className="text-xs text-slate-500 leading-relaxed">
                Instant Application ID generation upon signup for tracking.
              </p>
            </div>
          </div>
        </div>

        <p className="text-center mt-10 text-slate-400 text-sm">
          By continuing, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}


import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User as UserIcon, 
  ShieldCheck, 
  Globe,
  Loader2,
  ChevronDown,
  ArrowRight,
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from "lucide-react";
import { GoogleGenAI, Modality } from "@google/genai";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Toaster, toast } from "sonner";
import { cn } from "../lib/utils";
import { countries } from "../data/countries";

interface Message {
  role: "user" | "model";
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hello! 👋 I'm a Senior Officer here at VisaPlatform. Before we get into the details, I just wanted to check in—how are you doing today? How are you feeling about starting your visa application?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userApps, setUserApps] = useState<any[]>([]);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const handleOpen = (e: any) => {
      setIsOpen(true);
      if (e.detail?.message) {
        setInput(e.detail.message);
      }
    };
    window.addEventListener('open-chatbot', handleOpen);
    return () => window.removeEventListener('open-chatbot', handleOpen);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchUserApps = async () => {
      if (auth.currentUser) {
        const q = query(collection(db, "applications"), where("userId", "==", auth.currentUser.uid));
        const snap = await getDocs(q);
        setUserApps(snap.docs.map(doc => doc.data()));
      }
    };
    if (isOpen) fetchUserApps();
  }, [isOpen]);

  const toggleVoiceMode = async () => {
    if (isVoiceMode) {
      sessionRef.current?.close();
      setIsVoiceMode(false);
      setIsListening(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: "You are a Senior Officer at VisaPlatform. Be professional, warm, and extremely concise. The initial greeting already asks how the user is doing. Do not repeat the 'how are you doing' question. Focus on their visa needs unless they explicitly mention their feelings. Ask only ONE question at a time.",
        },
        callbacks: {
          onopen: () => {
            setIsVoiceMode(true);
            setIsListening(true);
            toast.success("Voice Mode Activated");
          },
          onmessage: (message: any) => {
            if (message.serverContent?.modelTurn?.parts[0]?.text) {
              setMessages(prev => [...prev, { role: "model", text: message.serverContent.modelTurn.parts[0].text }]);
            }
            // Audio playback logic would go here in a full implementation
          },
          onclose: () => {
            setIsVoiceMode(false);
            setIsListening(false);
          },
          onerror: (err: any) => {
            console.error("Live session error:", err);
            toast.error("Voice mode error. Please try again.");
            setIsVoiceMode(false);
          }
        }
      });
      sessionRef.current = session;
    } catch (err) {
      console.error("Failed to start voice mode:", err);
      toast.error("Could not start voice mode.");
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: "user", parts: [{ text: `
            SYSTEM INSTRUCTION:
            You are a Senior Officer at VisaPlatform. Your persona is "Humanly Professional"—warm, expert, and highly efficient.
            
            CONVERSATIONAL RULES (CRITICAL):
            0. HUMAN-FIRST: The initial greeting already asks how the user is doing. Do not repeat this question. Acknowledge their response to the greeting if they provided one, then move directly to assisting with their visa request.
            1. EXTREME CONCISE: One short sentence for acknowledgment, one short sentence for the question. No fluff.
            2. NO REDUNDANCY: If you say "Great choice," don't follow it with "I'd be happy to help you get there." Just move to the question.
            3. ACKNOWLEDGE & ASK: Acknowledge the feeling/choice briefly, then ask the next question immediately.
            4. NO ROBOTIC EXAMPLES: Never use parentheses. Weave examples naturally: "Holiday or work?"
            5. ASSISTANCE TONE: Ask "What brings you to [Country]?" or "What's the plan for the trip?"
            6. ONE QUESTION AT A TIME: Never ask two things at once.
            
            TONE & STYLE:
            - Professional yet approachable.
            - Use occasional emojis (👋, ✈️) but don't overdo it.
            - Plain English only.
            
            CORE RULES:
            1. You are a Senior Officer with this visa assistance company.
            2. NEVER claim to be a government official.
            3. The user is at the start of their visa journey. Your job is to help them get it.
            
            CONTEXT:
            - Countries: ${countries.map(c => c.name).join(", ")}
            - User: ${userApps.length > 0 ? "Premium Member" : "New Traveler"}
            
            USER MESSAGE: ${userMessage}
          ` }] }
        ]
      });

      const response = await model;
      setMessages(prev => [...prev, { role: "model", text: response.text || "I'm sorry, I couldn't process that. How else can I help?" }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "model", text: "I'm having some technical difficulties. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-200 flex items-center justify-center hover:scale-110 transition-all z-40",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <MessageSquare className="w-8 h-8" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 w-[400px] h-[600px] bg-white rounded-[2.5rem] shadow-2xl shadow-slate-300 border border-slate-100 flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256" 
                    alt="Visa Guide"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="font-bold">Senior Visa Officer</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Online • Ready to help
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleVoiceMode}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    isVoiceMode ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-white/10 text-white hover:bg-white/20"
                  )}
                  title={isVoiceMode ? "Deactivate Voice Mode" : "Activate Voice Mode (VIP)"}
                >
                  {isVoiceMode ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {messages.map((msg, i) => (
                <div key={i} className={cn(
                  "flex gap-3 max-w-[85%]",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-lg overflow-hidden shrink-0",
                    msg.role === "user" ? "bg-slate-200 text-slate-600 flex items-center justify-center" : "border border-blue-200"
                  )}>
                    {msg.role === "user" ? (
                      <UserIcon className="w-4 h-4" />
                    ) : (
                      <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256" 
                        alt="Guide"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user" ? "bg-white text-slate-900 shadow-sm rounded-tr-none" : "bg-blue-600 text-white shadow-lg shadow-blue-100 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-blue-200">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256" 
                      alt="Guide"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-4 bg-blue-600 text-white rounded-2xl rounded-tl-none shadow-lg shadow-blue-100">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-slate-100">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about visas, eligibility..."
                  className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                />
                <button 
                  onClick={handleSend}
                  className="absolute right-2 top-2 bottom-2 w-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="w-6" /> {/* Spacer to center the text */}
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  Expert Visa Guidance Platform
                </p>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
                  title="Minimize Chat"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

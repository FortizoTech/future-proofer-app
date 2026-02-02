"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import Head from 'next/head';
import { WelcomeModal } from '@/components/WelcomeModal';
import MapBackground from '@/components/ui/MapBackground';
import '@/assets/css/dashboard.css';
import { MentorshipRequestModal, type MentorshipProfile } from '@/components/mentorship/MentorshipRequestModal';
import { Mic, Paperclip, Send, Settings, User, LogOut, FileText, CheckCircle, Play, HelpCircle, Bot, TrendingUp, Sparkles, MessageCircle, X, Loader2, StopCircle, Trash2, Rocket, ChevronRight, Sun, Moon, MapPin } from 'lucide-react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import '@/assets/css/chat-features.css';

// ============================================
// TYPES
// ============================================
interface ChatMessage {
  role: 'user' | 'ai';
  content: string | any;
  attachments?: { name: string; url: string; type: string }[];
}

// ============================================
// COMPONENT: PROFILE PANEL (LEFT)
// ============================================
const ProfilePanel = ({ user, profile, onLogout, isDarkMode, toggleTheme }: { user: any, profile: any, onLogout: () => void | Promise<void>, isDarkMode: boolean, toggleTheme: () => void }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="glass-panel profile-panel flex flex-col h-full relative !pt-0">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth pt-5">
        {/* Header / Logo - Positioned at the very top */}
        <div className="profile-header mb-4">
          <Image
            src={isDarkMode ? "/logo/logo_white_transparent background.png" : "/logo/logo-transparent.png"}
            alt="Future Proofer"
            width={130}
            height={35}
            className="profile-logo-img h-auto w-auto max-w-[130px]"
            priority
          />
        </div>

        {/* User Card - Tighter gap to logo, but more space below */}
        <div className="profile-card">
          <div className="profile-avatar-large">
            <Image
              src={profile?.avatar_url || user?.user_metadata?.avatar_url || "https://randomuser.me/api/portraits/men/32.jpg"}
              alt={profile?.full_name || user?.user_metadata?.full_name || "User"}
              width={80}
              height={80}
              className="profile-avatar-img"
            />
          </div>
          <h2 className="profile-name mb-4">
            {profile?.full_name || user?.user_metadata?.full_name || "Guest User"}
          </h2>

          <div className="profile-details-stack flex flex-col gap-6">
            <div className="profile-role">
              <div className="text-[10px] mb-2 uppercase tracking-[0.15em] font-bold text-blue-500/80">
                {profile?.mode === 'BUSINESS' ? 'Business Focus' : 'Expertise'}
              </div>
              <div className="skills-container">
                {profile?.mode === 'BUSINESS' ? (
                  <span className="profile-skill-tag">{profile?.business_sector || 'Business Lead'}</span>
                ) : (
                  <>
                    {(profile?.skills || ['Software Development']).slice(0, 3).map((skill: string, i: number) => (
                      <span key={i} className="profile-skill-tag">{skill}</span>
                    ))}
                    {profile?.skills?.length > 3 && (
                      <span className="profile-skill-tag bg-slate-100 dark:bg-white/5 text-slate-500">
                        +{profile.skills.length - 3}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="profile-goal-box py-4 border-y border-slate-200 dark:border-white/10">
              <p className="text-sm line-clamp-2 font-medium leading-relaxed dark:text-slate-300">
                {profile?.mode === 'BUSINESS'
                  ? (profile?.business_stage?.split(':')[0]?.replace(/_/g, ' ') || 'Business Growth')
                  : (profile?.career_goal?.split(':')[0]?.replace(/_/g, ' ') || 'Career Development')}
              </p>
            </div>

            <div className="profile-location">
              <div className="text-[10px] mb-2 uppercase tracking-[0.15em] font-bold text-slate-400">Location</div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <MapPin size={14} className="text-blue-500" />
                <span>{profile?.country || 'Accra, Ghana'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="profile-actions-bottom pb-2 pt-4 border-t border-slate-200 dark:border-white/10 bg-inherit">
        <div className="relative">
          {showSettings && (
            <div className="settings-dropdown">
              <button className="profile-btn" onClick={() => setShowSettings(false)}>
                <User size={16} />
                <span>My Profile</span>
              </button>
              <button className="profile-btn" onClick={toggleTheme}>
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <button className="profile-btn text-red-500 hover:bg-red-50" onClick={onLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
          <button
            className={`profile-btn w-full ${showSettings ? 'active' : ''}`}
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// COMPONENT: WIDGETS PANEL (RIGHT)
// ============================================
const WidgetsPanel = ({ profile }: { profile: any }) => {
  const currentSkill = profile?.skills?.[0] || "Full Stack Development";
  const currentCountry = profile?.country || "West Africa";

  return (
    <div className="glass-panel widgets-panel flex flex-col h-full">
      <div className="flex-1 overflow-y-auto no-scrollbar pr-1">
        {/* Date Display */}
        <div className="widget-date">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>

        {/* Readiness Score */}
        <div className="score-widget">
          <div className="score-title">Overall Readiness Score</div>
          <div className="score-circle">
            <svg className="score-svg" viewBox="0 0 100 100">
              <circle className="score-track" cx="50" cy="50" r="45" />
              <circle
                className="score-value-path"
                cx="50"
                cy="50"
                r="45"
                strokeDasharray="283"
                strokeDashoffset="93" // 67%
              />
            </svg>
            <div className="score-content">
              <div className="score-number">67%</div>
              <div className="score-label">Complete</div>
            </div>
          </div>
        </div>

        {/* Next Actions */}
        <div className="actions-widget">
          <div className="widget-header">
            <h3 className="widget-title">Next Actions</h3>
          </div>
          <div className="action-list">
            <div className="action-item">
              <CheckCircle size={16} className="action-check" />
              <span>Complete your profile</span>
            </div>
            <div className="action-item">
              <CheckCircle size={16} className="action-check" />
              <span>Connect your calendar</span>
            </div>
            <div className="action-item">
              <div className="w-4 h-4 rounded-full border-2 border-blue-400 mt-0.5 flex-shrink-0" />
              <span>Join Me {currentCountry} Tech Forum</span>
            </div>
          </div>
        </div>

        {/* Skill Demand Metric Widget */}
        <div className="actions-widget" style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.05)', borderColor: 'rgba(34, 197, 94, 0.1)' }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-green-400" />
            <h3 className="widget-title" style={{ fontSize: '0.85rem' }}>Skill Demand in {currentCountry}</h3>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs text-gray-400">
              <div className="flex flex-col">
                <span className="font-bold text-white mb-1">{currentSkill}</span>
                <span className="text-[10px] text-gray-400 max-w-[180px] leading-tight mb-2">
                  {currentSkill.toLowerCase().includes('software') ? 'Design, development, and maintenance of modular software systems.' :
                    currentSkill.toLowerCase().includes('data') ? 'Extracting actionable insights from complex datasets to drive business decisions.' :
                      currentSkill.toLowerCase().includes('cloud') ? 'Deploying and managing scalable infrastructure on distributed networks.' :
                        currentSkill.toLowerCase().includes('cyber') ? 'Protecting critical digital assets and networks from unauthorized access.' :
                          'Developing specialized expertise to maintain competitive edge in the local tech market.'}
                </span>
              </div>
              <span className="text-green-400 font-bold self-start mt-1">82%</span>
            </div>
            <div className="w-full h-1 bg-gray-700 rounded-full mt-1">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '82%' }}></div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">
              AI analysis shows a 15% increase in demand for your skillset in {profile?.country ? profile.country : 'Lagos and Accra'} this month.
            </p>
          </div>
        </div>

        {/* Media / Get Wants (Small Placeholder) */}
        <div className="media-widget" style={{ opacity: 0.6, transform: 'scale(0.9)', transformOrigin: 'right' }}>
          <div className="media-cover">
            <div className="w-full h-full bg-slate-700 flex items-center justify-center">
              <Sparkles size={16} className="text-slate-500" />
            </div>
          </div>
          <div className="media-info">
            <div className="media-title">Resources</div>
            <div className="media-subtitle">Architecture Series</div>
          </div>
        </div>
      </div>

      {/* WhatsApp Support Button at the bottom of Right Bar */}
      <div className="mt-auto pt-6">
        <button className="support-btn-sticky" onClick={() => window.open('https://wa.me/2202350530', '_blank')}>
          <MessageCircle size={15} fill="currentColor" />
          Support
        </button>
      </div>
    </div>
  );
};

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Light Mode by default per request
  const [aiGreetingInsight, setAiGreetingInsight] = useState<string>("");

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('dashboard-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newVal = !prev;
      localStorage.setItem('dashboard-theme', newVal ? 'dark' : 'light');
      return newVal;
    });
  };

  // Initialize Hooks
  const {
    attachments,
    fileInputRef,
    handleFileSelect,
    removeAttachment,
    clearAttachments,
    uploadFiles,
    isUploading
  } = useFileUpload();

  const {
    isRecording,
    duration,
    transcription,
    isTranscribing,
    startRecording,
    stopRecording,
    cancelRecording,
    setTranscription
  } = useVoiceRecorder();

  const router = useRouter();
  const supabase = createClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auth and Profile Fetch
  useEffect(() => {
    const checkUser = async () => {
      // Use getUser() instead of getSession() - it works with httpOnly cookies
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

      if (authError || !authUser) {
        console.log('[DashboardPage] Redirecting to login because:', authError?.message || 'No user');
        router.push('/login');
        return;
      }
      console.log('[DashboardPage] Auth success for:', authUser.email);

      setUser(authUser);

      // Fetch Profile Data
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (profileData) {
        setProfile(profileData);

        // Fetch AI-generated Professional Greeting
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: "Hi! Please give me a professional welcome and a brief insight based on my profile.",
              conversationHistory: [],
            })
          });

          if (response.ok) {
            const data = await response.json();
            // Handle structured response
            let aiContent = "";
            if (data.sections && data.sections.length > 0) {
              // Extract the first paragraph or summary
              const mainSection = data.sections.find((s: any) => s.type === 'paragraph');
              aiContent = mainSection ? mainSection.text : "Welcome! I'm ready to help you thrive in the African tech ecosystem.";

              // If there's a second paragraph or specific insight type, use it for the modal
              const insightSection = data.sections.find((s: any) => s.type === 'insight' || s.intent === 'statistic');
              if (insightSection) {
                setAiGreetingInsight(insightSection.text);
              } else if (data.sections.length > 1) {
                setAiGreetingInsight(data.sections[1].text);
              }
            } else {
              aiContent = "Welcome! I've analyzed your profile and I'm ready to help you navigate your career journey in Africa.";
            }

            setMessages([{
              role: 'ai',
              content: aiContent
            }]);

            // If there's high-level insights, maybe set them elsewhere?
            // For now, just the greeting.
          } else {
            throw new Error('Fallback to static');
          }
        } catch (error) {
          // Fallback to a cleaner static greeting if API fails
          setMessages([
            {
              role: 'ai',
              content: `Hello ${profileData.full_name?.split(' ')[0] || 'there'}! I've analyzed the tech ecosystem in ${profileData.country || 'your region'}. Let's work on achieving your goal of becoming a skilled professional.`
            }
          ]);
        }

        // Dynamic Initial Suggestions
        setSuggestions([
          "Analyze my skill gaps",
          "Suggested learning paths",
          "Optimize my profile"
        ]);

        // Check for first visit (one-time modal)
        const hasSeenWelcome = localStorage.getItem(`hasSeenWelcome_${authUser.id}`);
        if (!hasSeenWelcome) {
          setIsWelcomeOpen(true);
          localStorage.setItem(`hasSeenWelcome_${authUser.id}`, 'true');
        }
      }
    };
    checkUser();
  }, [router, supabase]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleSendMessage = async (textOverride?: string) => {
    const finalMessage = textOverride || inputValue;
    if (!finalMessage?.trim() && (attachments || []).length === 0) return;

    // 1. Show user message immediately (including local attachments preview)
    const userMessage: ChatMessage = {
      role: 'user',
      content: finalMessage,
      attachments: attachments.map(a => ({ name: a.name, url: '', type: a.type }))
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // 2. Upload files to Supabase if any
      let uploadedAttachments: any[] = [];
      if (attachments.length > 0) {
        const results = await uploadFiles(user.id);
        uploadedAttachments = results
          .filter(a => a.status === 'success')
          .map(a => ({ name: a.name, url: a.url, type: a.type }));

        // Check if any uploads failed
        const failedUploads = results.filter(a => a.status === 'error');
        if (failedUploads.length > 0 && uploadedAttachments.length === 0 && !finalMessage.trim()) {
          const errorDetails = failedUploads.map(a => `${a.name}: ${a.error}`).join(', ');
          setMessages(prev => [...prev, {
            role: 'ai',
            content: `I couldn't process your request because the file upload(s) failed. Error: ${errorDetails}. Please check your internet connection, verify the bucket 'cv_uploads' exists in your Supabase dashboard, or try a different file.`
          }]);
          setIsLoading(false);
          return;
        }
      }

      // 3. Clear local states
      clearAttachments();
      setTranscription("");

      // 4. API Call with enriched data
      const { data: { session } } = await supabase.auth.getSession();

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
          message: finalMessage,
          attachments: uploadedAttachments,
          conversationHistory: messages.slice(-5)
        })
      });

      if (!res.ok) throw new Error(`API Error: ${res.status}`);

      const aiData = await res.json();

      // ... handle AI response (rest of function)

      // Handle structured JSON response
      let displayContent = '';
      if (aiData.sections) {
        // Convert structured response to readable text for display
        aiData.sections.forEach((section: any) => {
          if (section.type === 'paragraph') {
            displayContent += section.text + '\n\n';
          } else if (section.type === 'heading') {
            displayContent += section.text + '\n\n';
          } else if (section.type === 'list' && section.items) {
            section.items.forEach((item: any) => {
              displayContent += `• ${item.title}: ${item.description}\n`;
            });
            displayContent += '\n';
          }
        });
      } else {
        displayContent = aiData.response || 'I apologize, but I encountered an issue processing your request.';
      }

      setMessages(prev => [...prev, {
        role: 'ai',
        content: displayContent.trim()
      }]);

      // Update suggestions from AI response
      if (aiData.next_questions?.items) {
        setSuggestions(aiData.next_questions.items.map((q: any) => q.text).slice(0, 3));
      } else {
        // Fallback suggestions
        setSuggestions([
          "Tell me more about this",
          "What's the next step?",
          "How can I get started?"
        ]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Chat API Error:', error);

      // Fallback to mock response on error
      const fallbackResponse = "I'm experiencing some technical difficulties. Please try again in a moment, or contact support if the issue persists.";
      setMessages(prev => [...prev, {
        role: 'ai',
        content: fallbackResponse
      }]);

      setSuggestions([
        "Try asking again",
        "Contact support",
        "Check my profile"
      ]);

      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (profile?.mode === 'BUSINESS') {
    return (
      <div className={`dashboard-container ${!isDarkMode ? 'light-theme' : ''}`}>
        <Head>
          <title>Thnkforge - BusinessMate Coming Soon</title>
        </Head>
        <div className="glass-layout flex items-center justify-center p-8">
          <div className="glass-panel p-12 text-center max-w-2xl border border-blue-500/20 shadow-2xl shadow-blue-500/10">
            <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-pulse border border-blue-500/30">
              <Rocket size={40} className="text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-6 tracking-tight">BusinessMate AI</h1>
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-8 border border-blue-500/30">
              <Sparkles size={14} />
              PREMIUM UPCOMING FEATURE
            </div>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              We're building a state-of-the-art AI Business Strategist for entrepreneurs in West Africa.
              Soon, you'll be able to validate ideas, automate operations, and scale your venture with the power of Thnkforge AI.
            </p>
            <div className="flex flex-col gap-4 max-w-sm mx-auto">
              <button
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group"
                onClick={() => window.location.href = 'mailto:support@thnkforge.com?subject=BusinessMate Early Access'}
              >
                Join the Waitlist
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="w-full py-4 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl font-semibold transition-all border border-white/10"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`dashboard-container ${!isDarkMode ? 'light-theme' : ''}`}>
      <Head>
        <title>Thnkforge - AI CareerMate</title>
      </Head>

      <div className="glass-layout">
        {/* Left Panel: Profile */}
        <ProfilePanel
          user={user}
          profile={profile}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />

        {profile && (
          <WelcomeModal
            isOpen={isWelcomeOpen}
            onClose={() => setIsWelcomeOpen(false)}
            userName={profile.full_name?.split(' ')[0] || 'Explorer'}
            goal={profile.career_goal}
            country={profile.country}
            skills={profile.skills}
            aiInsight={aiGreetingInsight}
            isDarkMode={isDarkMode}
          />
        )}

        {/* Center Panel: Chat */}
        <div className="glass-panel chat-panel relative overflow-hidden">
          <MapBackground inline />
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                  <Sparkles size={18} fill="white" />
                </div>
                <h1 className="chat-title" style={{ fontSize: '1.5rem', marginBottom: 0 }}>AI CareerMate</h1>
              </div>
              <p className="chat-subtitle" style={{ marginLeft: '2.75rem' }}>AI Career Guide</p>
            </div>

            <div className="bottom-header-actions">
              <button className="header-action-btn">
                <FileText size={14} />
                Career Guide
              </button>
              <button className="header-action-btn">
                <CheckCircle size={14} />
                Networking
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="chat-messages" style={{ flex: 1, minHeight: 0 }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.role}`}>
                {msg.role === 'ai' && (
                  <div className="chat-avatar bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <Bot size={20} className="text-blue-400" />
                  </div>
                )}
                <div className="chat-bubble">
                  <div className="whitespace-pre-wrap">{msg.content}</div>

                  {/* Render Attachments */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="chat-attachments-list flex flex-wrap gap-2 mt-3 p-2 bg-black/10 rounded-lg">
                      {msg.attachments.map((att, attIdx) => (
                        <div key={attIdx} className="chat-attachment-item">
                          {att.type.startsWith('image/') ? (
                            <div className="chat-attachment-preview">
                              <img src={att.url || '#'} alt={att.name} className="chat-attachment-image rounded border border-white/10" />
                              <div className="text-[10px] text-gray-400 mt-1 truncate max-w-[150px]">{att.name}</div>
                            </div>
                          ) : (
                            <a
                              href={att.url || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="chat-attachment-file flex items-center gap-2 p-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded transition-colors text-blue-400"
                            >
                              <FileText size={16} />
                              <span className="text-xs font-medium truncate max-w-[150px]">{att.name}</span>
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {msg.role === 'user' && (profile?.avatar_url || user?.user_metadata?.avatar_url) && (
                  <Image
                    src={profile?.avatar_url || user?.user_metadata?.avatar_url}
                    alt="Me"
                    width={40}
                    height={40}
                    className="chat-avatar"
                  />
                )}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message ai">
                <div className="chat-bubble">
                  <span className="dot-pulse">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Dynamic Suggestions */}
          <div className="quick-replies">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                className="quick-reply-pill"
                onClick={() => {
                  setInputValue(suggestion);
                  // Optionally auto-send:
                  // setTimeout(() => handleSendMessage(), 0);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Unified Input Area */}
          <div className="chat-input-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Attachments Preview Area */}
            {attachments.length > 0 && (
              <div className="attachments-preview">
                {attachments.map((file) => (
                  <div key={file.id} className={`attachment-pill ${file.status}`}>
                    {file.type.startsWith('image/') ? <Play size={14} /> : <FileText size={14} />}
                    <span className="truncate max-w-[120px]">{file.name}</span>
                    {file.status === 'uploading' ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <button onClick={() => removeAttachment(file.id)} className="attachment-remove">
                        <X size={10} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="chat-input-container">
              {/* Hidden File Input */}
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />

              <button
                className={`chat-input-btn ${attachments.length > 0 ? 'text-blue-400' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                title="Upload File (PDF, DOCX, TXT, Images)"
              >
                <Paperclip size={20} />
              </button>

              {isRecording ? (
                <div className="recording-ui">
                  <div className="recording-indicator">
                    <div className="recording-dot" />
                    <span>{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</span>
                  </div>
                  <div className="audio-pulse">
                    {[1, 2, 3, 4].map(i => <div key={i} className="audio-bar" />)}
                  </div>
                  <button onClick={stopRecording} className="text-red-500 hover:text-red-400">
                    <StopCircle size={20} />
                  </button>
                  <button onClick={cancelRecording} className="text-gray-500 hover:text-gray-400">
                    <Trash2 size={20} />
                  </button>
                </div>
              ) : isTranscribing ? (
                <div className="transcription-preview">
                  <div className="transcribing-indicator">
                    <Loader2 size={16} className="animate-spin" />
                    <span>Analyzing voice...</span>
                  </div>
                </div>
              ) : (
                <input
                  type="text"
                  className="chat-input"
                  placeholder={transcription ? "Edit transcription..." : "Ask CareerMate..."}
                  value={inputValue || transcription}
                  onChange={(e) => {
                    if (transcription) setTranscription(e.target.value);
                    else setInputValue(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
              )}

              <button
                className={`chat-input-btn ${isRecording ? 'text-red-500 bg-red-500/10' : ''}`}
                onClick={isRecording ? stopRecording : startRecording}
                title="Voice Input (High Accuracy)"
              >
                {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
              </button>

              <button
                className={`chat-input-btn primary ${(isLoading || isUploading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleSendMessage(transcription)}
                disabled={isLoading || isUploading}
                title="Send Message"
              >
                {isLoading || isUploading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: Widgets */}
        <WidgetsPanel profile={profile} />

      </div>
    </div>
  );
}
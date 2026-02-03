"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import Head from 'next/head';

import MapBackground from '@/components/ui/MapBackground';
import '@/assets/css/dashboard.css';
import { MentorshipRequestModal, type MentorshipProfile } from '@/components/mentorship/MentorshipRequestModal';
import { Mic, Paperclip, Send, Settings, User, LogOut, FileText, CheckCircle, Play, HelpCircle, Bot, TrendingUp, Sparkles, MessageCircle, X, Loader2, StopCircle, Trash2, Rocket, ChevronRight, Sun, Moon, MapPin } from 'lucide-react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import '@/assets/css/chat-features.css';
import ModeToggle from '@/components/dashboard/ModeToggle';
import IntelligenceSnapshot from '@/components/dashboard/IntelligenceSnapshot';
import { DashboardMetrics, DEFAULT_CAREER_METRICS, DEFAULT_BUSINESS_METRICS } from '@/lib/types/dashboard-metrics';

// Mobile Components
import MobileHeader from '@/components/dashboard/MobileHeader';
import MobileModeToggle from '@/components/dashboard/MobileModeToggle';
import MobileUserCard from '@/components/dashboard/MobileUserCard';
import AIAssistantCard from '@/components/dashboard/AIAssistantCard';
import MobileReadinessScore from '@/components/dashboard/MobileReadinessScore';
import MobileSidebar from '@/components/dashboard/MobileSidebar';

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

        {/* Mode Toggle - Directly in sidebar */}
        <div className="px-4 py-3 border-t border-slate-200 dark:border-white/10">
          <ModeToggle />
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
// MAIN PAGE COMPONENT
// ============================================
export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // Light Mode by default per request

  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        setDashboardMetrics(profileData.mode === 'BUSINESS' ? DEFAULT_BUSINESS_METRICS : DEFAULT_CAREER_METRICS);

        // Fetch AI-generated Analysis
        try {
          const isBusiness = profileData.mode === 'BUSINESS';
          const initialPrompt = isBusiness
            ? "Analyze my business venture potential and market fit."
            : "Analyze my profile and provide your initial career assessment.";

          const { data: { session } } = await supabase.auth.getSession();

          if (!session) {
            console.warn('[DashboardPage] No session found for initial AI fetch, proceeding with cookies only');
          }

          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(session?.access_token ? { 'Authorization': `Bearer ${session.access_token}` } : {})
            },
            body: JSON.stringify({
              message: initialPrompt,
              conversationHistory: [],
            })
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error(`[DashboardPage] AI fetch failed with status ${response.status}:`, errorText);
            throw new Error(`AI API failed: ${response.status}`);
          }

          if (response.ok) {
            const data = await response.json();

            // Handle new response format with chat_insight and dashboard_metrics
            if (data.chat_insight && data.dashboard_metrics) {
              const insight = data.chat_insight;
              let aiContent = "";

              if (isBusiness) {
                // BUSINESS FORMAT
                aiContent = `Based on your business profile, market context, and regional conditions, here is what matters most right now:\n\n`;
                aiContent += `${insight.understanding_confirmation}\n\n`;
                if (insight.market_reality_check) aiContent += `MARKET REALITY CHECK:\n${insight.market_reality_check}\n\n`;
                if (insight.core_opportunity_signal) aiContent += `CORE OPPORTUNITY SIGNAL:\n${insight.core_opportunity_signal}\n\n`;
              } else {
                // CAREER FORMAT
                aiContent = `Based on your profile, skills, and the current ${profileData.country || 'African'}-specific job market, here is what matters most right now:\n\n`;
                aiContent += `${insight.understanding_confirmation}\n\n`;
                if (insight.strongest_skill_cluster?.length) {
                  aiContent += `STRONGEST SKILL CLUSTER:\n` + insight.strongest_skill_cluster.map((s: string) => `  ${s}`).join('\n') + `\n\n`;
                }
                if (insight.primary_skill_gaps?.length) {
                  aiContent += `PRIMARY SKILL GAPS:\n` + insight.primary_skill_gaps.map((s: string) => `  ${s}`).join('\n') + `\n\n`;
                }
                if (insight.fastest_opportunity_signal) {
                  aiContent += `FASTEST OPPORTUNITY SIGNAL:\n${insight.fastest_opportunity_signal}\n\n`;
                }
              }

              if (insight.next_step_primer) {
                aiContent += insight.next_step_primer;
              }

              setMessages([{
                role: 'ai',
                content: aiContent
              }]);

              // Set dashboard metrics for the Intelligence Snapshot sidebar
              setDashboardMetrics(data.dashboard_metrics);


            } else if (data.sections && data.sections.length > 0) {
              // Fallback to old format handling
              const mainSection = data.sections.find((s: any) => s.type === 'paragraph');
              const aiContent = mainSection ? mainSection.text : "I'm analyzing your career positioning in the African tech market.";

              setMessages([{
                role: 'ai',
                content: aiContent
              }]);
            } else {
              setMessages([{
                role: 'ai',
                content: "I've analyzed your profile. Ready to help you navigate your career journey in Africa."
              }]);
            }
          } else {
            throw new Error('Fallback to static');
          }
        } catch (error) {
          console.error('AI fetch error:', error);
          setMessages([
            {
              role: 'ai',
              content: `Based on your profile in ${profileData.country || 'Africa'}, I'm ready to help you accelerate your career. Ask me about skill gaps, learning paths, or profile optimization.`
            }
          ]);
          setDashboardMetrics(profileData.mode === 'BUSINESS' ? DEFAULT_BUSINESS_METRICS : DEFAULT_CAREER_METRICS);
        }
      }

      // Dynamic Initial Suggestions
      if (profileData.mode === 'BUSINESS') {
        setSuggestions([
          "Analyze my business viability",
          "Identify market risks",
          "Funding opportunities"
        ]);
      } else {
        setSuggestions([
          "Analyze my skill gaps",
          "Suggested learning paths",
          "Optimize my profile"
        ]);
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

      // Handle new response format with chat_insight and dashboard_metrics
      let displayContent = '';

      if (aiData.chat_insight && aiData.dashboard_metrics) {
        const insight = aiData.chat_insight;
        const isBusiness = aiData.dashboard_metrics.mode === 'BUSINESS';

        displayContent = `${insight.understanding_confirmation}\n\n`;

        if (isBusiness) {
          // BUSINESS FIELDS
          if (insight.market_reality_check) displayContent += `MARKET REALITY CHECK:\n${insight.market_reality_check}\n\n`;
          if (insight.core_opportunity_signal) displayContent += `CORE OPPORTUNITY SIGNAL:\n${insight.core_opportunity_signal}\n\n`;
        } else {
          // CAREER FIELDS
          if (insight.strongest_skill_cluster?.length > 0) {
            displayContent += `STRONGEST SKILL CLUSTER:\n` + insight.strongest_skill_cluster.map((s: string) => `  ${s}`).join('\n') + `\n\n`;
          }
          if (insight.primary_skill_gaps?.length > 0) {
            displayContent += `PRIMARY SKILL GAPS:\n` + insight.primary_skill_gaps.map((s: string) => `  ${s}`).join('\n') + `\n\n`;
          }
          if (insight.fastest_opportunity_signal) {
            displayContent += `FASTEST OPPORTUNITY SIGNAL:\n${insight.fastest_opportunity_signal}\n\n`;
          }
        }

        if (insight.next_step_primer) {
          displayContent += insight.next_step_primer;
        }

        // Update dashboard metrics
        setDashboardMetrics(aiData.dashboard_metrics);
      } else if (aiData.sections) {
        // Fallback to old structured response format
        aiData.sections.forEach((section: any) => {
          if (section.type === 'paragraph') {
            displayContent += section.text + '\n\n';
          } else if (section.type === 'heading') {
            displayContent += `**${section.text}**\n\n`;
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
        const isBusinessMode = dashboardMetrics?.mode === 'BUSINESS' || profile?.mode === 'BUSINESS';
        if (isBusinessMode) {
          setSuggestions([
            "Analyze my business viability",
            "Identify market risks",
            "Funding opportunities"
          ]);
        } else {
          setSuggestions([
            "Analyze my skill gaps",
            "Suggested learning paths",
            "Optimize my profile"
          ]);
        }
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

      const isBusinessMode = dashboardMetrics?.mode === 'BUSINESS' || profile?.mode === 'BUSINESS';
      setSuggestions(isBusinessMode ? [
        "Analyze my business viability",
        "Identify market risks",
        "Funding opportunities"
      ] : [
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
                <h1 className="chat-title" style={{ fontSize: '1.5rem', marginBottom: 0 }}>
                  {profile?.mode === 'BUSINESS' ? 'AI BusinessGuide' : 'AI CareerMate'}
                </h1>
              </div>
              <p className="chat-subtitle" style={{ marginLeft: '2.75rem' }}>
                {profile?.mode === 'BUSINESS' ? 'Venture Intelligence' : 'AI Career Guide'}
              </p>
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
                  placeholder={transcription ? "Edit transcription..." : (profile?.mode === 'BUSINESS' ? "Ask BusinessGuide..." : "Ask CareerMate...")}
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

        {/* Right Panel: Intelligence Snapshot */}
        <IntelligenceSnapshot metrics={dashboardMetrics} />

        {/* ============================================
           MOBILE LAYOUT
           ============================================ */}

        {/* Mobile Header */}
        <MobileHeader isDarkMode={isDarkMode} onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Mobile Mode Toggle */}
        <MobileModeToggle />

        {/* Mobile Main Content Area */}
        <div className="mobile-main-content">
          {/* Mobile User Card */}
          <MobileUserCard user={user} profile={profile} />

          {/* AI Assistant Card */}
          <AIAssistantCard
            mode={profile?.mode || 'CAREER'}
            content={messages[messages.length - 1]?.content || ''}
            suggestions={suggestions}
            onSuggestionClick={(suggestion) => {
              setInputValue(suggestion);
            }}
          />

          {/* Mobile Readiness Score */}
          <MobileReadinessScore
            mode={profile?.mode || 'CAREER'}
            overallScore={
              dashboardMetrics?.mode === 'BUSINESS'
                ? dashboardMetrics?.venture_readiness?.overall_score || 0
                : (dashboardMetrics as any)?.career_readiness?.overall_score || 0
            }
            breakdown={
              dashboardMetrics?.mode === 'BUSINESS'
                ? [
                  { label: 'Market-Solution Fit', value: dashboardMetrics?.venture_readiness?.breakdown?.market_demand_fit || 0, color: '#ef4444' },
                  { label: 'Execution Capability', value: dashboardMetrics?.venture_readiness?.breakdown?.execution_readiness || 0, color: '#f59e0b' },
                  { label: 'Regulatory Compliance', value: dashboardMetrics?.venture_readiness?.breakdown?.business_fundamentals || 0, color: '#eab308' },
                  { label: 'Growth Potential', value: dashboardMetrics?.venture_readiness?.breakdown?.founder_capability || 0, color: '#f59e0b' },
                ]
                : [
                  { label: 'Skills Match', value: (dashboardMetrics as any)?.career_readiness?.breakdown?.skills_match || 0, color: '#3b82f6' },
                  { label: 'Market Alignment', value: (dashboardMetrics as any)?.career_readiness?.breakdown?.market_alignment || 0, color: '#3b82f6' },
                  { label: 'Profile Strength', value: (dashboardMetrics as any)?.career_readiness?.breakdown?.profile_strength || 0, color: '#3b82f6' },
                  { label: 'Opportunity Readiness', value: (dashboardMetrics as any)?.career_readiness?.breakdown?.opportunity_readiness || 0, color: '#3b82f6' },
                ]
            }
          />
        </div>

        {/* Mobile Chat Footer */}
        <div className="mobile-chat-footer">
          <div className="mobile-chat-container">
            <input
              type="text"
              className="mobile-chat-input"
              placeholder={profile?.mode === 'BUSINESS' ? 'Ask BusinessDesk...' : 'Ask CareerMate...'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="mobile-chat-btn" onClick={startRecording}>
              <Mic size={20} />
            </button>
            <button
              className="mobile-chat-btn primary"
              onClick={() => handleSendMessage()}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          user={user}
          profile={profile}
          isDarkMode={isDarkMode}
          onModeChange={(mode) => {
            // Mode change is handled by MobileSidebar through database update
            window.location.reload();
          }}
          onNavigate={(route) => {
            router.push(route);
          }}
        />

      </div>
    </div>
  );
}
"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import Head from 'next/head';
import { WelcomeModal } from '@/components/WelcomeModal';
import '@/assets/css/dashboard.css';
import { MentorshipRequestModal, type MentorshipProfile } from '@/components/mentorship/MentorshipRequestModal';
import { Mic, Paperclip, Send, Settings, User, LogOut, FileText, CheckCircle, Play, HelpCircle, Bot, TrendingUp, Sparkles, MessageCircle, X, Loader2, StopCircle, Trash2, Rocket, ChevronRight } from 'lucide-react';
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
const ProfilePanel = ({ user, profile, onLogout }: { user: any, profile: any, onLogout: () => void }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="glass-panel profile-panel">
      {/* Header / Logo */}
      <div className="profile-header">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/50">
          FP
        </div>
        <span className="profile-logo-text">Future Proofer</span>
      </div>

      {/* User Card */}
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
        <h2 className="profile-name">
          {profile?.full_name || user?.user_metadata?.full_name || "Guest User"}
        </h2>
        <p className="profile-role">
          {profile?.mode === 'BUSINESS' ? (profile?.business_sector || 'Business Lead') : (profile?.skills?.[0] || 'Software Development')}<br />
          {profile?.career_goal ? profile.career_goal.replace('_', ' ') : 'Full Stack Engineer'}
        </p>
        <div className="profile-location">
          <span className="profile-location-icon">📍</span>
          <span>{profile?.country || 'Accra, Ghana'}</span>
        </div>
      </div>

      {/* Navigation / Actions */}
      <div className="profile-actions">
        {showSettings && (
          <div className="settings-dropdown">
            <button className="profile-btn" onClick={() => setShowSettings(false)}>
              <User size={16} />
              <span>My Profile</span>
            </button>
            <button className="profile-btn text-red-400 hover:bg-red-500/10" onClick={onLogout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
        <button
          className={`profile-btn ${showSettings ? 'active' : ''}`}
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
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
    <div className="glass-panel widgets-panel">
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
            <span>{currentSkill}</span>
            <span className="text-green-400 font-bold">82%</span>
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

      {/* Support Button */}
      <div className="support-container">
        <button className="support-btn" onClick={() => window.open('https://wa.me/yournumber', '_blank')}>
          <MessageCircle size={18} fill="currentColor" />
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
        console.log('Dashboard client-side auth check failed:', authError?.message || 'No user');
        router.push('/login');
        return;
      }

      setUser(authUser);

      // Fetch Profile Data
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (profileData) {
        setProfile(profileData);

        // Dynamic Initial Greeting
        setMessages([
          {
            role: 'ai',
            content: `Welcome back, ${profileData.full_name?.split(' ')[0] || 'there'}! I've been analyzing the tech ecosystem in ${profileData.country || 'your region'}. Ready to continue with your ${profileData.career_goal || 'career'} journey?`
          }
        ]);

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
      <div className="dashboard-container">
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
    <div className="dashboard-container">
      <Head>
        <title>Thnkforge - AI CareerMate</title>
      </Head>

      <div className="glass-layout">
        {/* Left Panel: Profile */}
        <ProfilePanel user={user} profile={profile} onLogout={handleLogout} />

        {/* Center Panel: Chat */}
        <div className="glass-panel chat-panel">
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
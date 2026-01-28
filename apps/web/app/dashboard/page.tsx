"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import '@/assets/css/dashboard.css';
import { MentorshipRequestModal, type MentorshipProfile } from '@/components/mentorship/MentorshipRequestModal';

// Material Icons component
const MaterialIcon = ({ name, className = '' }: { name: string; className?: string }) => (
  <span className={`material-icons-round ${className}`}>
    {name}
  </span>
);

// Sidebar Navigation
const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-header">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <MaterialIcon name="auto_awesome" className="text-white" />
        </div>
        <span className="sidebar-logo-text">Thinkforge</span>
      </div>
    </div>

    <nav className="sidebar-nav">
      <Link href="/dashboard" className="sidebar-nav-item active">
        <MaterialIcon name="dashboard" />
        <span>Dashboard</span>
      </Link>
      <Link href="#" className="sidebar-nav-item">
        <MaterialIcon name="explore" />
        <span>Career Discovery</span>
      </Link>
      <Link href="/skills-gap" className="sidebar-nav-item">
        <MaterialIcon name="assignment" />
        <span>Skills Gap</span>
      </Link>
      <Link href="/thinkforge" className="sidebar-nav-item">
        <MaterialIcon name="lightbulb" />
        <span>Thinkforge</span>
      </Link>
      <Link href="/network" className="sidebar-nav-item">
        <MaterialIcon name="people" />
        <span>Network</span>
      </Link>
    </nav>

    <div className="sidebar-footer">
      <div className="sidebar-user">
        <div className="sidebar-user-avatar">
          <Image
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Kwame Adewale"
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
        </div>
        <div className="sidebar-user-info">
          <p className="sidebar-user-name">Kwame Adewale</p>
          <p className="sidebar-user-role">Junior Developer</p>
        </div>
      </div>
      <button className="sidebar-settings">
        <MaterialIcon name="settings" />
      </button>
    </div>
  </aside>
);

// Readiness Progress Card
const ReadinessCard = () => (
  <div className="readiness-card">
    <div className="readiness-flex">
      <div className="readiness-progress-container">
        <svg className="readiness-circle" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="12"
            strokeDasharray="534"
            strokeDashoffset="117"
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
          />
          <text x="100" y="100" textAnchor="middle" dy="10" className="readiness-percentage">
            78%
          </text>
          <text x="100" y="125" textAnchor="middle" className="readiness-ready-text">
            READY
          </text>
        </svg>
      </div>

      <div className="readiness-content">
        <h3 className="readiness-title">Software Developer Readiness</h3>
        <p className="readiness-subtitle">
          AI analysis of your GitHub contributions, Python projects, and recent technical interview simulations indicates high proficiency in Backend systems.
        </p>

        <div className="readiness-tags">
          <span className="readiness-tag">Python</span>
          <span className="readiness-tag">Django</span>
          <span className="readiness-tag">PostgreSQL</span>
        </div>
      </div>
    </div>
  </div>
);

// Market Heatmap Card
const MarketHeatmap = () => (
  <div className="market-heatmap-card">
    <div className="market-heatmap-header">
      <h3 className="market-heatmap-title">Market Heatmap</h3>
      <span className="market-heatmap-badge">HIGH DEMAND</span>
    </div>

    <div className="market-heatmap-map">
      <Image
        src="/api/placeholder/400/250"
        alt="Africa Market Heatmap"
        width={400}
        height={250}
        className="w-full h-auto"
      />
      <div className="market-heatmap-overlay">
        <div className="market-heatmap-location" style={{ top: '35%', left: '45%' }}>
          <div className="market-heatmap-dot pulsing"></div>
          <span className="market-heatmap-label">West Africa Hiring Surge</span>
        </div>
      </div>
    </div>

    <div className="market-heatmap-stats">
      <div className="market-stat">
        <MaterialIcon name="trending_up" className="text-green-500" />
        <div>
          <p className="market-stat-value">5,400 roles</p>
          <p className="market-stat-label">Lagos, Nigeria</p>
        </div>
      </div>
      <div className="market-stat">
        <MaterialIcon name="trending_up" className="text-green-500" />
        <div>
          <p className="market-stat-value">2,100 roles</p>
          <p className="market-stat-label">Nairobi, Kenya</p>
        </div>
      </div>
    </div>
  </div>
);

// Suggested Mentors Card
const SuggestedMentors = ({ onRequestMentorship }: { onRequestMentorship: (mentor: MentorshipProfile) => void }) => {
  const mentors = [
    {
      name: 'Fatou Bah',
      title: 'Senior Lead at Google Inc',
      location: 'California',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      verified: true
    },
    {
      name: 'David Kone',
      title: 'CTO at FintechHub',
      location: 'Accra',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      verified: true
    }
  ];

  return (
    <div className="suggested-mentors-card">
      <h3 className="suggested-mentors-title">Suggested Mentors</h3>

      <div className="mentors-list">
        {mentors.map((mentor, idx) => (
          <div key={idx} className="mentor-item">
            <div className="mentor-avatar">
              <Image
                src={mentor.avatar}
                alt={mentor.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            </div>
            <div className="mentor-info">
              <div className="flex items-center gap-1">
                <p className="mentor-name">{mentor.name}</p>
                {mentor.verified && <MaterialIcon name="verified" className="text-primary" />}
              </div>
              <p className="mentor-title">{mentor.title}</p>
              <p className="mentor-location">{mentor.location}</p>
            </div>
            <button
              className="mentor-request-btn"
              onClick={() =>
                onRequestMentorship({
                  name: mentor.name,
                  headline: mentor.title,
                  location: mentor.location,
                  avatarUrl: mentor.avatar,
                })
              }
            >
              Request Mentorship
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Career Milestones Card
const CareerMilestones = () => {
  const milestones = [
    {
      status: 'completed',
      date: 'TODAY',
      title: 'Completed Advanced API Design Module',
      description: 'Mastered REST/GraphQL architecture and typed, integration techniques',
      icon: 'check_circle',
      color: 'blue'
    },
    {
      status: 'completed',
      date: 'YESTERDAY',
      title: 'Portfolio Site Live',
      description: 'Deployed personal portfolio built with an advanced CI/CD pipeline',
      icon: 'rocket_launch',
      color: 'green'
    },
    {
      status: 'pending',
      date: 'PENDING',
      title: 'Mentor Matching: Segun O.',
      description: 'Paired with a Senior Architect at Flaystack for weekly reviews',
      icon: 'schedule',
      color: 'orange'
    }
  ];

  return (
    <div className="career-milestones-card">
      <div className="career-milestones-header">
        <h3 className="career-milestones-title">Career Milestones</h3>
        <a href="#" className="view-history-link">View History</a>
      </div>

      <div className="milestones-list">
        {milestones.map((milestone, idx) => (
          <div key={idx} className="milestone-item">
            <div className={`milestone-icon milestone-icon-${milestone.color}`}>
              <MaterialIcon name={milestone.icon} />
            </div>
            <div className="milestone-content">
              <div className="milestone-date">{milestone.date}</div>
              <h4 className="milestone-title">{milestone.title}</h4>
              <p className="milestone-description">{milestone.description}</p>
            </div>
            {milestone.status === 'completed' && (
              <MaterialIcon name="check_circle" className="milestone-status text-green-500" />
            )}
            {milestone.status === 'pending' && (
              <MaterialIcon name="schedule" className="milestone-status text-orange-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// AI Insights Card
const AIInsights = () => (
  <div className="ai-insights-card">
    <div className="ai-insight-item">
      <MaterialIcon name="info" className="text-blue-500" />
      <div>
        <h4 className="ai-insight-title">CAREER TIP</h4>
        <p className="ai-insight-text">
          Updating your GitHub profile around 80% will automatically refresh your skillset with AI recalibrations to keep current market insights
        </p>
      </div>
    </div>
  </div>
);

// Zen Overlay View (AI Response)
const ZenOverlay = ({ isOpen, onClose, conversationHistory, isLoading, onAskNext }: {
  isOpen: boolean;
  onClose: () => void;
  conversationHistory: Array<{ role: 'user' | 'ai', content: any }>;
  isLoading: boolean;
  onAskNext: (question: string) => void;
}) => {
  const [isQuickReplyOpen, setIsQuickReplyOpen] = useState(false);
  const [quickReplyText, setQuickReplyText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isQuickReplyOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isQuickReplyOpen]);

  const handleEditClick = () => {
    setIsQuickReplyOpen(!isQuickReplyOpen);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickReplyText.trim()) {
      onAskNext(quickReplyText.trim());
      setQuickReplyText('');
    }
  };

  if (!isOpen) return null;

  const renderSection = (section: any, index: number) => {
    switch (section.type) {
      case 'heading':
        const level = Math.min(section.level || 1, 3);
        const headingClasses = {
          1: 'text-2xl font-bold mb-4 text-gray-900',
          2: 'text-xl font-semibold mb-3 mt-6 text-gray-800',
          3: 'text-lg font-medium mb-2 mt-4 text-gray-700',
        }[level as 1 | 2 | 3] || 'text-xl font-bold mb-4';

        if (level === 1) return <h1 key={index} className={headingClasses}>{section.text}</h1>;
        if (level === 2) return <h2 key={index} className={headingClasses}>{section.text}</h2>;
        return <h3 key={index} className={headingClasses}>{section.text}</h3>;

      case 'paragraph':
        return <p key={index} className="mb-4 text-gray-600 leading-relaxed">{section.text}</p>;

      case 'emphasis':
        const intentStyles = {
          important: 'bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-4',
          statistic: 'bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-4 font-mono',
          warning: 'bg-amber-50 border-l-4 border-amber-500 text-amber-700 p-4 mb-4',
          insight: 'bg-purple-50 border-l-4 border-purple-500 text-purple-700 p-4 mb-4 italic',
        }[section.intent as string] || 'bg-gray-50 border-l-4 border-gray-500 p-4 mb-4';
        return (
          <div key={index} className={intentStyles}>
            <div className="flex items-center gap-2 mb-1">
              <MaterialIcon name={
                section.intent === 'statistic' ? 'analytics' :
                  section.intent === 'warning' ? 'warning' :
                    section.intent === 'insight' ? 'lightbulb' : 'info'
              } className="text-sm" />
              <span className="text-xs font-bold uppercase tracking-wider">{section.intent}</span>
            </div>
            {section.text}
          </div>
        );

      case 'list':
        if (section.style === 'cards') {
          return (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {section.items.map((item: any, i: number) => (
                <div key={i} className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  {item.link && (
                    <a href={item.link.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline">
                      {item.link.label} <MaterialIcon name="open_in_new" className="text-[10px]" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          );
        }
        if (section.style === 'steps') {
          return (
            <div key={index} className="space-y-4 mb-6">
              {section.items.map((item: any, i: number) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        }
        return (
          <ul key={index} className="list-disc pl-5 mb-4 space-y-2 text-gray-600">
            {section.items.map((item: any, i: number) => (
              <li key={i}>
                <span className="font-semibold text-gray-800">{item.title}:</span> {item.description}
              </li>
            ))}
          </ul>
        );

      case 'sources':
        return (
          <div key={index} className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <MaterialIcon name="library_books" className="text-sm" />
              Verified Sources
            </h4>
            <div className="flex flex-wrap gap-3">
              {section.items.map((item: any, i: number) => (
                <a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:border-primary hover:text-primary transition-colors flex items-center gap-1"
                >
                  {item.label}
                  <MaterialIcon name="open_in_new" className="text-[10px]" />
                </a>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="zen-overlay-container">
      <div className="zen-overlay-backdrop" onClick={onClose}></div>
      <div className="zen-overlay-panel">
        <div className="zen-header">
          <div className="zen-header-left">
            <div className="zen-dot"></div>
            <span className="zen-label">AI CAREER FORESIGHT</span>
          </div>
          <button className="zen-close" onClick={onClose}>
            <MaterialIcon name="close" />
          </button>
        </div>

        <div className="zen-content">
          <div className="zen-answer-container">
            {conversationHistory.length === 0 && !isLoading ? (
              <div className="zen-empty-state">
                <MaterialIcon name="chat" className="text-gray-400 text-4xl" />
                <p className="mt-4 text-gray-500">Start a conversation with CareerMate AI</p>
              </div>
            ) : (
              <div className="zen-conversation">
                {conversationHistory.map((message, index) => (
                  <div key={index} className={`zen-message ${message.role === 'user' ? 'zen-message-user' : 'zen-message-ai'}`}>
                    {message.role === 'user' ? (
                      <div className="zen-user-message">
                        <p className="zen-user-text">{message.content}</p>
                      </div>
                    ) : (
                      <div className="zen-ai-message">
                        {message.content && message.content.sections ? (
                          message.content.sections.map((section: any, idx: number) => renderSection(section, idx))
                        ) : message.content && typeof message.content === 'string' ? (
                          <p className="text-gray-600">{message.content}</p>
                        ) : (
                          <p className="text-gray-500 italic">I couldn't generate a structured response. Please try again.</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="zen-message zen-message-ai">
                    <div className="zen-loading">
                      <MaterialIcon name="hourglass_empty" className="animate-spin text-primary text-4xl" />
                      {/* <p className="mt-4 text-gray-500">Analyzing African market data...</p> */}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {conversationHistory.length > 0 && conversationHistory[conversationHistory.length - 1]?.role === 'ai' && conversationHistory[conversationHistory.length - 1]?.content && conversationHistory[conversationHistory.length - 1]?.content.next_questions && (
            <div className="zen-next-steps mt-8">
              <p className="zen-next-label">NEXT QUESTIONS</p>
              <div className="zen-next-buttons">
                {Array.isArray(conversationHistory[conversationHistory.length - 1]?.content.next_questions) ? (
                  conversationHistory[conversationHistory.length - 1]?.content.next_questions.map((q: string, idx: number) => (
                    <button
                      key={idx}
                      className="zen-next-btn"
                      onClick={() => onAskNext(q)}
                    >
                      {q}
                    </button>
                  ))
                ) : conversationHistory[conversationHistory.length - 1]?.content.next_questions.items ? (
                  conversationHistory[conversationHistory.length - 1]?.content.next_questions.items.map((item: any, idx: number) => (
                    <button
                      key={idx}
                      className="zen-next-btn"
                      onClick={() => onAskNext(item.text)}
                    >
                      {item.text}
                    </button>
                  ))
                ) : null}
              </div>
            </div>
          )}
        </div>

        <div className="zen-footer">
          <div className={`zen-footer-container ${isQuickReplyOpen ? 'quick-reply-active' : ''}`}>
            <button className="zen-edit-btn" onClick={handleEditClick}>
              <MaterialIcon name="edit" />
            </button>

            <div className="zen-quick-reply-wrapper">
              <form onSubmit={handleQuickSubmit} className="zen-quick-reply-form">
                <div className="zen-quick-input-container">
                  <input
                    ref={inputRef}
                    type="text"
                    className="zen-quick-input"
                    placeholder="Type a quick follow-up..."
                    value={quickReplyText}
                    onChange={(e) => setQuickReplyText(e.target.value)}
                  />
                  <button type="submit" className="zen-quick-send-btn">
                    <MaterialIcon name="arrow_upward" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Premium Modal Component
const PremiumModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="premium-modal-overlay" onClick={onClose}></div>
      <div className="premium-modal">
        <button className="premium-modal-close" onClick={onClose}>
          <MaterialIcon name="close" />
        </button>

        <div className="premium-modal-header">
          <div className="premium-modal-icon">
            <MaterialIcon name="workspace_premium" className="text-4xl" />
          </div>
          <h2 className="premium-modal-title">Upgrade to Premium</h2>
          <p className="premium-modal-subtitle">
            Unlock unlimited AI conversations and advanced career insights
          </p>
        </div>

        <div className="premium-features">
          <div className="premium-feature">
            <MaterialIcon name="check_circle" className="text-green-500" />
            <span>Unlimited AI Career Coach conversations</span>
          </div>
          <div className="premium-feature">
            <MaterialIcon name="check_circle" className="text-green-500" />
            <span>Advanced market analytics and predictions</span>
          </div>
          <div className="premium-feature">
            <MaterialIcon name="check_circle" className="text-green-500" />
            <span>Priority mentor matching</span>
          </div>
          <div className="premium-feature">
            <MaterialIcon name="check_circle" className="text-green-500" />
            <span>Personalized learning paths</span>
          </div>
          <div className="premium-feature">
            <MaterialIcon name="check_circle" className="text-green-500" />
            <span>Early access to new features</span>
          </div>
        </div>

        <div className="premium-pricing">
          <div className="premium-price">
            <span className="premium-currency">$</span>
            <span className="premium-amount">29</span>
            <span className="premium-period">/month</span>
          </div>
          <p className="premium-trial">7-day free trial included</p>
        </div>

        <div className="premium-modal-actions">
          <button className="premium-upgrade-btn">
            Upgrade Now
          </button>
          <button className="premium-cancel-btn" onClick={onClose}>
            Maybe Later
          </button>
        </div>
      </div>
    </>
  );
};

// Ask CareerMate AI Input
const AskCareerMateAI = ({ onAsk }: { onAsk: (question: string) => void }) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onAsk(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ask-careermate-inline">
      <div className="ask-careermate-input-wrapper">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask CareerMate AI anything about your career..."
          className="ask-careermate-input"
        />
        <div className="ask-careermate-actions">
          <button
            className={`ask-careermate-voice ${isListening ? 'listening' : ''}`}
            onClick={() => setIsListening(!isListening)}
          >
            <MaterialIcon name="mic" />
          </button>
          <button className="ask-careermate-send" onClick={handleSend}>
            <MaterialIcon name="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showZenOverlay, setShowZenOverlay] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: 'user' | 'ai', content: any }>>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [isMentorshipModalOpen, setIsMentorshipModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<MentorshipProfile | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleAskAI = async (question: string) => {
    // Add user message to conversation history
    const newMessage = { role: 'user' as const, content: question };
    const newHistory = [...conversationHistory, newMessage];

    setConversationHistory(newHistory);
    setShowZenOverlay(true);
    setIsLoadingAI(true);

    // Make API call with current history
    makeAPICall(question, newHistory);
  };

  const makeAPICall = async (question: string, currentHistory: Array<{ role: 'user' | 'ai', content: any }>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          message: question,
          conversationHistory: currentHistory.slice(0, -1).map(msg => ({
            role: msg.role === 'ai' ? 'assistant' : msg.role,
            content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
          }))
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Failed to fetch AI response: ${res.status} ${errorData.error || res.statusText}`);
      }

      const data = await res.json();
      // Add AI response to conversation history
      setConversationHistory(prev => [...prev, { role: 'ai' as const, content: data }]);
    } catch (error: any) {
      console.error('AI Error:', error);
      // Add error response to conversation history
      setConversationHistory(prev => [...prev, {
        role: 'ai' as const,
        content: {
          response_type: 'answer',
          sections: [{ type: 'paragraph', text: error.message || "Sorry, I encountered an error while processing your request. Please try again." }]
        }
      }]);
    } finally {
      setIsLoadingAI(false);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      }
    };
    checkUser();
  }, [router, supabase]);

  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark' : ''}`}>
      <Head>
        <title>Thinkforge - Career Dashboard</title>
        <meta name="description" content="Your career development dashboard" />
      </Head>

      <Sidebar />

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="header-search-container">
            <div className="header-search-bar">
              <MaterialIcon name="search" className="search-icon" />
              <input type="text" placeholder="Search roles, mentors, or skills..." />
            </div>
          </div>

          <div className="header-actions">
            <button
              onClick={toggleDarkMode}
              className="header-icon-btn"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <MaterialIcon name="light_mode" />
              ) : (
                <MaterialIcon name="dark_mode" />
              )}
            </button>

            <button className="header-icon-btn">
              <MaterialIcon name="notifications" />
              <span className="notification-badge">3</span>
            </button>

            <button className="header-icon-btn">
              <MaterialIcon name="help_outline" />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-scrollable">
          <div className="greeting-section">
            <h1 className="main-greeting">Good morning, Kwame</h1>
            <p className="main-subtitle">Your journey to becoming a Senior Software Developer is 78% complete.</p>
          </div>

          <div className="dashboard-grid">
            {/* Left Column (Main) */}
            <div className="dashboard-col-left">
              <ReadinessCard />
              <CareerMilestones />
            </div>

            {/* Right Column (Sidebar) */}
            <div className="dashboard-col-right">
              <MarketHeatmap />
              <SuggestedMentors
                onRequestMentorship={(mentor) => {
                  setSelectedMentor(mentor);
                  setIsMentorshipModalOpen(true);
                }}
              />
              <AIInsights />
            </div>
          </div>
        </div>

        {/* Fixed AI Input at Bottom */}
        <AskCareerMateAI onAsk={handleAskAI} />
      </main>

      {/* Overlays */}
      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
      <ZenOverlay
        isOpen={showZenOverlay}
        onClose={() => {
          setShowZenOverlay(false);
          setConversationHistory([]); // Reset conversation when modal closes
        }}
        conversationHistory={conversationHistory}
        isLoading={isLoadingAI}
        onAskNext={handleAskAI}
      />
      <MentorshipRequestModal
        open={isMentorshipModalOpen}
        mentor={selectedMentor}
        onOpenChange={(next) => setIsMentorshipModalOpen(next)}
      />
    </div>
  );
}
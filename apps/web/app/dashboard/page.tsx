"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import Head from 'next/head';
import '@/assets/css/dashboard.css';

// Material Icons font
const MaterialIconsLink = () => (
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
    rel="stylesheet"
  />
);

// Material Icons component
const MaterialIcon = ({ name, className = '' }: { name: string; className?: string }) => (
  <span className={`material-icons-round ${className}`}>
    {name}
  </span>
);

// Components
const ProfileCard = () => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
    <div className="flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 border border-primary/20 overflow-hidden">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZLC8DAztwC8tscvE479O4SSYSabNx53eBNK7ayKTK1fEFDoKHUAqCakeqNgXrNdFNpAoO2cCbd-zn-jXgtZCTkVOnTfUByyLel3blx1_9V-8BrhZSlbgpHs3ywlj8_SVVBI12SM8H4w6_B_nllUbhUTUb4epty57xmWvZ7sDLcnyHCRuzXuckCb7WNhriIQWUkWOPBDmkWo0081OPSkpXXZDe64ir8BJFb3twBR6JyCf5f5aMqd5wDjmbD-BWXJqs6VnBVocN3FSM"
          alt="User Avatar"
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      </div>
      <h2 className="text-xl font-extrabold">Alex Johnson</h2>
      <p className="text-sm opacity-60 mb-4">UI/UX Product Designer • Lagos, NG</p>
      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className="bg-primary h-full w-[78%]"></div>
      </div>
      <p className="text-[11px] font-bold mt-2 text-primary uppercase">Profile Completion: 78%</p>
    </div>
  </div>
);

const DocumentsCard = () => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
    <h3 className="font-bold text-sm mb-4 uppercase tracking-wider opacity-60">Connected Documents</h3>
    <div className="space-y-3">
      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group cursor-pointer hover:border-primary/30 transition-colors">
        <MaterialIcon name="description" className="text-primary" />
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-semibold truncate">Curriculum Vitae 2026.pdf</p>
          <p className="text-[10px] opacity-50">Last synced: 2h ago</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group cursor-pointer hover:border-primary/30 transition-colors">
        <MaterialIcon name="verified" className="text-green-500" />
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-semibold truncate">Skill Certifications.zip</p>
          <p className="text-[10px] opacity-50">Last synced: Yesterday</p>
        </div>
      </div>
    </div>
    <button className="w-full mt-4 py-2 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-sm font-bold opacity-60 hover:opacity-100 hover:border-primary transition-all">
      + Add Resume/Portfolio
    </button>
  </div>
);

const MetricCard = ({ title, value, icon, trend, children }: { title: string; value: string; icon: string; trend?: string; children: React.ReactNode }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <MaterialIcon name={icon} className="text-6xl" />
    </div>
    <p className="text-sm font-bold opacity-60">{title}</p>
    <div className="flex items-baseline gap-2 mt-2">
      <h4 className="text-3xl font-extrabold tracking-tight">{value}</h4>
      {trend && (
        <span className="text-green-500 text-sm font-bold flex items-center">
          <MaterialIcon name="trending_up" className="text-base" /> {trend}
        </span>
      )}
    </div>
    {children}
  </div>
);

const AIChat = () => {
  const [message, setMessage] = useState('');
  
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden flex flex-col min-h-[400px]">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-primary/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
            <MaterialIcon name="auto_awesome" className="text-sm" />
          </div>
          <span className="font-bold text-sm tracking-tight">Ask CareerMate AI</span>
        </div>
        <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-[10px] font-bold uppercase">Online</span>
      </div>
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="flex gap-3 max-w-[85%]">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center">
            <MaterialIcon name="auto_awesome" className="text-sm" />
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none text-sm">
            Welcome back, Alex! Based on your recent profile update, I've identified 3 high-growth roles in the Fintech sector that match your design skills. Would you like to see the required skill gaps?
          </div>
        </div>
        <div className="flex gap-3 ml-auto flex-row-reverse max-w-[85%]">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex-shrink-0 flex items-center justify-center">
            <MaterialIcon name="person" className="text-sm" />
          </div>
          <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none text-sm">
            Yes, please. Also, show me some local mentors who specialize in Fintech UI.
          </div>
        </div>
        <div className="flex gap-3 max-w-[85%] animate-pulse">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center">
            <MaterialIcon name="auto_awesome" className="text-sm" />
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none text-sm italic">
            Mapping mentorship network...
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about career paths..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-4 pr-12 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
            <MaterialIcon name="send" className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

const InsightCard = ({ type, title, description, actionText }: { type: 'warning' | 'trend'; title: string; description: string; actionText: string }) => {
  const icon = type === 'warning' ? 'warning' : 'auto_graph';
  const color = type === 'warning' ? 'text-yellow-500' : 'text-green-500';
  const borderColor = type === 'warning' ? 'border-yellow-500' : 'border-green-500';
  
  return (
    <div className={`bg-white dark:bg-slate-900 p-4 rounded-xl border-l-4 ${borderColor} border-y-slate-200 border-r-slate-200 dark:border-y-slate-800 dark:border-r-slate-800 shadow-sm`}>
      <div className="flex items-start gap-3">
        <MaterialIcon name={icon} className={`${color} text-xl mt-0.5`} />
        <div>
          <p className="font-bold text-sm">{title}</p>
          <p className="text-xs opacity-70 mt-1">{description}</p>
          <button className="text-[11px] font-bold text-primary mt-2 flex items-center gap-1 hover:underline uppercase">
            {actionText} <MaterialIcon name="chevron_right" className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Set initial theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const isDark = savedTheme === 'dark';
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  return (
    <div className="dashboard-container min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Head>
        <title>Future Proofer | Career Mode</title>
        <meta name="description" content="Your career development dashboard" />
        <MaterialIconsLink />
      </Head>

      {/* World Map Background */}
      <div className="fixed inset-0 world-map-bg pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 px-6 py-4 glass border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <MaterialIcon name="insights" className="text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-primary">FUTURE PROOFER</h1>
              <p className="text-[10px] font-bold tracking-widest uppercase opacity-60">Career Mode</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <a className="text-primary border-b-2 border-primary pb-1" href="#">Discovery</a>
            <a className="opacity-60 hover:opacity-100 transition-opacity" href="#">Skills Gap</a>
            <a className="opacity-60 hover:opacity-100 transition-opacity" href="#">Thinkforge</a>
            <a className="opacity-60 hover:opacity-100 transition-opacity" href="#">Network</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <MaterialIcon name="light_mode" />
              ) : (
                <MaterialIcon name="dark_mode" />
              )}
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-all text-sm font-bold">
              <MaterialIcon name="business_center" className="text-primary text-base" />
              Switch to Business Mode
            </button>
            
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZLC8DAztwC8tscvE479O4SSYSabNx53eBNK7ayKTK1fEFDoKHUAqCakeqNgXrNdFNpAoO2cCbd-zn-jXgtZCTkVOnTfUByyLel3blx1_9V-8BrhZSlbgpHs3ywlj8_SVVBI12SM8H4w6_B_nllUbhUTUb4epty57xmWvZ7sDLcnyHCRuzXuckCb7WNhriIQWUkWOPBDmkWo0081OPSkpXXZDe64ir8BJFb3twBR6JyCf5f5aMqd5wDjmbD-BWXJqs6VnBVocN3FSM"
                alt="User"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-8">
        {/* Left Sidebar */}
        <aside className="col-span-12 lg:col-span-3 space-y-6">
          <ProfileCard />
          <DocumentsCard />
        </aside>

        {/* Main Content */}
        <div className="col-span-12 lg:col-span-6 space-y-8">
          {/* Metrics */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard 
              title="Skills Growth" 
              value="Level 4" 
              icon="school"
              trend="12%"
            >
              <div className="mt-4 h-12 flex items-end gap-1">
                {[30, 45, 50, 65, 80, 95].map((height, i) => (
                  <div 
                    key={i}
                    className={`flex-1 ${i === 5 ? 'bg-accent' : 'bg-accent/20'} rounded-t-sm`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </MetricCard>

            <MetricCard 
              title="Match Accuracy" 
              value="92%" 
              icon="work_outline"
            >
              <div className="mt-4 h-12 flex items-end gap-1">
                {[60, 70, 65, 75, 85, 90].map((height, i) => (
                  <div 
                    key={i}
                    className={`flex-1 ${i === 5 ? 'bg-primary' : 'bg-primary/20'} rounded-t-sm`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </MetricCard>
          </section>

          {/* AI Chat */}
          <AIChat />
        </div>

        {/* Right Sidebar */}
        <aside className="col-span-12 lg:col-span-3 space-y-6">
          <h3 className="font-bold text-sm uppercase tracking-wider opacity-60 px-2 flex items-center gap-2">
            <MaterialIcon name="psychology" className="text-primary text-lg" />
            AI Insights
          </h3>
          
          <InsightCard
            type="warning"
            title="Skill Gap Detected"
            description="Foundational knowledge in 'Blockchain Protocol Design' is missing for your dream role at LedgerLink."
            actionText="View Learning Path"
          />
          
          <InsightCard
            type="trend"
            title="Career Trend"
            description="Remote Product Design roles in the UK are currently seeing a 15% salary premium for Nigerian talent."
            actionText="Explore Jobs"
          />
          
          <div className="bg-primary p-6 rounded-xl text-white shadow-lg relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
              <MaterialIcon name="trending_up" className="text-8xl" />
            </div>
            <h4 className="font-extrabold text-lg leading-tight">Future Earning Potential</h4>
            <p className="text-xs opacity-80 mt-2">By completing 2 more Thinkforge courses, your market value is projected to increase by $1,200/mo.</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-primary bg-slate-200 flex items-center justify-center overflow-hidden">
                    <Image
                      src={`https://randomuser.me/api/portraits/men/${30 + i}.jpg`}
                      alt={`User ${i}`}
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-primary bg-slate-400 flex items-center justify-center text-[10px] font-bold">
                  +8
                </div>
              </div>
              <button className="bg-white text-primary px-3 py-1 rounded-lg text-xs font-bold shadow-sm hover:bg-slate-100 transition-colors">
                Join Network
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200 dark:border-slate-800 mt-8 opacity-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold">
        <p>© 2026 Future Proofer AI Foresight Platform. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">Career Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Support</a>
          <a href="#" className="hover:text-primary transition-colors">For Recruiters</a>
        </div>
      </footer>
    </div>
  )
}
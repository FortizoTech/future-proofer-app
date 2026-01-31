"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Material Icons component
const MaterialIcon = ({ name, className = '' }: { name: string; className?: string }) => (
  <span className={`material-icons-round ${className}`}>
    {name}
  </span>
);

// Header Component
const Header = () => (
  <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
    <div className="flex items-center gap-10">
      <div className="flex items-center gap-2">
        <MaterialIcon name="auto_awesome" className="text-blue-600" />
        <span className="text-lg font-black text-slate-900 tracking-tight">Future Proofer</span>
      </div>
      <nav className="flex items-center gap-8">
        <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Dashboard</Link>
        <Link href="/skills-gap" className="text-sm font-bold text-blue-600 transition-colors">Career Path</Link>
        <Link href="/thinkforge" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Courses</Link>
        <Link href="/network" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Community</Link>
      </nav>
    </div>
    <div className="flex items-center gap-6">
      <div className="relative flex items-center">
        <MaterialIcon name="search" className="absolute left-3 text-slate-400" />
        <input type="text" placeholder="Search skills..." className="bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:bg-white focus:border-blue-400 transition-all w-64" />
      </div>
      <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200">
        <Image
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User"
          width={36}
          height={36}
          className="rounded-full object-cover"
        />
      </div>
    </div>
  </header>
);

// Skill Match Visualization Component
const SkillMatchVisualization = () => (
  <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
    <h3 className="text-lg font-bold text-slate-900 mb-8">Skill Match Visualization</h3>

    <div className="flex justify-center mb-8">
      <svg viewBox="0 0 400 300" className="w-full max-w-[400px] h-auto">
        {/* Left Circle - Current Skills */}
        <circle
          cx="140"
          cy="150"
          r="90"
          fill="rgba(96, 165, 250, 0.3)"
          stroke="rgba(59, 130, 246, 0.6)"
          strokeWidth="2"
        />

        {/* Right Circle - Required Skills */}
        <circle
          cx="260"
          cy="150"
          r="90"
          fill="rgba(191, 219, 254, 0.3)"
          stroke="rgba(147, 197, 253, 0.6)"
          strokeWidth="2"
        />

        {/* Center overlap text */}
        <text x="200" y="145" textAnchor="middle" className="text-4xl font-black fill-slate-900">
          65%
        </text>
        <text x="200" y="165" textAnchor="middle" className="text-[10px] font-bold fill-slate-400 tracking-widest">
          CURRENT
        </text>

        {/* Left label */}
        <text x="100" y="80" textAnchor="middle" className="text-xs font-bold fill-slate-500">
          Current
        </text>

        {/* Right label */}
        <text x="300" y="80" textAnchor="middle" className="text-xs font-bold fill-slate-500">
          Required
        </text>
      </svg>
    </div>

    <div className="flex justify-center gap-8">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-blue-400"></div>
        <span className="text-xs font-bold text-slate-500">Current Skills</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-blue-200"></div>
        <span className="text-xs font-bold text-slate-500">Required Skills</span>
      </div>
    </div>
  </div>
);

// Path to Mastery Component
const PathToMastery = () => {
  const courses = [
    {
      step: 'STEP 1',
      title: 'Advanced JavaScript Patterns',
      description: 'Deep dive on functional, reactive, and object-oriented design methodologies',
      platform: 'Thinkforge Core',
      hours: 120,
      link: 'Resume'
    },
    {
      step: 'STEP 2',
      title: 'React.js Fundamentals',
      description: 'Integrate into your full-stack dev workflows, Hooks, JSX, and Routing',
      platform: 'Thinkforge Mastery',
      hours: 80,
      link: 'Locked'
    },
    {
      step: 'STEP 3',
      title: 'Database & SQL Mastery',
      description: 'Learn to manage persistent data and design efficient schemas',
      platform: 'Thinkforge Tech',
      hours: 95,
      link: 'Locked'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm h-full">
      <h3 className="text-lg font-bold text-slate-900 mb-8">Path to Mastery</h3>

      <div className="flex flex-col gap-0">
        {courses.map((course, idx) => (
          <div key={idx} className="relative pb-10 last:pb-0">
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-blue-600 border-4 border-blue-50 z-10"></div>
                {idx < courses.length - 1 && <div className="absolute top-4 bottom-0 w-0.5 bg-slate-100 left-[7px]"></div>}
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full mb-2 inline-block">{course.step}</div>
                <h4 className="text-base font-bold text-slate-900 mb-1">{course.title}</h4>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">{course.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <MaterialIcon name="school" className="text-sm" />
                    <span>{course.platform}</span>
                  </div>
                  <a href="#" className={`text-xs font-bold flex items-center gap-1 ${course.link === 'Locked' ? 'text-slate-400 hover:no-underline cursor-not-allowed' : 'text-blue-600 hover:underline'}`}>
                    {course.link}
                    {course.link === 'Locked' ? (
                      <MaterialIcon name="lock" className="text-sm" />
                    ) : (
                      <MaterialIcon name="arrow_forward" className="text-sm" />
                    )}
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-black text-slate-900">{course.hours}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">hrs</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-blue-50 rounded-2xl flex justify-between items-center">
        <div className="flex flex-col">
          <h4 className="text-sm font-bold text-blue-900 mb-1">You're on the right track!</h4>
          <p className="text-xs text-blue-700/70">
            Listed skillsets find just good space at job postings & high-growth startups
          </p>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all">
          START FIRST COURSE
        </button>
      </div>
    </div>
  );
};

// Skill Breakdown Component
const SkillBreakdown = () => {
  const masteredSkills = [
    { name: 'HTML5 Semantic Tags', icon: 'check_circle', color: 'text-green-500' },
    { name: 'CSS3 & Responsive Design', icon: 'check_circle', color: 'text-green-500' },
    { name: 'Basic Git/GitHub', icon: 'check_circle', color: 'text-green-500' },
    { name: 'Problem-Solving', icon: 'check_circle', color: 'text-green-500' }
  ];

  const progressSkills = [
    { name: 'Modern JavaScript', percentage: 75 },
    { name: 'Data Structures', percentage: 60 }
  ];

  const missingSkills = [
    { name: 'React.js', icon: 'cancel', color: 'text-slate-300' },
    { name: 'Node.js Backend', icon: 'cancel', color: 'text-slate-300' },
    { name: 'SQL/Database', icon: 'cancel', color: 'text-slate-300' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-8">Skill Breakdown</h3>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">MASTERED</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {masteredSkills.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-green-100 bg-green-50/50">
              <MaterialIcon name={skill.icon} className={`text-xl ${skill.color}`} />
              <span className="text-sm font-bold text-slate-700">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">IN PROGRESS (2)</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {progressSkills.map((skill, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-blue-100 bg-blue-50/50">
              <div className="flex items-center gap-3">
                <MaterialIcon name="trending_up" className="text-xl text-blue-500" />
                <span className="text-sm font-bold text-slate-700">{skill.name}</span>
              </div>
              <span className="text-xs font-black text-blue-600">{skill.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-slate-300"></div>
          <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">MISSING (3)</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {missingSkills.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100">
              <MaterialIcon name={skill.icon} className={`text-xl ${skill.color}`} />
              <span className="text-sm font-bold text-slate-700">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function SkillAnalysisPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />

      <main className="max-w-7xl mx-auto p-10">
        {/* Page Title Section */}
        <div className="flex justify-between items-end mb-10">
          <div className="flex flex-col">
            <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-2">SKILL ANALYSIS</p>
            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Target Role: Software Developer</h1>
            <p className="text-slate-500 font-medium max-w-2xl">
              Visualizing your current capabilities against industry standards and mapping your path to mastery.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Export Report</button>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">Update Profile</button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-[1fr_400px] gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <SkillMatchVisualization />
            <SkillBreakdown />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            <PathToMastery />
          </div>
        </div>
      </main>
    </div>
  );
}

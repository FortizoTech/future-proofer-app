"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../assets/css/skill-analysis.css';

// Material Icons component
const MaterialIcon = ({ name, className = '' }: { name: string; className?: string }) => (
  <span className={`material-icons-round ${className}`}>
    {name}
  </span>
);

// Header Component
const Header = () => (
  <header className="skill-header">
    <div className="skill-header-left">
      <div className="skill-logo">
        <MaterialIcon name="auto_awesome" className="text-primary" />
        <span className="skill-logo-text">Future Proofer</span>
      </div>
      <nav className="skill-nav">
        <Link href="/dashboard" className="skill-nav-link">Dashboard</Link>
        <Link href="/skills-gap" className="skill-nav-link active">Career Path</Link>
        <Link href="/thinkforge" className="skill-nav-link">Courses</Link>
        <Link href="/network" className="skill-nav-link">Community</Link>
      </nav>
    </div>
    <div className="skill-header-right">
      <div className="skill-search">
        <MaterialIcon name="search" className="skill-search-icon" />
        <input type="text" placeholder="Search skills..." className="skill-search-input" />
      </div>
      <div className="skill-user-avatar">
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
  <div className="skill-match-card">
    <h3 className="skill-match-title">Skill Match Visualization</h3>

    <div className="venn-diagram-container">
      <svg viewBox="0 0 400 300" className="venn-diagram">
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
        <text x="200" y="145" textAnchor="middle" className="venn-percentage-text">
          65%
        </text>
        <text x="200" y="165" textAnchor="middle" className="venn-label-text">
          CURRENT
        </text>

        {/* Left label */}
        <text x="100" y="80" textAnchor="middle" className="venn-section-label">
          Current
        </text>

        {/* Right label */}
        <text x="300" y="80" textAnchor="middle" className="venn-section-label">
          Required
        </text>
      </svg>
    </div>

    <div className="skill-legend">
      <div className="legend-item">
        <div className="legend-dot current"></div>
        <span className="legend-label">Current Skills</span>
      </div>
      <div className="legend-item">
        <div className="legend-dot required"></div>
        <span className="legend-label">Required Skills</span>
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
    <div className="path-mastery-card">
      <h3 className="path-mastery-title">Path to Mastery</h3>

      <div className="path-steps">
        {courses.map((course, idx) => (
          <div key={idx} className="path-step">
            <div className="path-step-header">
              <div className="path-step-indicator">
                <div className="step-dot"></div>
                {idx < courses.length - 1 && <div className="step-line"></div>}
              </div>
              <div className="path-step-content">
                <div className="step-badge">{course.step}</div>
                <h4 className="step-title">{course.title}</h4>
                <p className="step-description">{course.description}</p>
                <div className="step-meta">
                  <div className="step-platform">
                    <MaterialIcon name="school" className="step-icon" />
                    <span>{course.platform}</span>
                  </div>
                  <a href="#" className={`step-link ${course.link === 'Locked' ? 'locked' : ''}`}>
                    {course.link}
                    {course.link === 'Locked' ? (
                      <MaterialIcon name="lock" className="lock-icon" />
                    ) : (
                      <MaterialIcon name="arrow_forward" className="arrow-icon" />
                    )}
                  </a>
                </div>
              </div>
              <div className="path-step-hours">
                <span className="hours-value">{course.hours}</span>
                <span className="hours-label">hrs</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="path-encouragement">
        <div className="encouragement-content">
          <h4 className="encouragement-title">You're on the right track!</h4>
          <p className="encouragement-text">
            Listed skillsets find just good space at job postings & high-growth startups
          </p>
        </div>
        <button className="start-course-btn">
          START FIRST COURSE
        </button>
      </div>
    </div>
  );
};

// Skill Breakdown Component
const SkillBreakdown = () => {
  const masteredSkills = [
    { name: 'HTML5 Semantic Tags', icon: 'check_circle', color: 'green' },
    { name: 'CSS3 & Responsive Design', icon: 'check_circle', color: 'green' },
    { name: 'Basic Git/GitHub', icon: 'check_circle', color: 'green' },
    { name: 'Problem-Solving', icon: 'check_circle', color: 'green' }
  ];

  const progressSkills = [
    { name: 'Modern JavaScript', percentage: 75 },
    { name: 'Data Structures', percentage: 60 }
  ];

  const missingSkills = [
    { name: 'React.js', icon: 'cancel', color: 'gray' },
    { name: 'Node.js Backend', icon: 'cancel', color: 'gray' },
    { name: 'SQL/Database', icon: 'cancel', color: 'gray' }
  ];

  return (
    <div className="skill-breakdown-card">
      <h3 className="skill-breakdown-title">Skill Breakdown</h3>

      <div className="breakdown-section">
        <div className="breakdown-header">
          <div className="breakdown-dot mastered"></div>
          <span className="breakdown-label">MASTERED</span>
        </div>
        <div className="breakdown-list">
          {masteredSkills.map((skill, idx) => (
            <div key={idx} className="breakdown-skill-item mastered">
              <MaterialIcon name={skill.icon} className={`skill-status-icon ${skill.color}`} />
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="breakdown-section">
        <div className="breakdown-header">
          <div className="breakdown-dot progress"></div>
          <span className="breakdown-label">IN PROGRESS (2)</span>
        </div>
        <div className="breakdown-list">
          {progressSkills.map((skill, idx) => (
            <div key={idx} className="breakdown-skill-item progress">
              <div className="skill-progress-info">
                <MaterialIcon name="trending_up" className="skill-status-icon blue" />
                <span className="skill-name">{skill.name}</span>
              </div>
              <span className="skill-percentage">{skill.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="breakdown-section">
        <div className="breakdown-header">
          <div className="breakdown-dot missing"></div>
          <span className="breakdown-label">MISSING (3)</span>
        </div>
        <div className="breakdown-list">
          {missingSkills.map((skill, idx) => (
            <div key={idx} className="breakdown-skill-item missing">
              <MaterialIcon name={skill.icon} className={`skill-status-icon ${skill.color}`} />
              <span className="skill-name">{skill.name}</span>
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
    <div className="skill-analysis-container">
      <Header />

      <main className="skill-main-content">
        {/* Page Title Section */}
        <div className="skill-title-section">
          <div className="skill-title-left">
            <p className="skill-analysis-label">SKILL ANALYSIS</p>
            <h1 className="skill-analysis-heading">Target Role: Software Developer</h1>
            <p className="skill-analysis-description">
              Visualizing your current capabilities against industry standards and mapping your path to mastery.
            </p>
          </div>
          <div className="skill-title-right">
            <button className="export-btn">Export Report</button>
            <button className="update-profile-btn">Update Profile</button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="skill-content-grid">
          {/* Left Column */}
          <div className="skill-left-column">
            <SkillMatchVisualization />
            <SkillBreakdown />
          </div>

          {/* Right Column */}
          <div className="skill-right-column">
            <PathToMastery />
          </div>
        </div>
      </main>
    </div>
  );
}

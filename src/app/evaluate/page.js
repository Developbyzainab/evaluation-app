"use client";

export const dynamic = 'force-dynamic';

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import allITSkills from "@/data/all-skills";
import { getSkillIcon } from "@/lib/skill-icons";

const difficulties = [
  { id: "Beginner", title: "Beginner", description: "Fundamentals & basic concepts", icon: "◌" },
  { id: "Intermediate", title: "Intermediate", description: "Practical knowledge & problem solving", icon: "◈" },
  { id: "Advanced", title: "Advanced", description: "Deep concepts & real-world scenarios", icon: "✦" },
];

const skillCategories = [
  { key: "Frontend", label: "Frontend", icon: "🌐" },
  { key: "Backend", label: "Backend", icon: "⚙️" },
  { key: "Database", label: "Database", icon: "🗄️" },
  { key: "Cloud", label: "Cloud", icon: "☁️" },
  { key: "DevOps", label: "DevOps", icon: "🔧" },
  { key: "AI/ML", label: "AI/ML", icon: "🤖" },
  { key: "Mobile", label: "Mobile", icon: "📱" },
  { key: "Full Stack", label: "Full Stack", icon: "🔗" },
  { key: "Version Control", label: "Git", icon: "📝" },
  { key: "UI/UX", label: "UI/UX", icon: "🎨" },
  { key: "Testing", label: "Testing", icon: "✅" },
  { key: "Security", label: "Security", icon: "🔒" },
  { key: "CMS/Ecommerce", label: "CMS", icon: "🛒" },
  { key: "Automation", label: "Automation", icon: "⚡" },
  { key: "Other", label: "Other", icon: "📦" },
];

export default function EvaluatePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [language, setLanguage] = useState("English");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const isUrdu = language === "Urdu";

  const categories = useMemo(() => ["All", ...skillCategories.map(c => c.key)], []);

  const filteredSkills = useMemo(() => {
    let skills = allITSkills;
    if (selectedCategory !== "All") {
      skills = skills.filter(s => s.category === selectedCategory);
    }
    if (searchQuery) {
      skills = skills.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return skills.filter(s => !selectedSkills.includes(s.name));
  }, [selectedCategory, searchQuery, selectedSkills]);

  function toggleSkill(skillName) {
    setSelectedSkills(prev => {
      if (prev.includes(skillName)) {
        return prev.filter(s => s !== skillName);
      }
      if (prev.length >= 5) return prev;
      return [...prev, skillName];
    });
    setSearchQuery("");
    setShowSearchResults(false);
    setError("");
  }

  function handleSearchFocus() {
    setShowSearchResults(true);
  }

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
    setSelectedCategory("All");
    setShowSearchResults(true);
  }

  function handleCategoryClick(cat) {
    setSelectedCategory(cat);
    setShowSearchResults(true);
  }

  function startAssessment() {
    setError("");

    if (!name.trim()) {
      setError(isUrdu ? "براہ کرم اپنا نام داخل کریں۔" : "Please enter your name.");
      return;
    }
    if (!experience) {
      setError(isUrdu ? "براہ کرم تجربے کی سطح منتخب کریں۔" : "Please select your experience level.");
      return;
    }
    if (selectedSkills.length === 0) {
      setError(isUrdu ? "براہ کرم کم از کم ایک ہنر منتخب کریں۔" : "Please select at least one skill.");
      return;
    }

    const assessment = {
      name: name.trim(),
      experience,
      language,
      difficulty,
      skills: selectedSkills,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("skilleval-assessment", JSON.stringify(assessment));
    localStorage.removeItem("skilleval-result");

    if (!isAuthenticated) {
      window.location.href = "/auth/login?redirect=/test";
    } else {
      router.push("/test");
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#05050a] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="mt-4 text-zinc-400">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#05050a] text-white" dir={isUrdu ? "rtl" : "ltr"}>
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[5%] top-[10%] h-96 w-96 rounded-full bg-violet-700/10 blur-[140px]" />
        <div className="absolute bottom-[5%] right-[5%] h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="grid-background absolute inset-0 opacity-[0.025]" />
      </div>

      {/* Navbar */}
      <nav className="border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-5">
          <Link href="/" className="flex items-center">
            <img src="/white.png" alt="Skill Evaluator" className="h-10 w-auto object-contain" />
          </Link>
          <Link href="/dashboard" className="text-xs text-zinc-500 transition hover:text-white">
            {isUrdu ? "ڈیش بورڈ →" : "Dashboard →"}
          </Link>
        </div>
      </nav>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-5 py-12">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-400">
            {isUrdu ? "اپنا Assessment بنائیں" : "Build Your Assessment"}
          </p>
          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            {isUrdu ? "ہمیں بتائیں آپ کیا جانتے ہیں۔" : "Tell us what you know."}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-500">
            {isUrdu
              ? "اپنے ہنروں اور ترجیحات کو منتخب کریں۔ ہم آپ کے لئے ایک ذاتی جائزہ بنائیں گے۔"
              : "Select your skills and preferences. We'll create a personalized evaluation for you."}
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {/* Candidate Info */}
          <div className="glass-card">
            <SectionTitle
              number="01"
              title={isUrdu ? "امیدوار کی معلومات" : "Candidate Information"}
              text={isUrdu ? "ہمیں اپنے بارے میں کچھ بتائیں۔" : "Tell us a little about yourself."}
            />
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <InputField
                label={isUrdu ? "پورا نام" : "Full Name"}
                placeholder={isUrdu ? "پورا نام" : "Full Name"}
                value={name}
                onChange={setName}
              />
              <div>
                <label className="form-label">{isUrdu ? "تجربہ" : "Experience"}</label>
                <select value={experience} onChange={e => setExperience(e.target.value)} className="form-input">
                  <option value="">{isUrdu ? "تجربہ منتخب کریں" : "Select experience"}</option>
                  <option value="Fresher">{isUrdu ? "فریشر" : "Fresher"}</option>
                  <option value="Less than 1 year">{isUrdu ? "1 سال سے کم" : "Less than 1 year"}</option>
                  <option value="1-2 years">{isUrdu ? "1-2 سال" : "1–2 years"}</option>
                  <option value="3+ years">{isUrdu ? "3+ سال" : "3+ years"}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="glass-card">
            <SectionTitle
              number="02"
              title={isUrdu ? "جائزے کی زبان" : "Evaluation Language"}
              text={isUrdu ? "وہ زبان منتخب کریں جس میں آپ خود کو مطمئن محسوس کرتے ہیں۔" : "Choose the language you are most comfortable with."}
            />
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {["English", "Urdu"].map(item => (
                <button
                  key={item}
                  onClick={() => setLanguage(item)}
                  className={`option-card ${language === item ? "option-card-active" : ""}`}
                >
                  <span className="text-2xl">{item === "English" ? "EN" : "اردو"}</span>
                  <span><strong>{item}</strong><small>{isUrdu ? "سوال اور تشریحات" : "Questions & explanations"}</small></span>
                  {language === item && <span className="ml-auto text-violet-300">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div className="glass-card">
            <SectionTitle
              number="03"
              title={isUrdu ? "مشکل کی سطح" : "Difficulty Level"}
              text={isUrdu ? "وہ سطح منتخب کریں جو آپ کے موجودہ علم سے میل کھاتی ہو۔" : "Choose the level that matches your current knowledge."}
            />
            <div className="mt-7 grid gap-3 md:grid-cols-3">
              {difficulties.map(item => (
                <button
                  key={item.id}
                  onClick={() => setDifficulty(item.id)}
                  className={`difficulty-card ${difficulty === item.id ? "difficulty-active" : ""}`}
                >
                  <span className="text-2xl text-violet-300">{item.icon}</span>
                  <strong className="mt-5 block">
                    {isUrdu ? (item.id === "Beginner" ? "ابتدائی" : item.id === "Intermediate" ? "درمیانہ" : "ماہر") : item.title}
                  </strong>
                  <small className="mt-2 block leading-5 text-zinc-600">
                    {isUrdu ? (item.id === "Beginner" ? "بنیادی تصورات" : item.id === "Intermediate" ? "عملی علم اور مسئلہ حل" : "گہرے تصورات اور حقیقی حالات") : item.description}
                  </small>
                </button>
              ))}
            </div>
          </div>

          {/* Skills Selection */}
          <div className="glass-card">
            <SectionTitle
              number="04"
              title={isUrdu ? "اپنے ہنر منتخب کریں" : "Choose Your Skills"}
              text={isUrdu ? "جائزے کے لئے 5 ہنروں تک منتخب کریں۔" : "Select up to 5 skills for evaluation."}
            />

            {/* Category Pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {skillCategories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryClick(cat.key)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat.key
                      ? "bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-violet-300 border border-violet-400/30 shadow-sm"
                      : "bg-white/[0.02] text-zinc-500 border border-white/[0.06] hover:border-violet-400/20 hover:text-zinc-300"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="mt-4 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                placeholder={isUrdu ? "ہنر تلاش کریں — React، Python، AWS..." : "Search skills — React, Python, AWS..."}
                className="form-input pl-12 pr-12"
                style={{ paddingLeft: '44px', paddingRight: '44px' }}
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setShowSearchResults(false); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                  aria-label={isUrdu ? "کلئیر کریں" : "Clear"}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Selected Skills */}
            <div className="mt-6 min-h-[48px]">
              {selectedSkills.length === 0 ? (
                <p className="text-sm text-zinc-600 text-center py-4">
                  {isUrdu ? "کوئی ہنر منتخب نہیں کیا گیا — اوپر کی کیٹیگری سے منتخب کریں یا تلاش کریں" : "No skills selected — pick from categories above or search"}
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map(skill => {
                    const skillObj = allITSkills.find(s => s.name === skill);
                    const icon = skillObj ? getSkillIcon(skillObj.category) : null;
                    return (
                      <span
                        key={skill}
                        className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-500/15 to-violet-500/5 text-violet-200 px-3 py-1.5 text-xs font-medium border border-violet-500/20 hover:from-violet-500/25 hover:to-violet-500/10 transition-all duration-200"
                      >
                        {icon}
                        <span className="truncate max-w-[120px]">{skill}</span>
                        <button
                          onClick={() => toggleSkill(skill)}
                          className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full text-[10px] text-violet-400 hover:bg-violet-500/20 hover:text-white transition-colors"
                          aria-label={isUrdu ? "ہٹائیں" : "Remove"}
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                  {selectedSkills.length < 5 && (
                    <button
                      onClick={() => { setShowSearchResults(true); handleSearchFocus(); }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.02] text-zinc-500 px-3 py-1.5 text-xs font-medium hover:border-violet-400/30 hover:text-violet-300 hover:bg-violet-500/5 transition-all"
                    >
                      <span>+</span>
                      <span>{isUrdu ? "مزید شامل کریں" : "Add more"}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Search Results Dropdown */}
            {(searchQuery || (showSearchResults && selectedCategory !== "All")) && filteredSkills.length > 0 && (
              <div className="mt-3 max-h-60 overflow-y-auto border border-white/[0.06] rounded-xl bg-black/20 p-2 animate-in fade-in-0 zoom-in-95 duration-150">
                {filteredSkills.slice(0, 20).map(skill => (
                  <button
                    key={skill.name}
                    type="button"
                    onClick={() => toggleSkill(skill.name)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-zinc-400 hover:bg-white/[0.03] hover:text-white"
                  >
                    {getSkillIcon(skill.category)}
                    <span className="flex-1 truncate text-sm font-medium">{skill.name}</span>
                    <span className="text-[10px] opacity-50 whitespace-nowrap">{skill.category}</span>
                    <span className="flex-shrink-0 w-5 h-5 rounded-full border border-white/[0.1] flex items-center justify-center text-[10px] text-zinc-500">+</span>
                  </button>
                ))}
                {filteredSkills.length > 20 && (
                  <div className="mt-2 pt-2 border-t border-white/[0.05] text-center text-[11px] text-zinc-600">
                    {isUrdu ? `اور ${filteredSkills.length - 20} نتائج...` : `+ ${filteredSkills.length - 20} more results...`}
                  </div>
                )}
              </div>
            )}
            {(searchQuery || (showSearchResults && selectedCategory !== "All")) && filteredSkills.length === 0 && (
              <div className="mt-3 py-6 text-center text-zinc-600 text-sm">
                {isUrdu ? "کوئی ہنر نہیں ملا" : "No skills found"}
              </div>
            )}
          </div>

          {/* Questions - Fixed at 100 */}
          <div className="glass-card">
            <SectionTitle
              number="05"
              title={isUrdu ? "سوالات" : "Questions"}
              text={isUrdu ? "ہر جائزے میں 100 سوالات ہوں گے۔" : "Each assessment has exactly 100 questions."}
            />
            <div className="mt-7">
              <div className="rounded-2xl border border-violet-400/30 bg-violet-500/10 text-violet-200 px-5 py-5 text-center">
                <span className="block text-2xl font-black">100</span>
                <span className="text-[10px] uppercase tracking-widest">{isUrdu ? "سوال" : "Questions"}</span>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-2xl border border-red-400/10 bg-red-500/[0.05] px-5 py-4 text-sm text-red-300">
              ⚠ {error}
            </div>
          )}

          {/* Start Button */}
          <button
            onClick={startAssessment}
            className="group w-full rounded-2xl bg-white px-6 py-5 font-bold text-black transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10"
          >
            {isUrdu ? "اپنا جائزہ شروع کریں" : "Start My Assessment"}
            <span className="ml-2 transition-all group-hover:ml-4">→</span>
          </button>

          <p className="text-center text-[10px] text-zinc-700">
            {isUrdu ? "آپ کی جائزے کی ترجیحات اس آلے پر محفوظ ہیں۔" : "Your assessment preferences are stored locally on this device."}
          </p>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({ number, title, text }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-violet-400">{number}</span>
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <p className="mt-2 text-xs text-zinc-600">{text}</p>
    </div>
  );
}

function InputField({ label, placeholder, value, onChange }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="form-input" />
    </div>
  );
}
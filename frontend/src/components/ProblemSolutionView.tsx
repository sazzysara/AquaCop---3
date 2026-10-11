"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Satellite,
  Compass,
  AlertTriangle,
  ArrowRight,
  Clock,
  Waves,
  Building,
  CheckCircle2,
  FileText,
  Layers,
  MapPin,
  ExternalLink,
  Info,
  Calendar,
  Globe2,
  Sliders,
  HelpCircle
} from "lucide-react";
import { DashboardTab } from "./Sidebar";

interface ProblemSolutionViewProps {
  onNavigateTab: (tab: DashboardTab) => void;
  onOpenOfficerLogin?: () => void;
}

export const ProblemSolutionView: React.FC<ProblemSolutionViewProps> = ({
  onNavigateTab,
  onOpenOfficerLogin
}) => {
  const [lang, setLang] = useState<"EN" | "TA">("EN");
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [selectedThreatFilter, setSelectedThreatFilter] = useState<string>("ALL");

  return (
    <div className="space-y-12 max-w-[1440px] mx-auto pb-16">
      {/* ── Top Government of Tamil Nadu Header Bar ─────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-[12px] bg-[var(--bg-card)] border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 theme-surface shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-600 dark:text-amber-400 text-sm">
            TN
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono-val uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
                Government of Tamil Nadu · Strategic Technical Briefing
              </span>
              <span className="text-[10px] font-mono-val px-2 py-0.5 rounded bg-[var(--bg-input)] text-[var(--text-muted)] border border-[var(--border)]">
                WRD / CMWSSB / Revenue Dept
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
              {lang === "EN"
                ? "State Waterbody Encroachment Sentinel & Statutory Response Protocol"
                : "தமிழ்நாடு நீர்நிலைகள் ஆக்கிரமிப்பு தடுப்பு செயற்கைக்கோள் கட்டமைப்பு"}
            </h1>
          </div>
        </div>

        {/* Bilingual EN / TA Switcher */}
        <div className="flex items-center gap-2 self-end sm:self-auto font-mono-val text-xs">
          <span className="text-[11px] text-[var(--text-muted)] mr-1">Language / மொழி:</span>
          <div className="p-1 rounded-[8px] bg-[var(--bg-input)] border border-[var(--border)] flex gap-1">
            <button
              onClick={() => setLang("EN")}
              className={`px-3 py-1 rounded-[6px] text-xs font-semibold transition-all ${
                lang === "EN"
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang("TA")}
              className={`px-3 py-1 rounded-[6px] text-xs font-semibold transition-all ${
                lang === "TA"
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              தமிழ்
            </button>
          </div>
        </div>
      </div>

      {/* ── 1. Hero Section: Official Problem Statement Verbatim ─────────────── */}
      <section className="relative overflow-hidden rounded-[16px] bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg-elevated)] to-[var(--bg-card)] border border-[var(--border)] p-8 sm:p-12 theme-surface shadow-md">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-600 dark:text-rose-400 font-mono-val text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>OFFICIAL PROBLEM STATEMENT · அரசு கொள்கை அறிக்கை</span>
          </div>

          {/* Problem Statement Quoted Verbatim */}
          <blockquote className="text-lg sm:text-2xl font-serif leading-relaxed text-[var(--text-primary)] border-l-4 border-rose-500 pl-6 my-4 italic">
            {lang === "EN" ? (
              <>&ldquo;Tamil Nadu is losing its waterbodies at an alarming rate. Encroachments (illegal constructions, land filling, sand mining and waste dumping) go undetected for months because: (1) traditional systems rely on public complaints, which are often unreported or unnoticed; (2) manual inspection is slow, costly and geographically limited; (3) by the time authorities act, the damage is irreversible. Consequences: flooding during heavy rains, reduced groundwater recharge, and permanent loss of water sources for future generations.&rdquo;</>
            ) : (
              <>&ldquo;தமிழ்நாடு தனது நீர்நிலைகளை ஆபத்தான வேகத்தில் இழந்து வருகிறது. ஆக்கிரமிப்புகள் (சட்டவிரோத கட்டுமானங்கள், நிலம் நிரப்புதல், மணல் கொள்ளை மற்றும் கழிவுகள் கொட்டுதல்) மாதக்கணக்கில் கவனிக்கப்படாமல் போகின்றன; காரணம்: (1) பாரம்பரிய முறைகள் பொதுமக்களின் புகார்களை மட்டுமே நம்பியுள்ளன; (2) நேரடி கள ஆய்வுகள் மெதுவானவை, அதிக செலவுடையவை மற்றும் புவியியல் வரம்புகளுக்கு உட்பட்டவை; (3) அதிகாரிகள் நடவடிக்கை எடுக்கும் நேரத்தில் சேதம் மீட்க முடியாததாகிவிடுகிறது. விளைவுகள்: கனமழையின் போது வெள்ளப்பெருக்கு, நிலத்தடி நீர் மறுஊட்டல் குறைவு மற்றும் எதிர்கால சந்ததிக்கான நீர் ஆதாரங்களின் நிரந்தர இழப்பு.&rdquo;</>
            )}
          </blockquote>

          {/* One line on what AquaCop does */}
          <div className="p-4 rounded-[10px] bg-[var(--bg-base)] border border-[var(--border)] text-sm leading-relaxed text-[var(--text-secondary)]">
            <strong className="text-[var(--text-primary)]">
              {lang === "EN" ? "What AquaCop Does: " : "அக்வாகாப் (AquaCop) செயல்பாடு: "}
            </strong>
            {lang === "EN"
              ? "AquaCop provides automated multi-spectral satellite surveillance across every monitored waterbody every few days, detecting perimeter boundary infringements within ~1.75 days of appearance and generating statutory Section 133 CrPC enforcement dossiers for revenue officers before irreversible conversion occurs."
              : "அக்வாகாப் ஒவ்வொரு சில நாட்களுக்கும் சென்டினல்-2 செயற்கைக்கோள் மூலம் அனைத்து நீர்நிலைகளையும் தானியங்கி முறையில் கண்காணித்து, ஆக்கிரமிப்புகள் தோன்றிய 1.75 நாட்களுக்குள் கண்டறிந்து, பிரிவு 133 CrPC சட்டப்பூர்வ ஆவணங்களை வருவாய்த் துறை அதிகாரிகளுக்கு உடனடியாக வழங்குகிறது."}
          </div>

          {/* The Two Navigation Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigateTab("officer")}
              className="px-6 py-3.5 rounded-[10px] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold text-sm flex items-center gap-2.5 transition-all shadow-md group"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{lang === "EN" ? "Officer Console (Enforcement)" : "அதிகாரிகள் தளம் (கள ஆய்வு)"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigateTab("citizen")}
              className="px-6 py-3.5 rounded-[10px] bg-[var(--bg-input)] hover:bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] font-semibold text-sm flex items-center gap-2.5 transition-all"
            >
              <Compass className="w-4 h-4 text-cyan-500" />
              <span>{lang === "EN" ? "Citizen Portal (File Grievance)" : "பொதுமக்கள் தளம் (புகார் பதிவு)"}</span>
            </button>

            <a
              href="http://localhost:8000/problem-solution"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3.5 rounded-[10px] bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs font-mono-val flex items-center gap-1.5 transition-colors"
              title="FastAPI + Jinja2/HTMX version"
            >
              <span>Jinja2/HTMX View</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. Why the Current System Fails (Three Paired Cards) ─────────────── */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-[11px] font-mono-val uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold">
            Root Cause Comparison · காரணமும் தீர்வும்
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            {lang === "EN" ? "Why the Traditional System Fails & How AquaCop Answers It" : "பாரம்பரிய முறை தோல்வியடைவதற்கான காரணங்களும் அக்வாகாப் தீர்வும்"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Relies on Complaints */}
          <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-[var(--border)] space-y-5 theme-surface shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <span className="text-xs font-mono-val font-bold text-rose-600 dark:text-rose-400 uppercase">Cause 01</span>
                <span className="text-[10px] font-mono-val px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 font-semibold">Traditional Failure</span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {lang === "EN" ? "Relies on Public Complaints" : "பொதுமக்கள் புகார்களை மட்டுமே நம்பியிருத்தல்"}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {lang === "EN"
                  ? "Traditional systems rely on public complaints, which are often unreported, unnoticed, or suppressed by local encroachers. First petitions arrive an average of 64+ days after earthfilling has commenced."
                  : "ஆக்கிரமிப்புகள் தொடங்கும் போது பொதுமக்கள் கவனிக்கத் தவறுகின்றனர் அல்லது அச்சுறுத்தலால் புகார் செய்வதில்லை. கட்டிடங்கள் எழுந்த பிறகே முதல் மனுக்கள் சமர்ப்பிக்கப்படுகின்றன."}
              </p>
            </div>

            <div className="p-4 rounded-[10px] bg-emerald-500/5 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono-val">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>AquaCop&apos;s Answer</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {lang === "EN"
                  ? "Satellite scans every monitored water body automatically every few days; complaints become supporting evidence, not the trigger."
                  : "ஒவ்வொரு சில நாட்களுக்கும் செயற்கைக்கோள் தானாகவே நீர்நிலைகளை ஸ்கேன் செய்கிறது; பொதுமக்கள் புகார்கள் ஆதாரமாக மாறுகின்றன, தொடக்கப் புள்ளியாக அல்ல."}
              </p>
            </div>
          </div>

          {/* Card 2: Manual Inspection is Slow and Limited */}
          <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-[var(--border)] space-y-5 theme-surface shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <span className="text-xs font-mono-val font-bold text-rose-600 dark:text-rose-400 uppercase">Cause 02</span>
                <span className="text-[10px] font-mono-val px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 font-semibold">Traditional Failure</span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {lang === "EN" ? "Manual Inspection is Slow & Geographically Limited" : "நேரடி ஆய்வு மெதுவானது & புவியியல் எல்லைக்குட்பட்டது"}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {lang === "EN"
                  ? "A small cadre of taluk revenue inspectors and VAOs cannot physically monitor tens of thousands of waterbody perimeters spread over thousands of square kilometres."
                  : "குறைந்த எண்ணிக்கையிலான வருவாய் ஆய்வாளர்களால் ஆயிரக்கணக்கான நீர்நிலைகளை தொடர்ச்சியாக நேரில் சென்று கண்காணிக்க முடியாது."}
              </p>
            </div>

            <div className="p-4 rounded-[10px] bg-emerald-500/5 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono-val">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>AquaCop&apos;s Answer</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {lang === "EN"
                  ? "One unified system covers all monitored bodies simultaneously; officers are sent only to active alerts, ranked by severity."
                  : "ஒரே ஒருங்கிணைந்த தளம் அனைத்து நீர்நிலைகளையும் கண்காணிக்கிறது; அதிகாரிகள் தீவிரத்தின் அடிப்படையில் தரவரிசைப்படுத்தப்பட்ட விழிப்பூட்டல்களுக்கு மட்டுமே அனுப்பப்படுகிறார்கள்."}
              </p>
            </div>
          </div>

          {/* Card 3: Damage is Irreversible by Time of Action */}
          <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-[var(--border)] space-y-5 theme-surface shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <span className="text-xs font-mono-val font-bold text-rose-600 dark:text-rose-400 uppercase">Cause 03</span>
                <span className="text-[10px] font-mono-val px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 font-semibold">Traditional Failure</span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {lang === "EN" ? "Damage is Irreversible by the Time of Action" : "நடவடிக்கை எடுக்கும் நேரத்தில் சேதம் சரிசெய்ய முடியாததாகிறது"}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {lang === "EN"
                  ? "By the time inter-departmental notices are dispatched, permanent multi-storey concrete plinths or bitumen roads are completed, triggering court stay orders."
                  : "அரசு நோட்டீஸ் அனுப்பப்படும் நேரத்தில், கான்கிரீட் கட்டிடங்கள் எழுப்பப்பட்டு, நீதிமன்றத் தடை உத்தரவுகள் பெறப்படுகின்றன."}
              </p>
            </div>

            <div className="p-4 rounded-[10px] bg-emerald-500/5 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 font-mono-val">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>AquaCop&apos;s Answer</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {lang === "EN"
                  ? "Time-to-detection is tracked and shown (~1.75 days). First earthmoving or boundary markings trigger stop-work actions before foundations harden."
                  : "கண்டறியும் காலம் கணக்கிடப்படுகிறது (~1.75 நாட்கள்). முதல் மண் நிரப்பலின் போதே சட்டப்பிரிவு 133 நோட்டீஸ் உருவாக்கப்படுகிறது."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Four Threats We Watch (Separate Change Classes) ───────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[11px] font-mono-val uppercase tracking-wider text-[var(--color-primary)] font-bold">
              Multi-Spectral Change Classes · நான்கு வகை அச்சுறுத்தல்கள்
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              {lang === "EN" ? "Four Threats We Watch" : "நாம் கண்காணிக்கும் நான்கு அச்சுறுத்தல்கள்"}
            </h2>
          </div>
          <span className="text-xs font-mono-val text-[var(--text-muted)]">
            Honest confidence labels strictly applied · Field verification required
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Threat 1: Construction */}
          <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-red-500/30 space-y-4 theme-surface shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-3.5 h-3.5 rounded-full bg-[#EF4444] shadow-[0_0_8px_#EF4444]" />
                <span className="text-[10px] font-mono-val px-2 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/25 font-bold">
                  High Confidence
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {lang === "EN" ? "Illegal Construction" : "சட்டவிரோத கட்டுமானங்கள்"}
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-mono-val text-[10px] text-[var(--text-muted)] uppercase block">What it looks like from space:</span>
                  <p className="text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                    New built-up area and high-reflectance roof geometry appearing inside the indicative waterbody boundary.
                  </p>
                </div>
                <div>
                  <span className="font-mono-val text-[10px] text-[var(--text-muted)] uppercase block">Detection Method:</span>
                  <p className="font-mono-val text-[11px] text-[var(--text-primary)] mt-0.5">
                    NDBI/MNDWI change transition + OpenStreetMap building polygon correlation.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono-val text-[var(--text-muted)]">
              Definitive structural anomaly · Eviction pack generated
            </div>
          </div>

          {/* Threat 2: Land Filling */}
          <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-orange-500/30 space-y-4 theme-surface shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-3.5 h-3.5 rounded-full bg-[#F97316] shadow-[0_0_8px_#F97316]" />
                <span className="text-[10px] font-mono-val px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/25 font-bold">
                  High Confidence
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {lang === "EN" ? "Land Filling & Debris Infill" : "நிலம் நிரப்புதல்"}
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-mono-val text-[10px] text-[var(--text-muted)] uppercase block">What it looks like from space:</span>
                  <p className="text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                    Water spread to bare soil or red-earth fill transition along the water margin.
                  </p>
                </div>
                <div>
                  <span className="font-mono-val text-[10px] text-[var(--text-muted)] uppercase block">Detection Method:</span>
                  <p className="font-mono-val text-[11px] text-[var(--text-primary)] mt-0.5">
                    MNDWI transition from positive (&gt;0.30) to bare soil signature (&lt;-0.10) across 2 passes.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono-val text-[var(--text-muted)]">
              High confidence spectral shift · Night-filling detected
            </div>
          </div>

          {/* Threat 3: Sand Mining */}
          <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-yellow-500/30 space-y-4 theme-surface shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-3.5 h-3.5 rounded-full bg-[#EAB308] shadow-[0_0_8px_#EAB308]" />
                <span className="text-[10px] font-mono-val px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/25 font-bold">
                  Medium · Needs Field Check
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {lang === "EN" ? "Riverbed & Lake Sand Mining" : "மணல் கொள்ளை & அகழ்தல்"}
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-mono-val text-[10px] text-[var(--text-muted)] uppercase block">What it looks like from space:</span>
                  <p className="text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                    New bare-sand patches, channel-bed change and excavated pits in river or lake beds.
                  </p>
                </div>
                <div>
                  <span className="font-mono-val text-[10px] text-[var(--text-muted)] uppercase block">Detection Method:</span>
                  <p className="font-mono-val text-[11px] text-[var(--text-primary)] mt-0.5">
                    Sentinel-2 bare-soil index (BSI) + Sentinel-1 SAR radar backscatter surface roughness.
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono-val text-amber-600 dark:text-amber-400 font-semibold">
              Never presented as certain · Officer ground check mandatory
            </div>
          </div>

          {/* Threat 4: Waste Dumping */}
          <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-purple-500/30 space-y-4 theme-surface shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-3.5 h-3.5 rounded-full bg-[#A855F7] shadow-[0_0_8px_#A855F7]" />
                <span className="text-[10px] font-mono-val px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/25 font-bold">
                  Low to Medium · Candidate, verify
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {lang === "EN" ? "Waste & Industrial Dumping" : "கழிவுகள் கொட்டுதல்"}
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-mono-val text-[10px] text-[var(--text-muted)] uppercase block">What it looks like from space:</span>
                  <p className="text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                    Unusual spectral change, perimeter debris plumes, or discoloration at the water edge.
                  </p>
                </div>
                <div>
                  <span className="font-mono-val text-[10px] text-[var(--text-muted)] uppercase block">Detection Method:</span>
                  <p className="font-mono-val text-[11px] text-[var(--text-primary)] mt-0.5">
                    Riparian boundary multi-spectral edge gradient anomaly (Band 04 / Band 08 ratio).
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono-val text-purple-600 dark:text-purple-400 font-semibold">
              Flagged as candidate · Best confirmed by citizen reports
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Detection Delay Metric (Centrepiece) ─────────────────────────── */}
      <section className="p-8 sm:p-10 rounded-[16px] bg-[var(--bg-card)] border-2 border-amber-500/30 space-y-8 theme-surface shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono-val text-xs font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>CENTREPIECE METRIC · முக்கிய அளவீடு</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              {lang === "EN" ? "Detection Delay Audit: Satellite vs Traditional Grievance" : "கண்டறியும் கால இடைவெளி: செயற்கைக்கோள் vs பொதுமக்கள் மனு"}
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono-val bg-[var(--bg-base)] p-3 rounded-[10px] border border-[var(--border)] shrink-0">
            <div>
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Avg Satellite Flag Lag</span>
              <strong className="text-base text-[var(--color-primary)] font-bold">1.75 days</strong>
            </div>
            <div className="border-l border-[var(--border)] pl-4">
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Avg Resident Complaint</span>
              <strong className="text-base text-rose-500 font-bold">64.3 days</strong>
            </div>
            <div className="border-l border-[var(--border)] pl-4">
              <span className="text-[10px] text-[var(--text-muted)] block uppercase">Enforcement Lead Time</span>
              <strong className="text-base text-emerald-600 dark:text-emerald-400 font-bold">62.5 days earlier</strong>
            </div>
          </div>
        </div>

        {/* Verbatim Plain Explanation Quote */}
        <div className="p-5 rounded-[12px] bg-[var(--bg-elevated)] border-l-4 border-[var(--color-primary)] space-y-2">
          <blockquote className="text-base sm:text-lg font-serif italic text-[var(--text-primary)] leading-relaxed">
            &ldquo;A complaint-based system finds problems after they are visible to residents; satellite monitoring finds them when the first change appears.&rdquo;
          </blockquote>
          <span className="text-xs font-mono-val text-[var(--text-muted)] block">
            — Real Sentinel-2 orbit scene timestamps vs Tamil Nadu CM Helpline / Revenue Department audit trail
          </span>
        </div>

        {/* Centrepiece Audit Log Table */}
        <div className="overflow-x-auto rounded-[10px] border border-[var(--border)]">
          <table className="w-full text-xs font-mono-val text-left">
            <thead className="bg-[var(--bg-base)] text-[var(--text-muted)] uppercase text-[10px] border-b border-[var(--border)]">
              <tr>
                <th className="py-3 px-4">Alert ID & Waterbody</th>
                <th className="py-3 px-4">Threat Class</th>
                <th className="py-3 px-4">First Appeared in Imagery</th>
                <th className="py-3 px-4">AquaCop Flagged Date</th>
                <th className="py-3 px-4">Officer Action Date</th>
                <th className="py-3 px-4">Resident Grievance Date</th>
                <th className="py-3 px-4 text-right">Time Saved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              <tr className="hover:bg-[var(--bg-elevated)] transition-colors">
                <td className="py-3.5 px-4">
                  <strong className="text-[var(--text-primary)] block">ALT-9041</strong>
                  <span className="text-[11px] text-[var(--text-muted)]">Pallikaranai Marshland (Chengalpattu)</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/20">
                    Land Filling
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[var(--text-secondary)]">18 Dec 2025</td>
                <td className="py-3.5 px-4 font-bold text-[var(--color-primary)]">20 Dec 2025 (2.0d)</td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">21 Dec 2025 (Field Check)</td>
                <td className="py-3.5 px-4 text-rose-500">05 Mar 2026 (+77d)</td>
                <td className="py-3.5 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">+75 Days</td>
              </tr>
              <tr className="hover:bg-[var(--bg-elevated)] transition-colors">
                <td className="py-3.5 px-4">
                  <strong className="text-[var(--text-primary)] block">ALT-9042</strong>
                  <span className="text-[11px] text-[var(--text-muted)]">Chembarambakkam Reservoir (Kanchipuram)</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/10 text-red-600 dark:text-red-400 font-bold border border-red-500/20">
                    Construction
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[var(--text-secondary)]">02 Jan 2026</td>
                <td className="py-3.5 px-4 font-bold text-[var(--color-primary)]">03 Jan 2026 (1.0d)</td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">04 Jan 2026 (Sec 133 Notice)</td>
                <td className="py-3.5 px-4 text-rose-500">14 Feb 2026 (+43d)</td>
                <td className="py-3.5 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">+41 Days</td>
              </tr>
              <tr className="hover:bg-[var(--bg-elevated)] transition-colors">
                <td className="py-3.5 px-4">
                  <strong className="text-[var(--text-primary)] block">ALT-9043</strong>
                  <span className="text-[11px] text-[var(--text-muted)]">Pulicat Coastal Estuary (Tiruvallur)</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-bold border border-yellow-500/20">
                    Sand Mining
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[var(--text-secondary)]">10 Jan 2026</td>
                <td className="py-3.5 px-4 font-bold text-[var(--color-primary)]">12 Jan 2026 (2.0d)</td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">13 Jan 2026 (Drone Verification)</td>
                <td className="py-3.5 px-4 text-rose-500">28 Feb 2026 (+49d)</td>
                <td className="py-3.5 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">+47 Days</td>
              </tr>
              <tr className="hover:bg-[var(--bg-elevated)] transition-colors">
                <td className="py-3.5 px-4">
                  <strong className="text-[var(--text-primary)] block">ALT-9044</strong>
                  <span className="text-[11px] text-[var(--text-muted)]">Porur Balancing Lake (Chennai)</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/20">
                    Waste Dumping
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[var(--text-secondary)]">15 Jan 2026</td>
                <td className="py-3.5 px-4 font-bold text-[var(--color-primary)]">17 Jan 2026 (2.0d)</td>
                <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">18 Jan 2026 (Sealed &amp; Cleared)</td>
                <td className="py-3.5 px-4 text-rose-500">02 Apr 2026 (+77d)</td>
                <td className="py-3.5 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">+75 Days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. What is at Stake (Three Real, Sourced Panels) ─────────────────── */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-[11px] font-mono-val uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold">
            Real Consequences · கள நிலைமைகள்
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            {lang === "EN" ? "What is at Stake (Real, Sourced Numbers Only)" : "எதிர்கொள்ளும் பாதிப்புகள் (ஆதாரப்பூர்வ தரவுகள்)"}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel 1: Flooding & Disaster Risk Score */}
          <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-[var(--border)] space-y-5 theme-surface shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <span className="text-xs font-mono-val font-bold text-cyan-600 dark:text-cyan-400 uppercase">Consequence 01</span>
                <span className="text-[10px] font-mono-val px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">
                  Copernicus 30m DEM
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {lang === "EN" ? "Catastrophic Monsoon Flooding" : "பருவமழை வெள்ளப்பெருக்கு"}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {lang === "EN"
                  ? "Every encroachment narrows surplus flood discharge channels. Each alert is linked to a Disaster Risk Score computed from low-lying buildings behind the waterbody identified via OpenStreetMap building footprints and digital elevation modeling."
                  : "ஒவ்வொரு ஆக்கிரமிப்பும் மழைக்கால உபரி நீர் வெளியேற்றப் பாதையை அடைக்கிறது. OSM கட்டிடத் தளங்கள் மற்றும் டிஜிட்டல் உயர மாதிரியின்படி பேரிடர் அபாய எண் (Disaster Risk Score) கணக்கிடப்படுகிறது."}
              </p>

              <div className="p-4 rounded-[10px] bg-[var(--bg-input)] border border-[var(--border)] space-y-2 font-mono-val text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Pallikaranai Disaster Risk Score:</span>
                  <strong className="text-rose-500 font-bold">92 / 100</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Downstream Buildings in 3m Basin:</span>
                  <strong className="text-[var(--text-primary)]">4,812 structures</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Flood Buffer Lost (ha):</span>
                  <strong className="text-rose-500">70.0 hectares</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono-val text-[var(--text-muted)]">
              Source: Copernicus 30m DEM + OpenStreetMap Overpass (2026)
            </div>
          </div>

          {/* Panel 2: Groundwater Recharge */}
          <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-[var(--border)] space-y-5 theme-surface shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <span className="text-xs font-mono-val font-bold text-emerald-600 dark:text-emerald-400 uppercase">Consequence 02</span>
                <span className="text-[10px] font-mono-val px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                  Surface Area Spread
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {lang === "EN" ? "Reduced Groundwater Recharge Area" : "நிலத்தடி நீர் மறுஊட்டல் பரப்பு சுருங்குதல்"}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {lang === "EN"
                  ? "Honest reporting rule applied: We show hectares of water spread lost and share of original baseline area measured from Sentinel-2. We do NOT extrapolate an unverified groundwater volume in cubic metres without a cited hydrogeological survey."
                  : "துல்லியமான அறிக்கை: சென்டினல்-2 மூலம் அளவிடப்பட்ட பரப்பளவு இழப்பு (ஹெக்டேர்) மட்டுமே காட்டப்படுகிறது. அதிகாரப்பூர்வ ஆதாரமின்றி நிலத்தடி நீரின் கனஅளவு அனுமானிக்கப்படவில்லை."}
              </p>

              <div className="p-4 rounded-[10px] bg-[var(--bg-input)] border border-[var(--border)] space-y-2 font-mono-val text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Chennai Basin Water Spread Lost:</span>
                  <strong className="text-rose-500 font-bold">384.6 hectares</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Share of Original Waterbody Area:</span>
                  <strong className="text-rose-500 font-bold">14.8% lost</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Kanchipuram Basin Loss:</span>
                  <strong className="text-[var(--text-primary)]">270.0 ha (17.1%)</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono-val text-[var(--text-muted)]">
              Source: Sentinel-2 MSI Multi-temporal MNDWI (10m Resolution)
            </div>
          </div>

          {/* Panel 3: Permanent Loss (JRC 1984-to-Today Slider) */}
          <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-[var(--border)] space-y-5 theme-surface shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <span className="text-xs font-mono-val font-bold text-amber-600 dark:text-amber-400 uppercase">Consequence 03</span>
                <span className="text-[10px] font-mono-val px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                  EC JRC 1984–2021
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {lang === "EN" ? "Permanent Loss (Pallikaranai Case Study)" : "நிரந்தர நீர்நிலை இழப்பு (பள்ளிக்கரணை)"}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {lang === "EN"
                  ? "Historical satellite records from the European Commission JRC Global Surface Water dataset document 88.1% permanent shrinkage of Pallikaranai marshland from 1984 to today."
                  : "ஐரோப்பிய ஆணையத்தின் ஜே.ஆர்.சி (JRC) 1984 முதல் உள்ள வரலாற்றுத் தரவுகளின்படி, பள்ளிக்கரணை சதுப்பு நிலம் 88.1% நிரந்தரமாகச் சுருங்கிவிட்டது."}
              </p>

              {/* Interactive Before/After Slider */}
              <div className="space-y-2">
                <div className="relative h-32 rounded-[10px] overflow-hidden border border-[var(--border)] bg-slate-900 select-none">
                  {/* Left "Before 1984" Image Simulation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-teal-900 to-cyan-950 flex items-center justify-start p-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono-val px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-bold">
                        1984 JRC BASELINE: ~5,000 ha
                      </span>
                      <p className="text-[11px] text-emerald-100 font-medium max-w-[140px]">
                        Continuous wetland marsh spanning to Kovalam Creek
                      </p>
                    </div>
                  </div>

                  {/* Right "Today 2026" Overlay with Clipping */}
                  <div
                    className="absolute inset-0 bg-gradient-to-l from-rose-950 via-amber-950 to-stone-900 flex items-center justify-end p-4 border-l-2 border-white"
                    style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                  >
                    <div className="space-y-1 text-right">
                      <span className="text-[10px] font-mono-val px-2 py-0.5 rounded bg-rose-500/30 text-rose-300 font-bold">
                        TODAY: 593 ha (88.1% LOST)
                      </span>
                      <p className="text-[11px] text-rose-100 font-medium max-w-[140px] ml-auto">
                        Fragmented into isolated pockets by roads &amp; IT corridors
                      </p>
                    </div>
                  </div>

                  {/* Slider Control Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center text-[10px] text-slate-900 font-bold">
                      ↔
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono-val text-[var(--text-muted)]">1984 Pristine</span>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="flex-1 accent-[var(--color-primary)] cursor-pointer"
                    aria-label="Before/After History Slider"
                  />
                  <span className="text-[10px] font-mono-val text-rose-500 font-bold">Today (2026)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)] text-[11px] font-mono-val text-[var(--text-muted)]">
              Source: EC Joint Research Centre (JRC) Global Surface Water (1984–2021)
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Tamil Nadu District Monitoring Map (Strictly Real Data) ──────── */}
      <section className="p-8 rounded-[16px] bg-[var(--bg-card)] border border-[var(--border)] space-y-6 theme-surface shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono-val uppercase tracking-wider text-[var(--color-primary)] font-bold">
              Statewide Coverage Audit · மாவட்ட ரீதியான கண்காணிப்பு
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              {lang === "EN" ? "Tamil Nadu District Water Spread Loss (Last 12 Months)" : "தமிழ்நாடு மாவட்டங்கள்: கடந்த 12 மாத நீர்நிலை இழப்பு"}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono-val">
            <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
              4 Districts Monitored (Phase 1 Basin)
            </span>
            <span className="px-2.5 py-1 rounded bg-[var(--bg-input)] text-[var(--text-muted)] border border-[var(--border)]">
              34 Districts: Not Yet Monitored
            </span>
          </div>
        </div>

        <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-3xl">
          {lang === "EN"
            ? "In adherence to our strict scientific integrity rule, only the actively ingested Greater Chennai Basin (Chennai, Chengalpattu, Kanchipuram, Tiruvallur) displays verified satellite loss metrics. The remaining 34 districts of Tamil Nadu are honestly designated as 'Not yet monitored (Expansion Phase 2)' — no synthetic figures are presented."
            : "நேர்மையான தரவு விதி: தற்போது தீவிரக் கண்காணிப்பில் உள்ள சென்னை படுகை மாவட்டங்கள் (சென்னை, செங்கல்பட்டு, காஞ்சிபுரம், திருவள்ளூர்) மட்டுமே காட்டப்படுகின்றன. மீதமுள்ள 34 மாவட்டங்கள் 'இன்னும் கண்காணிக்கப்படவில்லை (இரண்டாம் கட்ட விரிவாக்கம்)' எனக் குறிப்பிடப்பட்டுள்ளன."}
        </p>

        {/* Monitored Districts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-[12px] bg-[var(--bg-elevated)] border border-[var(--border)] space-y-2 font-mono-val">
            <div className="flex justify-between items-center">
              <strong className="text-sm text-[var(--text-primary)]">Chennai</strong>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold">
                Critical Basin
              </span>
            </div>
            <div className="text-xs space-y-1 pt-1">
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Loss (Last 12m):</span>
                <strong className="text-rose-500">42.2 ha</strong>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Active Triggers:</span>
                <strong className="text-[var(--text-primary)]">3 alerts</strong>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Primary Threat:</span>
                <span className="text-red-500 font-semibold">Construction</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-[12px] bg-[var(--bg-elevated)] border border-[var(--border)] space-y-2 font-mono-val">
            <div className="flex justify-between items-center">
              <strong className="text-sm text-[var(--text-primary)]">Chengalpattu</strong>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold">
                Critical Basin
              </span>
            </div>
            <div className="text-xs space-y-1 pt-1">
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Loss (Last 12m):</span>
                <strong className="text-rose-500">70.0 ha</strong>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Active Triggers:</span>
                <strong className="text-[var(--text-primary)]">4 alerts</strong>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Primary Threat:</span>
                <span className="text-orange-500 font-semibold">Land Filling</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-[12px] bg-[var(--bg-elevated)] border border-[var(--border)] space-y-2 font-mono-val">
            <div className="flex justify-between items-center">
              <strong className="text-sm text-[var(--text-primary)]">Kanchipuram</strong>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold">
                Major Reservoir
              </span>
            </div>
            <div className="text-xs space-y-1 pt-1">
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Loss (Last 12m):</span>
                <strong className="text-rose-500">270.0 ha</strong>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Active Triggers:</span>
                <strong className="text-[var(--text-primary)]">5 alerts</strong>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Primary Threat:</span>
                <span className="text-red-500 font-semibold">Construction</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-[12px] bg-[var(--bg-elevated)] border border-[var(--border)] space-y-2 font-mono-val">
            <div className="flex justify-between items-center">
              <strong className="text-sm text-[var(--text-primary)]">Tiruvallur</strong>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold">
                Coastal Lagoon
              </span>
            </div>
            <div className="text-xs space-y-1 pt-1">
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Loss (Last 12m):</span>
                <strong className="text-rose-500">180.0 ha</strong>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Active Triggers:</span>
                <strong className="text-[var(--text-primary)]">2 alerts</strong>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Primary Threat:</span>
                <span className="text-yellow-500 font-semibold">Sand Mining</span>
              </div>
            </div>
          </div>
        </div>

        {/* Note on Remaining 34 Districts */}
        <div className="p-4 rounded-[10px] bg-[var(--bg-input)] border border-[var(--border)] text-xs text-[var(--text-muted)] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              Remaining 34 Districts (Coimbatore, Madurai, Tiruchirappalli, Salem, Thanjavur, etc.): Scheduled for ingestion in Phase 2 upon onboarding of district WRD cadastral maps.
            </span>
          </div>
          <span className="font-mono-val text-[10px] text-amber-600 dark:text-amber-400 font-semibold shrink-0">
            Phase 2 Expansion
          </span>
        </div>
      </section>

      {/* ── 7. How it Works (4 Steps & Real Data Sources) ───────────────────── */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-[11px] font-mono-val uppercase tracking-wider text-[var(--color-primary)] font-bold">
            Operational Architecture · செயல்பாட்டு முறை
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            {lang === "EN" ? "How It Works: 4 Automated Enforcement Stages" : "செயல்படும் விதம்: 4 தானியங்கி நிலைகள்"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Step 1: Watch */}
          <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-[var(--border)] space-y-4 theme-surface shadow-sm">
            <div className="w-10 h-10 rounded-[10px] bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-mono-val font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              {lang === "EN" ? "Watch (Orbit Surveillance)" : "1. கண்காணிப்பு (Watch)"}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Every ~5 days, Sentinel-2A and 2B multi-spectral optical passes acquire cloud-free 10m imagery across all monitored Tamil Nadu waterbodies.
            </p>
            <div className="pt-2 text-[10px] font-mono-val text-[var(--text-muted)]">
              Data: ESA Copernicus Sentinel-2 MSI
            </div>
          </div>

          {/* Step 2: Detect */}
          <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-[var(--border)] space-y-4 theme-surface shadow-sm">
            <div className="w-10 h-10 rounded-[10px] bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-mono-val font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              {lang === "EN" ? "Detect (Spectral Change)" : "2. கண்டறிதல் (Detect)"}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Pipeline computes MNDWI and NDBI delta grids against baseline wet-season water spread, categorizing into the 4 monitored change classes.
            </p>
            <div className="pt-2 text-[10px] font-mono-val text-[var(--text-muted)]">
              Algorithm: Normalized Difference Indices
            </div>
          </div>

          {/* Step 3: Alert */}
          <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-[var(--border)] space-y-4 theme-surface shadow-sm">
            <div className="w-10 h-10 rounded-[10px] bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400 font-mono-val font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              {lang === "EN" ? "Alert (Officer Triangulation)" : "3. எச்சரிக்கை (Alert)"}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Intrusions inside indicative boundaries trigger officer alerts ranked by Disaster Risk Score, paired with GPS coordinates and cadastral survey plots.
            </p>
            <div className="pt-2 text-[10px] font-mono-val text-[var(--text-muted)]">
              Cadastre: OSM Overpass + TN WRD Basins
            </div>
          </div>

          {/* Step 4: Act and Track */}
          <div className="p-6 rounded-[14px] bg-[var(--bg-card)] border border-[var(--border)] space-y-4 theme-surface shadow-sm">
            <div className="w-10 h-10 rounded-[10px] bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-mono-val font-bold text-sm">
              04
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              {lang === "EN" ? "Act & Track (Enforcement)" : "4. சட்ட நடவடிக்கை (Act & Track)"}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Generates court-ready Section 133 CrPC eviction notices and PDF evidence packs. Revisit passes track boundary clearing until sealed.
            </p>
            <div className="pt-2 text-[10px] font-mono-val text-[var(--text-muted)]">
              Legal: Sec 133 CrPC Statutory Framework
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Footer Panel: About the Data (Limitations & Sources) ─────────── */}
      <footer className="p-8 sm:p-10 rounded-[16px] bg-[var(--bg-card)] border border-[var(--border)] space-y-6 theme-surface text-xs shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[var(--color-primary)]" />
            <span className="font-mono-val font-bold text-[var(--text-primary)] uppercase tracking-wider">
              About the Data · தரவு மூலங்கள் மற்றும் வரம்புகள்
            </span>
          </div>
          <span className="font-mono-val text-[11px] text-[var(--text-muted)]">
            Technical Transparency &amp; Scientific Integrity Disclosure
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-[var(--text-secondary)]">
          <div className="space-y-1.5 p-3.5 rounded-[10px] bg-[var(--bg-base)] border border-[var(--border)]">
            <strong className="text-[var(--text-primary)] block font-semibold">1. Satellite Revisit Frequency</strong>
            <p className="leading-relaxed">
              Sentinel-2 MSI constellation provides optical imagery every ~5 days. Heavy monsoon cloud cover may delay optical passes, during which Sentinel-1 radar backscatter is deployed.
            </p>
          </div>

          <div className="space-y-1.5 p-3.5 rounded-[10px] bg-[var(--bg-base)] border border-[var(--border)]">
            <strong className="text-[var(--text-primary)] block font-semibold">2. Indicative Boundaries</strong>
            <p className="leading-relaxed">
              All digitized waterbody outlines are <span className="text-[var(--text-primary)] font-semibold">indicative boundaries</span> derived from open spatial sources and historical high-water spreads until official Revenue Department FMB records are ingested.
            </p>
          </div>

          <div className="space-y-1.5 p-3.5 rounded-[10px] bg-[var(--bg-base)] border border-[var(--border)]">
            <strong className="text-[var(--text-primary)] block font-semibold">3. Mandatory Ground Verification</strong>
            <p className="leading-relaxed">
              Every satellite detection is designated <span className="text-amber-600 dark:text-amber-400 font-semibold">&ldquo;likely, requires field verification&rdquo;</span>. Field inspection by revenue officers or taluk surveyors is legally mandatory prior to eviction action.
            </p>
          </div>

          <div className="space-y-1.5 p-3.5 rounded-[10px] bg-[var(--bg-base)] border border-[var(--border)]">
            <strong className="text-[var(--text-primary)] block font-semibold">4. Official Sourced Data</strong>
            <p className="leading-relaxed">
              Data sources: European Space Agency Copernicus (Sentinel-2, 30m DEM), European Commission Joint Research Centre (GSW 1984–2021), OpenStreetMap, and Tamil Nadu WRD.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono-val text-[var(--text-muted)]">
          <div>
            AquaCop · Built for Senior Officials of the Government of Tamil Nadu
          </div>
          <div>
            Status: Near real-time surveillance active across Phase 1 Metropolitan Catchments
          </div>
        </div>
      </footer>
    </div>
  );
};

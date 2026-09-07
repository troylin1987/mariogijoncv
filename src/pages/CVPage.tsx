import { useState } from 'react';
import { mediaPath } from '../lib/paths';

type CVPageProps = { copy: any };

type Project = {
  client: string; logo: string | null; title: string;
  period: string; summary: string; technologies: string[];
};
type Experience = {
  company: string; logo: string | null; role: string;
  period: string; location: string; description: string; projects: Project[];
};
type Education = { institution: string; logo: string | null; degree: string; period: string; location: string; };
type Skill = { name: string; domain: string; };
type Language = { name: string; level: string; };
type Certification = { name: string; icon: string } | string;

// ── Language flag map ──
const FLAG_MAP: Record<string, string> = {
  'Español':   'es',
  'Inglés':    'en',
  'Català':    'ca',
  'Catalán':   'ca',
  'Français':  'fr',
  'Francés':   'fr',
  'Deutsch':   'de',
  'Alemán':    'de',
  'Italiano':  'it',
  '中文':      'zh',
  'Chino':     'zh',
  '日本語':    'ja',
  'Japonés':   'ja',
  'Русский':   'ru',
  'Ruso':      'ru',
  'Polski':    'pl',
  'Polaco':    'pl',
  // English keys
  'Spanish':   'es',
  'English':   'en',
  'Catalan':   'ca',
  'French':    'fr',
  'German':    'de',
  'Italian':   'it',
  'Chinese':   'zh',
  'Japanese':  'ja',
  'Russian':   'ru',
  'Polish':    'pl',
};

// ── Skill domain icon — expanded set ──
function SkillIcon({ domain }: { domain: string }) {
  const cls = 'h-4 w-4 flex-shrink-0';
  const icons: Record<string, JSX.Element> = {
    architecture: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M9 10v4m6-4v4M9 18v3m6-3v3"/>
      </svg>
    ),
    ai: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2a5 5 0 0 1 5 5c0 1.5-.6 2.9-1.6 3.9L17 13h-2l-1-1.5A5 5 0 0 1 7 7a5 5 0 0 1 5-5z"/>
        <path d="M9 17v4m6-4v4M7 17h10M9.5 10.5h.01M14.5 10.5h.01"/>
      </svg>
    ),
    cloud: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M7 18h10a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.7-1.6A4.2 4.2 0 0 0 7 18Z"/>
      </svg>
    ),
    mobile: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="7" y="2" width="10" height="20" rx="2.5"/>
        <circle cx="12" cy="17.5" r="0.8" fill="currentColor"/>
        <path d="M10 5.5h4" strokeLinecap="round"/>
      </svg>
    ),
    api: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M18 7V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"/>
        <path d="M14 12H3m0 0 3-3m-3 3 3 3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    leadership: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="7" r="3.5"/>
        <path d="M4 21v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1"/>
        <path d="M18 3l2 2-2 2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    web: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9"/>
        <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z"/>
      </svg>
    ),
    platform: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4" strokeLinecap="round"/>
      </svg>
    ),
    microservices: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="5" cy="6" r="2.2"/><circle cx="19" cy="6" r="2.2"/>
        <circle cx="5" cy="18" r="2.2"/><circle cx="19" cy="18" r="2.2"/>
        <circle cx="12" cy="12" r="2.2"/>
        <path d="M7 6h5M12 10V7M17 6h-5M7 18h5M17 18h-5M12 17v-3"/>
      </svg>
    ),
    security: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2L4 6v6c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V6l-8-4z"/>
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    data: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    devops: (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
  };
  return (
    <span className="text-brand-primary">
      {icons[domain] ?? icons.platform}
    </span>
  );
}

// ── Tech chip icon map ──
function TechIcon({ tech }: { tech: string }) {
  const t = tech.toLowerCase().replace(/[.\s\/]/g, '');
  const cls = 'h-3 w-3 flex-shrink-0';

  const icons: Record<string, JSX.Element> = {
    azure:          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M7 3 2 17h5l3-6 4 7 8-15H7z" strokeLinejoin="round"/></svg>,
    aws:            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M5 17c-1.1 0-2-.9-2-2v-1c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2"/><path d="M12 17v4m-4-1 4 1 4-1M5 12V7a7 7 0 0 1 14 0v5" strokeLinecap="round"/></svg>,
    ibmcloud:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M7 18h10a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.7-1.6A4.2 4.2 0 0 0 7 18Z"/></svg>,
    genai:          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3" strokeLinecap="round"/></svg>,
    aiml:           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3" strokeLinecap="round"/></svg>,
    mcp:            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><circle cx="12" cy="12" r="2"/><path d="M7 6h5M12 10V7M17 6h-5M7 18h5M17 18h-5M12 17v-3"/></svg>,
    rag:            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    ios:            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><rect x="7" y="2" width="10" height="20" rx="2.5"/><circle cx="12" cy="17.5" r="0.8" fill="currentColor"/><path d="M10 5.5h4" strokeLinecap="round"/></svg>,
    android:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M4 16V10a8 8 0 0 1 16 0v6"/><path d="M4 16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1H4v1z"/><path d="M3 10h18M9 22v-4m6 4v-4M6.5 5.5l-2-2M17.5 5.5l2-2" strokeLinecap="round"/></svg>,
    kubernetes:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><circle cx="12" cy="12" r="9"/><path d="M12 3v9l7.79 4.5M12 12 4.21 7.5" strokeLinecap="round"/></svg>,
    openshift:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><circle cx="12" cy="12" r="9"/><path d="M9 12h6M12 9v6" strokeLinecap="round"/></svg>,
    docker:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M3 13h18a2 2 0 0 1-2 3H5a2 2 0 0 1-2-3v0zM3 9h9M7 9V5h6v4H7zM13 9V5h3"/><circle cx="19" cy="8" r="1" fill="currentColor"/></svg>,
    nodejs:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M12 2 3 7v5c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z"/></svg>,
    vuejs:          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M1 3 12 21 23 3h-5L12 14 6 3H1z" strokeLinejoin="round"/><path d="M7 3l5 9 5-9h-3L12 8 9 3H7z" strokeLinejoin="round"/></svg>,
    react:          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/></svg>,
    net:            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12h8M12 8v8" strokeLinecap="round"/></svg>,
    sap:            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h2m4 0h3" strokeLinecap="round"/></svg>,
    sapui5:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h2m4 0h3" strokeLinecap="round"/></svg>,
    watson:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><circle cx="12" cy="12" r="9"/><path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"/><path d="M12 3v2m0 14v2M3 12h2m14 0h2" strokeLinecap="round"/></svg>,
    springboot:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10C22 6.48 17.52 2 12 2z"/><path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    mongodb:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><ellipse cx="12" cy="5" rx="5" ry="2.5"/><path d="M17 5v14c0 1.38-2.24 2.5-5 2.5S7 20.38 7 19V5"/></svg>,
    postgresql:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><ellipse cx="12" cy="5" rx="5" ry="2.5"/><path d="M7 5v14c0 1.38 2.24 2.5 5 2.5s5-1.12 5-2.5V5"/><path d="M7 12h10" strokeLinecap="round"/></svg>,
    jira:           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M11.53 2.03a1 1 0 0 1 .94 0l9 5a1 1 0 0 1 .53.88v10.18a1 1 0 0 1-.53.88l-9 5a1 1 0 0 1-.94 0l-9-5A1 1 0 0 1 2 18.09V7.91a1 1 0 0 1 .53-.88l9-5z"/></svg>,
    confluence:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    github:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    security:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M12 2L4 6v6c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V6l-8-4z"/></svg>,
    oauth2:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round"/></svg>,
    push:           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    analytics:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M3 3v18h18"/><path d="m7 16 4-5 4 3 4-6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    airflow:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" strokeLinecap="round"/><circle cx="12" cy="12" r="4"/></svg>,
    strapi:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h18" strokeLinecap="round"/></svg>,
    ar:             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
    cloudant:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" strokeLinecap="round"/></svg>,
    java:           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M9 3 4 20h16L15 3M9 3h6"/><path d="M8 13h8" strokeLinecap="round"/></svg>,
    erp:            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18" strokeLinecap="round"/></svg>,
    sql:            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
    mdm:            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><rect x="7" y="2" width="10" height="20" rx="2.5"/><circle cx="12" cy="17.5" r="0.8" fill="currentColor"/></svg>,
    odata:          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M18 7V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"/><path d="M14 12H3" strokeLinecap="round"/></svg>,
    rest:           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M18 7V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"/><path d="M14 12H3m0 0 3-3m-3 3 3 3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    swagger:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8" strokeLinecap="round"/></svg>,
    nuxtjs:         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M1 20 9 6l4 7 2-3 7 10H1z" strokeLinejoin="round"/></svg>,
    bedrock:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="m9 9 6 6M15 9l-6 6" strokeLinecap="round"/></svg>,
    vatsonml:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>,
    bootstrap:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12h4a2 2 0 0 1 0 4H8V8h3.5a2 2 0 0 1 0 4" strokeLinecap="round"/></svg>,
    documentum:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6" strokeLinecap="round"/></svg>,
    sharepoint:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={cls}><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2" strokeLinecap="round"/></svg>,
  };

  const key = t
    .replace('watson assistant', 'watson')
    .replace('watsonml', 'watson')
    .replace('watson ml', 'watson')
    .replace('ibm cloud', 'ibmcloud')
    .replace('ibm bluemix', 'ibmcloud')
    .replace('watson conversation', 'watson')
    .replace('push notifications', 'push')
    .replace('mobile strategy', 'mdm')
    .replace('sap ui5', 'sapui5')
    .replace('sap fiori', 'sap')
    .replace('sap kapsel', 'sap')
    .replace('sap mobile platform', 'sap')
    .replace('sap netweaver gateway', 'sap')
    .replace('sap pm', 'sap')
    .replace('sap ecc', 'sap')
    .replace('s4hana', 'sap')
    .replace('.net', 'net')
    .replace('asp .net', 'net')
    .replace('vasco sdk', 'security')
    .replace('otp', 'security')
    .replace('nuxt.js', 'nuxtjs')
    .replace('vue.js', 'vuejs')
    .replace('node.js', 'nodejs')
    .replace('springboot', 'springboot')
    .replace('watson ml', 'watson');

  const icon = icons[key] ?? icons[t];
  if (icon) return <span className="text-brand-light/50">{icon}</span>;

  // Category fallbacks
  if (t.includes('ios') || t.includes('android') || t.includes('mobile') || t.includes('mobil')) {
    return <span className="text-brand-light/50">{icons.ios}</span>;
  }
  if (t.includes('cloud') || t.includes('aws') || t.includes('azure') || t.includes('ibm')) {
    return <span className="text-brand-light/50">{icons.ibmcloud}</span>;
  }
  if (t.includes('ai') || t.includes('ml') || t.includes('genai') || t.includes('watson')) {
    return <span className="text-brand-light/50">{icons.genai}</span>;
  }
  if (t.includes('api') || t.includes('rest') || t.includes('odata') || t.includes('swagger')) {
    return <span className="text-brand-light/50">{icons.rest}</span>;
  }
  if (t.includes('sap')) {
    return <span className="text-brand-light/50">{icons.sap}</span>;
  }
  if (t.includes('security') || t.includes('segur') || t.includes('sicherheit')) {
    return <span className="text-brand-light/50">{icons.security}</span>;
  }
  if (t.includes('kubernetes') || t.includes('docker') || t.includes('openshift') || t.includes('devops')) {
    return <span className="text-brand-light/50">{icons.kubernetes}</span>;
  }
  if (t.includes('java') || t.includes('spring') || t.includes('node') || t.includes('vue') || t.includes('react')) {
    return <span className="text-brand-light/50">{icons.nodejs}</span>;
  }
  if (t.includes('db') || t.includes('mongo') || t.includes('postgres') || t.includes('sql') || t.includes('database')) {
    return <span className="text-brand-light/50">{icons.sql}</span>;
  }

  return null;
}

// ── Certification icon map ──
function CertIcon({ icon }: { icon: string }) {
  const cls = 'h-4 w-4 flex-shrink-0 text-brand-primary';
  const map: Record<string, JSX.Element> = {
    ibm:          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><rect x="2" y="7" width="20" height="10" rx="2"/><path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" strokeLinecap="round"/><path d="M7 12h10M7 15h6" strokeLinecap="round"/></svg>,
    design:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    security:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><path d="M12 2L4 6v6c0 5 3.5 9.7 8 11 4.5-1.3 8-6 8-11V6l-8-4z"/><path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    architecture: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M9 14v3m6-3v3"/></svg>,
    automation:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
    transport:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.27 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 3.18 2 2 0 0 1 4.11 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    banking:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><path d="M3 10h18M6 14h.01M10 14h.01M14 14h.01M3 10V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V10M12 3 3 10h18L12 3Z" strokeLinejoin="round"/></svg>,
    android:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><path d="M4 16V10a8 8 0 0 1 16 0v6"/><path d="M4 16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1H4v1z"/><path d="M6.5 5.5-2-2M17.5 5.5l2-2" strokeLinecap="round"/></svg>,
    linux:        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><path d="M20 16V7a2 2 0 0 0-2-2H4L2 12v4h2l1 3h4l1-3h6l1 3h2l1-3h2z"/><path d="M7 8h2M15 8h2" strokeLinecap="round"/></svg>,
    api:          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={cls}><path d="M18 7V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2"/><path d="M14 12H3m0 0 3-3m-3 3 3 3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  };
  return map[icon] ? <span className="flex-shrink-0">{map[icon]}</span> : null;
}

// ── Company logo with initials fallback ──
function CompanyLogo({ name, logo, size = 'md' }: { name: string; logo: string | null; size?: 'sm' | 'md' }) {
  const [failed, setFailed] = useState(false);
  const dim = size === 'sm' ? 'h-8 w-8 min-w-[2rem] text-[10px]' : 'h-10 w-10 min-w-[2.5rem] text-xs';
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  const ext = logo === 'plataforma-tierra' ? 'jpg' : logo === 'bank-of-cyprus' ? 'webp' : 'png';
  const src = logo ? mediaPath(`/media/companies/${logo}.${ext}`) : null;

  if (!src || failed) {
    return (
      <div className={`${dim} flex items-center justify-center rounded-lg font-bold text-brand-primary`}
        style={{ background: 'rgba(31,191,173,0.10)', border: '1px solid rgba(31,191,173,0.25)' }}>
        {initials}
      </div>
    );
  }
  return (
    <img src={src} alt={name} onError={() => setFailed(true)}
      className={`${dim} rounded-lg bg-white object-contain p-1 flex-shrink-0`} />
  );
}

// ── Education logo ──
function EduLogo({ name, logo }: { name: string; logo: string | null }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  const src = logo ? mediaPath(`/media/education/formal/${logo}.png`) : null;

  if (!src || failed) {
    return (
      <div className="h-9 w-9 min-w-[2.25rem] flex items-center justify-center rounded-lg font-bold text-[10px] text-brand-primary"
        style={{ background: 'rgba(31,191,173,0.10)', border: '1px solid rgba(31,191,173,0.25)' }}>
        {initials}
      </div>
    );
  }
  return (
    <img src={src} alt={name} onError={() => setFailed(true)}
      className="h-9 w-9 min-w-[2.25rem] rounded-lg bg-white object-contain p-1 flex-shrink-0" />
  );
}

// ── Language flag ──
function LangFlag({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);
  const code = FLAG_MAP[name];
  if (!code || failed) {
    return (
      <span className="text-brand-light/70">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
          <line x1="4" y1="22" x2="4" y2="15"/>
        </svg>
      </span>
    );
  }
  return (
    <img
      src={mediaPath(`/media/languages/${code}.svg`)}
      alt={name}
      onError={() => setFailed(true)}
      className="h-4 w-6 rounded-[2px] object-cover flex-shrink-0 shadow-sm"
    />
  );
}

// ── Experience entry ──
function ExperienceEntry({ exp, index, isFirst }: { exp: Experience; index: number; isFirst: boolean }) {
  const [open, setOpen] = useState(isFirst);

  return (
    <div className={`relative pl-6 card-lift fade-up stagger-${Math.min(index + 1, 6)}`}>
      <div className="timeline-track" />
      <div className={isFirst ? 'timeline-dot-active' : 'timeline-dot'} style={{ top: '18px' }} />

      <div className="panel overflow-hidden glow-border">
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-start gap-4 p-5 text-left transition-colors hover:bg-white/[0.02] cursor-pointer"
        >
          <CompanyLogo name={exp.company} logo={exp.logo} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-white text-[14px] leading-snug">{exp.role}</p>
                <p className="text-brand-primary text-[13px] font-medium mt-0.5">{exp.company}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-[11px] text-brand-light/50 font-mono">{exp.period}</p>
                <p className="text-[11px] text-brand-teal/50 mt-0.5">{exp.location}</p>
              </div>
            </div>
            {!open && (
              <p className="mt-2 text-[13px] text-white/55 line-clamp-1">{exp.description}</p>
            )}
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`h-4 w-4 flex-shrink-0 text-brand-primary/50 transition-transform duration-300 mt-0.5 ${open ? 'rotate-180' : ''}`}>
            <path d="m6 9 6 6 6-6" strokeLinecap="round"/>
          </svg>
        </button>

        {open && (
          <div className="border-t border-white/[0.06] px-5 pb-5 pt-4 space-y-4">
            <p className="text-[13px] leading-relaxed text-white/70">{exp.description}</p>
            {exp.projects.length > 0 && (
              <div className="space-y-2">
                {exp.projects.map((proj, pi) => (
                  <div key={`${proj.client}-${pi}`}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 space-y-3 hover:border-brand-primary/25 hover:bg-brand-primary/[0.03] transition-colors duration-200">
                    <div className="flex items-start gap-3">
                      <CompanyLogo name={proj.client} logo={proj.logo} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-1">
                          <div>
                            <p className="text-[13px] font-semibold text-white/90">{proj.client}</p>
                            <p className="text-[11px] text-brand-primary/80 font-medium mt-0.5">{proj.title}</p>
                          </div>
                          <span className="text-[11px] text-brand-light/45 font-mono flex-shrink-0">{proj.period}</span>
                        </div>
                        <p className="mt-1.5 text-[12px] leading-relaxed text-white/60">{proj.summary}</p>
                      </div>
                    </div>
                    {proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pl-11">
                        {proj.technologies.map(t => (
                          <span key={t} className="tag-tech inline-flex items-center gap-1">
                            <TechIcon tech={t} />
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main page ──
export default function CVPage({ copy }: CVPageProps) {
  const c = copy.cv;
  const experiences: Experience[] = c.experience ?? [];
  const education: Education[] = c.education ?? [];
  const skills: Skill[] = c.skills ?? [];
  const certifications: Certification[] = c.certifications ?? [];
  const languages: Language[] = c.languages ?? [];

  return (
    <section className="space-y-14 max-w-3xl mx-auto">

      {/* ── HEADER CARD ── */}
      <div className="panel-glass p-7 md:p-9 fade-up" style={{ boxShadow: '0 2px 60px rgba(0,0,0,0.4), 0 0 40px rgba(31,191,173,0.05)' }}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
          <div className="media-frame h-[90px] w-[90px] flex-shrink-0"
            style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
            <img src={mediaPath('/media/personal/mario-photo.jpg')} alt="Mario Gijón"
              className="absolute inset-0 h-full w-full object-cover object-top" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="tag text-[11px]">
                {c.currentRoleLabel}: {c.currentRole}
              </span>
              <span className="tag-tech">{c.currentCompany}</span>
            </div>
            <h1 className="text-3xl font-mono font-bold text-white md:text-4xl">{copy.siteTitle}</h1>
            <p className="shimmer-text text-[14px] font-mono font-bold mt-1">{copy.siteSubtitle}</p>
            <p className="mt-1.5 text-[12px] text-brand-light/55 flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5 text-brand-primary/70">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
              </svg>
              {c.location}
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-white/70 max-w-xl">{c.profile}</p>
            <a href={c.linkedinUrl} target="_blank" rel="noreferrer" className="cta-secondary mt-4 self-start text-[13px] px-4 py-2">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              {c.linkedinCta}
            </a>
          </div>
        </div>
      </div>

      {/* ── EXPERIENCE ── */}
      <div>
        <p className="section-label mb-6">{c.experienceTitle}</p>
        <div className="space-y-3">
          {experiences.map((exp, i) => (
            <ExperienceEntry key={`${exp.company}-${i}`} exp={exp} index={i} isFirst={i === 0} />
          ))}
        </div>
      </div>

      {/* ── SKILLS + EDUCATION + LANGUAGES ── */}
      <div className="grid gap-5 md:grid-cols-2">

        {/* Skills */}
        <div className="panel p-6 space-y-3 fade-up stagger-3">
          <p className="section-label">{c.skillsTitle}</p>
          <div className="space-y-1">
            {skills.map(skill => (
              <div key={skill.name}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-brand-primary/[0.07] group">
                <SkillIcon domain={skill.domain} />
                <span className="text-[13px] text-brand-light/80 group-hover:text-white transition-colors">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">

          {/* Education */}
          <div className="panel p-5 space-y-4 fade-up stagger-4">
            <p className="section-label">{c.educationTitle}</p>
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.institution} className="flex items-start gap-3">
                  <EduLogo name={edu.institution} logo={edu.logo} />
                  <div>
                    <p className="text-[13px] font-semibold text-white/90 leading-snug">{edu.degree}</p>
                    <p className="text-[12px] text-brand-primary/80 mt-0.5">{edu.institution}</p>
                    <p className="text-[11px] text-brand-teal/60 font-mono mt-0.5">{edu.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="panel p-5 space-y-1 fade-up stagger-5">
            <p className="section-label mb-3">{c.languagesTitle}</p>
            {languages.map(lang => (
              <div key={lang.name}
                className="flex items-center justify-between px-1 py-2.5 border-b border-white/[0.05] last:border-0 group hover:bg-brand-primary/[0.04] rounded-lg transition-colors">
                <span className="flex items-center gap-2.5">
                  <LangFlag name={lang.name} />
                  <span className="text-[13px] text-brand-light/85 group-hover:text-white transition-colors">{lang.name}</span>
                </span>
                <span className="text-[11px] font-semibold text-brand-primary px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(31,191,173,0.10)', border: '1px solid rgba(31,191,173,0.20)' }}>
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CERTIFICATIONS ── */}
      <div className="panel p-6 space-y-4 fade-up stagger-6">
        <p className="section-label">{c.certTitle}</p>
        <div className="flex flex-wrap gap-2">
          {certifications.map((cert: Certification) => {
            const name = typeof cert === 'string' ? cert : cert.name;
            const icon = typeof cert === 'string' ? null : cert.icon;
            return (
              <span key={name} className="tag-tech inline-flex items-center gap-1.5">
                {icon && <CertIcon icon={icon} />}
                {name}
              </span>
            );
          })}
        </div>
      </div>

      {/* ── LinkedIn CTA ── */}
      <div className="panel-accent p-6 flex flex-col sm:flex-row items-center justify-between gap-4 fade-up stagger-7"
        style={{ boxShadow: '0 0 40px rgba(31,191,173,0.07)' }}>
        <div>
          <p className="text-[13px] font-semibold text-white/90">Perfil completo en LinkedIn</p>
          <p className="text-[12px] text-brand-light/50 mt-0.5">Recomendaciones, proyectos y más</p>
        </div>
        <a href={c.linkedinUrl} target="_blank" rel="noreferrer" className="cta-primary flex-shrink-0">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          {c.linkedinCta}
        </a>
      </div>

    </section>
  );
}

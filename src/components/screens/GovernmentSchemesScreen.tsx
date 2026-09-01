import React, { useState } from 'react';
import { 
  Landmark, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Award,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { governmentSchemes } from '../../data/mockAgriData';
import { Language } from '../../types/agri';
import { translations } from '../../data/translations';
import { DisclaimerBadge } from '../Disclaimers';

interface GovernmentSchemesScreenProps {
  language: Language;
}

export const GovernmentSchemesScreen: React.FC<GovernmentSchemesScreenProps> = ({ language }) => {
  const [expandedId, setExpandedId] = useState<string | null>('scheme-pmkisan');

  const t = translations[language];

  return (
    <div className="space-y-4 pb-20 pt-1 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-emerald-600 text-white rounded-[28px] p-5 shadow-lg flex items-center justify-between border border-emerald-500">
        <div>
          <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest block">
            {t.eligibilityCheck}
          </span>
          <h2 className="text-xl font-bold text-white mt-0.5">
            {t.schemesTitle}
          </h2>
          <p className="text-xs text-emerald-100 mt-1 max-w-xs font-medium">
            {language === 'en'
              ? 'Matched to Ramesh (2.5 acres, Salem District, Paddy & Groundnut).'
              : 'உங்கள் நில அளவு மற்றும் பயிருக்கு ஏற்ற அரசு மானியங்கள்.'}
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shrink-0 border border-white/20">
          🏛
        </div>
      </div>

      {/* Mandatory Official Source Disclaimer */}
      <DisclaimerBadge language={language} variant="officialSourceNote" />

      {/* Scheme Cards */}
      <div className="space-y-3">
        {governmentSchemes.map((scheme) => {
          const isExpanded = expandedId === scheme.id;

          return (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden transition-all"
            >
              {/* Card Header */}
              <div 
                onClick={() => setExpandedId(isExpanded ? null : scheme.id)}
                className="p-4 cursor-pointer hover:bg-stone-50 transition-colors flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-stone-900 leading-snug">
                      {language === 'ta' ? scheme.nameTa : scheme.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        ✓ {language === 'ta' ? scheme.badgeTa : scheme.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 shrink-0 mt-0.5">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Card Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-stone-100 space-y-3 text-xs animate-in fade-in duration-150">
                  {/* Why Relevant */}
                  <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200/80 text-amber-950 font-medium">
                    <strong className="block text-[11px] uppercase tracking-wider text-amber-900 mb-0.5">
                      Why Recommended for Your Farm:
                    </strong>
                    {scheme.whyRelevant[language]}
                  </div>

                  {/* Financial Benefit */}
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-950 font-medium">
                    <strong className="block text-[11px] uppercase tracking-wider text-emerald-900 mb-0.5">
                      Scheme Benefits:
                    </strong>
                    {scheme.benefits[language]}
                  </div>

                  {/* Required Documents */}
                  <div>
                    <strong className="block text-stone-900 font-bold mb-1.5 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-stone-600" />
                      {t.requiredDocs}:
                    </strong>
                    <div className="flex flex-wrap gap-1.5">
                      {scheme.requiredDocuments[language].map((doc, idx) => (
                        <span
                          key={idx}
                          className="bg-stone-100 text-stone-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-stone-200"
                        >
                          ✓ {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Application Steps */}
                  <div>
                    <strong className="block text-stone-900 font-bold mb-1">
                      {t.applyGuide}:
                    </strong>
                    <ol className="list-decimal pl-4 space-y-1 text-stone-700 font-medium">
                      {scheme.applicationSteps[language].map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Official Link */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] text-stone-500 font-semibold truncate max-w-[180px]">
                      {t.officialPortal}: {scheme.officialSource}
                    </span>
                    <a
                      href={scheme.officialSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-stone-900 text-amber-400 font-extrabold text-[11px] px-3 py-1.5 rounded-xl inline-flex items-center gap-1 shadow-xs hover:bg-stone-800"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { AlertCircle, Info } from 'lucide-react';
import { Language } from '../types/agri';
import { translations } from '../data/translations';

interface DisclaimerProps {
  language: Language;
  variant?: 'labNote' | 'financialNote' | 'officialSourceNote' | 'compact';
  customText?: string;
}

export const DisclaimerBadge: React.FC<DisclaimerProps> = ({
  language,
  variant = 'labNote',
  customText
}) => {
  const t = translations[language];

  let text = customText;
  if (!text) {
    if (variant === 'labNote') text = t.labVerificationNote;
    else if (variant === 'financialNote') text = t.financialDisclaimer;
    else if (variant === 'officialSourceNote') text = t.officialSourceNote;
    else text = t.aiEstimateBadge;
  }

  if (variant === 'compact') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100/80 text-amber-900 border border-amber-200/60">
        <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        {t.aiEstimateBadge}
      </span>
    );
  }

  return (
    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs leading-relaxed">
      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
      <div>
        <span className="font-semibold">{t.aiEstimateBadge}: </span>
        {text}
      </div>
    </div>
  );
};

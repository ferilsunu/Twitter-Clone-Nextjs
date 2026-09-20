import React from 'react';
import { useRouter } from 'next/router';

interface FormattedTextProps {
  text: string;
  className?: string;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ text, className }) => {
  const router = useRouter();
  if (!text) return null;

  const parts = text.split(/(\s+)/);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('#') && part.length > 1) {
          const tag = part.replace(/[.,!?;:]+$/, '');
          const punctuation = part.slice(tag.length);
          return (
            <React.Fragment key={index}>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/search?q=${encodeURIComponent(tag)}`);
                }}
                className="text-sky-500 hover:underline cursor-pointer font-medium"
              >
                {tag}
              </span>
              {punctuation}
            </React.Fragment>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
};

export default FormattedText;

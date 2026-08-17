"use client";

import { useEffect, useRef, useState } from 'react';

interface TextDisplayProps {
  targetText: string;
  typedText: string;
  isActive?: boolean;
  displayOnly?: boolean;
}

export default function TextDisplay({ targetText, typedText, isActive = true, displayOnly = false }: TextDisplayProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);

  // Aktif karakteri takip et, 2 satır geçince translateY ile yukarı kaydır
  useEffect(() => {
    if (!innerRef.current || !outerRef.current) return;
    const activeChar = innerRef.current.querySelector('[data-active="true"]') as HTMLElement;
    if (!activeChar) return;

    // Satır yüksekliğini ölç
    const firstWord = innerRef.current.querySelector('span') as HTMLElement;
    const lineHeight = firstWord ? firstWord.getBoundingClientRect().height * 1.5 : 44;
    const twoLineThreshold = lineHeight * 2;

    const charOffset = activeChar.offsetTop;

    if (charOffset > twoLineThreshold) {
      // Aktif karakteri 2. satırda sabitle
      setTranslateY(charOffset - twoLineThreshold);
    } else {
      setTranslateY(0);
    }
  }, [typedText]);

  // displayOnly değilse focus davranışı
  useEffect(() => {
    if (displayOnly) return;
    if (isActive && outerRef.current) outerRef.current.focus();
    const handleClick = () => {
      if (isActive && outerRef.current) outerRef.current.focus();
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isActive, displayOnly]);

  const targetWords = targetText.split(' ');
  const typedChars = typedText.split('');
  let globalCharIndex = 0;

  return (
    <div
      ref={outerRef}
      tabIndex={displayOnly ? -1 : 0}
      style={{
        overflow: 'hidden',
        position: 'relative',
        padding: '1.5rem',
        outline: 'none',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-medium)',
        borderRadius: '14px',
        userSelect: 'none',
      }}
    >
      {/* Kaydırılan iç katman */}
      <div
        ref={innerRef}
        style={{
          transform: `translateY(-${translateY}px)`,
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '1.4rem',
          lineHeight: '1.7',
          letterSpacing: '0.5px',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
          color: 'var(--text-secondary)',
        }}
      >
        {targetWords.map((word, wordIndex) => {
          const isLastWord = wordIndex === targetWords.length - 1;
          return (
            <span
              key={`word-${wordIndex}`}
              style={{
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
            >
              {word.split('').map((char) => {
                const idx = globalCharIndex++;
                const typedChar = typedChars[idx];
                const isActiveCursor = idx === typedText.length;

                let color = 'var(--text-secondary)';
                let bg = 'transparent';
                let decorationLine: 'none' | 'underline' = 'none';

                if (!displayOnly) {
                  if (typedChar !== undefined) {
                    if (typedChar === char) {
                      color = 'var(--text-primary)';
                    } else {
                      color = 'var(--error)';
                      bg = 'var(--error-bg)';
                      decorationLine = 'underline';
                    }
                  } else if (isActiveCursor) {
                    color = '#121214';
                    bg = 'var(--accent-color)';
                  }
                }

                return (
                  <span
                    key={`char-${idx}`}
                    data-active={isActiveCursor ? 'true' : undefined}
                    style={{
                      color,
                      background: bg,
                      borderRadius: '2px',
                      textDecorationLine: decorationLine,
                      textDecorationColor: 'var(--error)',
                      transition: 'background-color 0.08s',
                    }}
                  >
                    {char}
                  </span>
                );
              })}

              {!isLastWord && (() => {
                const spaceIdx = globalCharIndex++;
                const typedSpace = typedChars[spaceIdx];
                const isActiveCursor = spaceIdx === typedText.length;

                let color = 'var(--text-secondary)';
                let bg = 'transparent';
                let decorationLine: 'none' | 'underline' = 'none';

                if (!displayOnly) {
                  if (typedSpace !== undefined) {
                    if (typedSpace === ' ') {
                      color = 'var(--text-primary)';
                    } else {
                      color = 'var(--error)';
                      bg = 'var(--error-bg)';
                      decorationLine = 'underline';
                    }
                  } else if (isActiveCursor) {
                    color = '#121214';
                    bg = 'var(--accent-color)';
                  }
                }

                return (
                  <span
                    key={`space-${spaceIdx}`}
                    data-active={isActiveCursor ? 'true' : undefined}
                    style={{
                      color,
                      background: bg,
                      borderRadius: '2px',
                      textDecorationLine: decorationLine,
                      textDecorationColor: 'var(--error)',
                      transition: 'background-color 0.08s',
                    }}
                  >
                    {'\u00A0'}
                  </span>
                );
              })()}
            </span>
          );
        })}
      </div>
    </div>
  );
}

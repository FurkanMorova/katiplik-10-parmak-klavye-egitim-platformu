"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './TextDisplay.module.css';

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
    const firstSpan = innerRef.current.querySelector('span') as HTMLElement;
    const lineHeight = firstSpan ? firstSpan.getBoundingClientRect().height * 1.6 : 42;
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
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '14px',
      }}
    >
      {/* Kaydırılan iç katman */}
      <div
        ref={innerRef}
        style={{
          transform: `translateY(-${translateY}px)`,
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '1.4rem',
          lineHeight: '1.6',
          letterSpacing: '0.5px',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
          color: 'var(--text-secondary)',
        }}
      >
        {targetWords.map((word, wordIndex) => {
          const isLastWord = wordIndex === targetWords.length - 1;
          return (
            <span key={`word-${wordIndex}`} style={{ display: 'inline', marginRight: '0.35em' }}>
              {word.split('').map((char) => {
                const idx = globalCharIndex++;
                const typedChar = typedChars[idx];
                const isActiveCursor = idx === typedText.length;

                // displayOnly modunda sade görünüm: renklendirme ve imleç yok
                let color = 'var(--text-secondary)';
                let bg = 'transparent';
                let decorationLine: 'none' | 'underline' = 'none';

                if (!displayOnly) {
                  if (typedChar !== undefined) {
                    color = typedChar === char ? 'var(--text-primary)' : 'var(--error)';
                  } else if (isActiveCursor) {
                    color = '#fff';
                    bg = 'rgba(59,130,246,0.25)';
                  }
                  if (typedChar !== undefined && typedChar !== char) decorationLine = 'underline';
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

                if (!displayOnly) {
                  if (typedSpace !== undefined) {
                    color = typedSpace === ' ' ? 'var(--text-primary)' : 'var(--error)';
                  } else if (isActiveCursor) {
                    color = '#fff';
                    bg = 'rgba(59,130,246,0.25)';
                  }
                }

                return (
                  <span
                    key={`char-${spaceIdx}`}
                    data-active={isActiveCursor ? 'true' : undefined}
                    style={{ color, background: bg, borderRadius: '2px' }}
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


import { useEffect, useState } from 'react';
import styles from './VirtualKeyboard.module.css';

interface VirtualKeyboardProps {
  expectedChar: string | null;
  keyboardType?: 'F' | 'Q';
}

const fKeyboardLayout = [
  ['"', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '*', '-', 'Backspace'],
  ['Tab', 'f', 'g', 'ğ', 'ı', 'o', 'd', 'r', 'n', 'h', 'p', 'q', 'w', 'Enter'],
  ['Caps', 'u', 'i', 'e', 'a', 'ü', 't', 'k', 'm', 'l', 'y', 'ş', 'x'],
  ['Shift', '<', 'j', 'ö', 'v', 'c', 'ç', 'z', 's', 'b', '.', ',', 'Shift'],
  ['Space']
];

// Fallback for Q keyboard if needed
const qKeyboardLayout = [
  ['"', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '*', '-', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'ı', 'o', 'p', 'ğ', 'ü', 'Enter'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ş', 'i', ','],
  ['Shift', '<', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'ö', 'ç', '.', 'Shift'],
  ['Space']
];

export default function VirtualKeyboard({ expectedChar, keyboardType = 'F' }: VirtualKeyboardProps) {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPressedKey(e.key.toLowerCase());
    };
    
    const handleKeyUp = () => {
      setPressedKey(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const layout = keyboardType === 'F' ? fKeyboardLayout : qKeyboardLayout;

  // We convert the expected character to lowercase to match the layout
  const target = expectedChar === ' ' ? 'space' : expectedChar?.toLowerCase();

  return (
    <div className={styles.keyboard}>
      {layout.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className={styles.row}>
          {row.map((key, keyIndex) => {
            const isExpected = target === key || (target === 'space' && key === 'Space');
            const isPressed = pressedKey === key || (pressedKey === ' ' && key === 'Space');
            
            let keyClass = styles.key;
            if (key === 'Backspace' || key === 'Enter' || key === 'Shift' || key === 'Caps' || key === 'Tab') {
              keyClass += ` ${styles.keyWide}`;
            } else if (key === 'Space') {
              keyClass += ` ${styles.keySpace}`;
            }

            if (isExpected) keyClass += ` ${styles.highlightExpected}`;
            if (isPressed) keyClass += ` ${styles.highlightPressed}`;
            
            // Just display visual correctly
            let displayKey = key;
            if (key === 'Space') displayKey = ' ';
            if (key === 'Backspace') displayKey = '←';

            return (
              <div key={`${rowIndex}-${keyIndex}`} className={keyClass}>
                <span>{displayKey}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

import styles from './StatsHeader.module.css';

interface StatsHeaderProps {
  wpm: number;
  accuracy: number;
  errors: number;
  timeElapsed: number;
  timeLimit?: number | null;
  hideStats?: boolean;
}

export default function StatsHeader({
  wpm,
  accuracy,
  errors,
  timeElapsed,
  timeLimit,
  hideStats = false,
}: StatsHeaderProps) {
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const displayTime = timeLimit ? timeLimit - timeElapsed : timeElapsed;
  const showStats = !hideStats;

  return (
    <div className={`${styles.header} glass-panel`}>
      <div className={styles.statGroup}>
        <div className={styles.statBox}>
          <span className={styles.label} title="Dakika Başına Kelime">DBK</span>
          <span className={`${styles.value} ${wpm > 0 && showStats ? styles.highlight : ''}`}>
            {showStats ? wpm : '-'}
          </span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.label}>Doğruluk</span>
          <span className={`${styles.value} ${accuracy === 100 && showStats ? styles.success : ''}`}>
            {showStats ? `${accuracy}%` : '-'}
          </span>
        </div>
      </div>
      
      <div className={styles.statBox}>
        <span className={styles.label}>{timeLimit ? "Kalan Süre" : "Süre"}</span>
        <span className={styles.value}>{formatTime(Math.max(0, displayTime))}</span>
      </div>
      
      <div className={styles.statGroup}>
        <div className={styles.statBox}>
          <span className={styles.label}>Hata</span>
          <span className={`${styles.value} ${errors > 0 && showStats ? styles.error : ''}`}>
            {showStats ? errors : '-'}
          </span>
        </div>
      </div>
    </div>
  );
}

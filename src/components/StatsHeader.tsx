import styles from './StatsHeader.module.css';

interface StatsHeaderProps {
  wpm: number;
  accuracy: number;
  errors: number;
  timeElapsed: number;
  timeLimit?: number | null;
  hideStats?: boolean;
  correctWords?: number;
  incorrectWords?: number;
  errorRate?: number;
  totalKeystrokes?: number;
}

export default function StatsHeader({
  wpm,
  accuracy,
  errors,
  timeElapsed,
  timeLimit,
  hideStats = false,
  correctWords,
  incorrectWords,
  errorRate,
  totalKeystrokes
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
        {typeof errorRate !== 'undefined' && (
          <div className={styles.statBox}>
            <span className={styles.label}>Hata Oranı</span>
            <span className={`${styles.value} ${errorRate > 0 && showStats ? styles.error : ''}`}>
              {showStats ? `%${errorRate}` : '-'}
            </span>
          </div>
        )}
      </div>
      
      <div className={styles.statBox}>
        <span className={styles.label}>{timeLimit ? "Kalan Süre" : "Süre"}</span>
        <span className={styles.value}>{formatTime(Math.max(0, displayTime))}</span>
      </div>
      
      <div className={styles.statGroup}>
        <div className={styles.statBox}>
          <span className={styles.label}>Hatalı Basış</span>
          <span className={`${styles.value} ${errors > 0 && showStats ? styles.error : ''}`}>
            {showStats ? errors : '-'}
          </span>
        </div>
        {typeof totalKeystrokes !== 'undefined' ? (
          <div className={styles.statBox}>
            <span className={styles.label}>Toplam Basış</span>
            <span className={`${styles.value} ${totalKeystrokes > 0 && showStats ? styles.highlight : ''}`}>
              {showStats ? totalKeystrokes : '-'}
            </span>
          </div>
        ) : (
          <>
            {typeof incorrectWords !== 'undefined' && (
              <div className={styles.statBox}>
                <span className={styles.label}>Yanlış Kel.</span>
                <span className={`${styles.value} ${incorrectWords > 0 && showStats ? styles.error : ''}`}>
                  {showStats ? incorrectWords : '-'}
                </span>
              </div>
            )}
            {typeof correctWords !== 'undefined' && (
              <div className={styles.statBox}>
                <span className={styles.label}>Doğru Kel.</span>
                <span className={`${styles.value} ${correctWords > 0 && showStats ? styles.success : ''}`}>
                  {showStats ? correctWords : '-'}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

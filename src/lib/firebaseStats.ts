"use client";

import { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';

const GLOBAL_STATS_DOC = 'stats/global';

export interface GlobalStats {
  total: number;
  today: number;
  thisMonth: number;
}

// Function to construct keys
const getTodayKey = () => `daily_${new Date().toISOString().split('T')[0]}`;
const getMonthKey = () => `monthly_${new Date().toISOString().slice(0, 7)}`;

export async function incrementGlobalStats() {
  try {
    if (!db) return;
    const docRef = doc(db, GLOBAL_STATS_DOC);
    const snap = await getDoc(docRef);
    
    const todayKey = getTodayKey();
    const monthKey = getMonthKey();

    if (!snap.exists()) {
      // Create document if it doesn't exist
      await setDoc(docRef, {
        total: 1,
        [todayKey]: 1,
        [monthKey]: 1
      });
    } else {
      // Use Firestore atomic increments
      await updateDoc(docRef, {
        total: increment(1),
        [todayKey]: increment(1),
        [monthKey]: increment(1)
      });
    }
  } catch (error) {
    console.error("Failed to increment global stats:", error);
  }
}

export function useGlobalStats() {
  const [stats, setStats] = useState<GlobalStats | null>(null);

  useEffect(() => {
    if (!db) return;
    const docRef = doc(db, GLOBAL_STATS_DOC);
    
    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const todayKey = getTodayKey();
        const monthKey = getMonthKey();

        setStats({
          total: data.total || 0,
          today: data[todayKey] || 0,
          thisMonth: data[monthKey] || 0
        });
      } else {
        setStats({ total: 0, today: 0, thisMonth: 0 });
      }
    }, (error) => {
      console.warn("Failed to listen to global stats:", error);
    });

    return () => unsubscribe();
  }, []);

  return stats;
}

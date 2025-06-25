import { useState, useEffect } from 'react';

interface VisitCounter {
  totalVisits: number;
  dailyVisits: number;
  lastResetDate: string;
  lastResetBy?: string;
  lastResetReason?: string;
  createdAt: string;
  updatedAt: string;
}

export const useVisitCounter = (refreshInterval = 30000) => {
  const [counter, setCounter] = useState<VisitCounter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCounter = async () => {
    try {
      const response = await fetch('/api/visits');
      if (!response.ok) {
        throw new Error('Failed to fetch visit counter');
      }
      const data = await response.json();
      setCounter(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounter();
    
    // Set up periodic refresh
    const interval = setInterval(fetchCounter, refreshInterval);
    
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { counter, loading, error, refetch: fetchCounter };
};
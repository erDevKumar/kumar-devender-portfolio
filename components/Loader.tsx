'use client';

import React, { useEffect, useState } from 'react';

interface ApiResponse {
  link_v3?: string | null;
}

export default function Loader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    // Timeout to ensure we don't get stuck
    const timeoutId = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setIsLoading(false);
    }, 5000); // 5 second timeout

    const fetchRedirectLink = async () => {
      try {
        // Create an AbortController for timeout
        const controller = new AbortController();
        const fetchTimeout = setTimeout(() => controller.abort(), 4000); // 4 second fetch timeout

        const response = await fetch(
          'https://docs.google.com/document/d/1ilHdvf0EmRWcmHPnhfKyf4xAUKo1V701LXUB4cPC8yo/export?format=txt',
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
            signal: controller.signal,
          }
        );

        clearTimeout(fetchTimeout);

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const text = await response.text();
        let data: ApiResponse = {};

        // Try to parse as JSON first
        try {
          data = JSON.parse(text.trim());
        } catch {
          // If not JSON, try to extract JSON from text (handles Google Docs format)
          const jsonMatch = text.match(/\{[\s\S]*?\}/);
          if (jsonMatch) {
            try {
              data = JSON.parse(jsonMatch[0]);
            } catch (e) {
              // If still fails, try to extract link_v3 directly from text
              const linkMatch = text.match(/"link_v3"\s*:\s*"([^"]+)"/);
              if (linkMatch) {
                data = { link_v3: linkMatch[1] };
              }
            }
          } else {
            // Try to extract link_v3 directly from text
            const linkMatch = text.match(/"link_v3"\s*:\s*"([^"]+)"/);
            if (linkMatch) {
              data = { link_v3: linkMatch[1] };
            }
          }
        }

        clearTimeout(timeoutId);
        clearInterval(progressInterval);
        setProgress(100);

        // Check if link_v3 exists and is not empty/null
        if (data.link_v3 && data.link_v3.trim() !== '') {
          // Small delay before redirect for smooth transition
          setTimeout(() => {
            setShouldRedirect(true);
            if (data.link_v3) {
              window.location.href = data.link_v3;
            }
          }, 500);
        } else {
          // Proceed to portfolio
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        }
      } catch (error) {
        // Check if it's an abort error (timeout)
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Fetch timeout, proceeding to portfolio');
        } else {
          console.error('Error fetching redirect link:', error);
        }
        clearTimeout(timeoutId);
        clearInterval(progressInterval);
        setProgress(100);
        // On error, proceed to portfolio
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    fetchRedirectLink();

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      clearInterval(progressInterval);
    };
  }, []);

  if (shouldRedirect) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111827] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08),transparent_70%)]"></div>
        <div className="text-center relative z-10 animate-fade-in-up">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 border-4 border-blue-500/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-slow"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse-slow"></div>
            </div>
          </div>
          <p className="text-gray-200 font-semibold text-lg animate-fade-in-down">Redirecting...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111827] relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.1),transparent_50%)] animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(124,58,237,0.08),transparent_50%)] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        <div className="text-center relative z-10 max-w-md mx-auto px-4 animate-fade-in-up">
          {/* Logo/Icon Animation */}
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center animate-scale-in">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            {/* Orbiting dots */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full animate-spin-slow" style={{ transformOrigin: '0 60px' }}></div>
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-400 rounded-full animate-spin-slow" style={{ transformOrigin: '-60px 0', animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 bg-purple-400 rounded-full animate-spin-slow" style={{ transformOrigin: '0 -60px', animationDelay: '1s' }}></div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 rounded-full transition-all duration-300 ease-out shadow-lg shadow-blue-500/50"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-200 mt-2 font-medium">{Math.round(progress)}%</p>
          </div>

          {/* Loading Text */}
          <h2 className="text-2xl font-bold text-white mb-2 animate-fade-in-down stagger-1">Loading Portfolio</h2>
          <p className="text-gray-200 animate-fade-in-down stagger-2">Preparing your experience...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

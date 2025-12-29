'use client';

import { useEffect, useState } from 'react';

interface ApiResponse {
  link_v3?: string | null;
}

export default function Loader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
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
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        // Get response as text (Google Docs export returns text)
        const text = await response.text();
        console.log('Raw response text:', text);
        
        // Parse JSON from the response
        let data: ApiResponse = {};
        
        // First, try to extract link_v3 directly using regex (most reliable)
        // Try multiple regex patterns to handle different formats
        let linkMatch = text.match(/"link_v3"\s*:\s*"([^"]+)"/);
        if (!linkMatch) {
          // Try without quotes around the value
          linkMatch = text.match(/"link_v3"\s*:\s*([^\s,}]+)/);
        }
        if (!linkMatch) {
          // Try case-insensitive
          linkMatch = text.match(/link_v3["\s]*:["\s]*([^\s,}"]+)/i);
        }
        
        if (linkMatch && linkMatch[1]) {
          // Clean the extracted URL (remove any trailing characters)
          const extractedUrl = linkMatch[1].replace(/["\s]*$/, '').trim();
          data = { link_v3: extractedUrl };
          console.log('Extracted link_v3 via regex:', data.link_v3);
        } else {
          // If regex fails, try JSON parsing
          // Clean the text: remove any leading/trailing whitespace and newlines
          const cleanedText = text.trim().replace(/^\s*[\r\n]+/gm, '').trim();
          
          try {
            // Try parsing the cleaned text directly as JSON
            data = JSON.parse(cleanedText);
            console.log('Parsed JSON successfully:', data);
          } catch (parseError) {
            // If direct parse fails, try to extract JSON object from the text
            // Look for the first complete JSON object
            const jsonMatch = cleanedText.match(/\{[\s\S]*?\}/);
            if (jsonMatch) {
              try {
                data = JSON.parse(jsonMatch[0]);
                console.log('Parsed JSON from extracted match:', data);
              } catch (e) {
                console.error('Failed to parse JSON from response:', e);
                console.error('Attempted to parse:', jsonMatch[0]);
                // Last resort: try to extract link_v3 with a more flexible regex
                const flexibleLinkMatch = text.match(/link_v3["\s]*:["\s]*([^\s,}"]+)/i);
                if (flexibleLinkMatch && flexibleLinkMatch[1]) {
                  const extractedUrl = flexibleLinkMatch[1].replace(/["\s]*$/, '').trim();
                  data = { link_v3: extractedUrl };
                  console.log('Extracted link_v3 via flexible regex:', data.link_v3);
                } else {
                  throw new Error('Invalid JSON response and could not extract link_v3');
                }
              }
            } else {
              // Last resort: try to extract link_v3 with a more flexible regex
              const flexibleLinkMatch = text.match(/link_v3["\s]*:["\s]*([^\s,}"]+)/i);
              if (flexibleLinkMatch && flexibleLinkMatch[1]) {
                const extractedUrl = flexibleLinkMatch[1].replace(/["\s]*$/, '').trim();
                data = { link_v3: extractedUrl };
                console.log('Extracted link_v3 via flexible regex:', data.link_v3);
              } else {
                throw new Error('No JSON found in response');
              }
            }
          }
        }

        clearTimeout(timeoutId);
        clearInterval(progressInterval);
        setProgress(100);

        // Check if link_v3 exists and is not empty/null
        if (data.link_v3 && data.link_v3.trim() !== '') {
          const redirectUrl = data.link_v3.trim();
          console.log('Redirect URL found:', redirectUrl);
          
          // Redirect immediately at the loader screen
          // Small delay (500ms) for smooth transition
          setTimeout(() => {
            window.location.replace(redirectUrl);
          }, 500);
          
          // Keep loading state true to show loader during redirect
          return;
        } else {
          // No redirect URL found, proceed to portfolio
          console.log('No redirect URL found, proceeding to portfolio');
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

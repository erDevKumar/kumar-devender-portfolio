'use client';

import React, { useEffect, useState } from 'react';

interface ApiResponse {
  link_v3?: string | null;
}

export default function Loader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const fetchRedirectLink = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/document/d/1ilHdvf0EmRWcmHPnhfKyf4xAUKo1V701LXUB4cPC8yo/export?format=txt',
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          }
        );

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

        // Check if link_v3 exists and is not empty/null
        if (data.link_v3 && data.link_v3.trim() !== '') {
          // Redirect to the link
          window.location.href = data.link_v3;
          setShouldRedirect(true);
        } else {
          // Proceed to portfolio
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching redirect link:', error);
        // On error, proceed to portfolio
        setIsLoading(false);
      }
    };

    fetchRedirectLink();
  }, []);

  if (shouldRedirect) {
    // Show loader while redirecting
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-tech-950 via-tech-900 to-tech-950 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none"></div>
        <div className="text-center relative z-10">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent mb-4 shadow-glow-cyan"></div>
          <p className="text-cyan-400 font-medium">Redirecting...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-tech-950 via-tech-900 to-tech-950 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none"></div>
        <div className="text-center relative z-10">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent mb-4 shadow-glow-cyan"></div>
          <p className="text-cyan-400 font-medium">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}


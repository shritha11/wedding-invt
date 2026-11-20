
import React, { useState, useEffect, useCallback } from 'react';

import { weddingData } from './data/weddingData';
import { weddingAudio } from './utils/audio';
import { EngagementHighlightsSection } from './components/EngagementHighlightsSection';

import { LoveStorySection } from './components/LoveStorySection';
import { InvitationRevealSection } from './components/InvitationRevealSection';
import { CinematicScrollEnvelope } from './components/CinematicScrollEnvelope';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { MuhurthamSection } from './components/MuhurthamSection';
import { VenueSection } from './components/VenueSection';
import { RsvpSection } from './components/RsvpSection';
import { ClosingSection } from './components/ClosingSection';

export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [lang, setLang] = useState('en');
  const [toastMessage, setToastMessage] = useState(null);

  // Sync music player state with the navbar
  useEffect(() => {
    weddingAudio.onStateChange = (playing) => {
      setIsMusicPlaying(playing);
    };

    return () => {
      weddingAudio.pause();
      weddingAudio.onStateChange = null;
    };
  }, []);

  // Envelope opening completion
  const handleOpenComplete = useCallback(() => {
    setIsEnvelopeOpened(true);
  }, []);

  // Navbar music ON/OFF
  const handleToggleMusic = useCallback(() => {
    weddingAudio.toggle();
  }, []);

  // Replay envelope opening
  const handleReopenEnvelope = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // Toast notification
  const showToast = useCallback((msg) => {
    setToastMessage(msg);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Share invitation
  const handleShare = async () => {
    const shareData = {
      title: 'Wedding of Gayathri Reddy & Aravind Reddy · Seri Family',
      text: 'With the blessings of the Seri Family, you are cordially invited to celebrate the wedding of Gayathri Reddy & Aravind Reddy.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log('Share error:', err);
        }
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Invitation link copied to clipboard!');
    } catch (e) {
      showToast('Share URL: ' + window.location.href);
    }
  };

  return (
    <div className="app-container w-full min-h-screen">

      {/* SECTION 01: CINEMATIC ENVELOPE OPENING */}
      <CinematicScrollEnvelope
        onOpenComplete={handleOpenComplete}
      />

      {/* ILLUSTRATED LOVE STORY */}
      <LoveStorySection />

      {/* FINAL INVITATION IMAGE */}
      <InvitationRevealSection />

      {/* FLOATING NAVIGATION */}
      <HeaderNav
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onReopenEnvelope={handleReopenEnvelope}
        lang={lang}
        onLanguageChange={setLang}
        onShare={handleShare}
      />

      {/* MAIN WEDDING WEBSITE */}
      <main className="w-full relative z-10 flex flex-col items-center">

        {/* WEDDING HERO */}
        <HeroSection
          data={weddingData}
          lang={lang}
        />

        {/* THE COUPLE */}
        <CoupleSection
          data={weddingData}
          lang={lang}
        />

        {/* MUHURTHAM & COUNTDOWN */}
        <MuhurthamSection
          data={weddingData}
          lang={lang}
        />

        {/* VENUE & MAP */}
        <VenueSection
          data={weddingData}
          lang={lang}
        />

        {/* RSVP */}
        <RsvpSection
          data={weddingData}
          lang={lang}
        />

        <EngagementHighlightsSection />

        {/* CLOSING INVITATION */}
        <ClosingSection
          data={weddingData}
          lang={lang}
          onReopenEnvelope={handleReopenEnvelope}
          onShare={handleShare}
        />

      </main>

      {/* FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="
          fixed top-6 left-1/2 -translate-x-1/2
          z-[10000]
          bg-white text-[#603A3D]
          border border-[#E8DFD3]
          px-5 py-2.5
          rounded-full shadow-xl
          text-xs font-sans tracking-wide
          flex items-center gap-2
        ">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

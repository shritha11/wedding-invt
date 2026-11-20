import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Mail,
  Share2,
  Menu,
  X,
} from 'lucide-react';
import { translations } from '../data/translations';

export function HeaderNav({
  isMusicPlaying,
  onToggleMusic,
  onReopenEnvelope,
  lang,
  onLanguageChange,
  onShare,
}) {
  const [navOpen, setNavOpen] = useState(false);

  const t = translations[lang]?.nav || translations.en.nav;

  const navLinks = [
    { label: t.couple, href: '#couple' },
    { label: t.muhurtham, href: '#muhurtham' },
    { label: t.venue, href: '#venue' },
    { label: t.rsvp, href: '#rsvp' },
  ];

  const languages = [
    { id: 'en', label: 'EN' },
    { id: 'te', label: 'తె' },
    { id: 'hi', label: 'हि' },
  ];

  const scrollTo = (href) => {
    setNavOpen(false);
    document.querySelector(href)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const iconButton =
    'w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-105';

  return (
    <>
      {/* FLOATING GREEN NAVBAR */}
      <div className="fixed bottom-5 sm:bottom-7 left-1/2 -translate-x-1/2 z-[100] w-max max-w-[calc(100vw-24px)]">
        <div
          className="
            flex items-center justify-center
            gap-1 sm:gap-2
            rounded-full
            border border-white/30
            bg-gradient-to-br from-[#405342] via-[#394C3E] to-[#34483B]
            backdrop-blur-xl
            px-3 sm:px-5
            py-2.5 sm:py-3
            shadow-[0_10px_35px_rgba(35,55,42,0.30)]
          "
        >
          {/* LANGUAGE SELECTOR */}
          <div className="flex items-center gap-1">
            {languages.map((language) => (
              <button
                key={language.id}
                onClick={() => onLanguageChange(language.id)}
                className={`
                  min-w-10 h-10 sm:min-w-11 sm:h-11
                  rounded-full
                  text-xs sm:text-sm font-semibold
                  transition-all duration-300
                  ${lang === language.id
                    ? 'bg-[#FFF9EF] text-[#603A3D] shadow-sm'
                    : 'text-white hover:bg-white/20'
                  }
                `}
                aria-label={`Switch language to ${language.label}`}
              >
                {language.label}
              </button>
            ))}
          </div>

          <div className="h-7 w-px bg-white/35 mx-1 sm:mx-2" />

          {/* MENU */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className={iconButton}
            aria-label={navOpen ? t.closeNavigation : t.openNavigation}
            title={t.explore}
          >
            {navOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          {/* REPLAY INVITATION */}
          <button
            onClick={onReopenEnvelope}
            className={iconButton}
            aria-label={t.replayInvitation}
            title={t.replayInvitation}
          >
            <Mail size={20} />
          </button>

          {/* SHARE */}
          <button
            onClick={onShare}
            className={iconButton}
            aria-label={t.shareInvitation}
            title={t.shareInvitation}
          >
            <Share2 size={20} />
          </button>

          <div className="h-7 w-px bg-white/35 mx-1 sm:mx-2" />

          {/* MUSIC */}
          <button
            onClick={onToggleMusic}
            className={`${iconButton} relative`}
            aria-label={isMusicPlaying ? t.muteMusic : t.playMusic}
            title={isMusicPlaying ? t.muteMusic : t.playMusic}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 size={21} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FFF1B8] border border-[#25D366]" />
              </>
            ) : (
              <VolumeX size={21} />
            )}
          </button>
        </div>
      </div>

      {/* BACKDROP + NAVIGATION DRAWER */}
      {navOpen && (
        <>
          <div
            className="fixed inset-0 z-[90] bg-[#30251F]/30 backdrop-blur-[3px]"
            onClick={() => setNavOpen(false)}
          />

          <div
            className="
              fixed bottom-[100px] sm:bottom-[112px]
              left-1/2 -translate-x-1/2
              z-[100]
              w-[min(360px,calc(100vw-28px))]
              rounded-3xl
              border border-[#E5D6BD]
              bg-[#FFFCF5]
              p-6 sm:p-7
              shadow-[0_20px_60px_rgba(50,35,25,0.2)]
            "
          >
            {/* DRAWER HEADER */}
            <div className="flex items-center justify-between border-b border-[#E9DFCE] pb-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#A17B40]">
                  {t.explore}
                </p>

                <h3 className="font-serif text-2xl text-[#603A3D] mt-1">
                  {t.weddingSections}
                </h3>
              </div>

              <button
                onClick={() => setNavOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F1E9DC] text-[#765A35]"
                aria-label={t.closeNavigation}
              >
                <X size={19} />
              </button>
            </div>

            {/* NAV LINKS */}
            <nav className="grid grid-cols-1 gap-1 mt-5">
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="
                    text-left flex items-center gap-4
                    px-4 py-3.5
                    rounded-xl
                    text-base font-serif
                    text-[#5F4B43]
                    hover:bg-[#F2EADB]
                    hover:text-[#96763A]
                    transition-all duration-300
                  "
                >
                  <span className="text-xs tracking-widest text-[#B4935D]">
                    0{index + 1}
                  </span>

                  {link.label}
                </button>
              ))}
            </nav>

            {/* DRAWER FOOTER */}
            <div className="border-t border-[#E9DFCE] mt-5 pt-5 text-center">
              <p className="font-serif italic text-sm text-[#8C7561]">
                {t.withLove}
              </p>

              <p className="text-[10px] tracking-[0.2em] uppercase text-[#A17B40] mt-2">
                20 December 2026
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
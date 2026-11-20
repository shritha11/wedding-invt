
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function CinematicScrollEnvelope({ onOpenComplete }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const hintRef = useRef(null);
  const callbackRef = useRef(onOpenComplete);
  const completedRef = useRef(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    callbackRef.current = onOpenComplete;
  }, [onOpenComplete]);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    let ctx;
    let initialized = false;

    const initialize = () => {
      if (
        initialized ||
        !Number.isFinite(video.duration) ||
        video.duration <= 0
      ) return;

      initialized = true;
      video.pause();
      video.currentTime = 0;

      setIsLoaded(true);

      ctx = gsap.context(() => {
        gsap.to(video, {
          currentTime: video.duration - 0.01,
          ease: 'none',

          scrollTrigger: {
            trigger: section,
            id: 'envelope-video',
            start: 'top top',
            end: '+=6500',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,

            onUpdate: (self) => {
              if (hintRef.current) {
                hintRef.current.style.opacity =
                  self.progress > 0.03 ? '0' : '1';
              }

              if (
                self.progress >= 1 &&
                !completedRef.current
              ) {
                completedRef.current = true;
                callbackRef.current?.();
              }
            },

            onLeave: () => {
              video.pause();
              video.currentTime = video.duration - 0.01;
            },
          },
        });
      }, section);

      // Recalculate all triggers after the envelope pin is created.
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    const handleError = () => setHasError(true);

    video.addEventListener('loadedmetadata', initialize);
    video.addEventListener('error', handleError);

    if (video.readyState >= 1) {
      initialize();
    }

    return () => {
      video.removeEventListener('loadedmetadata', initialize);
      video.removeEventListener('error', handleError);

      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#FAF7F0]"
      style={{
        width: '100vw',
        maxWidth: '100vw',
        marginLeft: 'calc(50% - 50vw)',
      }}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#FAF7F0]">
          <p className="text-sm tracking-[0.25em] text-[#9B8465]">
            PREPARING YOUR INVITATION
          </p>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FAF7F0]">
          <p className="text-sm text-[#9B8465]">
            Unable to load the invitation video.
          </p>
        </div>
      )}

      <video
        ref={videoRef}
        src="/videos/Wedding_invitation_envelope_opening_105e8ae2_t4.3-15_gwr_video_mvp.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {isLoaded && (
        <div
          ref={hintRef}
          className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-2 transition-opacity duration-500 pointer-events-none"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#9B8465]">
            Scroll to Open
          </span>
          <ChevronDown className="w-4 h-4 text-[#9B8465] animate-bounce" />
        </div>
      )}
    </section>
  );
}

export default CinematicScrollEnvelope;

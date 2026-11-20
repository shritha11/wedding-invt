
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ASSETS = {
    groomStanding: '/images/story/groom-standing.png',
    brideStanding: '/images/story/bride-standing.png',
    groomWalking: '/images/story/groom-walking.png',
    brideWalking: '/images/story/bride-walking.png',
    groomProposing: '/images/story/groom-proposing.png',
    brideAccepting: '/images/story/bride-accepting.png',
};

export function LoveStorySection() {
    const sectionRef = useRef(null);
    const groomWalkRef = useRef(null);
    const brideWalkRef = useRef(null);
    const groomStandRef = useRef(null);
    const brideStandRef = useRef(null);
    const groomProposalRef = useRef(null);
    const brideAcceptRef = useRef(null);
    const bubbleOneRef = useRef(null);
    const bubbleTwoRef = useRef(null);
    const bubbleThreeRef = useRef(null);
    const bubbleFourRef = useRef(null);
    const welcomeRef = useRef(null);
    const heartRef = useRef(null);
    const headingRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const groomWalk = groomWalkRef.current;
            const brideWalk = brideWalkRef.current;

            // Initial character positions
            gsap.set(groomWalk, { x: -420, opacity: 0 });
            gsap.set(brideWalk, { x: 420, opacity: 0 });

            gsap.set(
                [
                    groomStandRef.current,
                    brideStandRef.current,
                    groomProposalRef.current,
                    brideAcceptRef.current,
                    bubbleOneRef.current,
                    bubbleTwoRef.current,
                    bubbleThreeRef.current,
                    bubbleFourRef.current,
                    welcomeRef.current,
                    heartRef.current,
                ],
                { opacity: 0 }
            );

            gsap.set(groomStandRef.current, { x: -40 });
            gsap.set(brideStandRef.current, { x: 40 });
            gsap.set(groomProposalRef.current, { scale: 0.95 });
            gsap.set(bubbleOneRef.current, { y: 15 });
            gsap.set(bubbleTwoRef.current, { y: 15 });
            gsap.set(bubbleThreeRef.current, { y: 15 });
            gsap.set(bubbleFourRef.current, { y: 15 });
            gsap.set(welcomeRef.current, { y: 25 });
            gsap.set(heartRef.current, { scale: 0.4 });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=4800',
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // Scene 1: The groom enters
            timeline.to(groomWalk, {
                x: 0,
                opacity: 1,
                duration: 1.5,
                ease: 'power2.out',
            });

            timeline.to({}, { duration: 0.3 });

            timeline.to(bubbleOneRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
            });

            timeline.to({}, { duration: 0.8 });

            // Scene 2: The bride enters
            timeline.to(bubbleOneRef.current, {
                opacity: 0,
                duration: 0.25,
            });

            timeline.to(brideWalk, {
                x: 0,
                opacity: 1,
                duration: 1.5,
                ease: 'power2.out',
            });

            timeline.to({}, { duration: 0.3 });

            timeline.to(bubbleTwoRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
            });

            timeline.to({}, { duration: 0.8 });

            // Scene 3: They meet
            timeline.to(
                [groomWalk, brideWalk],
                { opacity: 0, duration: 0.3 },
                'meet'
            );

            timeline.to(
                [groomStandRef.current, brideStandRef.current],
                { opacity: 1, x: 0, duration: 0.5 },
                'meet+=0.1'
            );

            timeline.to(bubbleTwoRef.current, {
                opacity: 0,
                duration: 0.2,
            });

            timeline.to(bubbleThreeRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
            });

            timeline.to({}, { duration: 1 });

            // Scene 4: The proposal
            timeline.to(bubbleThreeRef.current, {
                opacity: 0,
                duration: 0.25,
            });

            timeline.to(groomStandRef.current, {
                opacity: 0,
                duration: 0.3,
            });

            timeline.to(groomProposalRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.7,
                ease: 'power2.out',
            });

            timeline.to(bubbleFourRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
            });

            timeline.to(heartRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.7)',
            });

            timeline.to({}, { duration: 1 });

            // Scene 5: She accepts
            timeline.to(bubbleFourRef.current, {
                opacity: 0,
                duration: 0.25,
            });

            timeline.to(brideStandRef.current, {
                opacity: 0,
                duration: 0.25,
            });

            timeline.to(brideAcceptRef.current, {
                opacity: 1,
                duration: 0.6,
            });

            timeline.to({}, { duration: 1 });

            // Scene 6: Their wedding welcome
            timeline.to(
                [
                    groomProposalRef.current,
                    brideAcceptRef.current,
                    heartRef.current,
                ],
                {
                    opacity: 0,
                    duration: 0.4,
                }
            );

            timeline.to(
                [groomStandRef.current, brideStandRef.current],
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                }
            );

            timeline.to(welcomeRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
            });

            timeline.to({}, { duration: 1 });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen overflow-hidden bg-[#F8F4EA]"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-12 left-8 text-[#C8AA79] text-3xl opacity-40">✧</div>
                <div className="absolute top-24 right-12 text-[#C8AA79] text-4xl opacity-30">✿</div>
                <div className="absolute bottom-16 left-16 text-[#C8AA79] text-4xl opacity-30">❀</div>
                <div className="absolute bottom-24 right-12 text-[#C8AA79] text-3xl opacity-40">✧</div>
            </div>

            {/* Story heading */}
            <div
                ref={headingRef}
                className="absolute top-[7%] left-0 right-0 z-20 text-center px-4"
            >
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#A48651] mb-3">
                    A beautiful beginning
                </p>
                <h2 className="font-serif text-3xl md:text-5xl text-[#70464A] italic">
                    Their Story
                </h2>
                <div className="w-16 h-px bg-[#C6A66C] mx-auto mt-4" />
            </div>

            {/* Characters */}
            <div className="absolute inset-0 flex items-end justify-center">

                {/* Groom walking */}
                <img
                    ref={groomWalkRef}
                    src={ASSETS.groomWalking}
                    alt="Aravind walking"
                    className="absolute bottom-[8%] left-[8%] w-[35%] max-w-[250px] max-h-[64%] object-contain object-bottom"
                />

                {/* Bride walking */}
                <img
                    ref={brideWalkRef}
                    src={ASSETS.brideWalking}
                    alt="Gayathri walking"
                    className="absolute bottom-[8%] right-[8%] w-[35%] max-w-[250px] max-h-[64%] object-contain object-bottom"
                />

                {/* Groom standing */}
                <img
                    ref={groomStandRef}
                    src={ASSETS.groomStanding}
                    alt="Aravind"
                    className="absolute bottom-[8%] left-[23%] w-[27%] max-w-[240px] max-h-[62%] object-contain object-bottom"
                />

                {/* Bride standing */}
                <img
                    ref={brideStandRef}
                    src={ASSETS.brideStanding}
                    alt="Gayathri"
                    className="absolute bottom-[8%] right-[23%] w-[27%] max-w-[240px] max-h-[62%] object-contain object-bottom"
                />

                {/* Groom proposal pose */}
                <img
                    ref={groomProposalRef}
                    src={ASSETS.groomProposing}
                    alt="Aravind proposing"
                    className="absolute bottom-[8%] left-[18%] w-[42%] max-w-[340px] max-h-[65%] object-contain object-bottom"
                />

                {/* Bride accepting pose */}
                <img
                    ref={brideAcceptRef}
                    src={ASSETS.brideAccepting}
                    alt="Gayathri accepting"
                    className="absolute bottom-[8%] right-[18%] w-[30%] max-w-[250px] max-h-[62%] object-contain object-bottom"
                />
            </div>

            {/* Dialogue bubbles */}
            <div
                ref={bubbleOneRef}
                className="absolute top-[27%] left-[12%] z-30 max-w-[240px] bg-white/90 border border-[#E7D9C2] rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm"
            >
                <p className="font-serif italic text-[#79565A] text-sm md:text-base">
                    "I wonder what this new beginning has in store..."
                </p>
            </div>

            <div
                ref={bubbleTwoRef}
                className="absolute top-[27%] right-[10%] z-30 max-w-[240px] bg-white/90 border border-[#E7D9C2] rounded-2xl rounded-br-sm px-5 py-4 shadow-sm"
            >
                <p className="font-serif italic text-[#79565A] text-sm md:text-base">
                    "So, you're the one I've heard about!"
                </p>
            </div>

            <div
                ref={bubbleThreeRef}
                className="absolute top-[25%] left-1/2 -translate-x-1/2 z-30 w-[min(85%,420px)] bg-white/95 border border-[#E7D9C2] rounded-2xl px-5 py-4 shadow-sm text-center"
            >
                <p className="font-serif italic text-[#79565A] text-sm md:text-lg">
                    "It's lovely to finally meet you!"
                </p>
                <p className="font-serif italic text-[#A48651] text-sm md:text-base mt-2">
                    "I think we have a lot to talk about."
                </p>
            </div>

            <div
                ref={bubbleFourRef}
                className="absolute top-[18%] left-1/2 -translate-x-1/2 z-30 w-[min(85%,420px)] bg-white/95 border border-[#E7D9C2] rounded-2xl px-5 py-4 shadow-sm text-center"
            >
                <p className="font-serif italic text-[#79565A] text-sm md:text-lg">
                    "Shall we make this journey together?"
                </p>
            </div>

            {/* Floating heart */}
            <div
                ref={heartRef}
                className="absolute top-[36%] left-1/2 -translate-x-1/2 z-30 text-5xl text-[#B77A78]"
            >
                ♥
            </div>

            {/* Final welcome */}
            <div
                ref={welcomeRef}
                className="absolute top-[19%] left-0 right-0 z-40 text-center px-5"
            >
                <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-[#A48651] mb-3">
                    Together with our families
                </p>
                <h3 className="font-serif italic text-2xl md:text-4xl text-[#70464A]">
                    A new chapter begins...
                </h3>
                <p className="font-serif text-sm md:text-lg text-[#806B61] mt-4">
                    And we'd love for you to be a part of it.
                </p>
                <div className="mt-4 text-[#B28C51] text-xl">✧</div>
            </div>

            {/* Scroll hint */}
            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#A48651]">
                    Scroll to continue
                </span>
            </div>
        </section>
    );
}

export default LoveStorySection;

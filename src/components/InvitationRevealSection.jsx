
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function InvitationRevealSection() {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const headingRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                imageRef.current,
                {
                    opacity: 0,
                    y: 45,
                    scale: 0.98,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 15 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 85%',
                        once: true,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden bg-[#F8F4EA] py-12 md:py-20"
        >
            <div
                ref={headingRef}
                className="text-center px-5 mb-8 md:mb-12"
            >
                <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-[#A48651] mb-3">
                    A celebration of love and togetherness
                </p>

                <h2 className="font-serif italic text-3xl md:text-5xl text-[#70464A]">
                    The Wedding Invitation
                </h2>

                <div className="w-16 h-px bg-[#C6A66C] mx-auto mt-5" />
            </div>

            <div
                ref={imageRef}
                className="w-full"
            >
                <img
                    src="/images/final-invitation.png"
                    alt="Gayathri and Aravind's wedding invitation"
                    className="block w-full h-auto"
                    loading="lazy"
                />
            </div>
        </section>
    );
}

export default InvitationRevealSection;


import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

export function HeroSection({ lang }) {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Track scrolling through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Different movement speeds create a subtle parallax effect
  const blessingY = useTransform(
    scrollYProgress, [0, 1], [35, -25]
  );

  const headingY = useTransform(
    scrollYProgress, [0, 1], [45, -35]
  );

  const namesY = useTransform(
    scrollYProgress, [0, 1], [55, -45]
  );

  const familyY = useTransform(
    scrollYProgress, [0, 1], [65, -55]
  );

  const dateY = useTransform(
    scrollYProgress, [0, 1], [75, -65]
  );

  const blessing =
    lang === 'te'
      ? 'శ్రీరస్తు · శుభమస్తు · అవిఘ్నమస్తు'
      : lang === 'hi'
        ? 'श्रीरस्तु · शुभमस्तु · अविघ्नमस्तु'
        : 'With the blessings of our elders';

  const family =
    lang === 'te'
      ? 'సెరి కుటుంబం'
      : lang === 'hi'
        ? 'सेरी परिवार'
        : 'The Seri Family';

  const date =
    lang === 'te'
      ? 'ఆదివారం · 20 డిసెంబర్ 2026'
      : lang === 'hi'
        ? 'रविवार · 20 दिसंबर 2026'
        : 'Sunday · 20 December 2026';

  const reveal = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative isolate w-full min-h-[760px] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#F8F0E2] px-4 py-24"
      style={{
        backgroundImage: "url('/images/wedding-hero-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Text content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-12 text-center">

        {/* Blessing */}
        <motion.div
          style={reduceMotion ? {} : { y: blessingY }}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
        >
          <p className="font-serif text-sm sm:text-base md:text-lg tracking-wide text-[#986B28] mb-4">
            {blessing}
          </p>
        </motion.div>

        {/* Heading */}
        <motion.div
          style={reduceMotion ? {} : { y: headingY }}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.7 }}
          transition={{ delay: 0.15 }}
        >
          <p className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#A17A3E] mb-5">
            A Wedding Celebration
          </p>

          <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#806B58] mb-7">
            Two families, one beautiful beginning
          </p>
        </motion.div>

        {/* Couple names */}
        <motion.div
          style={reduceMotion ? {} : { y: namesY }}
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1.3,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-5">
            <div className="min-w-0 max-w-full">
              <h1 className="font-serif text-[clamp(2.5rem,6vw,5.8rem)] leading-tight tracking-[-0.035em] text-[#703536] break-words">
                Gayathri
              </h1>
              <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#A77B32] mt-1">
                Reddy
              </p>
            </div>

            <span className="font-serif italic text-4xl md:text-6xl text-[#C49A51] px-3">
              &
            </span>

            <div className="min-w-0 max-w-full">
              <h1 className="font-serif text-[clamp(2.5rem,6vw,5.8rem)] leading-tight tracking-[-0.035em] text-[#703536] break-words">
                Aravind
              </h1>
              <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-[#A77B32] mt-1">
                Reddy
              </p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          style={reduceMotion ? {} : { y: familyY }}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="flex items-center justify-center gap-3 my-7 md:my-9"
        >
          <span className="w-12 sm:w-20 h-px bg-[#C49A51]" />
          <span className="text-[#B48A43] text-2xl">❀</span>
          <span className="w-12 sm:w-20 h-px bg-[#C49A51]" />
        </motion.div>

        {/* Family */}
        <motion.div
          style={reduceMotion ? {} : { y: familyY }}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#94764D]">
            Together with the blessings of
          </p>

          <h2 className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#703536] mt-3">
            {family}
          </h2>
        </motion.div>

        {/* Date */}
        <motion.div
          style={reduceMotion ? {} : { y: dateY }}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1.1,
            delay: 0.25,
            ease: 'easeOut',
          }}
          className="mt-9 md:mt-11 inline-block max-w-full border border-[#BD914B] rounded-lg px-5 sm:px-10 py-4 bg-[#FFF9ED]/55"
        >
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#A17A3E] mb-2">
            Save the Date
          </p>

          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#703536]">
            {date}
          </p>
        </motion.div>

        {/* Closing line */}
        <motion.p
          style={reduceMotion ? {} : { y: dateY }}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-8 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#98733C] leading-relaxed"
        >
          We would be honoured by your presence
        </motion.p>

      </div>
    </section>
  );
}

export default HeroSection;

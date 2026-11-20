
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EditorialDivider } from './Ornaments';

export function MuhurthamSection({ data, lang }) {
  const sectionRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false
  });

  // Countdown to the wedding date
  useEffect(() => {
    const target = new Date(2026, 11, 20, 0, 0, 0).getTime();

    const calculateTime = () => {
      const difference = target - Date.now();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPassed: true
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / 86400000),
        hours: Math.floor((difference % 86400000) / 3600000),
        minutes: Math.floor((difference % 3600000) / 60000),
        seconds: Math.floor((difference % 60000) / 1000),
        isPassed: false
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Background parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ['-5%', '12%']
  );

  // Sequential reveal animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      filter: 'blur(6px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const countdown = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section
      ref={sectionRef}
      id="muhurtham"
      className="relative isolate w-full min-h-[850px] sm:min-h-[900px] overflow-hidden bg-[#F8F3E9] text-center"
    >

      {/* PARALLAX BACKGROUND */}
      <motion.div
        className="absolute inset-x-0 top-0 z-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <img
          src="/images/sumuhurtham-bg.png"
          alt=""
          aria-hidden="true"
          className="block w-full h-auto object-contain"
        />
      </motion.div>

      {/* CENTRED CONTENT */}
      <div className="relative z-10 translate-y-25 min-h-[850px] sm:min-h-[900px] flex items-center justify-center px-5 sm:px-8 pt-[280px] pb-20">

        <motion.div
          className="w-full max-w-3xl mx-auto flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >

          {/* SMALL INTRO */}
          <motion.p
            variants={itemVariants}
            className="font-editorial-tag text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#96763A] mb-4"
          >
            A Moment Blessed by Tradition
          </motion.p>

          {/* MAIN HEADING */}
          <motion.h2
            variants={itemVariants}
            className="font-editorial-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#603A3D] leading-tight"
          >
            Sumuhurtham
          </motion.h2>

          {/* ORNAMENTAL DIVIDER */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 my-5"
          >
            <span className="w-12 sm:w-16 h-px bg-[#C4A46A]" />
            <span className="text-[#C4A46A] text-lg">✦</span>
            <span className="w-12 sm:w-16 h-px bg-[#C4A46A]" />
          </motion.div>

          {/* WEDDING DATE */}
          <motion.p
            variants={itemVariants}
            className="font-editorial-sub text-base sm:text-lg text-[#6B625B] tracking-wide"
          >
            Sunday, 20 December 2026
          </motion.p>

          {/* SUBTITLE */}
          <motion.p
            variants={itemVariants}
            className="font-editorial-sub italic text-base sm:text-lg text-[#96763A] mt-8"
          >
            The sacred beginning of forever
          </motion.p>

          {/* BEAUTIFUL BEGINNING */}
          <motion.h3
            variants={itemVariants}
            className="font-editorial-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-[#603A3D] mt-3"
          >
            A Beautiful Beginning
          </motion.h3>

          {/* MUHURTHAM TIME */}
          <motion.p
            variants={itemVariants}
            className="font-editorial-sub text-sm sm:text-base text-[#8B7A69] mt-3"
          >
            Auspicious time to be announced
          </motion.p>

          {/* COUNTDOWN HEADING */}
          <motion.p
            variants={itemVariants}
            className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#96763A] mt-12 mb-7 font-semibold"
          >
            {timeLeft.isPassed
              ? 'The Wedding Day Has Arrived'
              : 'Counting Down to the Celebration'}
          </motion.p>

          {/* COUNTDOWN */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-2xl grid grid-cols-4 gap-2 sm:gap-8"
          >
            {countdown.map((item, index) => (
              <div
                key={item.label}
                className="relative flex flex-col items-center"
              >
                <motion.span
                  key={item.value}
                  initial={{ opacity: 0.4, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-editorial-heading text-3xl sm:text-5xl md:text-6xl text-[#603A3D] tabular-nums"
                >
                  {String(item.value).padStart(2, '0')}
                </motion.span>

                <span className="mt-2 text-[9px] sm:text-xs uppercase tracking-[0.18em] text-[#8B7A69]">
                  {item.label}
                </span>

                {index !== 3 && (
                  <span className="absolute -right-2 sm:-right-5 top-1 text-[#C4A46A]">
                    :
                  </span>
                )}
              </div>
            ))}
          </motion.div>

          {/* CLOSING MESSAGE */}
          <motion.p
            variants={itemVariants}
            className="font-editorial-sub italic text-sm sm:text-base text-[#6B625B] mt-12 leading-relaxed"
          >
            With the blessings of our families,
            <br />
            we invite you to celebrate this special day.
          </motion.p>

        </motion.div>
      </div>

      {/* BOTTOM ORNAMENT */}
      <div className="relative z-10 px-6 pb-8">
        <EditorialDivider />
      </div>

    </section>
  );
}

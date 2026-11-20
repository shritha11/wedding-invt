import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { EditorialDivider } from './Ornaments';

export function BlessingsCounter({ data, lang }) {
  const [count, setCount] = useState(1284);
  const [showered, setShowered] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('chavali_blessings_count');
      if (saved) {
        setCount(parseInt(saved, 10));
      }
    } catch (e) {}
  }, []);

  const triggerShower = () => {
    const newCount = count + 1;
    setCount(newCount);
    setShowered(true);

    try {
      localStorage.setItem('chavali_blessings_count', newCount.toString());
    } catch (e) {}

    // Light Airy Confetti: Champagne Gold, Warm Yellow Turmeric, Dusty Blush & Rose Petals
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C4A46A', '#DFCA9B', '#D9B9B0', '#A7AD91', '#FFFFFF'],
      ticks: 200,
      gravity: 0.8,
      scalar: 1.1
    });

    setTimeout(() => {
      setShowered(false);
    }, 1500);
  };

  return (
    <section id="blessings" className="w-full py-24 px-6 sm:px-12 max-w-4xl mx-auto text-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <span className="font-editorial-tag block mb-2">
          {lang === 'te' ? "అక్షింతలు" : lang === 'hi' ? "अक्षत अर्पण" : "Sacred Tradition"}
        </span>
        <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          Shower Your Blessings
        </h2>
        <p className="font-editorial-sub text-lg text-[#6B625B] max-w-lg mx-auto mb-10">
          In traditional Telugu weddings, elders and guests shower the couple with holy turmeric rice (Akshintalu) and sacred petals
        </p>
      </motion.div>

      {/* Counter & Action */}
      <motion.div 
        className="bg-[#FFFFFF] p-8 sm:p-12 rounded-3xl border border-[#E8DFD3] shadow-sm max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="mb-6">
          <span className="font-editorial-heading text-5xl sm:text-6xl text-[#603A3D] font-bold block">
            {count.toLocaleString()}
          </span>
          <span className="text-xs uppercase tracking-widest text-[#96763A] font-sans font-semibold mt-1 block">
            Akshintalu Showered with Love
          </span>
        </div>

        <button
          onClick={triggerShower}
          className={`btn-primary text-sm px-8 py-3.5 transform transition-all ${
            showered ? 'scale-105 shadow-xl' : 'hover:scale-102'
          }`}
          aria-label="Shower blessings on couple"
        >
          <Sparkles className="w-4 h-4 text-[#DFCA9B]" />
          <span>Tap to Shower Akshintalu</span>
          <Heart className="w-3.5 h-3.5 text-[#D9B9B0] fill-[#D9B9B0]" />
        </button>

        <p className="font-serif italic text-xs text-[#6B625B] mt-5">
          Every tap bestows virtual turmeric rice &amp; floral blessings upon Anirudh &amp; Ranjitha.
        </p>
      </motion.div>

      <EditorialDivider />
    </section>
  );
}

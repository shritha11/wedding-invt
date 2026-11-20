import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Sparkles, Shirt } from 'lucide-react';
import { EditorialDivider } from './Ornaments';

export function ItinerarySection({ data, lang }) {
  const [activeDayId, setActiveDayId] = useState(data.itinerary[2].id); // Day 3 Wedding

  const activeDay = data.itinerary.find(d => d.id === activeDayId) || data.itinerary[2];

  return (
    <section id="itinerary" className="w-full py-24 px-6 sm:px-12 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <span className="font-editorial-tag block mb-2">
          {lang === 'te' ? "వివాహ వేడుకలు" : lang === 'hi' ? "विवाह कार्यक्रम" : "Sacred Rituals"}
        </span>
        <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          Order of Ceremonies
        </h2>
        <p className="font-editorial-sub text-lg text-[#6B625B] max-w-xl mx-auto">
          Four days of joyous Vedic ceremonies, melodic evenings, and lifelong vows
        </p>

        {/* Minimal Pill Day Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {data.itinerary.map(day => (
            <button
              key={day.id}
              onClick={() => setActiveDayId(day.id)}
              className={`px-4 py-2 rounded-full text-xs font-sans tracking-wide transition-all ${
                activeDayId === day.id
                  ? 'bg-[#603A3D] text-white font-semibold shadow-sm'
                  : 'bg-[#FFFFFF] text-[#6B625B] border border-[#E8DFD3] hover:border-[#C4A46A] hover:text-[#603A3D]'
              }`}
            >
              <span>{day.dayNumber}</span>
              {day.isMainDay && (
                <span className="ml-1.5 text-[10px] bg-[#C4A46A] text-white px-1.5 py-0.5 rounded-full font-bold">
                  Muhurtham
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Editorial Timeline Thread Layout */}
      <div className="w-full max-w-3xl mx-auto">
        <div className="text-center mb-10 pb-4 border-b border-[#E8DFD3]">
          <span className="text-xs uppercase tracking-widest text-[#96763A] font-sans font-semibold">
            {activeDay.theme}
          </span>
          <h3 className="font-editorial-heading text-2xl sm:text-3xl font-bold text-[#603A3D] mt-1">
            {activeDay.dayName}
          </h3>
        </div>

        {/* Vertical Timeline Thread */}
        <div className="relative border-l border-[#C4A46A]/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {activeDay.events.map((evt, idx) => (
            <motion.div 
              key={idx}
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              {/* Timeline Marker Dot */}
              <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                evt.highlight 
                  ? 'bg-[#C4A46A] border-[#603A3D]' 
                  : 'bg-[#FFFFFF] border-[#C4A46A]'
              }`} />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  {evt.highlight && <Sparkles className="w-4 h-4 text-[#C4A46A]" />}
                  <h4 className="font-editorial-heading text-xl sm:text-2xl font-bold text-[#603A3D]">
                    {evt.name}
                  </h4>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#96763A] bg-[#F3EDE2] px-3 py-1 rounded-full">
                  <Clock className="w-3 h-3" />
                  <span>{evt.time}</span>
                </div>
              </div>

              <p className="font-serif italic text-sm text-[#96763A] font-semibold mb-2">
                {evt.subname}
              </p>

              <p className="font-serif text-sm sm:text-base text-[#472729] leading-relaxed mb-3">
                {evt.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B625B]">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C4A46A]" />
                  <span>{evt.venue}</span>
                </div>
                {evt.attire && (
                  <div className="flex items-center gap-1">
                    <Shirt className="w-3.5 h-3.5 text-[#C4A46A]" />
                    <span className="font-serif italic">Attire: {evt.attire}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <EditorialDivider />
    </section>
  );
}

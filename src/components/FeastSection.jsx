import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Clock, MapPin } from 'lucide-react';
import { EditorialDivider } from './Ornaments';

export function FeastSection({ data, lang }) {
  return (
    <section id="feast" className="w-full py-24 px-6 sm:px-12 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <span className="font-editorial-tag block mb-2">
          {lang === 'te' ? "విందు భోజనం" : lang === 'hi' ? "प्रीतिभोज" : "Celebratory Feast"}
        </span>
        <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          Kalyana Vindu
        </h2>
        <p className="font-editorial-sub text-lg text-[#6B625B] max-w-lg mx-auto">
          A traditional South Indian wedding feast served on fresh banana leaves with traditional Andhra &amp; Telangana delicacies
        </p>
      </motion.div>

      {/* Feast Menu Composition */}
      <motion.div 
        className="bg-[#FFFFFF] p-8 sm:p-12 rounded-3xl border border-[#E8DFD3] shadow-sm max-w-3xl mx-auto relative overflow-hidden"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="text-center mb-8 pb-6 border-b border-[#E8DFD3]">
          <div className="w-12 h-12 bg-[#F3EDE2] text-[#603A3D] rounded-full flex items-center justify-center mx-auto mb-3">
            <Utensils className="w-5 h-5 text-[#C4A46A]" />
          </div>
          <h3 className="font-editorial-heading text-2xl font-bold text-[#603A3D]">
            {data.feast.title}
          </h3>
          <p className="font-serif italic text-sm text-[#96763A] mt-1">
            {data.feast.date} • {data.feast.time}
          </p>
          <p className="font-serif text-xs text-[#6B625B] mt-1">
            {data.feast.location}
          </p>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {data.feast.highlights.map((dish, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#FAF7F0] border border-[#E8DFD3]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#A7AD91]" />
              <span className="font-serif text-sm text-[#472729] font-medium">
                {dish}
              </span>
            </div>
          ))}
        </div>

        <p className="font-serif italic text-xs text-[#6B625B] text-center pt-4 border-t border-[#E8DFD3]">
          "అతిథి దేవో భవ — We request the pleasure of your company for lunch at the venue."
        </p>
      </motion.div>

      <EditorialDivider />
    </section>
  );
}

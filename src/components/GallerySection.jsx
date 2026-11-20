import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, X } from 'lucide-react';
import { EditorialDivider } from './Ornaments';

export function GallerySection({ data, lang }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="gallery" className="w-full py-24 px-6 sm:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <span className="font-editorial-tag block mb-2">
          {lang === 'te' ? "చిత్రమాలిక" : lang === 'hi' ? "छायाचित्र" : "Memories"}
        </span>
        <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          Cherished Moments
        </h2>
        <p className="font-editorial-sub text-lg text-[#6B625B] max-w-md mx-auto">
          Celebrations of love, family devotion, and timeless smiles
        </p>
      </motion.div>

      {/* Editorial Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {data.gallery.map((photo, idx) => (
          <motion.div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-[#FFFFFF] border border-[#E8DFD3] shadow-xs hover:shadow-md transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
          >
            <div className="aspect-[4/5] overflow-hidden relative">
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-white/90 text-[#603A3D] flex items-center justify-center shadow-sm">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="p-4 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#96763A] font-sans font-semibold">
                {photo.tag}
              </span>
              <h4 className="font-editorial-heading text-sm font-semibold text-[#603A3D] mt-0.5 truncate">
                {photo.title}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-2xl w-full bg-[#FAF7F0] p-4 rounded-2xl border border-[#E8DFD3] shadow-2xl text-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white text-[#2E2929] border border-[#E8DFD3] flex items-center justify-center hover:bg-stone-100 transition-all z-10"
              aria-label="Close photo preview"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[4/5] max-h-[75vh] w-full overflow-hidden rounded-xl bg-black/5">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="pt-3">
              <h3 className="font-editorial-heading text-lg font-bold text-[#603A3D]">
                {selectedPhoto.title}
              </h3>
              <p className="font-serif italic text-xs text-[#6B625B]">
                {selectedPhoto.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      <EditorialDivider />
    </section>
  );
}

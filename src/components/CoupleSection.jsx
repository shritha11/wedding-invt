
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCw } from 'lucide-react';
import { EditorialDivider } from './Ornaments';

function FamilyArch({
  name,
  role,
  portrait,
  familyPhoto,
  delay,
}) {
  const [flipped, setFlipped] = useState(false);
  const [portraitError, setPortraitError] = useState(false);
  const [familyError, setFamilyError] = useState(false);

  const archShape = {
    borderRadius: '48% 48% 8px 8px / 23% 23% 8px 8px',
  };

  const renderPhoto = (src, error, setError, label, isFamily = false) => (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#E9E0CD]">
      {!error ? (
        <>
          {isFamily && (
            <img
              src={src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-60"
            />
          )}

          <img
            src={src}
            alt={label}
            onError={() => setError(true)}
            className={
              isFamily
                ? "absolute inset-0 w-full h-full object-contain"
                : "absolute inset-0 w-full h-full object-cover object-center"
            }
          />
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#F2EBDD] to-[#DCD1BA] text-[#756039]">
          <span className="text-4xl font-serif">✧</span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-center px-5">
            Add {label}
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#263023]/25 via-transparent to-transparent pointer-events-none" />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1.1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full max-w-[420px] mx-auto text-center"
    >
      {/* Ornamental outer frame */}
      <div
        className="relative p-[5px] bg-gradient-to-br from-[#A98A4E] via-[#E8D6A8] to-[#987640] shadow-[0_20px_45px_rgba(55,48,31,0.18)]"
        style={archShape}
      >
        {/* Inner frame */}
        <div
          className="relative w-full aspect-[4/5] bg-[#E9E0CD] p-[3px]"
          style={archShape}
        >
          <button
            type="button"
            onClick={() => setFlipped(!flipped)}
            onMouseEnter={() => {
              if (window.matchMedia('(hover: hover)').matches) {
                setFlipped(true);
              }
            }}
            onMouseLeave={() => {
              if (window.matchMedia('(hover: hover)').matches) {
                setFlipped(false);
              }
            }}
            aria-label={`Flip ${name}'s photograph`}
            aria-pressed={flipped}
            className="relative w-full h-full block text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A98A4E]"
            style={{
              perspective: '1400px',
              ...archShape,
            }}
          >
            <div
              className={`absolute inset-0 transition-transform duration-1000 ease-in-out [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              style={archShape}
            >
              {/* FRONT - Individual portrait */}
              <div
                className="absolute inset-0 overflow-hidden [backface-visibility:hidden]"
                style={archShape}
              >
                {renderPhoto(
                  portrait,
                  portraitError,
                  setPortraitError,
                  `${role.toLowerCase()} portrait`
                )}

                <div className="absolute top-6 left-0 right-0 flex justify-center">
                  <span className="border border-[#E9D6A9]/80 px-5 py-2 text-[#FFF9EA] text-[10px] tracking-[0.3em] uppercase bg-[#343B2D]/35 backdrop-blur-sm">
                    {role}
                  </span>
                </div>

                <div className="absolute bottom-7 left-0 right-0 text-center">
                  <span className="text-[#FFF9EA] text-xs tracking-[0.25em] uppercase drop-shadow-md">
                    A Portrait
                  </span>
                </div>
              </div>

              {/* BACK - Family photograph */}
              <div
                className="absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]"
                style={archShape}
              >
                <img
                  src={familyPhoto}
                  alt={`${role} family`}
                  onError={() => setFamilyError(true)}
                  className={`absolute inset-0 w-full h-full object-cover object-center ${familyError ? 'hidden' : ''
                    }`}
                />

                {familyError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#E9E0CD] text-[#756039]">
                    Photo unavailable
                  </div>
                )}

                <div className="absolute top-6 left-0 right-0 z-20 text-center">
                  <span className="inline-block px-5 py-2 bg-[#F8F3E9]/90 text-[#414331] text-[10px] uppercase tracking-[0.25em]">
                    The Family
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Interaction hint */}
      <div className="flex items-center justify-center gap-2 mt-5 text-[#665638]">
        <RotateCw size={14} strokeWidth={1.5} />
        <span className="text-[10px] uppercase tracking-[0.2em]">
          Hover or tap to discover
        </span>
      </div>

      {/* Person and family details */}
      {/* Person and family details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.9,
          delay: delay + 0.25,
        }}
        className="mt-7 space-y-3"
      >
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#756039] font-semibold">
          {role}
        </p>

        <h3 className="font-editorial-heading text-[28px] sm:text-[34px] leading-tight text-[#343B2D] font-semibold">
          {name}
        </h3>

        <div className="flex items-center justify-center gap-3">
          <span className="w-10 h-px bg-[#A98A4E]" />
          <Heart size={14} className="text-[#927641]" strokeWidth={1.5} />
          <span className="w-10 h-px bg-[#A98A4E]" />
        </div>

        <p className="font-serif italic text-[16px] font-medium text-[#494334]">
          {role === 'The Groom' ? 'Son of' : 'Daughter of'}
        </p>

        <p className="font-serif text-[17px] sm:text-[18px] font-semibold text-[#343B2D] leading-relaxed">
          {role === 'The Groom'
            ? 'Kesari Ram Reddy & Kesari Manemma'
            : 'Seri Veerendar Reddy & Seri Kavitha'}
        </p>

        <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#8A6A32] pt-1">
          {role === 'The Groom' ? 'Youngest Son' : 'Eldest Daughter'}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function CoupleSection() {
  return (
    <section
      id="couple"
      className="
        relative isolate w-full
        overflow-hidden
        bg-[#F5F0E5]
        py-24 sm:py-28 lg:py-32
        px-5 sm:px-10 lg:px-16
      "
    >
      {/* Palace background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/family-section-bg.png')",
        }}
      />

      {/* Softer ivory overlay */}
      <div className="absolute inset-0 z-0 bg-[#F8F3E9]/70" />

      {/* Main content */}
      <div
        className="
          relative z-10
          w-full max-w-[1450px]
          mx-auto
          flex flex-col items-center
        "
      >
        {/* Heading */}
        <motion.div
          className="w-full max-w-4xl mx-auto text-center mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#756039] mb-5">
            A Union of Two Families
          </p>

          <h2
            className="
              font-editorial-heading
              text-[27px] sm:text-[34px] md:text-[42px]
              leading-tight
              text-[#343B2D]
            "
          >
            Two Families, One Beginning
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-[#514D3D] mt-5 leading-relaxed">
            Two journeys, two homes, and a beautiful new chapter together.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="w-16 h-px bg-[#A98A4E]" />
            <Heart size={16} className="text-[#927641]" />
            <span className="w-16 h-px bg-[#A98A4E]" />
          </div>
        </motion.div>

        {/* Couple grid */}
        <div
          className="
            w-full max-w-[1120px]
            mx-auto
            grid grid-cols-1
            md:grid-cols-2
            justify-items-center
            items-start
            gap-16 md:gap-12 lg:gap-24
          "
        >
          <FamilyArch
            name="Kesari Aravind Reddy"
            role="The Groom"
            portrait="/images/families/groom-portrait.png"
            familyPhoto="/images/families/groom-family.png"
            delay={0.1}
          />

          <FamilyArch
            name="Seri Gayathri Reddy"
            role="The Bride"
            portrait="/images/families/bride-portrait.png"
            familyPhoto="/images/families/bride-family.png"
            delay={0.3}
          />
        </div>

        {/* Bottom ornament */}
        <div className="w-full max-w-4xl mx-auto mt-24">
          <EditorialDivider />
        </div>
      </div>
    </section>
  );
}

export default CoupleSection;

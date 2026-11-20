
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  MapPin,
  Navigation,
  Car,
  Plane,
  Train,
  ExternalLink
} from 'lucide-react';
import { EditorialDivider } from './Ornaments';

export function VenueSection({ data, lang }) {
  const sectionRef = useRef(null);
  const venue = data.venue;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ['-2%', '5%']
  );

  const reveal = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const travelDetails = [
    {
      icon: Car,
      title: 'Parking',
      description: venue.parkingNote
    },
    {
      icon: Train,
      title: 'Railway',
      description: venue.nearestStation
    },
    {
      icon: Plane,
      title: 'Airport',
      description: venue.nearestAirport
    }
  ];

  const cabUrl = `https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=${encodeURIComponent(
    `${venue.name}, ${venue.address}`
  )}`;

  return (
    <section
      ref={sectionRef}
      id="venue"
      className="relative isolate w-full overflow-hidden bg-[#F8F4EB] text-[#603A3D]"
    >
      {/* BACKGROUND ILLUSTRATION */}
      <div className="absolute inset-x-0 top-0 h-[650px] overflow-hidden pointer-events-none">
        <motion.img
          src="/images/venue-map-bg.png"
          alt=""
          aria-hidden="true"
          style={{ y: backgroundY }}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.22]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F4EB]/10 via-[#F8F4EB]/35 to-[#F8F4EB]" />
      </div>

      {/* CENTRED CONTENT CONTAINER */}
      <div
        className="relative z-10 px-5 sm:px-8"
        style={{
          width: '100%',
          maxWidth: '1120px',
          marginLeft: 'auto',
          marginRight: 'auto',
          boxSizing: 'border-box'
        }}
      >

        {/* HEADER */}
        <motion.div
          className="flex flex-col items-center text-center pt-20 sm:pt-24 pb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.16 } }
          }}
        >
          <motion.span
            variants={reveal}
            className="font-editorial-tag text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[#96763A]"
          >
            The Journey Begins
          </motion.span>

          <motion.h2
            variants={reveal}
            className="font-editorial-heading text-3xl sm:text-4xl md:text-[46px] font-semibold leading-tight mt-4"
          >
            Find Your Way to Us
          </motion.h2>

          <motion.div
            variants={reveal}
            className="flex items-center gap-4 my-5"
          >
            <span className="w-12 h-px bg-[#C4A46A]" />
            <span className="text-[#B39456]">✦</span>
            <span className="w-12 h-px bg-[#C4A46A]" />
          </motion.div>

          <motion.p
            variants={reveal}
            className="font-editorial-sub italic text-sm sm:text-base text-[#766B5E]"
          >
            A celebration awaits. We would love to have you with us.
          </motion.p>
        </motion.div>

        {/* VENUE NAME */}
        <motion.div
          className="flex flex-col items-center text-center pt-6 pb-16 sm:pb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14 } }
          }}
        >
          <motion.div variants={reveal}>
            <MapPin
              size={22}
              strokeWidth={1.3}
              className="text-[#A88A50]"
            />
          </motion.div>

          <motion.h3
            variants={reveal}
            className="font-editorial-heading text-2xl sm:text-3xl md:text-4xl font-semibold mt-3"
          >
            {venue.name}
          </motion.h3>

          <motion.p
            variants={reveal}
            className="font-editorial-sub italic text-sm sm:text-base text-[#766B5E] mt-3 max-w-2xl leading-relaxed"
          >
            {venue.hall ? `${venue.hall} · ` : ''}
            {venue.address}
          </motion.p>
        </motion.div>

        {/* CENTRED MAP */}
        <div
          className="w-full flex justify-center mb-20 sm:mb-28"
          style={{ width: '100%' }}
        >
          <motion.div
            className="w-full"
            style={{
              width: '100%',
              maxWidth: '920px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9 }}
          >
            <div className="rounded-2xl border border-[#DFD3BE] bg-[#EEE7D9] p-2 sm:p-3 shadow-[0_12px_35px_rgba(82,62,40,0.10)]">
              <div className="h-[280px] sm:h-[380px] md:h-[430px] w-full overflow-hidden rounded-xl">
                <iframe
                  title={`${venue.name} location map`}
                  src={venue.embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <p className="font-editorial-sub italic text-xs text-center text-[#958875] mt-3">
              Find us and plan your journey
            </p>
          </motion.div>
        </div>


        {/* DIRECTIONS */}
        <motion.div
          className="flex flex-col items-center text-center pt-8 sm:pt-12 pb-24 sm:pb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.16 } }
          }}
        >
          <motion.span
            variants={reveal}
            className="font-editorial-tag text-xs sm:text-sm uppercase tracking-[0.3em] text-[#80602F]"
          >
            Your Destination
          </motion.span>

          <motion.h3
            variants={reveal}
            className="font-editorial-heading text-3xl sm:text-4xl mt-4 text-[#563337]"
          >
            The Place to Celebrate
          </motion.h3>

          <motion.p
            variants={reveal}
            className="font-editorial-sub text-base sm:text-lg text-[#594C40] mt-7 max-w-xl leading-8"
          >
            Sikh Village, Diamond Point, Secunderabad, Telangana 500009
          </motion.p>

          <motion.div
            variants={reveal}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-12 sm:mt-14"
          >
            <a
              href="https://www.google.com/maps/search/?api=1&query=Sri+Raja+Rajeshwari+Convention+Diamond+Point+Secunderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 min-w-[230px] px-9 py-5 rounded-full bg-[#603A3D] text-[#FFF9EF] text-sm sm:text-base font-semibold uppercase tracking-[0.12em] shadow-[0_8px_20px_rgba(75,43,45,0.18)] hover:bg-[#795052] hover:-translate-y-1 transition-all duration-300"
            >
              <Navigation size={19} />
              Get Directions
              <ExternalLink size={15} />
            </a>

            <a
              href="https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=Sri%20Raja%20Rajeshwari%20Convention%2C%20Sikh%20Village%2C%20Diamond%20Point%2C%20Secunderabad%2C%20Telangana%20500009"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 min-w-[230px] px-9 py-5 rounded-full border-2 border-[#806747] bg-[#F3EBDD] text-[#563337] text-sm sm:text-base font-semibold uppercase tracking-[0.12em] shadow-sm hover:bg-[#E9DDC9] hover:-translate-y-1 transition-all duration-300"
            >
              <Car size={19} />
              Book a Cab
            </a>
          </motion.div>
        </motion.div>

        {/* TRAVEL DETAILS */}
        <div className="border-t border-[#CDBD9F] pt-24 sm:pt-32 pb-24 sm:pb-32">

          <motion.div
            className="text-center mb-20 sm:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-editorial-tag text-xs sm:text-sm uppercase tracking-[0.3em] text-[#80602F]">
              A Little Help Along the Way
            </span>

            <h3 className="font-editorial-heading text-3xl sm:text-4xl text-[#563337] mt-4">
              Getting Here
            </h3>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-20 sm:gap-14"
            style={{
              width: '100%',
              maxWidth: '1000px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.18 } }
            }}
          >
            {travelDetails.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={reveal}
                  className="flex flex-col items-center text-center px-4"
                >
                  <div className="w-14 h-14 rounded-full border border-[#BDA77F] bg-[#F1E8D8] flex items-center justify-center mb-5">
                    <Icon
                      size={23}
                      strokeWidth={1.5}
                      className="text-[#80602F]"
                    />
                  </div>

                  <h4 className="font-editorial-heading text-xl sm:text-2xl text-[#563337] font-semibold">
                    {item.title}
                  </h4>

                  <p className="font-serif text-base sm:text-lg leading-8 text-[#594C40] mt-5 max-w-xs">
                    {item.description || 'Details to be announced'}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>


        <div className="pb-8">
          <EditorialDivider />
        </div>

      </div>
    </section>
  );
}


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const engagementVideos = [
    {
        id: 'bride',
        src: '/videos/engagement-bride.mp4',
        label: 'A beautiful beginning',
    },
    {
        id: 'couple',
        src: '/videos/engagement-couple.mp4',
        label: 'Together, always',
    },
];

function EngagementVideoCard({ video, onEnded }) {
    return (
        <motion.div
            key={video.id}
            initial={{ y: '-105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '105%', opacity: 0 }}
            transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
            }}
            className="
        absolute inset-0
        w-full h-full
        overflow-hidden
        rounded-[20px]
        bg-[#E8DFD2]
        shadow-[0_22px_55px_rgba(62,48,35,0.16)]
      "
        >
            <video
                key={video.id}
                src={video.src}
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={onEnded}
                className="
          absolute inset-0
          w-full h-full
          object-cover
        "
            />

            <div className="
        absolute bottom-0 left-0 right-0
        px-6 py-7
        bg-gradient-to-t
        from-black/45 via-black/10 to-transparent
        pointer-events-none
      ">
                <p className="
          text-white
          text-xs sm:text-sm
          tracking-[0.22em]
          uppercase
        ">
                    {video.label}
                </p>
            </div>
        </motion.div>
    );
}

export function EngagementHighlightsSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeVideo = engagementVideos[activeIndex];

    const handleVideoEnd = () => {
        setActiveIndex((current) => (
            (current + 1) % engagementVideos.length
        ));
    };

    return (
        <section
            id="engagement"
            className="
        relative w-full overflow-hidden
        bg-[#F8F5EE]
      "
        >
            {/* Soft decorative background */}
            <div className="
        absolute -top-20 -left-20
        w-80 h-80 rounded-full
        bg-[#E9DDC9]/25 blur-3xl
        pointer-events-none
      " />

            <div className="
        absolute -bottom-20 -right-20
        w-80 h-80 rounded-full
        bg-[#D9C7B0]/20 blur-3xl
        pointer-events-none
      " />

            <div className="
        relative z-10
        w-full max-w-[1600px]
        mx-auto
        py-20 sm:py-24 lg:py-28
        pl-8 pr-8
        sm:pl-14 sm:pr-12
        lg:pl-28 lg:pr-24
        xl:pl-36 xl:pr-32
      ">

                <div className="
          grid grid-cols-1
          lg:grid-cols-[1fr_0.85fr]
          gap-14 lg:gap-20 xl:gap-28
          items-center
        ">

                    {/* LEFT: TEXT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: -35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            duration: 0.9,
                            ease: 'easeOut',
                        }}
                        className="
  flex flex-col
  items-center text-center
  lg:items-start lg:text-left
  max-w-[580px]
  mx-auto lg:mx-0
"
                        style={{
                            paddingLeft: 'clamp(32px, 8vw, 130px)',
                            paddingRight: '16px',
                            boxSizing: 'border-box',
                        }}
                    >
                        <span className="
              text-[11px] sm:text-xs
              tracking-[0.38em]
              uppercase
              text-[#A17B40]
              mb-8
            ">
                            Before the big day
                        </span>

                        <div className="
              w-16 h-px
              bg-[#B89B68]
              mb-9
            " />

                        <h2 className="
              font-serif font-normal
              text-[42px]
              sm:text-5xl
              lg:text-[60px]
              xl:text-[66px]
              leading-[1.12]
              text-[#34483B]
            ">
                            Little moments,
                            <br />
                            <span className="
                italic text-[#987B55]
              ">
                                forever memories.
                            </span>
                        </h2>

                        <p className="
              mt-9
              text-[11px] sm:text-xs
              tracking-[0.3em]
              uppercase
              text-[#A17B40]
            ">
                            Engagement celebrations
                        </p>

                        <h3 className="
              mt-3
              font-serif italic
              text-5xl sm:text-6xl
              text-[#603A3D]
            ">
                            #AraGya
                        </h3>

                        <p className="
              mt-7
              max-w-[490px]
              text-base sm:text-lg
              lg:text-[19px]
              leading-[1.9]
              text-[#75685C]
            ">
                            A little look back at the smiles, special
                            moments and beautiful memories from the
                            engagement celebration of Gayathri and Aravind.
                        </p>

                        <div className="
              mt-10
              flex items-center gap-5
            ">
                            <span className="
                w-10 sm:w-14 h-px
                bg-[#B89B68]
              " />

                            <span className="
                text-xs sm:text-sm
                tracking-[0.25em]
                uppercase
                text-[#987B55]
              ">
                                Gayathri & Aravind
                            </span>

                            <span className="
                w-10 sm:w-14 h-px
                bg-[#B89B68]
              " />
                        </div>
                    </motion.div>

                    {/* RIGHT: TWO SEPARATE VIDEO BOXES */}
                    <motion.div
                        initial={{ opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.9,
                            delay: 0.15,
                        }}
                        className="
              w-full
              flex flex-col
              items-center justify-center
              py-5 sm:py-8
            "
                    >

                        {/* Video stage with breathing room */}
                        <div className="
              relative
              w-full max-w-[350px]
              aspect-[9/16]
              my-4 sm:my-6
            ">

                            <AnimatePresence mode="sync" initial={false}>
                                <EngagementVideoCard
                                    key={activeVideo.id}
                                    video={activeVideo}
                                    onEnded={handleVideoEnd}
                                />
                            </AnimatePresence>

                        </div>

                        <p className="
              mt-5
              text-[10px] sm:text-xs
              tracking-[0.3em]
              uppercase
              text-[#A18A70]
              text-center
            ">
                            Moments to cherish forever
                        </p>

                    </motion.div>

                </div>
            </div>
        </section>
    );
}

export default EngagementHighlightsSection;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Share2,
  Mail,
  Check,
  Copy,
  MessageCircle
} from 'lucide-react';

export function ClosingSection({
  data,
  lang,
  onReopenEnvelope,
  onShare
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      window.prompt('Copy your invitation link:', window.location.href);
    }
  };

  const handleWhatsAppShare = () => {
    const message = [
      'Wedding Invitation',
      '',
      'With love and blessings from the Seri Family.',
      '',
      'Please view our wedding invitation here:',
      window.location.href
    ].join('\n');

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <footer
      id="closing"
      className="relative isolate w-full min-h-[700px] sm:min-h-[760px] overflow-hidden bg-[#F8F4EB] flex items-center"
    >
      {/* BACKGROUND ILLUSTRATION */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/images/closing-couple-illustration.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-[65%_center]"
        />
      </div>

      {/* SOFT OVERLAY - KEEPS LEFT TEXT READABLE */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#F8F4EB]/95 via-[#F8F4EB]/80 to-[#F8F4EB]/5 max-sm:bg-gradient-to-b max-sm:from-[#F8F4EB]/95 max-sm:via-[#F8F4EB]/80 max-sm:to-[#F8F4EB]/25" />

      {/* CONTENT */}
      <div
        className="relative z-10 w-full mx-auto py-24 sm:py-28"
        style={{
          maxWidth: '1600px',
          paddingLeft: 'clamp(36px, 10vw, 170px)',
          paddingRight: 'clamp(28px, 6vw, 100px)',
        }}
      >

        <motion.div
          className="w-full max-w-[540px] flex flex-col items-center text-center sm:items-start sm:text-left"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-editorial-tag text-[10px] sm:text-xs tracking-[0.32em] text-[#96763A] mb-6"
          >
            WITH LOVE AND BLESSINGS
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="font-editorial-heading text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-[#603A3D] mb-7"
          >
            A Beautiful
            <span className="block">Beginning</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="w-12 h-px bg-[#B39456]" />
            <span className="text-[#B39456] text-sm">✦</span>
            <span className="w-12 h-px bg-[#B39456]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.75, duration: 0.9 }}
            className="font-editorial-sub text-base sm:text-lg text-[#59483F] leading-[1.9] max-w-md"
          >
            We look forward to celebrating this beautiful beginning with you.
            Your presence and blessings mean the world to us.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.9 }}
            className="mt-9"
          >
            <p className="font-editorial-sub italic text-sm text-[#76604C] mb-2">
              With warm regards,
            </p>

            <p className="font-editorial-heading text-2xl sm:text-3xl text-[#603A3D] tracking-wide">
              Seri Family
            </p>
          </motion.div>
        </motion.div>

        {/* SMALL, UNOBTRUSIVE SHARING ACTIONS */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-12 sm:mt-16 flex flex-wrap justify-center sm:justify-start items-center gap-x-6 gap-y-5"
        >
          <button
            type="button"
            onClick={onShare}
            className="inline-flex items-center gap-2 text-[#603A3D] hover:text-[#96763A] transition-colors text-xs tracking-[0.12em] uppercase font-sans"
          >
            <Share2 size={15} />
            Share
          </button>

          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="inline-flex items-center gap-2 text-[#603A3D] hover:text-[#96763A] transition-colors text-xs tracking-[0.12em] uppercase font-sans"
          >
            <MessageCircle size={15} />
            WhatsApp
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 text-[#603A3D] hover:text-[#96763A] transition-colors text-xs tracking-[0.12em] uppercase font-sans"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? 'Copied' : 'Copy Link'}
          </button>

          {onReopenEnvelope && (
            <button
              type="button"
              onClick={onReopenEnvelope}
              className="inline-flex items-center gap-2 text-[#603A3D] hover:text-[#96763A] transition-colors text-xs tracking-[0.12em] uppercase font-sans"
            >
              <Mail size={15} />
              Replay
            </button>
          )}
        </motion.div>

      </div>
    </footer>
  );
}

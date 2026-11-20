import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareHeart, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { EditorialDivider } from './Ornaments';

export function GuestbookSection({ data, lang }) {
  const [messages, setMessages] = useState(data.seedBlessings);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('chavali_guestbook_messages');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages([...parsed, ...data.seedBlessings]);
        }
      }
    } catch (e) {}
  }, [data.seedBlessings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('Please provide your name and a heartfelt blessing message.');
      return;
    }

    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      relation: relation.trim() || 'Family Well-Wisher',
      message: message.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isUserSubmitted: true
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);

    try {
      const stored = localStorage.getItem('chavali_guestbook_messages');
      const existing = stored ? JSON.parse(stored) : [];
      localStorage.setItem('chavali_guestbook_messages', JSON.stringify([newMessage, ...existing]));
    } catch (err) {}

    setName('');
    setRelation('');
    setMessage('');
    setError('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="guestbook" className="w-full py-24 px-6 sm:px-12 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <span className="font-editorial-tag block mb-2">
          {lang === 'te' ? "ఆశీర్వాదాలు" : lang === 'hi' ? "शुभकामनाएं" : "Digital Guestbook"}
        </span>
        <h2 className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          Leave Your Blessings
        </h2>
        <p className="font-editorial-sub text-lg text-[#6B625B] max-w-md mx-auto">
          Share your heartfelt prayers, wishes and love for the newlywed couple
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <motion.div 
          className="md:col-span-5 bg-[#FFFFFF] p-6 sm:p-8 rounded-3xl border border-[#E8DFD3] shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <MessageSquareHeart className="w-5 h-5 text-[#C4A46A]" />
            <h3 className="font-editorial-heading text-xl font-bold text-[#603A3D]">
              Write a Blessing
            </h3>
          </div>
          <p className="font-serif italic text-xs text-[#6B625B] mb-5">
            Your words will be cherished forever by the Chavali Family.
          </p>

          {submitted && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-serif">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Thank you! Your blessing has been recorded.</span>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs font-serif">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-sans font-semibold text-[#6B625B] mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh &amp; Geetha"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F0] border border-[#E8DFD3] rounded-xl focus:outline-none focus:border-[#C4A46A] font-serif text-[#2E2929]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-sans font-semibold text-[#6B625B] mb-1">
                Relation / City
              </label>
              <input
                type="text"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                placeholder="e.g. Family Friend, Hyderabad"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F0] border border-[#E8DFD3] rounded-xl focus:outline-none focus:border-[#C4A46A] font-serif text-[#2E2929]"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-sans font-semibold text-[#6B625B] mb-1">
                Blessing Message *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Wishing Anirudh &amp; Ranjitha a divine lifetime of happiness, health, and harmony..."
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF7F0] border border-[#E8DFD3] rounded-xl focus:outline-none focus:border-[#C4A46A] font-serif text-[#2E2929]"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full mt-2"
            >
              <Send className="w-4 h-4 text-[#DFCA9B]" />
              <span>Record Blessing</span>
            </button>
          </form>

          <div className="mt-4 pt-3 border-t border-[#E8DFD3] flex items-center justify-between text-[11px] text-[#96763A] font-sans">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Local Session Active</span>
            </span>
            <span className="text-[10px] text-stone-400 italic">
              API Hook Ready
            </span>
          </div>
        </motion.div>

        {/* Blessings List */}
        <motion.div 
          className="md:col-span-7 space-y-4 max-h-[520px] overflow-y-auto pr-1"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-widest text-[#96763A] font-sans font-semibold">
              Recent Blessings ({messages.length})
            </span>
          </div>

          {messages.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFFFF] p-5 rounded-2xl border border-[#E8DFD3] shadow-2xs"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-editorial-heading text-base font-bold text-[#603A3D]">
                    {item.name}
                  </h4>
                  <span className="text-[11px] text-[#96763A] font-sans">
                    {item.relation}
                  </span>
                </div>
                <span className="text-[10px] text-[#6B625B] font-sans">
                  {item.date}
                </span>
              </div>

              <p className="font-serif text-sm text-[#472729] italic leading-relaxed">
                "{item.message}"
              </p>

              {item.isUserSubmitted && (
                <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-700 font-sans">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Saved on your device</span>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      <EditorialDivider />
    </section>
  );
}

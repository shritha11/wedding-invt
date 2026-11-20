
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, CalendarDays, ArrowUpRight } from 'lucide-react';
import './WeddingSections.css';

export function RsvpSection({ data }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact, setContact] = useState('');
  const [attendance, setAttendance] = useState('Joyfully accepts');
  const [guestCount, setGuestCount] = useState('2');
  const [dietary, setDietary] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const phone = data?.rsvp?.phone?.replace(/[^0-9]/g, '') || '';

    const message = [
      '*Wedding RSVP — Gayathri & Aravind*',
      '',
      `*Name:* ${firstName} ${lastName}`.trim(),
      `*Contact:* ${contact || 'Not provided'}`,
      `*Attendance:* ${attendance}`,
      `*Number of guests:* ${guestCount}`,
      `*Dietary requirements:* ${dietary || 'None specified'}`,
      `*Notes:* ${notes || 'None'}`,
      '',
      'Wedding date: Sunday, 20 December 2026',
      'With regards, Seri Family'
    ].join('\n');

    const url = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="rsvp" className="rsvp-section">
      <div className="rsvp-shell">

        {/* LEFT — EDITORIAL INTRODUCTION */}
        <motion.div
          className="rsvp-intro"
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
        >
          <div className="rsvp-intro-decoration">
            <span className="rsvp-decoration-line" />
            <span>✦</span>
            <span className="rsvp-decoration-line" />
          </div>

          <span className="rsvp-eyebrow">A CELEBRATION OF LOVE</span>

          <h2 className="rsvp-script">
            Be our
            <span>guest</span>
          </h2>

          <div className="rsvp-intro-rule" />

          <p className="rsvp-intro-caption">
            Together with our families,
            we would be delighted to have you
            with us on our special day.
          </p>

          <div className="rsvp-couple">
            <span>GAYATHRI</span>
            <span className="rsvp-ampersand">&</span>
            <span>ARAVIND</span>
          </div>

          <div className="rsvp-date">
            <CalendarDays size={17} strokeWidth={1.4} />
            <span>20 DECEMBER 2026</span>
          </div>

          <div className="rsvp-bottom-message">
            <Heart size={15} strokeWidth={1.3} />
            <p>We look forward to celebrating with you.</p>
          </div>
        </motion.div>

        {/* RIGHT — RSVP FORM */}
        <motion.div
          className="rsvp-form-side"
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.12 }}
        >
          <div className="rsvp-form-heading">
            <span className="rsvp-eyebrow">YOUR REPLY IS CHERISHED</span>
            <h3>Kindly Respond</h3>
            <p>Please let us know if you can join us.</p>
          </div>

          <form className="rsvp-form" onSubmit={handleSubmit}>

            <div className="rsvp-field-row">
              <div className="rsvp-field">
                <label htmlFor="rsvp-first">FIRST NAME</label>
                <input
                  id="rsvp-first"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  required
                />
              </div>

              <div className="rsvp-field">
                <label htmlFor="rsvp-last">LAST NAME</label>
                <input
                  id="rsvp-last"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            <div className="rsvp-field">
              <label htmlFor="rsvp-contact">CONTACT (EMAIL OR PHONE)</label>
              <input
                id="rsvp-contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Your email or phone number"
              />
            </div>

            <div className="rsvp-field">
              <label>WILL YOU ATTEND?</label>
              <div className="rsvp-attendance">
                {['Joyfully accepts', 'Regretfully declines'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={attendance === option}
                    onClick={() => setAttendance(option)}
                    className={attendance === option ? 'selected' : ''}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="rsvp-field">
              <label htmlFor="rsvp-guests">NUMBER OF GUESTS</label>
              <select
                id="rsvp-guests"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
              >
                {['1', '2', '3', '4', '5', '6+'].map((number) => (
                  <option key={number} value={number}>{number}</option>
                ))}
              </select>
            </div>

            <div className="rsvp-field">
              <label htmlFor="rsvp-dietary">DIETARY REQUIREMENTS</label>
              <input
                id="rsvp-dietary"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                placeholder="Vegetarian, allergies..."
              />
            </div>

            <div className="rsvp-field">
              <label htmlFor="rsvp-notes">NOTES (OPTIONAL)</label>
              <textarea
                id="rsvp-notes"
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything else you would like us to know..."
              />
            </div>

            <button type="submit" className="rsvp-submit">
              <MessageCircle size={18} />
              SEND YOUR RESPONSE
              <ArrowUpRight size={17} />
            </button>

            <p className="rsvp-form-footnote">
              Your response will open in WhatsApp.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

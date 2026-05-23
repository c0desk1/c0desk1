// src/components/contact/ContactForm.tsx
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputBase =
    'w-full px-3 py-2.5 text-copy-14 rounded-lg ' +
    'bg-(--bg-subtle) border border-(--border) ' +
    'text-(--fg) placeholder:text-(--fg-dim) ' +
    'transition-colors duration-150 ' +
    'focus:outline-none focus:border-(--accent) focus:ring-2 focus:ring-(--accent-ring)';

    const buttonClass = [
    "inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-150 select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring)",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    "bg-(--fg) text-(--bg) border border-(--border-strong) hover:opacity-90 shadow-sm",
    "h-9 px-4 text-button-14",
    ].join(' ');

  if (status === 'sent') {
    return (
      <div
        style={{
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '48px 32px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'var(--success-soft)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="var(--success)"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="text-heading-16 text-(--fg) mb-1">Message sent</p>
        <p className="text-copy-14 text-muted">
          Thanks for reaching out — I'll get back to you within 24h.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="name" className="text-overline-11 text-subtle mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className={inputBase}
            placeholder="Alex Kim"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="email" className="text-overline-11 text-subtle mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className={inputBase}
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label htmlFor="subject" className="text-overline-11 text-subtle mb-2">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={form.subject}
          onChange={handleChange}
          className={inputBase}
          placeholder="Project inquiry, collaboration, etc."
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label htmlFor="message" className="text-overline-11 text-subtle mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          className={inputBase}
          style={{ resize: 'none' }}
          placeholder="Tell me about your project..."
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p className="text-copy-13 text-subtle">Usually replies within 24h</p>
        <button type="submit" disabled={status === 'sending'} className={buttonClass}>
            {status === 'sending' ? (
                <span className="h-4 w-4 animate-spin border-2 border-current border-t-transparent rounded-full" />
            ) : null}
            Send
        </button>
      </div>

      {status === 'error' && (
        <p className="text-copy-13 text-center" style={{ color: 'var(--error)' }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

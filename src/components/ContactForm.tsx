// src/components/ContactForm.tsx
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('https://formspree.io/f/xgvybkyq', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-elevated border border-(--border) rounded-xl p-12 text-center animate-in fade-in zoom-in-95 duration-300 shadow-sm">
        <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-(--border) flex items-center justify-center text-strong">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-body-16 font-semibold text-strong mb-2">Pesan Terkirim</h3>
        <p className="text-body-14 text-muted max-w-sm mx-auto">
          Terima kasih telah menghubungi kami. Saya akan segera membalas pesan Anda dalam waktu 24 jam.
        </p>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6 bg-subtle border border-(--border) rounded-xl p-6 sm:p-8 shadow-sm"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-label-13 font-medium text-strong">
            Nama
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={status === 'loading'}
            className="w-full px-3 py-2.5 text-body-14 rounded-lg bg-base border border-(--border) text-strong placeholder:text-muted focus:outline-none focus:border-strong focus:ring-1 focus:ring-(--border-strong) transition-colors disabled:opacity-50"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-label-13 font-medium text-strong">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={status === 'loading'}
            className="w-full px-3 py-2.5 text-body-14 rounded-lg bg-base border border-(--border) text-strong placeholder:text-muted focus:outline-none focus:border-strong focus:ring-1 focus:ring-(--border-strong) transition-colors disabled:opacity-50"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="block text-label-13 font-medium text-strong">
          Subjek
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          disabled={status === 'loading'}
          className="w-full px-3 py-2.5 text-body-14 rounded-lg bg-base border border-(--border) text-strong placeholder:text-muted focus:outline-none focus:border-strong focus:ring-1 focus:ring-(--border-strong) transition-colors disabled:opacity-50"
          placeholder="Tawaran kerja sama..."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-label-13 font-medium text-strong">
          Pesan
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          disabled={status === 'loading'}
          className="w-full px-3 py-2.5 text-body-14 rounded-lg bg-base border border-(--border) text-strong placeholder:text-muted focus:outline-none focus:border-strong focus:ring-1 focus:ring-(--border-strong) transition-colors resize-none disabled:opacity-50"
          placeholder="Tuliskan pesan Anda secara detail..."
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="text-label-13 text-muted">
          Biasanya membalas dalam waktu 24 jam.
        </p>
        
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-(--accent) border border-(--border) text-button-14 text-(--fg-inverted) font-medium h-9 px-5 hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0"
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-base" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Mengirim...
            </>
          ) : (
            'Kirim Pesan'
          )}
        </button>
      </div>

      {status === 'error' && (
        <div className="p-3 mt-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-label-13 text-center">
          Terjadi kesalahan jaringan. Silakan periksa koneksi Anda dan coba lagi.
        </div>
      )}
    </form>
  );
}

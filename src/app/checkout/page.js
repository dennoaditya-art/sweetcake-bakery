'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import { useTitle } from '@/hooks/useTitle';
import Breadcrumb from '@/components/Breadcrumb';

export default function CheckoutPage() {
  useTitle(`Checkout - ${siteConfig.name}`);
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    if (stored.length === 0) {
      router.replace('/katalog');
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(stored);
  }, [router]);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const order = { ...form, items: cart, total };
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      if (!res.ok) throw new Error('Gagal memproses pesanan');
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));
      router.push('/pesanan-sukses');
    } catch {
      alert(siteConfig.checkoutPage.errorMessage);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-rose/5 h-40 -z-10" />
        <div className="max-w-4xl mx-auto px-6 pt-8 pb-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-dark dark:text-white font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {siteConfig.checkoutPage.title}
          </motion.h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Checkout' }]} />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white dark:bg-card rounded-3xl p-6 md:p-8 border border-border/50 shadow-xl shadow-black/5 space-y-5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-bold text-dark dark:text-white font-display flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-br from-primary to-rose rounded-lg flex items-center justify-center text-sm">📝</span>
                {siteConfig.checkoutPage.formTitle}
              </h2>

              <div>
                <label className="block text-sm font-medium text-text mb-1.5">{siteConfig.checkoutPage.formNameLabel}</label>
                <input
                  type="text"
                  placeholder="Masukkan nama..."
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white dark:bg-card text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1.5">{siteConfig.checkoutPage.formPhoneLabel}</label>
                <input
                  type="tel"
                  placeholder="08xx-xxxx-xxxx"
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white dark:bg-card text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1.5">{siteConfig.checkoutPage.formAddressLabel}</label>
                <textarea
                  placeholder="Jalan, nomor rumah, kota, kode pos..."
                  required
                  value={form.address}
                  onChange={e => setForm({ ...form, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white dark:bg-card text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all h-24 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1.5">{siteConfig.checkoutPage.formNotesLabel}</label>
                <textarea
                  placeholder="Tambahan pesanan..."
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white dark:bg-card text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all h-24 resize-none"
                />
              </div>
            </motion.div>

            <motion.div
              className="bg-white dark:bg-card rounded-3xl p-6 md:p-8 border border-border/50 shadow-xl shadow-black/5 space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-dark dark:text-white font-display flex items-center gap-2">
                <span className="w-8 h-8 bg-gradient-to-br from-accent to-warm rounded-lg flex items-center justify-center text-sm">📋</span>
                {siteConfig.checkoutPage.summaryTitle}
              </h2>

              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center pb-3 border-b border-border/50 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-dark dark:text-white text-sm truncate">{item.name}</p>
                      <p className="text-xs text-text-muted">{item.qty} x Rp {item.price.toLocaleString('id-ID')}</p>
                    </div>
                    <p className="font-bold text-dark dark:text-white text-sm ml-4">
                      Rp {(item.price * item.qty).toLocaleString('id-ID')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-border/50">
                <div className="flex justify-between items-center">
                  <p className="text-base font-bold text-dark dark:text-white">{siteConfig.checkoutPage.totalLabel}</p>
                  <p className="text-2xl font-bold text-primary font-display">Rp {total.toLocaleString('id-ID')}</p>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-primary to-rose text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all text-lg disabled:opacity-50"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <motion.span
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full inline-block"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    {siteConfig.checkoutPage.submittingLabel}
                  </span>
                ) : (
                  siteConfig.checkoutPage.submitLabel
                )}
              </motion.button>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}

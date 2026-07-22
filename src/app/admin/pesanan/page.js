'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const STATUS = ['baru', 'diproses', 'dikirim', 'selesai', 'dibatalkan'];

export default function AdminPesananPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch('/api/orders').then(r => r.json()).then(setOrders);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  const statusBadge = s => {
    const styles = {
      baru: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      diproses: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
      dikirim: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      selesai: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      dibatalkan: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    };
    return styles[s] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark dark:text-white font-display">Manajemen Pesanan</h1>
        <p className="text-text-muted text-sm mt-1">{orders.length} pesanan</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl block mb-4">📦</span>
          <p className="text-text-muted">Belum ada pesanan.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {[...orders].reverse().map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-card rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-text-muted mb-1">
                    <span className="font-semibold text-text">#{order.id}</span>
                    <span>•</span>
                    <span>{order.createdAt}</span>
                  </div>
                  <p className="font-bold text-lg text-dark dark:text-white">{order.name}</p>
                  <p className="text-sm text-text-muted">{order.phone} • {order.address}</p>
                  {order.notes && <p className="text-sm text-text-muted mt-1">Catatan: <span className="italic">{order.notes}</span></p>}
                </div>
                <select
                  value={order.status}
                  onChange={e => updateStatus(order.id, e.target.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border-0 outline-none cursor-pointer ${statusBadge(order.status)}`}
                >
                  {STATUS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <div className="border-t border-border/50 pt-3">
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm py-1">
                    <span className="text-text"><span className="font-medium">{item.name}</span> x{item.qty}</span>
                    <span className="text-dark dark:text-white font-medium">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-base mt-3 pt-3 border-t border-border/50">
                  <span className="text-dark dark:text-white">Total</span>
                  <span className="text-primary">Rp {order.total.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

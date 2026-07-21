'use client';

import { useState, useEffect } from 'react';

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

  const statusColor = s => {
    const map = { baru: 'bg-blue-100 text-blue-700', diproses: 'bg-yellow-100 text-yellow-700', dikirim: 'bg-purple-100 text-purple-700', selesai: 'bg-green-100 text-green-700', dibatalkan: 'bg-red-100 text-red-700' };
    return map[s] || 'bg-gray-100';
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-dark mb-6">Manajemen Pesanan</h1>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-gray-500">Belum ada pesanan.</p>
        ) : orders.toReversed().map(order => (
          <div key={order.id} className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">Pesanan #{order.id} • {order.createdAt}</p>
                <p className="font-bold text-lg text-dark">{order.name}</p>
                <p className="text-sm text-gray-600">{order.phone} • {order.address}</p>
                {order.notes && <p className="text-sm text-gray-500 mt-1">Catatan: {order.notes}</p>}
              </div>
              <select value={order.status} onChange={e => updateStatus(order.id, e.target.value)} className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(order.status)}`}>
                {STATUS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
            <div className="border-t border-gray-100 pt-3">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm py-1">
                  <span>{item.name} x{item.qty}</span>
                  <span>Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-primary-dark">Rp {order.total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

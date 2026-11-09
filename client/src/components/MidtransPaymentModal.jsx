import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  Loader2, 
  Copy, 
  ExternalLink, 
  Clock, 
  AlertCircle,
  Smartphone,
  CreditCard,
  Building2,
  Sparkles
} from 'lucide-react';

export default function MidtransPaymentModal({
  isOpen,
  onClose,
  selectedPlan,
  onPaymentSuccess,
  user
}) {
  const [paymentMethod, setPaymentMethod] = useState('QRIS'); // 'QRIS' | 'VA_BCA' | 'KASIR'
  const [processing, setProcessing] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [countdown, setCountdown] = useState(900); // 15 menit
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const randomTrx = Math.floor(100000 + Math.random() * 900000);
      setOrderId(`TRISIS-MIDTRANS-${randomTrx}`);
      setCountdown(900);
      setPaidSuccess(false);
      setProcessing(false);
    }
  }, [isOpen, selectedPlan]);

  // Countdown timer 15 menit
  useEffect(() => {
    if (!isOpen || paidSuccess) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, paidSuccess]);

  if (!isOpen) return null;

  const planId = selectedPlan?.id || 'bulanan';
  const planName = selectedPlan?.name || (
    planId === 'per_visit' || planId === 'harian' ? 'Paket Per-Visit (Harian)' :
    planId === 'tahunan' ? 'Paket Tahunan (Annual Pass)' : 'Paket Bulanan (Monthly Pass)'
  );
  const numericPrice = selectedPlan?.numericPrice || (
    planId === 'per_visit' || planId === 'harian' ? 25000 :
    planId === 'tahunan' ? 1200000 : 100000
  );

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(numericPrice);

  // Perhitungan masa berlaku akurat sesuai rekaman audio
  const now = new Date();
  let validityText = '';
  if (planId === 'per_visit' || planId === 'harian') {
    const todayStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    validityText = `Berlaku Hari Ini Saja (${todayStr} s/d 21.30 WIB)`;
  } else if (planId === 'tahunan') {
    const futureDate = new Date(now.getTime() + 365 * 24 * 3600 * 1000);
    const dateStr = futureDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    validityText = `Berlaku 365 Hari (s/d ${dateStr})`;
  } else {
    const futureDate = new Date(now.getTime() + 30 * 24 * 3600 * 1000);
    const dateStr = futureDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    validityText = `Berlaku 30 Hari Penuh (s/d ${dateStr})`;
  }

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Simulasi Callback Midtrans Webhook / Sukses Bayar
  const handleSimulatePayment = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setProcessing(false);
    setPaidSuccess(true);

    if (onPaymentSuccess) {
      await onPaymentSuccess(planId);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#111319] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Modal */}
        <div className="p-4 md:p-5 border-b border-white/[0.08] bg-zinc-900/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Payment Gateway</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Midtrans & QRIS
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{orderId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {paidSuccess ? (
            /* STATE SUKSES PEMBAYARAN */
            <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-9 h-9 text-emerald-400 animate-in zoom-in duration-300" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Midtrans Webhook Verified
                </span>
                <h3 className="text-lg font-bold text-white mt-2">Pembayaran Berhasil Diverifikasi!</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Paket keanggotaan Anda kini aktif. QR Code kartu member siap digunakan untuk presensi.
                </p>
              </div>

              <div className="bg-zinc-900/80 rounded-xl p-4 border border-white/[0.06] text-left space-y-2">
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Paket Aktif:</span>
                  <span className="font-bold text-white">{planName}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Total Dibayar:</span>
                  <span className="font-bold text-amber-400">{formattedPrice}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Masa Berlaku:</span>
                  <span className="font-medium text-emerald-400">{validityText}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400 pt-1 border-t border-white/[0.04]">
                  <span>Status Member:</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Aktif & Siap Latihan
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-amber-400/20"
              >
                Tutup & Mulai Gunakan QR Presensi
              </button>
            </div>
          ) : (
            /* STATE PILIH METODE & QRIS */
            <>
              {/* Order Summary Box */}
              <div className="bg-zinc-900/80 rounded-xl p-4 border border-white/[0.06] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-xs">Paket Dipilih:</span>
                  <span className="font-bold text-white text-xs">{planName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-xs">Total Tagihan:</span>
                  <span className="font-black text-amber-400 text-base">{formattedPrice}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
                  <span className="text-zinc-400 text-[11px]">Hitungan Masa Aktif:</span>
                  <span className="text-emerald-400 font-semibold text-[11px]">{validityText}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-zinc-400">Pilih Metode Pembayaran</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('QRIS')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      paymentMethod === 'QRIS'
                        ? 'bg-amber-400/10 border-amber-400 text-amber-300 font-bold'
                        : 'bg-zinc-900 border-white/[0.06] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span className="text-[10px]">QRIS Instan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('VA_BCA')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      paymentMethod === 'VA_BCA'
                        ? 'bg-amber-400/10 border-amber-400 text-amber-300 font-bold'
                        : 'bg-zinc-900 border-white/[0.06] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span className="text-[10px]">Virtual Account</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('KASIR')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      paymentMethod === 'KASIR'
                        ? 'bg-amber-400/10 border-amber-400 text-amber-300 font-bold'
                        : 'bg-zinc-900 border-white/[0.06] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-[10px]">Kasir Gym</span>
                  </button>
                </div>
              </div>

              {/* QRIS Display View */}
              {paymentMethod === 'QRIS' && (
                <div className="bg-white rounded-2xl p-4 text-center text-zinc-900 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                    <span className="text-[11px] font-black tracking-tight text-neutral-900">QRIS STANDAR NASIONAL</span>
                    <span className="text-[9px] font-mono text-zinc-500">NMID: ID10268892100</span>
                  </div>

                  {/* QR Image Graphic SVG */}
                  <div className="relative mx-auto w-48 h-48 bg-white p-2 border-2 border-zinc-900 rounded-xl flex items-center justify-center">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021226680016ID.CO.MIDTRANS0118${orderId}5204581253033605802ID5910TRISIS GYM6005BOGOR6304`} 
                      alt="QRIS Midtrans Payment"
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-8 h-8 rounded-lg bg-neutral-950 text-amber-400 font-black text-[9px] flex items-center justify-center border-2 border-white shadow-md">
                        TG
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-neutral-900">Scan via BCA, GoPay, OVO, Dana, ShopeePay</p>
                    <div className="flex items-center justify-center gap-1 text-[10px] text-zinc-600 font-mono">
                      <Clock className="w-3 h-3 text-rose-500" />
                      <span>Sisa Waktu Pembayaran: <strong className="text-rose-600">{timeFormatted}</strong></span>
                    </div>
                  </div>
                </div>
              )}

              {/* Virtual Account View */}
              {paymentMethod === 'VA_BCA' && (
                <div className="bg-zinc-900 rounded-xl p-4 border border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Bank Central Asia (BCA) Virtual Account</span>
                    <span className="text-[10px] font-mono text-amber-400">Verifikasi Otomatis</span>
                  </div>
                  <div className="flex items-center justify-between bg-black/60 p-3 rounded-lg border border-white/[0.06]">
                    <div>
                      <span className="text-[10px] text-zinc-400 block">Nomor Virtual Account Midtrans:</span>
                      <span className="font-mono text-sm font-bold text-white tracking-wider">88029082130133208</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('88029082130133208')}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copied ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-relaxed">
                    Transfer dari m-BCA atau ATM ke nomor Virtual Account di atas. Sistem Midtrans akan memverifikasi dalam waktu kurang dari 30 detik.
                  </p>
                </div>
              )}

              {/* Bayar Kasir View */}
              {paymentMethod === 'KASIR' && (
                <div className="bg-zinc-900 rounded-xl p-4 border border-white/[0.08] space-y-2">
                  <span className="text-xs font-bold text-white block">Pembayaran Tunai / EDC di Kasir Trisis Gym</span>
                  <p className="text-[11px] text-zinc-300 leading-relaxed">
                    Tunjukkan Order ID <strong className="text-amber-400">{orderId}</strong> kepada kasir di gym saat Anda datang untuk melakukan aktivasi langsung via kasir.
                  </p>
                </div>
              )}

              {/* Button Simulasi Pembayaran Midtrans Sandbox */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  disabled={processing}
                  className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-400/20 active:scale-95 disabled:opacity-50"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                      <span>Memproses Pembayaran Midtrans...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-neutral-950" />
                      <span>Konfirmasi & Simulasi Bayar Midtrans</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-zinc-500">
                  🔒 Terhubung dengan Midtrans Payment Gateway Sandbox Environment.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

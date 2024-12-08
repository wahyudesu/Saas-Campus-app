import React from 'react';

const PainCard = () => {
  return (
    <div className="flex flex-col items-center bg-neutral text-neutral-content min-h-screen p-8">
      <div className="relative bg-red-900 text-base-content rounded-lg p-8 md:p-16 max-w-lg mx-auto text-center text-lg shadow-lg">
        <div className="leading-relaxed space-y-4 md:space-y-6">
          <div className="text-base-content/80 space-y-1 text-slate-100">
            <p>
              +<span className="text-red-400 font-medium">1 jam</span> bikin tugas
            </p>
            <p>
              + <span className="text-red-400 font-medium">2 jam</span> ngoreksi tugas
            </p>
            <p>
              + <span className="text-red-400 font-medium">30 menit</span> to handle Stripe webhooks
            </p>
            <p>
              + <span className="text-red-400 font-medium">2 jam</span> deteksi plagiarisme antar siswa
            </p>
            <p>
              + <span className="text-red-400 font-medium">2 hrs</span> for protected API routes
            </p>
            <p>
              + <span className="text-red-400 font-medium">∞ hrs</span> overthinking...
            </p>
            <p>
              + <span className="text-red-400 font-medium">+</span> Penyampaian tugas...
            </p>
          </div>
          <div className="text-xl font-semibold text-slate-100 flex flex-col md:flex-row items-center justify-center gap-3">
            <p>
              = <span className="text-red-400 font-medium">22+ hours</span> pusing
            </p>
            <svg
              className="w-8 h-8 fill-base-content shrink-0"
              viewBox="0 0 154 150"
            >
              <g clipPath="url(#clip0_8_2918)">
                <path d="M106.196..."></path>
                <path d="M95.939..."></path>
                <path d="M36.9705..."></path>
                <path d="M59.2449..."></path>
                <path d="M127.026..."></path>
                <path d="M48.1399..."></path>
                <path d="M84.6108..."></path>
                <path d="M141.948..."></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <p className="text-base-content/60 mt-6 text-sm">
        ↓ Ada cara yang lebih baik
      </p>
    </div>
  );
};

export default PainCard;

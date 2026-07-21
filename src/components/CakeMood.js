'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const moods = [
  { id: 'happy', icon: '😊', label: 'Happy', desc: 'Pengen yang manis & ceria', tag: 'kue basah' },
  { id: 'celebrate', icon: '🎉', label: 'Celebrate', desc: 'Ada momen spesial!', tag: 'cake' },
  { id: 'chill', icon: '😌', label: 'Chill', desc: 'Santai sambil ngemil', tag: 'kue kering' },
  { id: 'love', icon: '🥰', label: 'Love', desc: 'Buat orang tersayang', tag: 'roti' },
  { id: 'sad', icon: '😢', label: 'Cheer Up', desc: 'Butuh penghibur hati', tag: 'minuman' },
];

export default function CakeMood() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  const handleMood = mood => {
    setSelected(mood.id);
    setTimeout(() => {
      router.push(`/katalog?search=${encodeURIComponent(mood.tag)}`);
    }, 600);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-wrap gap-3 justify-center">
        {moods.map(m => (
          <button
            key={m.id}
            onClick={() => handleMood(m)}
            className={`group relative flex flex-col items-center gap-1.5 px-6 py-5 rounded-2xl transition-all duration-300 ${
              selected === m.id
                ? 'bg-gradient-to-br from-primary to-rose text-white scale-110 shadow-xl shadow-primary/30'
                : 'bg-white dark:bg-card text-text hover:shadow-lg hover:-translate-y-1 shadow-md border border-border/50'
            }`}
          >
            <span className="text-3xl">{m.icon}</span>
            <span className="font-bold text-sm font-display">{m.label}</span>
            <span className="text-[10px] text-text-muted opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 whitespace-nowrap">
              {m.desc}
            </span>
          </button>
        ))}
      </div>
      {selected && (
        <p className="text-center mt-8 text-primary font-bold animate-pop-in flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
          Mencari rekomendasi untukmu...
        </p>
      )}
    </div>
  );
}

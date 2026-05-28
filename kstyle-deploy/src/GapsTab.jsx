import React from 'react';

const TRACKED_VIBES = [
  'Sharp','Polished','Minimal','Work','Quiet luxury','Soft','Romantic',
  'Effortless','Cool','Casual','Playful','Bold','Dark','Artistic','Warm','Neutral',
];

export default function GapsTab({ allItems }) {
  const counts = {};
  TRACKED_VIBES.forEach(v => { counts[v] = 0; });
  allItems.forEach(item => (item.vibe || []).forEach(v => { if (counts[v] !== undefined) counts[v]++; }));
  const max = Math.max(...Object.values(counts), 1);
  const sorted = TRACKED_VIBES.map(v => ({ v, c: counts[v] })).sort((a, b) => b.c - a.c);
  const weak = sorted.filter(x => x.c < 3).map(x => x.v).slice(0, 3);
  const strong = sorted.slice(0, 2).map(x => x.v);

  return (
    <div style={{ padding: '20px 24px' }}>
      <div style={{ marginBottom: 16 }}>
        <div className="serif" style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>Style gap analysis</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Which vibes your wardrobe is heavy or light on</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {sorted.map(({ v, c }) => {
          const pct = Math.round((c / max) * 100);
          const barColor = pct < 20 ? '#E24B4A' : pct < 50 ? '#EF9F27' : 'var(--info)';
          return (
            <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 12, width: 130, flexShrink: 0 }}>{v}</div>
              <div style={{ flex: 1, height: 8, background: 'var(--bg-secondary)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', borderRadius: 4, background: barColor, transition: 'width .4s' }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-faint)', width: 30, textAlign: 'right', flexShrink: 0 }}>{c}</div>
            </div>
          );
        })}
      </div>

      <div className="card" style={{ padding: '14px 16px' }}>
        <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)', marginBottom: 8 }}>Stylist insight</div>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text)' }}>
          Your wardrobe leans heavily <strong>{strong.join(' & ')}</strong>.
          {weak.length > 0 && <> Consider building out <strong>{weak.join(', ')}</strong> — the pieces you're missing will widen your range without disrupting your signature.</>}
        </p>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { MOODS, QUOTES, swatch } from '../lib/data.js';
import { getStyleIntel } from '../lib/api.js';

function OutfitCard({ item, note }) {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      {item.photo ? (
        <img src={item.photo} alt={item.name} style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{ height: 110, background: swatch(item.color), display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <span style={{ fontSize: 9, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', background: 'rgba(0,0,0,.22)', color: '#fff', padding: '2px 6px', position: 'absolute', top: 6, left: 6, borderRadius: 3 }}>{item.category}</span>
          <span className="serif" style={{ fontSize: 52, opacity: 0.15, color: '#fff' }}>{item.name.charAt(0)}</span>
        </div>
      )}
      <div style={{ padding: '10px 12px' }}>
        <div className="serif" style={{ fontSize: 13, marginBottom: 6, lineHeight: 1.3 }}>{item.name}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 6 }}>
          {(item.vibe || []).slice(0, 3).map(v => (
            <span key={v} style={{ fontSize: 10, padding: '2px 6px', background: 'var(--bg-secondary)', borderRadius: 4, border: '0.5px solid var(--border)', color: 'var(--text-muted)' }}>{v}</span>
          ))}
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-faint)', borderTop: '0.5px solid var(--border)', paddingTop: 6 }}>Energy: {item.energy}</div>
        {note && <div style={{ fontSize: 11, color: 'var(--info)', marginTop: 6, fontStyle: 'italic', lineHeight: 1.4, borderTop: '0.5px solid var(--border)', paddingTop: 6 }}>{note}</div>}
      </div>
    </div>
  );
}

export default function OracleTab({ allItems }) {
  const [moodIdx, setMoodIdx] = useState(0);
  const [intel, setIntel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=1.3521&longitude=103.8198&current=temperature_2m,weather_code&timezone=Asia%2FSingapore')
      .then(r => r.json())
      .then(d => {
        const t = Math.round(d.current.temperature_2m);
        const code = d.current.weather_code;
        const em = code === 0 ? '☀️' : code <= 2 ? '🌤️' : code <= 3 ? '⛅' : code <= 48 ? '🌫️' : code <= 67 ? '🌧️' : '⛈️';
        setWeather(`${em} ${t}°C · Singapore`);
      }).catch(() => setWeather('🌤 Singapore'));
  }, []);

  const mood = MOODS[moodIdx];
  const matches = allItems.filter(item => item.vibe?.some(v => mood.vibes.includes(v)));

  useEffect(() => {
    if (abortRef.current) abortRef.current = false;
    setIntel(null);
    if (!matches.length) return;
    setLoading(true);
    let alive = true;
    abortRef.current = true;
    getStyleIntel({ mood, items: matches.slice(0, 8) })
      .then(data => { if (alive) { setIntel(data); setLoading(false); } })
      .catch(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [moodIdx, allItems.length]);

  const pieceNotes = intel?.pieceNotes ? Object.fromEntries(intel.pieceNotes.map(p => [p.name.toLowerCase(), p.note])) : {};
  const quote = QUOTES[moodIdx % QUOTES.length];

  return (
    <div style={{ padding: '20px 24px' }}>
      <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)', marginBottom: 12 }}>Draw your card</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))', gap: 8, marginBottom: 20 }}>
        {MOODS.map((m, i) => (
          <button key={m.name} onClick={() => setMoodIdx(i)} style={{
            background: i === moodIdx ? 'var(--accent)' : 'var(--bg-card)',
            border: i === moodIdx ? '2px solid var(--accent)' : '0.5px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '12px 8px', cursor: 'pointer',
            textAlign: 'center', transition: 'all .15s',
          }}>
            <div style={{ fontSize: 10, color: i === moodIdx ? 'rgba(255,255,255,.5)' : 'var(--text-faint)', letterSpacing: '0.1em', marginBottom: 3 }}>{m.numeral}</div>
            <div className="serif" style={{ fontSize: 18, color: i === moodIdx ? 'rgba(255,255,255,.35)' : 'var(--text-faint)', marginBottom: 5 }}>{m.symbol}</div>
            <div className="serif" style={{ fontSize: 12, color: i === moodIdx ? '#fff' : 'var(--text)', lineHeight: 1.3, marginBottom: 3 }}>{m.name}</div>
            <div style={{ fontSize: 9, color: i === moodIdx ? 'rgba(255,255,255,.45)' : 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{m.sub}</div>
          </button>
        ))}
      </div>

      {loading && (
        <div className="card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span className="dot" /><span className="dot" /><span className="dot" />
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Reading your energy...</span>
        </div>
      )}

      {!loading && intel && (
        <div className="card" style={{ marginBottom: 16, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div style={{ padding: '14px 16px', borderRight: '0.5px solid var(--border)' }}>
              <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--info)', marginBottom: 6 }}>Energy reading</div>
              <p style={{ fontSize: 13, lineHeight: 1.6 }}>{intel.energyReading}</p>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--info)', marginBottom: 6 }}>Presence directive</div>
              <p className="serif" style={{ fontSize: 14, lineHeight: 1.6, fontStyle: 'italic' }}>{intel.presenceDirective}</p>
            </div>
          </div>
          {intel.contextNote && (
            <div style={{ padding: '10px 16px', borderTop: '0.5px solid var(--border)', fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {intel.contextNote}
            </div>
          )}
        </div>
      )}

      <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)', marginBottom: 12 }}>
        {matches.length} piece{matches.length !== 1 ? 's' : ''} aligned with "{mood.name}"
      </div>

      {matches.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-faint)', fontSize: 13 }}>
          No pieces matched. Add items to your closet and tag them with vibes.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10, marginBottom: 20 }}>
          {matches.slice(0, 12).map(item => (
            <OutfitCard key={item.id} item={item} note={pieceNotes[item.name.toLowerCase()]} />
          ))}
        </div>
      )}

      <div className="card" style={{ padding: '16px 20px' }}>
        <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)', marginBottom: 8 }}>Words to dress by</div>
        <p className="serif" style={{ fontSize: 15, fontStyle: 'italic', lineHeight: 1.6, marginBottom: 8 }}>"{quote.q}"</p>
        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>— {quote.a}</p>
      </div>

      {weather && (
        <div style={{ marginTop: 16, fontSize: 12, color: 'var(--text-faint)', textAlign: 'center' }}>{weather}</div>
      )}
    </div>
  );
}

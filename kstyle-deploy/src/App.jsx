import React, { useState, useEffect } from 'react';
import OracleTab from './OracleTab.jsx';
import ClosetTab from './ClosetTab.jsx';
import GapsTab from './GapsTab.jsx';
import { DEFAULT_WARDROBE } from './lib/data.js';

const TABS = ['Oracle', 'My closet', 'Style gaps'];

export default function App() {
  const [tab, setTab] = useState(0);
  const [uploaded, setUploaded] = useState(() => {
    try { const s = localStorage.getItem('kstyle-v3'); return s ? JSON.parse(s) : []; }
    catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem('kstyle-v3', JSON.stringify(uploaded)); } catch {}
  }, [uploaded]);

  const allItems = [...DEFAULT_WARDROBE, ...uploaded];

  function addItem(item) { setUploaded(prev => [item, ...prev]); }
  function deleteItem(id) { setUploaded(prev => prev.filter(i => i.id !== id)); }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', minHeight: '100vh', background: 'var(--bg)' }}>
      <header style={{ background: 'var(--bg-card)', borderBottom: '0.5px solid var(--border)', padding: '18px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 2 }}>
          <h1 className="serif" style={{ fontSize: 24, fontWeight: 400 }}>K Style oracle</h1>
          <span style={{ fontSize: 11, color: 'var(--text-faint)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Singapore</span>
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-faint)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Dress by emotional energy</p>
        <nav style={{ display: 'flex', gap: 0 }}>
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              padding: '8px 18px', fontSize: 13, cursor: 'pointer',
              background: 'none', border: 'none', borderBottom: i === tab ? '2px solid var(--text)' : '2px solid transparent',
              color: i === tab ? 'var(--text)' : 'var(--text-muted)',
              fontWeight: i === tab ? 500 : 400, transition: 'all .15s',
              fontFamily: 'var(--sans)',
            }}>
              {t}{t === 'My closet' && uploaded.length > 0 ? ` (${uploaded.length})` : ''}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {tab === 0 && <OracleTab allItems={allItems} />}
        {tab === 1 && <ClosetTab uploadedItems={uploaded} onAdd={addItem} onDelete={deleteItem} />}
        {tab === 2 && <GapsTab allItems={allItems} />}
      </main>

      <footer style={{ padding: '20px 24px', textAlign: 'center', borderTop: '0.5px solid var(--border)', marginTop: 20 }}>
        <p style={{ fontSize: 11, color: 'var(--text-faint)' }}>K Style Oracle · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

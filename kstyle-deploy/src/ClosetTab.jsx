import React, { useState, useRef } from 'react';
import { CATEGORIES, VIBE_OPTIONS, swatch } from '../lib/data.js';

async function detectItem(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      const base64 = dataUrl.split(',')[1];
      const mimeType = file.type || 'image/jpeg';
      try {
        const res = await fetch('/api/anthropic', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system: 'You are a fashion AI. Analyse clothing items precisely. Return ONLY valid JSON.',
            userMessage: JSON.stringify({ prompt: `Analyse this clothing item. Return ONLY valid JSON: {"name":"descriptive item name","category":"one of Top/Bottom/Dress/Outerwear/Shoes/Bag/Jewellery/Accessory","color":"main colour name","energy":"2-3 word energy descriptor","vibes":["tag1","tag2","tag3","tag4"]} — vibes from: Sharp, Minimal, Work, Polished, Structured, Clean, Confident, Soft, Quiet luxury, Neutral, Warm, Bright, Romantic, Delicate, Sleek, Dark, Relaxed, Effortless, Cool, Casual, Playful, Bold, Artistic, Magnetic, Elegant, Dramatic.` }),
            _isVision: true,
            _base64: base64,
            _mimeType: mimeType,
          }),
        });
        const data = await res.json();
        const text = data.content?.[0]?.text || '{}';
        let parsed;
        try { parsed = JSON.parse(text); }
        catch { const m = text.match(/\{[\s\S]*\}/); parsed = m ? JSON.parse(m[0]) : {}; }
        resolve({ ...parsed, photo: dataUrl });
      } catch (err) { reject(err); }
    };
    reader.readAsDataURL(file);
  });
}

function AddModal({ onClose, onSave }) {
  const [photo, setPhoto] = useState(null);
  const [detecting, setDetecting] = useState(false);
  const [detected, setDetected] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Dress');
  const [color, setColor] = useState('');
  const [vibes, setVibes] = useState([]);
  const fileRef = useRef();

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhoto(url);
    setDetecting(true);
    setDetected(null);
    try {
      const result = await detectItem(file);
      setDetected(result);
      if (result.name) setName(result.name);
      if (result.color) setColor(result.color);
      if (result.category) setCategory(result.category);
      if (result.vibes) setVibes(result.vibes);
    } catch { /* continue without AI */ }
    finally { setDetecting(false); }
  }

  function toggleVibe(v) {
    setVibes(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  }

  function save() {
    if (!name.trim()) return;
    onSave({ id: `u-${Date.now()}`, name: name.trim(), category, color: color || 'Various', energy: detected?.energy || 'Free', vibe: vibes, photo: detected?.photo || null, isUploaded: true });
    onClose();
  }

  return (
    <div style={{ background: 'rgba(0,0,0,.45)', minHeight: 600, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 20 }}>
      <div className="card" style={{ width: '100%', maxWidth: 420, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '0.5px solid var(--border)' }}>
          <h3 className="serif" style={{ fontSize: 16, fontWeight: 500 }}>Add to your closet</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, color: 'var(--text-muted)', lineHeight: 1 }}>×</button>
        </div>

        <div style={{ padding: 16 }}>
          {!photo ? (
            <div onClick={() => fileRef.current.click()} style={{ border: '0.5px dashed var(--border-med)', borderRadius: 'var(--radius-sm)', padding: 24, textAlign: 'center', cursor: 'pointer', background: 'var(--bg-secondary)', marginBottom: 14 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📷</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Upload photo</div>
              <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 2 }}>AI will auto-detect everything</div>
            </div>
          ) : (
            <img src={photo} alt="Preview" style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: 14, display: 'block' }} />
          )}
          <input type="file" ref={fileRef} accept="image/*" style={{ display: 'none' }} onChange={handleFile} />

          {detecting && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--info)', padding: '10px 12px', background: 'var(--info-bg)', borderRadius: 'var(--radius-sm)', marginBottom: 14 }}>
              <span className="dot" /><span className="dot" /><span className="dot" />
              Reading your piece with AI...
            </div>
          )}

          {detected && !detecting && (
            <div style={{ padding: 12, background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', marginBottom: 14, border: '0.5px solid var(--border)' }}>
              <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--info)', marginBottom: 8 }}>AI detected</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                {[['Category', detected.category], ['Colour', detected.color], ['Energy', detected.energy]].map(([l, v]) => (
                  <div key={l}><div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 2 }}>{l}</div><div style={{ fontSize: 12 }}>{v || '—'}</div></div>
                ))}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-faint)', marginBottom: 4 }}>Vibe tags</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {(detected.vibes || []).map(v => <span key={v} style={{ fontSize: 10, padding: '3px 8px', background: 'var(--info-bg)', color: 'var(--info)', borderRadius: 20 }}>{v}</span>)}
              </div>
            </div>
          )}

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Item name *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Black blazer" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Colour</label>
              <input value={color} onChange={e => setColor(e.target.value)} placeholder="e.g. Blush" />
            </div>
          </div>
          <div style={{ marginBottom: 4 }}>
            <label style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Vibe tags</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {VIBE_OPTIONS.map(v => (
                <button key={v} onClick={() => toggleVibe(v)} style={{
                  fontSize: 11, padding: '4px 10px', borderRadius: 20, cursor: 'pointer', transition: 'all .12s',
                  background: vibes.includes(v) ? 'var(--accent)' : 'var(--bg-secondary)',
                  color: vibes.includes(v) ? '#fff' : 'var(--text-muted)',
                  border: vibes.includes(v) ? '0.5px solid var(--accent)' : '0.5px solid var(--border)',
                }}>{v}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: '12px 16px', borderTop: '0.5px solid var(--border)' }}>
          <button className="btn btn-dark" onClick={save} disabled={!name.trim()} style={{ width: '100%', justifyContent: 'center', opacity: name.trim() ? 1 : 0.4 }}>
            Save to closet
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ClosetTab({ uploadedItems, onAdd, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding: '20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <div className="serif" style={{ fontSize: 16, fontWeight: 500 }}>My closet</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{uploadedItems.length} uploaded piece{uploadedItems.length !== 1 ? 's' : ''}</div>
        </div>
        <button className="btn btn-dark" onClick={() => setShowModal(true)}>+ Add item</button>
      </div>

      {showModal && <AddModal onClose={() => setShowModal(false)} onSave={item => { onAdd(item); setShowModal(false); }} />}

      {!showModal && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
          <div onClick={() => setShowModal(true)} style={{ border: '0.5px dashed var(--border-med)', borderRadius: 'var(--radius)', height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: 8, color: 'var(--text-faint)', transition: 'all .15s', background: 'var(--bg-card)' }}>
            <span style={{ fontSize: 28 }}>+</span>
            <span style={{ fontSize: 12 }}>Add item</span>
          </div>
          {uploadedItems.map((item, i) => (
            <div key={item.id} className="card" style={{ overflow: 'hidden', position: 'relative' }}>
              {item.photo ? (
                <img src={item.photo} alt={item.name} style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ height: 110, background: swatch(item.color), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="serif" style={{ fontSize: 40, opacity: 0.2, color: '#fff' }}>{item.name.charAt(0)}</span>
                </div>
              )}
              <button onClick={() => onDelete(item.id)} style={{ position: 'absolute', top: 6, right: 6, width: 22, height: 22, borderRadius: '50%', background: 'var(--bg-card)', border: '0.5px solid var(--border)', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }} aria-label="Delete">×</button>
              <div style={{ padding: '8px 10px' }}>
                <div className="serif" style={{ fontSize: 12, marginBottom: 3, lineHeight: 1.3 }}>{item.name}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{item.category} · {item.color}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const API_URL = '/api/anthropic';

export async function callClaude({ system, userMessage, maxTokens = 1000 }) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ system, userMessage, maxTokens }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  const text = data.content?.[0]?.text || '{}';
  try { return JSON.parse(text); }
  catch {
    const m = text.match(/\{[\s\S]*\}/);
    return m ? JSON.parse(m[0]) : {};
  }
}

export async function getStyleIntel({ mood, items, feeling, activity, destination, walkAmount }) {
  const h = new Date().getHours();
  const tod = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening';
  const context = [
    feeling && `How they feel: ${feeling}`,
    activity && `Today is about: ${activity}`,
    destination && `Heading to: ${destination}`,
    walkAmount && `Walking: ${walkAmount}`,
  ].filter(Boolean).join('\n') || 'No context provided';

  return callClaude({
    system: `You are an Aesthetic Intelligence engine for a personal styling app for a discerning woman in Singapore. Deliver sharp, high-signal styling intelligence. Speak in the language of energy, presence, silhouette, and perception. Be direct and declarative. Short sentences. No hedging. Reference Singapore climate where relevant (humidity, indoor/outdoor aircon contrast, equatorial heat). Return ONLY valid JSON with exactly: {"energyReading":"1-2 sentences","presenceDirective":"one sharp sentence","contextNote":"one grounded sentence about their day","pieceNotes":[{"name":"exact item name","note":"one sentence"}]}`,
    userMessage: `Mood: "${mood.name}" | Time: ${tod} | Location: Singapore\n\nContext:\n${context}\n\nPieces:\n${items.map(i => `- ${i.name} (${i.category}) | Energy: ${i.energy} | Vibes: ${i.vibe.join(', ')}`).join('\n')}\n\nReturn JSON only.`,
  });
}

export async function detectClothingItem(base64Image, mimeType) {
  return callClaude({
    system: 'You are a fashion AI. Analyse clothing items precisely. Return ONLY valid JSON.',
    userMessage: JSON.stringify({
      image: { type: 'base64', mimeType, data: base64Image },
      prompt: `Analyse this clothing item. Return ONLY valid JSON: {"name":"descriptive item name","category":"one of Top/Bottom/Dress/Outerwear/Shoes/Bag/Jewellery/Accessory","color":"main colour name","energy":"2-3 word energy descriptor","vibes":["tag1","tag2","tag3","tag4"]} — vibes from: Sharp, Minimal, Work, Polished, Structured, Clean, Confident, Soft, Quiet luxury, Neutral, Warm, Bright, Romantic, Delicate, Sleek, Dark, Relaxed, Effortless, Cool, Casual, Playful, Bold, Artistic, Magnetic, Elegant, Dramatic.`,
    }),
    _isVision: true,
    _base64: base64Image,
    _mimeType: mimeType,
  });
}

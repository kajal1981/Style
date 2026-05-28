export const COLOR_MAP = {
  Black:"#1c1c1e",White:"#f0f0ec",Cream:"#f0e6cc",Blush:"#f0c0b0",
  Charcoal:"#48484e",Navy:"#1a2848","Navy/White":"#1a2848",Blue:"#3a5890",
  Camel:"#c0943e",Burgundy:"#78182e",Yellow:"#f0cc18",Gold:"#c8a028",
  Brown:"#885830",Nude:"#e0b880",Pearl:"#f0e8d8","Dark Blue":"#1a2848",
  Ecru:"#e8d4b0",Champagne:"#f0d898",Multi:"#c8a880",Coral:"#e86050",
  "Tomato Red":"#c02820",Orange:"#e05818","Marigold Yellow":"#e09808",
  "Hot Pink":"#d01060","Watermelon Pink":"#e03050",Olive:"#6a7038",
  Khaki:"#b8a060","Sage Green":"#889878",Tobacco:"#98683a",Sand:"#d0b878",
  "Powder Blue":"#a0c0d8","Chambray Blue":"#6080a0","Cloud Blue":"#b0c8e0",
  Indigo:"#383870","Pale Blue":"#b8d0e8","Black/Floral":"#1c1c1e",
  "Navy/Floral":"#1a2848",Ochre:"#c09828",Bronze:"#b87828",
  "Deep Olive":"#485828",Natural:"#d0bc90","Lemon/White":"#f5f090",
  "Butter Yellow":"#f8e898","Dark Multi":"#282838",Various:"#b0a898",
  Neutral:"#c0b8b0",Chocolate:"#583020","Golden Yellow":"#e8b818",
};
export const swatch = (c) => COLOR_MAP[c] || "#b0a898";

export const MOODS = [
  { name:"Powerful", numeral:"I", symbol:"✦", sub:"The Commander", vibes:["Sharp","Minimal","Work","Polished","Structured","Clean","Confident","Bold"] },
  { name:"Soft", numeral:"II", symbol:"◇", sub:"The Moon", vibes:["Soft","Quiet luxury","Neutral","Warm","Romantic","Delicate","Optimistic"] },
  { name:"Seductive", numeral:"III", symbol:"✧", sub:"The Star", vibes:["Sleek","Dark","Polished","Minimal","Elegant","Dramatic","Magnetic"] },
  { name:"Creative", numeral:"IV", symbol:"⟡", sub:"The Magician", vibes:["Relaxed","Cool","Playful","Bold","Bright","Artistic","Colour-forward"] },
  { name:"Low-energy but chic", numeral:"V", symbol:"◆", sub:"The Hermit", vibes:["Relaxed","Casual","Neutral","Quiet luxury","Effortless","Soft","Minimal","Resort"] },
  { name:"Invisible but expensive", numeral:"VI", symbol:"⋆", sub:"The Priestess", vibes:["Quiet luxury","Neutral","Minimal","Soft","Clean","Polished","Elegant"] },
  { name:"Main character", numeral:"VII", symbol:"✶", sub:"The World", vibes:["Soft","Bright","Magnetic","Warm","Playful","Polished","Effortless","Romantic","Artistic"] },
];

export const QUOTES = [
  { q:"Fashion fades, only style remains the same.", a:"Coco Chanel" },
  { q:"Elegance is not about being noticed, it's about being remembered.", a:"Giorgio Armani" },
  { q:"Don't be into trends. Don't make fashion own you, but you decide what you are.", a:"Gianni Versace" },
  { q:"Dress shabbily and they remember the dress; dress impeccably and they remember the woman.", a:"Coco Chanel" },
  { q:"People will stare. Make it worth their while.", a:"Harry Winston" },
  { q:"I don't design clothes. I design dreams.", a:"Ralph Lauren" },
  { q:"You can have anything you want in life if you dress for it.", a:"Edith Head" },
];

export const CATEGORIES = ["Top","Bottom","Dress","Outerwear","Shoes","Bag","Jewellery","Accessory"];

export const VIBE_OPTIONS = [
  "Sharp","Minimal","Work","Polished","Structured","Clean","Confident",
  "Soft","Quiet luxury","Neutral","Warm","Bright","Romantic","Delicate",
  "Sleek","Dark","Relaxed","Effortless","Cool","Casual","Playful",
  "Bold","Artistic","Magnetic","Elegant","Dramatic","Resort","Colour-forward",
];

export const DEFAULT_WARDROBE = [
  { id:1,  name:"Tailored black blazer",       category:"Outerwear", vibe:["Sharp","Minimal","Work","Polished","Confident"],      color:"Black",     energy:"Commanding" },
  { id:2,  name:"Oversized white shirt",        category:"Top",       vibe:["Relaxed","Clean","Effortless"],                       color:"White",     energy:"Airy" },
  { id:3,  name:"Cream knit tank",              category:"Top",       vibe:["Soft","Neutral","Quiet luxury"],                      color:"Cream",     energy:"Quiet luxury" },
  { id:4,  name:"Black satin cami",             category:"Top",       vibe:["Sleek","Dark","Polished","Magnetic"],                 color:"Black",     energy:"Sultry" },
  { id:5,  name:"White linen button-down",      category:"Top",       vibe:["Clean","Relaxed","Effortless","Minimal"],             color:"White",     energy:"Breezy" },
  { id:6,  name:"Charcoal crew neck knit",      category:"Top",       vibe:["Quiet luxury","Neutral","Minimal","Work"],            color:"Charcoal",  energy:"Understated" },
  { id:7,  name:"Tailored black trousers",      category:"Bottom",    vibe:["Sharp","Minimal","Work","Polished"],                  color:"Black",     energy:"Structured" },
  { id:8,  name:"Wide leg denim",               category:"Bottom",    vibe:["Casual","Cool","Relaxed"],                            color:"Blue",      energy:"Grounded" },
  { id:9,  name:"Camel wide leg trousers",      category:"Bottom",    vibe:["Quiet luxury","Neutral","Polished","Work"],           color:"Camel",     energy:"Elevated" },
  { id:10, name:"Black mini skirt",             category:"Bottom",    vibe:["Playful","Dark","Sleek","Magnetic"],                  color:"Black",     energy:"Edgy" },
  { id:11, name:"Black slip dress",             category:"Dress",     vibe:["Sleek","Dark","Polished","Minimal","Magnetic"],       color:"Black",     energy:"Effortless cool" },
  { id:12, name:"Floral wrap dress",            category:"Dress",     vibe:["Romantic","Soft","Playful","Bright"],                 color:"Multi",     energy:"Joyful" },
  { id:13, name:"White linen maxi",             category:"Dress",     vibe:["Clean","Relaxed","Effortless","Bright"],              color:"White",     energy:"Sunlit" },
  { id:14, name:"Hot pink dress",               category:"Dress",     vibe:["Magnetic","Playful","Bold","Colour-forward"],         color:"Hot Pink",  energy:"Electric" },
  { id:15, name:"Sage green midi",              category:"Dress",     vibe:["Soft","Neutral","Relaxed","Effortless"],              color:"Sage Green",energy:"Calm" },
  { id:16, name:"Burgundy knit midi",           category:"Dress",     vibe:["Dark","Quiet luxury","Warm","Polished"],              color:"Burgundy",  energy:"Rich" },
  { id:17, name:"Camel wool coat",              category:"Outerwear", vibe:["Quiet luxury","Polished","Neutral","Work"],           color:"Camel",     energy:"Authoritative" },
  { id:18, name:"Black leather trench",         category:"Outerwear", vibe:["Sharp","Dark","Sleek","Confident","Bold"],            color:"Black",     energy:"Fierce" },
  { id:19, name:"Pointed toe kitten heels",     category:"Shoes",     vibe:["Polished","Romantic","Soft","Work"],                  color:"Nude",      energy:"Graceful" },
  { id:20, name:"White chunky sneakers",        category:"Shoes",     vibe:["Casual","Cool","Playful","Relaxed"],                  color:"White",     energy:"Grounded" },
  { id:21, name:"Strappy black heels",          category:"Shoes",     vibe:["Sleek","Dark","Polished","Magnetic"],                 color:"Black",     energy:"Elevated" },
  { id:22, name:"Brown leather loafers",        category:"Shoes",     vibe:["Quiet luxury","Neutral","Effortless","Work"],         color:"Brown",     energy:"Grounded elegance" },
  { id:23, name:"Black structured tote",        category:"Bag",       vibe:["Sharp","Minimal","Work","Polished"],                  color:"Black",     energy:"Purposeful" },
  { id:24, name:"Gold mini bag",                category:"Bag",       vibe:["Polished","Playful","Bright","Magnetic"],             color:"Gold",      energy:"Light-catching" },
  { id:25, name:"Pearl drop earrings",          category:"Jewellery", vibe:["Soft","Romantic","Polished","Delicate"],              color:"Pearl",     energy:"Luminous" },
  { id:26, name:"Minimal gold watch",           category:"Jewellery", vibe:["Quiet luxury","Sharp","Minimal","Polished"],          color:"Gold",      energy:"Precise" },
  { id:27, name:"Silk square scarf",            category:"Accessory", vibe:["Artistic","Playful","Romantic","Effortless"],         color:"Multi",     energy:"Parisian" },
];

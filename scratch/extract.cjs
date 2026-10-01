const fs = require('fs');
const cheerio = require('cheerio');

function extract(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(html);
  const texts = [];
  $('.t396__elem .tn-atom, .t-text, .t-name, .t-title, .t-descr').each((i, el) => {
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    if (text && !texts.includes(text)) texts.push(text);
  });
  return texts;
}

const kaz = extract('C:/Users/Beibars/.gemini/antigravity-ide/brain/58b28ffc-0476-435d-a3d4-3593ac23917f/.system_generated/steps/3349/content.md');
const en = extract('C:/Users/Beibars/.gemini/antigravity-ide/brain/58b28ffc-0476-435d-a3d4-3593ac23917f/.system_generated/steps/3352/content.md');

console.log("=== KAZAKH ===");
console.log(kaz.filter(t => t.length > 5 && t.length < 200).join('\n'));
console.log("\n=== ENGLISH ===");
console.log(en.filter(t => t.length > 5 && t.length < 200).join('\n'));

const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/Beibars/Desktop/speakers RES 2027';
const destDir = path.join(process.cwd(), 'public', 'speakers');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, {recursive: true});
}

const files = fs.readdirSync(srcDir);
const mapping = [
  { match: 'Саясат', name: 'speaker1' },
  { match: 'Жомарт', name: 'speaker2' },
  { match: 'Томас', name: 'speaker3' },
  { match: 'Гаяне', name: 'speaker4' },
  { match: 'Rashad', name: 'speaker5' },
  { match: 'Гульноза', name: 'speaker6' },
  { match: 'Giorgio', name: 'speaker7' },
  { match: 'Асель', name: 'speaker8' },
  { match: 'Торебеков', name: 'speaker9' },
  { match: 'Айжан', name: 'speaker10' },
  { match: 'Цзоминь', name: 'speaker11' },
  { match: 'Юлия', name: 'speaker12' },
  { match: 'Арман', name: 'speaker13' },
  { match: 'Кундус', name: 'speaker14' },
  { match: 'Жулдыз', name: 'speaker15' },
  { match: 'Манас', name: 'speaker16' }
];

const speakersData = [];

files.forEach(f => {
  const m = mapping.find(x => f.includes(x.match));
  if(m) {
    const ext = path.extname(f);
    const newName = m.name + ext;
    fs.copyFileSync(path.join(srcDir, f), path.join(destDir, newName));
    console.log(`Copied ${f} to ${newName}`);
    
    speakersData.push({
      id: m.name.replace('speaker', ''),
      image: `/speakers/${newName}`
    });
  } else {
    console.log(`Not matched: ${f}`);
  }
});

fs.writeFileSync('speakers_data.json', JSON.stringify(speakersData, null, 2));
console.log('Generated speakers_data.json');

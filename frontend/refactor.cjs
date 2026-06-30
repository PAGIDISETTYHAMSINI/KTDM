const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/Kothagudem/g, 'Miryalaguda');
      content = content.replace(/kothagudem/g, 'miryalaguda');
      content = content.replace(/KOTHAGUDEM/g, 'MIRYALAGUDA');
      fs.writeFileSync(fullPath, content);
      
      // Rename file if necessary
      if (file.includes('kothagudem')) {
          const newName = file.replace(/kothagudem/g, 'miryalaguda');
          fs.renameSync(fullPath, path.join(dir, newName));
      }
    }
  }
}
replaceInDir('./src');
console.log('Refactor complete!');

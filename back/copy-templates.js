const fs = require('fs-extra');

const srcDir = 'src/templates';
const destDir = 'dist/templates';

fs.ensureDirSync(destDir);
fs.copySync(srcDir, destDir);

console.log('✅ Templates copiados correctamente.');

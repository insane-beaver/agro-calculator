/**
 * Збірка для GitHub Pages.
 *
 * Робить три речі, які інакше доводиться пам'ятати руками:
 *  1. Вмикає --openssl-legacy-provider на Node >= 17. Webpack 5 у складі
 *     Angular 12 хешує через md4, якого немає в OpenSSL 3, і збірка падає з
 *     ERR_OSSL_EVP_UNSUPPORTED.
 *  2. Збирає продакшн-версію одразу в docs/ з base href /agro-calculator/.
 *  3. Кладе поруч 404.html (копію index.html) і .nojekyll — без 404.html
 *     GitHub Pages віддає свою сторінку помилки на прямому переході
 *     на /agro-calculator/reverse-calc, бо SPA-rewrite там немає.
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const docs = path.join(root, 'docs');

const nodeMajor = Number(process.versions.node.split('.')[0]);
const nodeOptions = [process.env.NODE_OPTIONS || ''];
if (nodeMajor >= 17) {
  nodeOptions.push('--openssl-legacy-provider');
}

// Викликаємо CLI напряму через node, а не через shell: інакше Git Bash на
// Windows перетворює "/agro-calculator/" на шлях до теки з Git.
const ng = path.join(root, 'node_modules', '@angular', 'cli', 'bin', 'ng');

const build = spawnSync(
  process.execPath,
  [
    ng,
    'build',
    '--configuration', 'production',
    '--output-path', 'docs',
    '--base-href', '/agro-calculator/',
  ],
  {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, NODE_OPTIONS: nodeOptions.join(' ').trim() },
  }
);

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

fs.copyFileSync(path.join(docs, 'index.html'), path.join(docs, '404.html'));
fs.writeFileSync(path.join(docs, '.nojekyll'), '');

console.log('\ndocs/: додано 404.html і .nojekyll — готово до коміту.');

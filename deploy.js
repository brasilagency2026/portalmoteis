const { spawn } = require('child_process');

const child = spawn('npx', ['vercel', 'deploy', '--prod', '--yes'], {
  cwd: __dirname,
  env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0' },
  shell: true,
  stdio: ['ignore', 'pipe', 'pipe']
});

let stdout = '';
let stderr = '';

child.stdout.on('data', (data) => {
  const text = data.toString();
  stdout += text;
  process.stdout.write(text);
});

child.stderr.on('data', (data) => {
  const text = data.toString();
  stderr += text;
  process.stderr.write(text);
});

child.on('close', (code) => {
  console.log('\n=== DEPLOY COMPLETE ===');
  console.log('Exit code:', code);
  console.log('Stdout:', stdout);
  console.log('Stderr:', stderr);
});

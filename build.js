import { build } from 'vite';

try {
  console.log('Starting build process...');
  
  await build({
    configFile: false,
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        input: 'index.html'
      }
    },
    plugins: [
      (await import('@vitejs/plugin-react')).default()
    ]
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

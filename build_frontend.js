// Simple build script for Vercel deployment
import { execSync } from 'child_process';

try {
  console.log('Building frontend for Vercel...');
  execSync('vite build', { stdio: 'inherit' });
  console.log('Frontend build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
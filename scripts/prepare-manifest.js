#!/usr/bin/env node

/**
 * Prepare manifest.json based on deployment target
 * This script copies the appropriate manifest file to manifest.json
 */

import { copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

const deployTarget = process.env.DEPLOY_TARGET || 'github';

const manifestFiles = {
  github: 'manifest.github.json',
  custom: 'manifest.custom.json',
};

const sourceFile = manifestFiles[deployTarget] || manifestFiles.github;
const targetFile = 'manifest.json';

const sourcePath = join(publicDir, sourceFile);
const targetPath = join(publicDir, targetFile);

try {
  copyFileSync(sourcePath, targetPath);
  console.log(`✅ Copied ${sourceFile} to ${targetFile} for ${deployTarget} deployment`);
} catch (error) {
  console.error(`❌ Error copying manifest:`, error.message);
  process.exit(1);
}

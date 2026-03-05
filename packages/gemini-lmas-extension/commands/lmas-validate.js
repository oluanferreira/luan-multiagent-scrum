#!/usr/bin/env node
/**
 * LMAS Validate Command - Validate installation and skills
 */

const path = require('path');

async function main() {
  const projectDir = process.cwd();

  console.log('🔍 LMAS Validation\n');

  try {
    const validatorPath = path.join(
      projectDir,
      '.lmas-core',
      'development',
      'scripts',
      'skill-validator.js',
    );

    const { SkillValidator } = require(validatorPath);
    const validator = new SkillValidator();
    const results = await validator.validateAll();

    console.log(validator.generateReport(results));
  } catch (error) {
    console.log('❌ Validation failed:', error.message);
    console.log('\nMake sure LMAS is installed: npx lmas-core install');
  }
}

main();

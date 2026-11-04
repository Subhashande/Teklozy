import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Teklozy career journey source checks', () => {
  const config = fs.readFileSync(path.resolve('src/data/journeyConfig.ts'), 'utf8');
  const journeyPath = fs.readFileSync(path.resolve('src/components/journey/JourneyPath.tsx'), 'utf8');

  it('should define the ten-level journey configuration', () => {
    assert.match(config, /export const LEVELS(?:\s*:[^=]+)?\s*=/);
    assert.match(config, /stageName:\s*'Stage 10/);
  });

  it('should define career diagnostic options', () => {
    assert.match(config, /export const CAREER_OPTIONS\s*=/);
    assert.match(config, /Frontend Engineer/);
    assert.match(config, /Backend Engineer/);
  });

  it('should keep the journey path source defined', () => {
    assert.match(journeyPath, /SVG_PATH_D/);
    assert.match(journeyPath, /<path/);
  });

  it('should not contain fabricated sample job or alumni datasets', () => {
    assert.doesNotMatch(config, /FAKE_JOBS_SAMPLE|ALUMNI_PINS/);
  });
});

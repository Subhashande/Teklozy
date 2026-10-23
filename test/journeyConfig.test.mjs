import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { LEVELS, CAREER_OPTIONS, FAKE_JOBS_SAMPLE, ALUMNI_PINS } from '../src/data/journeyConfig.ts';
import { SVG_PATH_D } from '../src/components/journey/JourneyPath.tsx';

describe('Teklozy Journey Configuration Tests', () => {
  it('should define exactly 10 milestone levels in sequential order', () => {
    assert.equal(LEVELS.length, 10, 'Expected 10 levels');
    LEVELS.forEach((level, index) => {
      assert.equal(level.id, index + 1, `Level ID must match index + 1 for level ${level.id}`);
      assert.ok(level.title.length > 0, `Level ${level.id} title cannot be empty`);
      assert.ok(level.line.length > 0, `Level ${level.id} line cannot be empty`);
      assert.ok(level.stageName.startsWith('Stage '), `Level ${level.id} stageName must start with Stage`);
      assert.equal(level.features.length, 3, `Level ${level.id} must have exactly 3 feature bullet points`);
      assert.match(level.accent, /^#([0-9A-Fa-f]{6})$/, `Level ${level.id} accent must be valid hex color`);
    });
  });

  it('should verify career diagnostic options', () => {
    assert.equal(CAREER_OPTIONS.length, 5, 'Must have 5 top career options');
    CAREER_OPTIONS.forEach((opt) => {
      assert.ok(opt.id, 'Career option must have an id');
      assert.ok(opt.name, 'Career option must have a name');
      assert.ok(opt.role, 'Career option must have a role description');
      assert.match(opt.color, /^#([0-9A-Fa-f]{6})$/, 'Color must be valid hex');
    });
  });

  it('should accurately calculate active level from scroll progress', () => {
    const calculateActiveLevel = (progress, totalLevels = 10) => {
      const clamped = Math.max(0, Math.min(1, progress));
      const currentIdx = Math.min(totalLevels - 1, Math.floor(clamped * totalLevels));
      return currentIdx + 1;
    };

    assert.equal(calculateActiveLevel(0.0), 1, '0% progress must be Level 1');
    assert.equal(calculateActiveLevel(0.05), 1, '5% progress must be Level 1');
    assert.equal(calculateActiveLevel(0.1), 2, '10% progress must be Level 2');
    assert.equal(calculateActiveLevel(0.45), 5, '45% progress must be Level 5');
    assert.equal(calculateActiveLevel(0.95), 10, '95% progress must be Level 10');
    assert.equal(calculateActiveLevel(1.0), 10, '100% progress must be Level 10');
  });

  it('should have a valid non-empty SVG river path coordinate string', () => {
    assert.ok(SVG_PATH_D.startsWith('M'), 'SVG path must start with moveto M');
    assert.ok(SVG_PATH_D.length > 100, 'SVG path must be sufficiently long for multi-level curve');
  });

  it('should verify alumni pins and fake job security data', () => {
    assert.equal(ALUMNI_PINS.length, 4, 'Must have 4 alumni mentors');
    assert.equal(FAKE_JOBS_SAMPLE.length, 3, 'Must have 3 fake job test samples');
    const fakeJob = FAKE_JOBS_SAMPLE.find((j) => j.status === 'fake');
    assert.ok(fakeJob, 'Must have a flagged scam job sample for testing shield');
  });
});

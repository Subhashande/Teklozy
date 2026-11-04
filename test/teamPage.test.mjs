import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Teklozy team page transparency checks', () => {
  const teamData = fs.readFileSync(path.resolve('src/data/teamData.ts'), 'utf8');
  const teamPage = fs.readFileSync(path.resolve('src/components/pages/TeamPage.tsx'), 'utf8');

  it('should not publish unconfirmed sample team profiles', () => {
    assert.match(teamData, /TEAM_MEMBERS:\s*TeamMember\[\]\s*=\s*\[\]/);
  });

  it('should show a clear placeholder while real profiles are not supplied', () => {
    assert.match(teamPage, /Team profiles are being updated/);
    assert.match(teamPage, /once the details are confirmed/);
  });

  it('should retain the team page and its shared navigation', () => {
    assert.match(teamPage, /The people behind Teklozy/);
    assert.match(teamPage, /<Header/);
  });
});

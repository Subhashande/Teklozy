import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Teklozy team page roster', () => {
  const teamData = fs.readFileSync(path.resolve('src/data/teamData.ts'), 'utf8');
  const teamPage = fs.readFileSync(path.resolve('src/components/pages/TeamPage.tsx'), 'utf8');
  const teamCard = fs.readFileSync(path.resolve('src/components/team/TeamCard.tsx'), 'utf8');

  it('publishes the four requested profiles in the requested order', () => {
    const names = ['Gagan Dileep Vemula', 'Harsha Vardhan Dumpa', 'Tangirala Venkata Raghavendra Pranay', 'Subash'];
    let previous = -1;
    for (const name of names) {
      const index = teamData.indexOf(`name: '${name}'`);
      assert.ok(index > previous, `${name} should appear in the requested order`);
      previous = index;
    }
  });

  it('keeps Subash as a photo and details placeholder', () => {
    assert.match(teamData, /id: 'subash'[\s\S]*?photoUrl: ''/);
    assert.match(teamCard, /PHOTO COMING SOON/);
  });

  it('retains the team page and its shared navigation', () => {
    assert.match(teamPage, /The people behind Teklozy/);
    assert.match(teamPage, /<Header/);
  });
});

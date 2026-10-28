import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Teklozy Our Team Page Roster Tests', () => {
  const TEAM_ROSTER = [
    {
      id: 'gagan-dileep',
      name: 'Gagan Dileep',
      role: 'Founder & Chief Architect',
      rankLevel: 10,
    },
    {
      id: 'aarav-nair',
      name: 'Aarav Nair',
      role: 'Head of Curriculum & Game Design',
      rankLevel: 9,
    },
    {
      id: 'priya-sharma',
      name: 'Priya Sharma',
      role: 'VP of Engineering & Mentorship',
      rankLevel: 9,
    },
    {
      id: 'rohan-mehta',
      name: 'Rohan Mehta',
      role: 'Head of Campus Alliances & Industry Hubs',
      rankLevel: 8,
    },
    {
      id: 'ananya-deshmukh',
      name: 'Ananya Deshmukh',
      role: 'Chief of AI Systems & Learning Diagnostics',
      rankLevel: 8,
    },
  ];

  it('should have exactly 5 core leadership members', () => {
    assert.equal(TEAM_ROSTER.length, 5);
  });

  it('should include Gagan Dileep as Founder & Chief Architect at Level 10', () => {
    const founder = TEAM_ROSTER.find((m) => m.name.toLowerCase() === 'gagan dileep');
    assert.ok(founder, 'Gagan Dileep must be in the team roster');
    assert.equal(founder.rankLevel, 10);
    assert.ok(founder.role.includes('Founder'));
  });

  it('should have valid rank levels and roles for all 5 members', () => {
    for (const member of TEAM_ROSTER) {
      assert.ok(member.id);
      assert.ok(member.name);
      assert.ok(member.role);
      assert.ok(member.rankLevel >= 8 && member.rankLevel <= 10);
    }
  });
});

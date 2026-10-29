import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Teklozy Standard Reference Footer Layout Tests', () => {
  const footerFilePath = path.resolve('src/components/layout/Footer.tsx');
  const footerContent = fs.readFileSync(footerFilePath, 'utf-8');

  it('should implement the left brand block with slogan and Get In Touch button', () => {
    assert.ok(
      footerContent.includes('The Architect Of Modern Digital Growth.'),
      'Footer must include the brand slogan statement'
    );
    assert.ok(
      footerContent.includes('Get In Touch'),
      'Footer must include the Get In Touch button'
    );
  });

  it('should include the #startupindia badge and link to official portal', () => {
    assert.ok(
      footerContent.includes('startup-india.png'),
      'Footer must import and render startup-india.png'
    );
    assert.ok(
      footerContent.includes('https://www.startupindia.gov.in'),
      'Footer must link to official Startup India portal'
    );
  });

  it('should arrange links in structured columns with vertical dividers matching reference', () => {
    assert.ok(footerContent.includes('Roadmap'), 'Must have Roadmap column');
    assert.ok(footerContent.includes('Company'), 'Must have Company column');
    assert.ok(footerContent.includes('Connect'), 'Must have Connect column');
    assert.ok(
      footerContent.includes('border-l'),
      'Must have vertical divider lines between columns'
    );
  });

  it('should keep the present social links intact with direction arrows', () => {
    assert.ok(footerContent.includes('Email'), 'Must have Email link');
    assert.ok(footerContent.includes('Instagram'), 'Must have Instagram link');
    assert.ok(footerContent.includes('LinkedIn'), 'Must have LinkedIn link');
    assert.ok(footerContent.includes('GitHub'), 'Must have GitHub link');
    assert.ok(footerContent.includes('↗'), 'Must keep directional arrow ↗');
  });

  it('should have standard bottom bar with Privacy Policy, Terms, Cookie Preferences, and Copyright', () => {
    assert.ok(footerContent.includes('Privacy Policy'), 'Must have Privacy Policy');
    assert.ok(footerContent.includes('Terms of Use'), 'Must have Terms of Use');
    assert.ok(footerContent.includes('Cookie preferences'), 'Must have Cookie preferences');
    assert.ok(footerContent.includes('All rights reserved'), 'Must have copyright');
  });
});

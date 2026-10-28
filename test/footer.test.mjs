import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Teklozy Modern Statement Footer Layout Tests', () => {
  const footerFilePath = path.resolve('src/components/layout/Footer.tsx');
  const footerContent = fs.readFileSync(footerFilePath, 'utf-8');

  it('should implement the left brand block with slogan and Get In Touch button', () => {
    assert.ok(
      footerContent.includes('The Architects Of Modern Digital Growth.'),
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

  it('should arrange links in 4 columns with vertical dividers matching reference', () => {
    assert.ok(footerContent.includes('Industries'), 'Must have Industries column');
    assert.ok(footerContent.includes('Insights'), 'Must have Insights column');
    assert.ok(footerContent.includes('Company'), 'Must have Company column');
    assert.ok(footerContent.includes('Connect'), 'Must have Connect column');
    assert.ok(
      footerContent.includes('border-l border-slate-200'),
      'Must have vertical divider lines between columns'
    );
  });

  it('should render verified connect links with icons (X.com, Instagram, GitHub, LinkedIn, Email)', () => {
    assert.ok(footerContent.includes('X.com'), 'Must have X.com link');
    assert.ok(footerContent.includes('Instagram'), 'Must have Instagram link');
    assert.ok(footerContent.includes('GitHub'), 'Must have GitHub link');
    assert.ok(footerContent.includes('LinkedIn'), 'Must have LinkedIn link');
    assert.ok(footerContent.includes('Email'), 'Must have Email link');
  });

  it('should have the reference bottom bar with Privacy Policy, Terms of Use, Cookie Consent, and Copyright', () => {
    assert.ok(footerContent.includes('Privacy Policy'), 'Must have Privacy Policy');
    assert.ok(footerContent.includes('Terms of Use'), 'Must have Terms of Use');
    assert.ok(footerContent.includes('Cookie Consent'), 'Must have Cookie Consent');
    assert.ok(footerContent.includes('All rights reserved'), 'Must have copyright');
  });
});

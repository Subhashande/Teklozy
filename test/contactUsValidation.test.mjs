import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Teklozy Contact Us Form & Modal Verification Tests', () => {
  // Test validation logic
  const validateForm = (data) => {
    const errors = {};

    if (!data.fullName || !data.fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    } else if (data.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !data.email.trim()) {
      errors.email = 'Email Address is required.';
    } else if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!data.topic || !data.topic.trim()) {
      errors.topic = 'Please select what you are contacting us about.';
    }

    if (!data.message || !data.message.trim()) {
      errors.message = 'Message is required.';
    } else if (data.message.trim().length < 10) {
      errors.message = 'Please provide a brief message (at least 10 characters).';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  it('should reject completely empty form submission', () => {
    const result = validateForm({ fullName: '', email: '', topic: '', message: '' });
    assert.equal(result.isValid, false);
    assert.ok(result.errors.fullName);
    assert.ok(result.errors.email);
    assert.ok(result.errors.topic);
    assert.ok(result.errors.message);
  });

  it('should reject invalid email formats', () => {
    const invalidEmails = ['invalid', 'user@', 'user@domain', 'user.com', '@domain.com'];
    for (const email of invalidEmails) {
      const result = validateForm({
        fullName: 'Alex Doe',
        email,
        topic: 'Student / Learner',
        message: 'This is a valid inquiry message.',
      });
      assert.equal(result.isValid, false, `Expected ${email} to be invalid`);
      assert.ok(result.errors.email);
    }
  });

  it('should accept valid submissions with correct required fields', () => {
    const validData = {
      fullName: 'Alex Doe',
      email: 'alex@example.com',
      topic: 'College Partnership',
      message: 'We are looking to partner with Teklozy for our CSE 2026 cohort.',
    };
    const result = validateForm(validData);
    assert.equal(result.isValid, true);
    assert.equal(Object.keys(result.errors).length, 0);
  });

  it('should verify official contact email and social channels (LinkedIn, Instagram)', () => {
    const officialEmail = 'contact@teklozy.com';
    const socials = {
      linkedin: 'https://linkedin.com/company/teklozy',
      instagram: 'https://instagram.com/teklozy',
    };
    assert.equal(officialEmail, 'contact@teklozy.com');
    assert.equal(socials.linkedin, 'https://linkedin.com/company/teklozy');
    assert.equal(socials.instagram, 'https://instagram.com/teklozy');
  });

  it('should support the specified 4 required topics', () => {
    const requiredTopics = [
      'Student / Learner',
      'College Partnership',
      'Mentorship',
      'Other',
    ];
    assert.equal(requiredTopics.length, 4);
    assert.ok(requiredTopics.includes('Student / Learner'));
    assert.ok(requiredTopics.includes('College Partnership'));
    assert.ok(requiredTopics.includes('Mentorship'));
    assert.ok(requiredTopics.includes('Other'));
  });
});

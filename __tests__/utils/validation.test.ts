import { validateEmail, validateUrl, sanitizeInput, validateFormData } from '@/utils/validation';
import { companyInfoSchema } from '@/types/onboarding';

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
      expect(validateEmail('123@test.org')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateUrl', () => {
    it('should validate correct URLs', () => {
      expect(validateUrl('https://example.com')).toBe(true);
      expect(validateUrl('http://test.org/path')).toBe(true);
      expect(validateUrl('https://sub.domain.co.uk')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(validateUrl('not-a-url')).toBe(false);
      expect(validateUrl('ftp://example.com')).toBe(false);
      expect(validateUrl('')).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('should remove HTML tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
      expect(sanitizeInput('<div>Hello</div>')).toBe('divHello/div');
    });

    it('should remove javascript protocol', () => {
      expect(sanitizeInput('javascript:alert("xss")')).toBe('alert("xss")');
      expect(sanitizeInput('JAVASCRIPT:alert("xss")')).toBe('alert("xss")');
    });

    it('should remove event handlers', () => {
      expect(sanitizeInput('onclick="alert(\'xss\')"')).toBe('"alert(\'xss\')"');
      expect(sanitizeInput('onload="test()"')).toBe('"test()"');
    });

    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello world  ')).toBe('hello world');
    });
  });

  describe('validateFormData', () => {
    it('should validate correct form data', () => {
      const validData = {
        companyName: 'Test Company',
        industry: 'technology',
        website: 'https://test.com',
        companySize: '1-10',
        description: 'A test company description',
      };

      const result = validateFormData(companyInfoSchema, validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should reject invalid form data', () => {
      const invalidData = {
        companyName: '', // Empty name
        industry: 'technology',
        website: 'not-a-url', // Invalid URL
        companySize: '1-10',
        description: 'Short', // Too short
      };

      const result = validateFormData(companyInfoSchema, invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toHaveLength(3); // 3 validation errors
        expect(result.errors.some(e => e.field === 'companyName')).toBe(true);
        expect(result.errors.some(e => e.field === 'website')).toBe(true);
        expect(result.errors.some(e => e.field === 'description')).toBe(true);
      }
    });
  });
}); 
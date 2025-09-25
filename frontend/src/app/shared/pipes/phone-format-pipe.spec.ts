import { PhoneFormat } from './phone-format-pipe';

describe('PhoneFormatPipe', () => {
  let pipe: PhoneFormat;

  beforeEach(() => {
    pipe = new PhoneFormat();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string for null or undefined input', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });

  it('should return an empty string for an empty string input', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should return the original value if it does not start with +62', () => {
    const phoneNumber = '+1 123 456 7890';
    expect(pipe.transform(phoneNumber)).toBe(phoneNumber);
  });

  it('should return the original value for a local number format', () => {
    const phoneNumber = '0812-3456-7890';
    expect(pipe.transform(phoneNumber)).toBe(phoneNumber);
  });

  it('should handle short Indonesian numbers correctly (<= 3 digits after code)', () => {
    expect(pipe.transform('+62812')).toBe('+62 812');
  });

  it('should handle medium length Indonesian numbers correctly (4-7 digits after code)', () => {
    expect(pipe.transform('+62812345')).toBe('+62 812-345');
    expect(pipe.transform('+628123456')).toBe('+62 812-3456');
    expect(pipe.transform('+6281234567')).toBe('+62 812-3456-7');
  });

  it('should handle long Indonesian numbers correctly (> 7 digits after code)', () => {
    expect(pipe.transform('+628123456789')).toBe('+62 812-3456-789');
    expect(pipe.transform('+6281234567890')).toBe('+62 812-3456-7890');
  });

  it('should strip non-digit characters (except +) and format correctly', () => {
    expect(pipe.transform('+62 (812) 3456-7890')).toBe('+62 812-3456-7890');
    expect(pipe.transform(' +62 812 345 678 ')).toBe('+62 812-345-678');
  });

  it('should handle a typical mobile number', () => {
    const mobileNumber = '+6281234567890';
    // The rest of the number '81234567890' has a length of 11.
    // It will be formatted as: 812-3456-7890
    expect(pipe.transform(mobileNumber)).toBe('+62 812-3456-7890');
  });
});

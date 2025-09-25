export interface ContactData {
  name: string;
  email: string;
  subject: string;
  content: string;
  confirm: boolean;
  recaptcha?: string;
}

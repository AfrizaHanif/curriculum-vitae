export interface CertificationData {
  id_certification: string;
  name_certification: string;
  issuer_certification: string;
  issue_date_certification: string;
  expiration_date_certification?: string; // Optional
  credential_id_certification?: string; // Optional
  credential_url_certification?: string; // Optional
  file_certification?: string; // Optional
}

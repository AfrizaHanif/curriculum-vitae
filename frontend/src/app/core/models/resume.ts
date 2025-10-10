/**
 * Defines the structure for an education entry.
 * The ID is a string because we'll be using ULIDs from the backend.
 */
export interface EducationData {
  id_education: string;
  id_user?: string;
  school_education: string;
  degree_education: string;
  major_education: string;
  status_education: string;
  s_period_education: string; // Stored as 'YYYY-MM-DD'
  f_period_education: string | null; // Stored as 'YYYY-MM-DD'
  latitude_education?: number | null;
  longitude_education?: number | null;
  gpa_education: number | null;
  desc_education: string | null;
}

/**
 * Defines the structure for a work experience entry.
 */
export interface ExperienceData {
  id_experience: string;
  id_user?: string;
  title_experience: string;
  company_experience: string;
  status_experience: string;
  s_period_experience: string; // Stored as 'YYYY-MM-DD'
  f_period_experience: string | null; // Can be null for current job
  latitude_experience?: number | null;
  longitude_experience?: number | null;
  desc_experience: string | null;
}

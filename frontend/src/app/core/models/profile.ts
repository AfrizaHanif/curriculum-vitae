export interface ProfileData {
  id_user?: string;
  fullname_profile: string;
  birthday_profile: string;
  phone_profile: string;
  current_city_profile: string;
  current_prov_profile: string;
  age: number;
  email_profile: string;
  tagline_profile: string;
  desc_profile: string;
  status_profile: string;
  photo_profile: string;
}

export interface SkillData {
  id_skill: string;
  id_user?: string;
  name_skill: string;
  percent_skill: number;
}

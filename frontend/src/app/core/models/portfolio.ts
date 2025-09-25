export interface PortfolioData {
  // Main Portfolio Data
  id_portfolio: string;
  id_user?: string;
  title_portfolio: string;
  category_portfolio: string;
  subcategory_portfolio: string;
  type_portfolio: string;
  image_portfolio?: string; // Optional
  gallery_portfolio?: string[]; // Optional
  s_period_portfolio: string;
  f_period_portfolio: string;
  desc_portfolio?: string; // Optional
  tags_portfolio?: string[]; // Optional
  tech_portfolio?: string[]; // Optional
  url_portfolio: string | null; // Optional (This is second method of '?')
  repository_portfolio?: string; // Optional
  rep_type_portfolio?: 'GitHub' | 'GitLab' | 'Bitbucket' | 'Document' | string; // Optional, but required if repository_portfolio has been filled
  related_blogs_portfolio?: string[]; // Optional

  // New Case Study Fields
  overview_case_study?: string;
  goal_case_study?: string;
  problem_case_study?: string;
  solution_case_study?: string;
  result_case_study?: string;
}

// This is for Pagination. Do not remove
export interface PaginatedPortfolioResponse {
  current_page: number;
  data: PortfolioData[];
  last_page: number;
  per_page: number;
  total: number;
}

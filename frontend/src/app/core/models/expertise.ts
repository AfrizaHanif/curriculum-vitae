import { PortfolioData } from './portfolio';

export interface ExpertiseData {
  id_expertise: string;
  icon_expertise: string;
  title_expertise: string;
  desc_expertise: string;
  tags_expertise: string[];
  related_projects: string[];
}

export interface ExpertiseWithProjects extends ExpertiseData {
  relatedProjectDetails: PortfolioData[];
}

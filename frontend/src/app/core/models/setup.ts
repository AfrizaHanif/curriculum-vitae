export interface SetupItem {
  name: string;
  description: string;
  whyIUseIt?: string | null;
  link?: string;
}

export interface SetupCategory {
  name: string;
  items: SetupItem[];
}

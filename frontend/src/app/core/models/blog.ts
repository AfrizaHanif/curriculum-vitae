export interface BlogData {
  id_blog: string;
  title_blog: string;
  slug_blog: string;
  author_blog: string;
  pub_date_blog: string; // 'YYYY-MM-DD'
  tags_blog: string[];
  summary_blog: string;
  content_blog: string; // Can contain HTML
  image_blog: string;
  is_featured?: boolean;
}

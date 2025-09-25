export interface NavLink {
  path: string;
  icon: string;
  label: string;
  exact?: boolean;
  disabled?: boolean;
  tooltip?: string;
}

export const navLinks: NavLink[] = [
  { path: '/', icon: 'house-fill', label: 'Home', exact: true },
  { path: '/profile', icon: 'person-vcard', label: 'Profil' },
  { path: '/resume', icon: 'file-earmark-text', label: 'Resume' },
  { path: '/expertise', label: 'Keahlian', icon: 'person-workspace', exact: true },
  { path: '/portfolio', icon: 'briefcase', label: 'Portfolio' },
  { path: '/blog', icon: 'journal-text', label: 'Blog' },
  {
    path: '/testimonials',
    icon: 'chat-square-quote',
    label: 'Testimoni',
    disabled: true,
    tooltip: 'Tidak ada testimoni saat ini',
  },
  { path: '/contact', icon: 'envelope', label: 'Kontak' },
];

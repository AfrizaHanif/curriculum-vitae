// Model of NavLink
export interface NavLink {
  path: string;
  icon: string;
  label: string;
  exact?: boolean;
  disabled?: boolean;
  tooltip?: string;
  children?: NavLink[];
}

// All Navigation Data
export const navLinks: NavLink[] = [
  {
    path: '/',
    icon: 'home',
    label: 'Home',
    exact: true
  },
  {
    path: '/profile',
    icon: 'profile',
    label: 'Profil',
    children: [
      {
        path: '/profile',
        icon: 'profile',
        label: 'Tentang Saya',
        exact: true
      },
      {
        path: '/setup',
        icon: 'setup',
        label: 'My Setup'
      },
    ],
  },
  {
    path: '/resume',
    icon: 'resume',
    label: 'Resume'
  },
  {
    path: '/expertise', // The parent link can default to the main expertise page
    label: 'Keahlian',
    icon: 'expertise',
    children: [
      {
        path: '/expertise',
        label: 'Ringkasan Keahlian',
        icon: 'expertise',
        exact: true
      },
      {
        path: '/services',
        label: 'Layanan',
        icon: 'main-project',
        disabled: true,
        tooltip: 'Saat ini layanan belum tersedia',
      }
    ]
  },
  {
    path: '/portfolio',
    icon: 'portfolio',
    label: 'Portfolio',
    children: [
      {
        path: '/portfolio',
        icon: 'main-project',
        label: 'Portfolio Utama',
        exact: true },
      {
        path: '/projects',
        icon: 'other-project',
        label: 'Proyek Lainnya',
        disabled: true,
        tooltip: 'Tidak ada proyek yang sedang dikerjakan',
      }
    ]
  },
  {
    path: '/blog',
    icon: 'blog',
    label: 'Blog'
  },
  {
    path: '/testimonials',
    icon: 'testimonial',
    label: 'Testimoni',
    disabled: true,
    tooltip: 'Tidak ada testimoni saat ini',
  },
  {
    path: '/contact',
    icon: 'contact',
    label: 'Kontak'
  },
];

export interface NavLink {
  path: string;
  icon: string;
  label: string;
  exact?: boolean;
  disabled?: boolean;
  tooltip?: string;
  children?: NavLink[];
}

export const navLinks: NavLink[] = [
  {
    path: '/',
    icon: 'house-fill',
    label: 'Home',
    exact: true
  },
  {
    path: '/profile',
    icon: 'person-vcard',
    label: 'Profil',
    children: [
      {
        path: '/profile',
        icon: 'person-vcard',
        label: 'Tentang Saya',
        exact: true
      },
      {
        path: '/setup',
        icon: 'gear-wide-connected',
        label: 'My Setup'
      },
    ],
  },
  {
    path: '/resume',
    icon: 'file-earmark-text',
    label: 'Resume'
  },
  {
    path: '/expertise', // The parent link can default to the main expertise page
    label: 'Keahlian',
    icon: 'person-workspace',
    children: [
      {
        path: '/expertise',
        label: 'Ringkasan Keahlian',
        icon: 'person-workspace',
        exact: true
      },
      {
        path: '/services',
        label: 'Layanan',
        icon: 'briefcase-fill',
        disabled: true,
        tooltip: 'Saat ini layanan belum tersedia',
      }
    ]
  },
  {
    path: '/portfolio',
    icon: 'collection-fill',
    label: 'Portfolio',
    children: [
      {
        path: '/portfolio',
        icon: 'briefcase-fill',
        label: 'Portfolio Utama',
        exact: true },
      {
        path: '/projects',
        icon: 'joystick',
        label: 'Proyek Lainnya',
        disabled: true,
        tooltip: 'Tidak ada proyek yang sedang dikerjakan',
      }
    ]
  },
  {
    path: '/blog',
    icon: 'journal-text',
    label: 'Blog'
  },
  {
    path: '/testimonials',
    icon: 'chat-square-quote',
    label: 'Testimoni',
    disabled: true,
    tooltip: 'Tidak ada testimoni saat ini',
  },
  {
    path: '/contact',
    icon: 'envelope',
    label: 'Kontak'
  },
];

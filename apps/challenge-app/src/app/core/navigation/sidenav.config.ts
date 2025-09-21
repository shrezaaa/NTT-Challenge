export interface SidenavNode {
  name: string;
  url: string;
  icon: string;
  children?: SidenavNode[];
  hasDividerAfter?: boolean;
}

export const SIDENAV_CONFIG: SidenavNode[] = [
  {
    name: 'Post',
    url: '/posts',
    icon: 'groups',
    hasDividerAfter: true,
  },
];

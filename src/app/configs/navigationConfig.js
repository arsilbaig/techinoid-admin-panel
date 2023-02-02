import i18next from 'i18next';
import DocumentationNavigation from '../main/documentation/DocumentationNavigation';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import authRoles from '../auth/authRoles';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    type: 'group',
    icon: 'heroicons-outline:home',
    translate: 'DASHBOARDS',
    children: [
      {
        id: 'dashboards.project',
        title: 'Dashboard',
        type: 'item',
        icon: 'heroicons-outline:home',
        url: '/dashboards/project',
      }
    ],
  },
  {
    id: 'apps',
    title: 'Applications',
    type: 'group',
    icon: 'heroicons-outline:cube',
    translate: 'APPLICATIONS',
    children: [
      {
        id: 'apps.projects',
        title: 'Projects',
        type: 'collapse',
        icon: 'heroicons-outline:clipboard-check',
        translate: 'PROJECTS',
        children: [
          {
            id: 'projects',
            title: 'All Projects',
            type: 'item',
            url: 'apps/projects',
            end: true,
          }
        ]
      },
      {
        id: 'apps.blogs',
        title: 'Blogs',
        type: 'collapse',
        icon: 'heroicons-outline:pencil',
        translate: 'BLOGS',
        children: [
          {
            id: 'blogs',
            title: 'All Blogs',
            type: 'item',
            url: 'apps/blogs',
            end: true,
          }
        ]
      },
      {
        id: 'apps.jobs',
        title: 'Jobs',
        type: 'collapse',
        icon: 'heroicons-outline:document',
        translate: 'JOBS',
        children: [
          {
            id: 'jobs',
            title: 'All Jobs',
            type: 'item',
            url: 'apps/jobs',
            end: true,
          }
        ]
      },
      {
        id: 'apps.contacts',
        title: 'Contacts',
        type: 'collapse',
        icon: 'heroicons-outline:user',
        translate: 'CONTACTS',
        children: [
          {
            id: 'contacts',
            title: 'All Contacts',
            type: 'item',
            url: 'apps/userContacts',
            end: true,
          }
        ]
      }
    ],
  }
];

export default navigationConfig;

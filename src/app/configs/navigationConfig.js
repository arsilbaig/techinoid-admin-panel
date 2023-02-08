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
      // {
      // id: 'apps.projects',
      // title: 'Projects',
      // type: 'collapse',
      // icon: 'heroicons-outline:clipboard-check',
      // translate: 'PROJECTS',
      // children: [
      {
        id: 'projects',
        title: 'Projects',
        type: 'item',
        icon: 'heroicons-outline:clipboard-check',
        url: 'apps/projects',
        end: true,
      },
      //   ]
      // },
      // {
      //   id: 'apps.blogs',
      //   title: 'Blogs',
      //   type: 'collapse',
      //   icon: 'heroicons-outline:pencil',
      //   translate: 'BLOGS',
      //   children: [
      {
        id: 'blogs',
        title: 'Blogs',
        type: 'item',
        icon: 'heroicons-outline:pencil',
        url: 'apps/blogs',
        end: true,
      },
      //   ]
      // },
      // {
      //   id: 'apps.jobs',
      //   title: 'Jobs',
      //   type: 'collapse',
      //   icon: 'heroicons-outline:briefcase',
      //   translate: 'JOBS',
      //   children: [
      {
        id: 'jobs',
        title: 'Jobs',
        type: 'item',
        icon: 'heroicons-outline:briefcase',
        url: 'apps/jobs',
        end: true,
      },
      //   ]
      // },
      // {
      //   id: 'apps.contacts',
      //   title: 'Contacts',
      //   type: 'collapse',
      //   icon: 'heroicons-outline:link',
      //   translate: 'CONTACTS',
      //   children: [
      {
        id: 'contacts',
        title: 'Contacts',
        type: 'item',
        icon: 'heroicons-outline:link',
        url: 'apps/userContacts',
        end: true,
      },
      //   ]
      // },
      // {
      //   id: 'apps.applicants',
      //   title: 'Applicants',
      //   type: 'collapse',
      //   icon: 'heroicons-outline:user-group',
      //   translate: 'APPLICANTS',
      //   children: [
      {
        id: 'applicants',
        title: 'Applicants',
        type: 'item',
        icon: 'heroicons-outline:user-group',
        url: 'apps/applicants',
        end: true,
      },
      {
        id: 'subscribers',
        title: 'Subscribers',
        type: 'item',
        icon: 'heroicons-outline:chat',
        url: 'apps/subscribers',
        end: true,
      }
      //   ]
      // }
    ],
  }
];

export default navigationConfig;

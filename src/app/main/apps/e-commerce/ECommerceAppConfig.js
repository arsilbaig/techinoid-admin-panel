import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Blog = lazy(() => import('./blog/Blog'));
const Blogs = lazy(() => import('./blogs/Blogs'));
const Order = lazy(() => import('./order/Order'));
const Orders = lazy(() => import('./orders/Orders'));
const Project = lazy(() => import('./project/Project'));
const Projects = lazy(() => import('./projects/Projects'));
const Job = lazy(() => import('./job/Job'));
const Jobs = lazy(() => import('./jobs/Jobs'));
const Contacts = lazy(() => import('./allContacts/Contacts'));
const Applicants = lazy(() => import('./applicants/Applications'));
const Subscribers = lazy(() => import('./subscribers/Subscribers'));

const ECommerceAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/blogs',
      element: <Blogs />,
    },
    {
      path: 'apps/blogs/:blogId/*',
      element: <Blog />,
    },
    {
      path: 'apps/projects',
      element: <Projects />,
    },
    {
      path: 'apps/projects/:projectId/*',
      element: <Project />,
    },
    {
      path: 'apps/jobs',
      element: <Jobs />,
    },
    {
      path: 'apps/jobs/:jobId',
      element: <Job />,
    },
    {
      path: 'apps/userContacts',
      element: <Contacts />,
    },
    {
      path: 'apps/applicants',
      element: <Applicants />,
    },
    {
      path: 'apps/subscribers',
      element: <Subscribers />,
    },
    {
      path: 'apps/e-commerce/orders',
      element: <Orders />,
    },
    {
      path: 'apps/e-commerce/orders/:orderId',
      element: <Order />,
    },
    {
      path: 'apps/e-commerce',
      element: <Navigate to="projects" />,
    },
  ],
};

export default ECommerceAppConfig;

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Blog = lazy(() => import('./blog/Blog'));
const Blogs = lazy(() => import('./blogs/Blogs'));
const Order = lazy(() => import('./order/Order'));
const Orders = lazy(() => import('./orders/Orders'));
const Project = lazy(() => import('./project/Project'));
const Projects = lazy(() => import('./projects/Projects'));

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

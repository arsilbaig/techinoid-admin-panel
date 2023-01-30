import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import orders from './ordersSlice';
import blog from './blogSlice';
import blogs from './blogsSlice';
import projects from './projectsSlice';
import project from './projectSlice';

const reducer = combineReducers({
  blogs,
  blog,
  projects,
  project,
  orders,
  order,
});

export default reducer;

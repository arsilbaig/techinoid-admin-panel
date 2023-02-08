import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import orders from './ordersSlice';
import blog from './blogSlice';
import blogs from './blogsSlice';
import projects from './projectsSlice';
import project from './projectSlice';
import job from './jobSlice';
import jobs from './jobsSlice';
import userContacts from './userContactsSlice';
import applicants from './applicantsSlice';
import subscribers from './subscribersSlice';

const reducer = combineReducers({
  blogs,
  blog,
  projects,
  project,
  orders,
  order,
  job,
  jobs,
  userContacts,
  applicants,
  subscribers

});

export default reducer;

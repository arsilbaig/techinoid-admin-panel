import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import BlogsHeader from './BlogsHeader';
import BlogsTable from './BlogsTable';

function Blogs() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<BlogsHeader />}
      content={<BlogsTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('dashboardBlogs', reducer)(Blogs);

import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import JobsHeader from './JobsHeader';
import JobsTable from './JobsTable';

function Jobs() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<JobsHeader />}
      content={<JobsTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('dashboardJobs', reducer)(Jobs);

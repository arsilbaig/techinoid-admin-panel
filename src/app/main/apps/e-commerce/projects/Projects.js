import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import ProjectsHeader from './ProjectsHeader';
import ProjectsTable from './ProjectsTable';

function Projects() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<ProjectsHeader />}
      content={<ProjectsTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('dashboard', reducer)(Projects);

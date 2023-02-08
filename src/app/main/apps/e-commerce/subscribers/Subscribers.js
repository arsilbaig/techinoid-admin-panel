import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import SubscribersHeader from './SubscribersHeader';
import SubscribersTable from './SubscribersTable';

function Subscribers() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<SubscribersHeader />}
      content={<SubscribersTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('dashboardSubscribers', reducer)(Subscribers);

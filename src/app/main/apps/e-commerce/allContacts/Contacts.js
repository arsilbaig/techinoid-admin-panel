import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import ContactsHeader from './ContactsHeader';
import ContactsTable from './ContactsTable';

function Contacts() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<ContactsHeader />}
      content={<ContactsTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('dashboardContacts', reducer)(Contacts);

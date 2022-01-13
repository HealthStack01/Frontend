import AppRoutes from '../../routes/routes';
import SideMenu from '../sidemenu';
import TopMenu from '../topmenu';
import { LayoutWrapper } from './styles';

const Layout = () => {
  return (
    <LayoutWrapper>
      <SideMenu />
      <div className='layout__content'>
        <TopMenu />
        <div className='layout__content-main'>
          <AppRoutes />
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Layout;

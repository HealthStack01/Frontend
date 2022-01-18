import Breadcrumbs from '../breadcrumb';
import { Avatar, Profile, TopMenuWrapper } from './styles';
// import { avatar } from '../../assets/images/img_avatar.png';

const TopMenu = () => {
  return (
    <TopMenuWrapper>
      <Breadcrumbs />
      <Profile>
        <span>
          @workspace.com
          {/* Pass employee location context */}
        </span>
        <i className='bi bi-bell-fill'></i>
        <Avatar src='/img_avatar.png' alt='' />
      </Profile>
    </TopMenuWrapper>
  );
};

export default TopMenu;

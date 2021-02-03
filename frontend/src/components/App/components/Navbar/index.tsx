import * as React from 'react';
import cx from 'classnames';

// HOC
import { withRouter } from 'react-router-dom';

// Components
import { Link, LinkBack } from 'libraries/components/Link';

// Assets
import ShopeeLogo from 'assets/common/images/shopee.png';
import BackButton from './back-button.svg';
import BurgerMenu from './burger-menu.svg';

// Types
import { RouteComponentProps } from 'react-router';

import s from './style.scss';

const MENU = [
  {
    route: '/browse',
    text: 'Browse',
  },
  {
    route: '/',
    text: 'Home',
  },
  {
    route: '/cart',
    text: 'Checkout',
  },
  {
    route: '/shoppass',
    text: 'Shoppass',
  },
];

function Navbar({ location }: RouteComponentProps) {
  const [showMenu, setShowMenu] = React.useState<boolean>(false);

  const toggleMenu = () => setShowMenu((showMenu) => !showMenu);

  return (
    <ul className={cx(s.navbarContainer, showMenu && s.showMenu)}>
      <li className={s.menu}>
        <Link className={cx(s.link, s.home)} to='/' replace>
          <img className={s.shopeeLogo} src={ShopeeLogo} onClick={toggleMenu} />
        </Link>
      </li>
      {MENU.map(({ route, text }) => {
        const isActive = location.pathname === route;
        return (
          <li
            key={route}
            className={cx(s.menu, isActive && s.active)}
            onClick={toggleMenu}
          >
            <Link className={s.link} to={route} replace>
              {text}
            </Link>
          </li>
        );
      })}

      <LinkBack className={s.backButton}>
        <BackButton />
      </LinkBack>

      <div className={s.showMenuButton} onClick={toggleMenu}>
        <BurgerMenu className={s.burgerIcon} />
      </div>
    </ul>
  );
}

export default withRouter(Navbar);

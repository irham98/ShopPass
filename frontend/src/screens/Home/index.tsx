import * as React from 'react';

// Components
import { Link } from 'libraries/components/Link';
import pass from './bill.png';
import cart from './shopping-cart.png';
import search from './browsing.png';

// Stylings
import styles from './styles.scss';

function Home() {
  // Start creating your awesome app here
  return (
    <div className={styles.home}>
      <div className={styles.option}>
        <img src={search} className={styles.icon} />
        <Link to='/browse' className={styles.homeItem} replace>
          Browse Items
        </Link>
      </div>

      <div className={styles.option}>
        <img src={cart} className={styles.icon} />
        <Link to='/cart' className={styles.homeItem} replace>
          Check Out
        </Link>
      </div>

      <div className={styles.option}>
        <img src={pass} className={styles.icon} />
        <Link to='/shoppass' className={styles.homeItem} replace>
          Shoppass
        </Link>
      </div>

      <br />
      <br />
    </div>
  );
}

export default Home;

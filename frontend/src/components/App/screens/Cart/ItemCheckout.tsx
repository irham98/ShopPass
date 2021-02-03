import * as React from 'react';

import consts from '../../../../consts';
import { get } from 'libraries/utils/fetch';
import Button from '../../components/Button';
import styles from './styles.scss';
import userInfo from '../Shoppass/userInfo';
import passInfo from '../Shoppass/passInfo';
import { getImageUrl } from 'libraries/utils/url';
import Success from './Success';

function ItemCheckout() {
  const [items, setItems] = React.useState(null);
  const [show, setShow] = React.useState(false);
  let price = 0.0;
  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      const response = await get(`${consts.API_URL}user/get_cart_items`, {});
      if (isMounted && response) {
        setItems(response.data.items);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!items) {
    return (
      <>
        Loading Item Data...
        <br />
      </>
    );
  }

  items.map((item, index) => {
    price = price + item.price;
  });

  const onClick = () => {
    const pointsEarned = Math.round(price * 3);
    const newPoints = userInfo.points + pointsEarned;
    let i = userInfo.current_tier;
    while (i <= 15 && passInfo.tiers[i].threshold < newPoints) {
      i += 1;
    }
    userInfo.points = newPoints;
    userInfo.current_tier = i;
    setShow(true);
  };
  return (
    <div className={styles.checkoutContainer}>
      <>
        <h3>Your Cart</h3>
        <div>
          {(items || []).map((item, index) => {
            return (
              <>
                <div className={styles.itemDetailContainer}>
                  <img
                    className={styles.itemImage}
                    src={getImageUrl(item.cover, true)}
                    width='100'
                  />
                  <div>{item.cover}</div>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemPrice}>{item.price}</div>
                </div>
                <br />
              </>
            );
          })}
        </div>

        <div className={styles.checkout}>
          <>
            <div>Final price</div>
            <div className={styles.totalPrice}>{price}</div>
          </>
        </div>

        <div className={styles.checkoutButton}>
          <Button onClick={onClick}>Check Out</Button>
        </div>

        <Success onClose={() => setShow(false)} show={show}></Success>
      </>
    </div>
  );
}

export default ItemCheckout;

/* eslint-disable react/prop-types */
import * as React from 'react';
import styles from './styles.scss';
import check from './check.png';
import { Link } from 'react-router-dom';

function RewardDetail(props) {
  if (!props.show) return null;

  return (
    <div className={styles.modal} onClick={props.onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>Success</h4>
        </div>
        <div className={styles.modalBody} style={{ flexDirection: 'column' }}>
          <img src={check} style={{ width: '10rem', height: '10rem' }} />
          <h4>Check out Successful!</h4>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.button} onClick={props.onClose}>
            <Link to='/Shoppass'>Go to Pass</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RewardDetail;

/* eslint-disable react/prop-types */
import * as React from 'react';
import styles from './styles.scss';

function RewardDetail(props) {
  if (!props.show) return null;

  const onClick = () => {
    props.onClick();
    props.onClose();
  };
  return (
    <div
      className={styles.modal}
      onClick={props.onClose}
      style={{ zIndex: 30 }}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>Choose your rewards!</h4>
        </div>
        <div className={styles.modalBody} style={{ flexDirection: 'column' }}>
          <h3>{props.reward.name}</h3>
          <h4>{props.reward.description}</h4>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.button} onClick={onClick}>
            Claim
          </button>
        </div>
      </div>
    </div>
  );
}

export default RewardDetail;

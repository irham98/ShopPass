/* eslint-disable react/prop-types */
import * as React from 'react';
import styles from './styles.scss';
import Reward from '../../components/Reward';
import star from './star.png';
import lock from './lock.png';
import check from './validation.png';
import RewardDetail from './RewardDetail';
import userInfo from './userInfo';

function MilestoneModal(props) {
  const [chosenFree, setChosenFree] = React.useState(999);
  const [chosenPremium, setChosenPremium] = React.useState(999);

  const [showDetail, setShowDetail] = React.useState(999);

  const claimItem = (tier, type, index) => {
    if (type === 'free') setChosenFree(index);
    else setChosenPremium(index);
  };

  if (!props.show) return null;

  const onClick = () => {
    if (chosenFree !== 999) userInfo.claims[props.id].free = chosenFree;
    if (chosenPremium !== 999)
      userInfo.claims[props.id].premium = chosenPremium;
    props.onClose();
  };

  return (
    <div className={styles.modal} onClick={props.onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h4 className={styles.modalTitle}>Choose your milestone rewards!</h4>
        </div>
        <div className={styles.modalBody}>
          {props.rewards.map((item, index) => {
            return (
              <>
                <div style={{ margin: '15px' }}>
                  <div
                    style={{
                      opacity:
                        props.premium &&
                        (index === chosenPremium || chosenPremium === 999) &&
                        props.premiumChosen === -1
                          ? '100%'
                          : '70%',
                      height: '6rem',
                      width: '6rem',
                      position: 'relative',
                    }}
                  >
                    <Reward
                      text={item.premium.name}
                      onClick={
                        props.premiumChosen === -1
                          ? () => setShowDetail(index)
                          : null
                      }
                    />
                    <img src={star} className={styles.premiumIcon} />
                    <img
                      src={lock}
                      className={styles.icon}
                      style={{
                        display:
                          props.premiumChosen === -1 ||
                          index === props.premiumChosen
                            ? 'none'
                            : 'block',
                      }}
                    />
                    <img
                      src={check}
                      className={styles.icon}
                      style={{
                        display:
                          props.premiumChosen === -1 ||
                          index !== props.premiumChosen
                            ? 'none'
                            : 'block',
                      }}
                    />
                    <RewardDetail
                      show={showDetail === index}
                      reward={item.premium}
                      onClose={() => setShowDetail(999)}
                      onClick={() => claimItem(item.id, 'premium', index)}
                    ></RewardDetail>
                  </div>

                  <br />
                  <div
                    style={{
                      opacity:
                        index === chosenFree || chosenFree === 999
                          ? '100%'
                          : '70%',
                    }}
                  >
                    <Reward
                      text={item.free.name}
                      onClick={
                        props.freeChosen === -1
                          ? () => setShowDetail(index + 3)
                          : null
                      }
                    />
                    <RewardDetail
                      show={showDetail === index + 3}
                      reward={item.free}
                      onClose={() => setShowDetail(999)}
                      onClick={() => claimItem(item.id, 'free', index)}
                    ></RewardDetail>
                    <img
                      src={lock}
                      className={styles.icon}
                      style={{
                        display:
                          props.freeChosen === -1 || index === props.freeChosen
                            ? 'none'
                            : 'block',
                      }}
                    />
                    <img
                      src={check}
                      className={styles.icon}
                      style={{
                        display:
                          props.freeChosen === -1 || index !== props.freeChosen
                            ? 'none'
                            : 'block',
                      }}
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.button} onClick={onClick}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default MilestoneModal;

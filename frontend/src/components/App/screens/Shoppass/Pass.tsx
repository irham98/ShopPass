import * as React from 'react';
import ProgressBar from '../../components/ProgressBar';
import styles from './styles.scss';
import Reward from '../../components/Reward';
import Level from './Level';
import lock from './lock.png';
import check from './validation.png';
import star from './star.png';
import Modal from './MilestoneModal';
import passInfo from './passInfo';
import mockUser from './userInfo';
import RewardDetail from './RewardDetail';
import consts from 'consts';

function Pass() {

  const [seasonInfo, setSeasonInfo] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);

  const premium = userInfo.premium;

  let unlocked = false;
  let to_claim_free = false;
  let to_claim_premium = false;

  const [claim, setClaim] = React.useState(0);

  const [show, setShow] = React.useState(0);

  const [showDetail, setShowDetail] = React.useState(0);

  const claimItem = (tier, type, index) => {
    setClaim(claim + 1);
    mockUser.claims[tier][type] = index;
  };
    React.useEffect(() => {
      let isMounted = true;
      await (async () => {
        try {
          const response = await get(`${consts.BACKEND_API}season?id=1`, {});

          const seasonJSON = response.data;
          if (isMounted && seasonJSON) setSeasonInfo(seasonJSON);
        } catch (error) {
          setSeasonInfo(seasonInfo);
        }
      })();

      (async () => {
        try {
          const response = await get(
            `${consts.BACKEND_API}user/data?id=1286742`,
            {}
          );

          const userInfoJSON = response.data;
          if (isMounted && userInfoJSON) {
            setUserInfo(userInfoJSON);
          }
        } catch (error) {
          setUserInfo(mock_user);
        }
      })();

      return () => {
        isMounted = false;
      };
    }, []);

  //   if (userInfo == null) setUserInfo(mock_user);

  //   if (seasonInfo == null) setSeasonInfo(mock_season_json);



  return (
    <div className={styles.pass}>
      {passInfo.tiers.map((item, index) => {
        unlocked = item.id <= mockUser.current_tier;
        to_claim_free = mockUser.claims[item.id].free < 0;
        to_claim_premium = mockUser.claims[item.id].premium < 0;

        return (
          <>
            {item.type !== 'milestone' ? (
              <div
                className={styles.passLevel}
                style={{ opacity: unlocked ? '100%' : '70%' }}
              >
                <>
                  <div className={styles.levelTile}>
                    <Level level={item.id} />
                  </div>
                  <div
                    className={styles.premium}
                    style={{
                      opacity:
                        premium && to_claim_premium && unlocked
                          ? '100%'
                          : '70%',
                    }}
                  >
                    <Reward
                      text={item.rewards[0].premium.name}
                      onClick={
                        premium && to_claim_premium && unlocked
                          ? () => setShowDetail(item.id)
                          : null
                      }
                    />
                    <img
                      src={lock}
                      className={styles.icon}
                      style={{ display: unlocked ? 'none' : 'block' }}
                    />
                    <img
                      src={check}
                      className={styles.icon}
                      style={{ display: to_claim_premium ? 'none' : 'block' }}
                    />
                    <img src={star} className={styles.premiumIcon} />
                    <RewardDetail
                      show={showDetail === item.id && unlocked}
                      reward={item.rewards[0].premium}
                      onClose={() => setShowDetail(0)}
                      onClick={() => claimItem(item.id, 'premium', 0)}
                    ></RewardDetail>
                  </div>
                  <div className={styles.progressBar}>
                    <ProgressBar filled={unlocked} />
                  </div>
                  {item.rewards[0].free.name !== '' ? (
                    <div
                      className={styles.free}
                      style={{
                        opacity: unlocked && to_claim_free ? '100%' : '70%',
                      }}
                    >
                      <Reward
                        text={item.rewards[0].free.name}
                        onClick={
                          unlocked && to_claim_free
                            ? () => setShowDetail(item.id)
                            : null
                        }
                      />
                      <img
                        src={lock}
                        className={styles.icon}
                        style={{ display: unlocked ? 'none' : 'block' }}
                      />
                      <img
                        src={check}
                        className={styles.icon}
                        style={{ display: to_claim_free ? 'none' : 'block' }}
                      />
                      <RewardDetail
                        show={showDetail === item.id && unlocked}
                        reward={item.rewards[0].free}
                        onClose={() => setShowDetail(0)}
                        onClick={() => claimItem(item.id, 'free', 0)}
                      ></RewardDetail>
                    </div>
                  ) : null}
                </>
              </div>
            ) : (
              <div
                className={styles.passLevel}
                style={{
                  opacity:
                    unlocked && (to_claim_free || to_claim_premium)
                      ? '100%'
                      : '70%',
                }}
              >
                <>
                  <div className={styles.levelTile}>
                    <Level level={item.id} />
                  </div>
                  <div className={styles.milestoneDiv}>
                    <button
                      className={styles.milestone}
                      onClick={() => setShow(item.id)}
                    >
                      Milestone!
                    </button>
                    <img
                      src={lock}
                      className={styles.icon}
                      style={{ display: unlocked ? 'none' : 'block' }}
                    />
                    <img
                      src={check}
                      className={styles.icon}
                      style={{
                        display:
                          to_claim_premium || to_claim_free ? 'none' : 'block',
                      }}
                    />
                    <Modal
                      rewards={item.rewards}
                      show={show === item.id && unlocked}
                      onClose={() => setShow(0)}
                      premium={premium}
                      premiumChosen={mockUser.claims[item.id].premium}
                      freeChosen={mockUser.claims[item.id].free}
                      id={item.id}
                    ></Modal>
                  </div>
                </>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}

export default Pass;

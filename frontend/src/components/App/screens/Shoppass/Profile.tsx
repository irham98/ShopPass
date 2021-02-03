/* eslint-disable react/prop-types */
import * as React from 'react';
import styles from './styles.scss';
import profile from './profile.png';
import userInfo from './userInfo';
import passInfo from './passInfo';

function Profile() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <>
        <div
          style={{
            marginBottom: '3rem',
          }}
        >
          <img src={profile} className={styles.profile} />
        </div>

        <div>
          <h2>Nick Nguyen</h2>
          <h3>Premium Pass Holder</h3>
          <h3>
            Season {passInfo.season} - Tier: {userInfo.current_tier}
          </h3>
          <h3>
            {userInfo.points} /{' '}
            {passInfo.tiers[userInfo.current_tier].threshold}
          </h3>
        </div>
      </>
    </div>
  );
}

export default Profile;

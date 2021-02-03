/* eslint-disable react/prop-types */
import * as React from 'react';
import styles from './styles.scss';

function Reward(props) {
    return (
        <>
        <button className={styles.button} onClick={props.onClick}>{props.text}</button>
        </>
    )
}

export default Reward;
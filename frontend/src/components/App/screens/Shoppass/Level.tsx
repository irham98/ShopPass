/* eslint-disable react/prop-types */
import * as React from 'react';
import styles from './styles.scss';
function Level(props){
    return (
        <div className={styles.level}>
            {props.level}
        </div>
    );
}

export default Level;
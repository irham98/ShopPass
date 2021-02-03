/* eslint-disable react/prop-types */
import * as React from 'react';

import styles from './styles.scss';

function ProgressBar(props){
    return(
        <div className={styles.container} style={{backgroundColor: props.filled ? 'green' : 'grey'}}>
        </div>
    )
}

export default ProgressBar;
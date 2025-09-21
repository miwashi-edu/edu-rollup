import React from 'react';
import styles from './BundleCss.module.css';


const BundleCss = () => {

    return (
        <div className={styles.boxDemo} role="region" aria-label="CSS box model demo">
            <div className={styles.boxDemoPadding}>
                <div className={styles.boxDemoContent}>CSS loaded using camel case✓</div>
            </div>
        </div>
    );
}

export default BundleCss;
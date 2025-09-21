import React from 'react';
import styles from './BundleCss.bem.module.css';

const BundleBem1Css = () => {
    return (
        <>
            <div className={styles.boxDemo} role="region" aria-label="CSS box model demo">
                <div className={styles.boxDemoPadding}>
                    <div className={styles.boxDemoContent}>CSS loaded using BEM✓</div>
                </div>
            </div>
        </>
    );
}

export default BundleBem1Css;
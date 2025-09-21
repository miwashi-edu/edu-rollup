import React from 'react';
import styles from './BundleCss.bem.module.css';


const BundleBem2Css = () => {

    return (
        <>
            <div className={styles['box-demo']} role="region" aria-label="CSS box model demo">
                <div className={styles['box-demo__padding']}>
                    <div className={styles['box-demo__content']}>CSS loaded using BEM as camel case✓</div>
                </div>
            </div>
        </>
    );
}
export default BundleBem2Css;
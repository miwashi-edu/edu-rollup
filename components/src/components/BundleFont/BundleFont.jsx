// BundleFont.jsx
import React, { useEffect, useState } from 'react';
import interWoff2 from './web/Inter-Regular.woff2';
import interTtf from './extras/ttf/Inter-Regular.ttf';
import interOtf from './extras/otf/InterDisplay-Regular.otf';
import style from './BundleFont.module.css';

export default function BundleFont() {
    const [ready, setReady] = useState({ woff2: false, otf: false, ttf: false });

    useEffect(() => {
        const faces = [
            { key: 'woff2', family: 'InterWoff2', src: `url(${interWoff2}) format('woff2')` },
            { key: 'otf',   family: 'InterOTF',   src: `url(${interOtf}) format('opentype')` },
            { key: 'ttf',   family: 'InterTTF',   src: `url(${interTtf}) format('truetype')` },
        ];

        faces.forEach(({ key, family, src }) => {
            const face = new FontFace(family, src, { weight: '400' });
            face.load()
                .then((loaded) => {
                    document.fonts.add(loaded);
                    setReady((r) => ({ ...r, [key]: true }));
                })
                .catch((err) => console.error(`[BundleFont:${key}]`, err));
        });
    }, []);

    return (
        <div className={style.container}>
            <p className={style.note}>
                Download from https://rsms.me/inter/download/
            </p>

            <div className={style.item}>
                <span className={style.label}>WOFF2</span>
                <p
                    className={style.sample}
                    style={{ fontFamily: ready.woff2 ? 'InterWoff2, system-ui' : 'system-ui' }}
                >
                    {ready.woff2 ? 'Inter (WOFF2) loaded.' : 'Loading WOFF2…'}
                </p>
            </div>

            <div className={style.item}>
                <span className={style.label}>OTF</span>
                <p
                    className={style.sample}
                    style={{ fontFamily: ready.otf ? 'InterOTF, system-ui' : 'system-ui' }}
                >
                    {ready.otf ? 'Inter (OTF) loaded.' : 'Loading OTF…'}
                </p>
            </div>

            <div className={style.item}>
                <span className={style.label}>TTF</span>
                <p
                    className={style.sample}
                    style={{ fontFamily: ready.ttf ? 'InterTTF, system-ui' : 'system-ui' }}
                >
                    {ready.ttf ? 'Inter (TTF) loaded.' : 'Loading TTF…'}
                </p>
            </div>
        </div>
    );
}

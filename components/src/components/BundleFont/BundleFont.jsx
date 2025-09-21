import React, { useEffect, useState } from 'react';
import interWoff2 from '../Inter.woff2';


export default function BundleFont() {
    const [ready, setReady] = useState(false);


    useEffect(() => {
        const face = new FontFace('DemoFace', `url(${interWoff2}) format('woff2')`, { weight: '400' });
        face.load().then((loaded) => {
            document.fonts.add(loaded);
            setReady(true);
        }).catch((err) => console.error('[BundleFont]', err));
    }, []);


    return (
        <p style={{ fontFamily: ready ? 'DemoFace, system-ui' : 'system-ui' }}>
            {ready ? 'Font loaded from JS import.' : 'Loading font…'}
        </p>
    );
}
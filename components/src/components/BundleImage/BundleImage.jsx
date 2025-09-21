import React from 'react';
import logo from '../logo.png';


export default function BundleImage() {
    return (
        <figure>
            <img src={logo} alt="bundled png" width="96" height="96" />
            <figcaption>PNG imported from JS.</figcaption>
        </figure>
    );
}
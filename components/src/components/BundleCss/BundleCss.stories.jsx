import React from 'react';
import {BundleCss, BundleBem1Css, BundleBem2Css} from ".";
import ErrorBoundary from './ErrorBoundary';
export default {
    title: 'Components/BundleCss',
    component: BundleCss,
}

export const Default = {

}

export const BEM_AsCameelCase = {
    render: () => <ErrorBoundary><BundleBem1Css /></ErrorBoundary>,
}

export const BEM_AsArray = {
    render: () => <BundleBem2Css />,
}
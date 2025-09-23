import './App.css'
import {BundleCss, BundleBem1Css, BundleBem2Css} from "./components/BundleCss";
import {BundleImage} from "./components/BundleImage";
import {BundleFont} from "./components/BundleFont";

function App() {
    return (
        <>
            <BundleCss />
            <BundleBem1Css />
            <BundleBem2Css />
            <BundleImage/>
            <BundleFont/>
        </>
    )
}

export default App

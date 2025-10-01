import './App.css'
import {BundleCss, BundleBem1Css, BundleBem2Css, BundleImage, BundleFont} from "./test-util/mock";
function App() {

  return (
    <>
        <BundleCss />
        <BundleBem1Css />
        <BundleBem2Css />
        <BundleImage />
        <BundleFont />
    </>
  )
}

export default App

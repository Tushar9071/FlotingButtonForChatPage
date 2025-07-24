import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import GenCDNPage from "./component/genCDN/genCDNPage";
import ChatNodePage from "./pages/chatnodepage";
// import Test from "./pages/formwidget";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GenCDNPage />} />
          <Route path="/chatnode" element={<ChatNodePage/>} />
          {/* <Route path="/test" element={<Test/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

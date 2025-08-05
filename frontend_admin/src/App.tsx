import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import GenCDNPage from "./component/genCDN/genCDNPage";
import ChatNodePage from "./pages/chatnodepage";
import FlowListPage from "./pages/flowListPage";
// import Test from "./pages/formwidget";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GenCDNPage />} />
          <Route path="/flows" element={<FlowListPage />} />
          <Route path="/chat-node" element={<ChatNodePage />} />
          <Route path="/chat-node/:id" element={<ChatNodePage />} />
          {/* <Route path="/test" element={<Test/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

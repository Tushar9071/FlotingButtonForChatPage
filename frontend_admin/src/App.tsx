import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GenCDNPage from "./component/genCDN/genCDNPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GenCDNPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// App.tsx
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import "./App.css";
import Chatbox from "./components/ui/chatbox";
import FloatingIcon from "./components/ui/floatingIcon";
import { useLayOutConfig } from "./context/layoutContext";
import Chatbox1_3 from "./components/ui1/ui1_3/chatbox1_3";
import Chatbox1_2 from "./components/ui1/ui1_2/chatbox1_2";
import Chatbox1_1 from "./components/ui1/ui1_1/chatbox1_1";
import Chatbox2_1 from "./components/ui2/ui2_1/chatbox2_1";
import Chatbox2_2 from "./components/ui2/ui2_2/chatbox2_2";
import Chatbox2_3 from "./components/ui2/ui2_3/chatbox2_3";
import Chatbox3_1 from "./components/ui3/ui3_1/chatbox3_1";
import Chatbox3_2 from "./components/ui3/ui3_2/chatbox3_2";
import Chatbox3_3 from "./components/ui3/ui3_3/chatbox3_3";
import Chatbox4_1 from "./components/ui4/ui4_1/chatbox4_1";
import Chatbox4_2 from "./components/ui4/ui4_2/chatbox4_2";
import Chatbox4_3 from "./components/ui4/ui4_3/chatbox4_3";
import Chatbox5_1 from "./components/ui5/ui5_1/chatbox5_1";
import Chatbox5_2 from "./components/ui5/ui5_2/chatbox5_2";
import Chatbox5_3 from "./components/ui5/ui5_3/chatbox5_3";
import Chatbox6_1 from "./components/ui6/ui6_1/chatbox6_1";
import Chatbox7_1 from "./components/ui7/ui7_1/chatbox7_1";
import Chatbox7_2 from "./components/ui7/ui7_2/chatbox7_2";
import Chatbox8_1 from "./components/ui8/ui8_1/chatbox8_1";
import Chatbox8_2 from "./components/ui8/ui8_2/chatbox8_2";
import Chatbox8_3 from "./components/ui8/ui8_3/chatbox8_3";
import Chatbox9_1 from "./components/ui9/ui9_1/chatbox9_1";
import Chatbox9_2 from "./components/ui9/ui9_2/chatbox9_2";
import Chatbox9_3 from "./components/ui9/ui9_3/chatbox9_3";
import Chatbox9_4 from "./components/ui9/ui9_4/chatbox9_4";

function App() {
  const { chatIconLayout } = useLayOutConfig();
  console.log(chatIconLayout);

  const [toggel, setToggle] = useState(false);

  return (
    <>
      {chatIconLayout.id === 1.1 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox1_1 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 1.2 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox1_2 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 1.3 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox1_3 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 2.1 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox2_1 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 2.2 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox2_2 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 2.3 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox2_3 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 3.1 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox3_1 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 3.2 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox3_2 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 3.3 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox3_3 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 4.1 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox4_1 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 4.2 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox4_2 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 4.3 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox4_3 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 5.1 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox5_1 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 5.2 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox5_2 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 5.3 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox5_3 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 6.1 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox6_1 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 7.1 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox7_1 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 7.2 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox7_2 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 8.1 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox8_1 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 8.2 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox8_2 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 8.3 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox8_3 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 9.1 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox9_1 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 9.2 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox9_2 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 9.3 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox9_3 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
      {chatIconLayout.id === 9.4 && (
        <>
          <AnimatePresence>
            {toggel && <Chatbox9_4 key={"chatbox"} />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}

      {chatIconLayout.id === 10 && (
        <>
          {" "}
          <AnimatePresence>
            {toggel && <Chatbox key="chatbox" />}
          </AnimatePresence>
          <FloatingIcon setToggle={setToggle} toggel={toggel} />
        </>
      )}
    </>
  );
}

export default App;

import { motion } from "framer-motion";
import { useLayOutConfig } from "../../../context/layoutContext";
import ChatOnWhatsapp from "../../chatOnWhatsapp";

const Chatbox8_2 = () => {
  const { chatBoxLayout } = useLayOutConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.1 }}
      className="fixed bottom-24 bg-transparent right-8">
      <div className="relative w-80 py-8 px-10 shadow-[0_15px_60px_0_#00000033] rounded-2xl  bg-white text-sm flex flex-col gap-5">
        <div>
          <img src={chatBoxLayout.brandImg} className="h-10"></img>
        </div>
        <div>
          <p className="break-words text-black font-medium">
            {chatBoxLayout.welcomeText?.split("\n").map((line) => {
              return (
                <span key={line}>
                  {line}
                  <br />
                </span>
              );
            })}
          </p>
        </div>
        <div className="w-full">
            <ChatOnWhatsapp radius="xl" justify="center"/>
        </div>
      </div>
    </motion.div>
  );
};

export default Chatbox8_2;

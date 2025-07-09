// import "./chatbox.css";
import background from "../../../assets/background.png";
import harshpatel from "../../../assets/harshpatel.png";
import priyapatel from "../../../assets/priyapatel.png";
import { motion } from "framer-motion";
import ChatHeader from "../../chatHeader";
import HorizontalUsers from "../../horizontalUsers";

const Chatbox4_1 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.1 }}
      className="fixed bottom-20 bg-transparent right-6 rounded-full">
      <div
        className={`sm:bottom-[70px] right-6 z-50 h-auto w-auto  rounded-2xl shadow-lg overflow-hidden`}>
        <ChatHeader />
        <div
          className={`w-full py-5 `}
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
          }}>
          <div className="flex flex-col items-center w-80  gap-2 rounded-lg">
            <HorizontalUsers
              image={harshpatel}
              name="Harsh Patel"
              profession="Software Engineer"
              status="Online"
            />
            
            <HorizontalUsers
              image={priyapatel}
              name="Priya Patel"
              profession="Software Engineer"
              status="Online"
            />
          </div>
        </div>
        <div className="w-full bg-white flex justify-center py-2">
          <p className="flex gap-1 text-xs text-[#6B7280] font-semibold">
            Powered by <span className="text-[#034737]">Liliya.io</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Chatbox4_1;

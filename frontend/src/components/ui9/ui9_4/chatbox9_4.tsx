// import "./chatbox.css";
import background from "../../../assets/background.png";
// import harshpatel from "../../assets/harshpatel.png";
// import priyapatel from "../../assets/priyapatel.png";
import { motion } from "framer-motion";
import liliya_logo from "../../../assets/liliya_logo.png";

const Chatbox9_4 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.1 }}
      className="fixed bottom-20 bg-transparent right-6 rounded-full">
      <div
        className={`sm:bottom-[70px] right-6 z-50 h-auto w-auto  rounded-2xl shadow-lg overflow-hidden`}>
        <nav className="flex items-center px-5 py-3 bg-brandBoxBgPrimary">
          <div className="flex flex-row gap-1.5 items-center">
            <img src={liliya_logo}></img>
            <p className="text-white font-semibold inline-block ">liliya.io</p>
          </div>
        </nav>
        <div
          className={`w-full py-4 `}
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
          }}>
          <div className="flex flex-col w-80  gap-4 rounded-lg px-5">
            {/* Left-aligned message */}
            <div className="flex justify-start flex-col max-w-60 gap-1.5">
              <div className="bg-white max-w-60 px-3 py-2 pb-5 rounded-md relative">
                <p className="text-sm">
                  Hi there 👋 <br />
                  How can I help you today?
                </p>{" "}
                <span className="text-[10px] text-gray-500 absolute bottom-1 right-2">
                  09:41 AM
                </span>
                <div className="absolute -left-2 top-3 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-white"></div>
              </div>
              <div className="flex gap-1.5">
                <button className="bg-[#F4FDE4] rounded-lg p-1.5 w-2/3 font-normal text-sm">
                  Chat with Us
                </button>
                <button className="bg-[#F4FDE4] rounded-lg p-1.5 w-1/3 text-sm font-normal">
                  Close
                </button>
              </div>
            </div>

            {/* Right-aligned message */}
            {/* <div className="flex justify-end">
              <div className="bg-[#d8fcd2] max-w-60 px-3 py-2 pb-5 rounded-md relative">
                <p className="text-sm mr-5">Hello</p>
                <span className="text-[10px] text-gray-500 absolute bottom-1 right-2">
                  09:42 AM
                </span>
                <div className="absolute -right-2 top-3 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-[#d8fcd2]"></div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="w-full bg-white flex justify-center py-2">
          <p className="flex gap-1 text-xs text-[#6B7280]">
            Powered by{" "}
            <span className="text-[#034737] font-medium">Liliya.io</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Chatbox9_4;

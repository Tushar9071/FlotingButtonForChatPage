// import "./chatbox.css";
import background from "../../../assets/background.png";
import harshpatel from "../../../assets/harshpatel.png";
import priyapatel from "../../../assets/priyapatel.png";
import { motion } from "framer-motion";
import HorizontalUsers from "../../horizontalUsers";

const Chatbox5_2 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.1 }}
      className="fixed bottom-20 bg-transparent right-6 rounded-full">
      <div
        className={`sm:bottom-[70px] right-6 z-50 h-auto w-auto  rounded-2xl shadow-lg overflow-hidden`}>
        <nav className="flex items-center px-5 py-3 bg-brandBoxBgPrimary justify-center flex-col">
          <p className="font-semibold text-white text-sm">Need support?</p>
          <p className="text-[#D1D5DB] text-xs">
            Click below to connect with our team instantly
          </p>
        </nav>
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
              isTrnsparent={true}
            />
            <HorizontalUsers
              image={priyapatel}
              name="Priya Patel"
              profession="Software Engineer"
              status="Online"
              isTrnsparent={true}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Chatbox5_2;

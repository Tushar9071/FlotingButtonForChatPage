// import "./chatbox.css";
import background from "../../../assets/background.png";
import EmmaImage from "../../../assets/EmmaAvatar.png";
import harshpatel from "../../../assets/harshpatel.png";
import priyapatel from "../../../assets/priyapatel.png";
import { motion } from "framer-motion";
import HorizontalUsers from "../../horizontalUsers";

const Chatbox6_1 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.1 }}
      className="fixed bottom-20 bg-transparent right-6 rounded-full">
      <div
        className={`sm:bottom-[70px] right-6 z-50 h-auto w-auto  rounded-2xl shadow-lg overflow-hidden`}>
        <div
          className={`w-full pt-3 pb-6`}
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
          }}>
          <div className="flex flex-col items-center w-80  gap-5 rounded-3xl">
            <nav className="flex items-center px-3   py-3 bg-brandBoxBgPrimary w-[90%] rounded-2xl">
              <button
                className="rounded-full w-10 h-10 bg-white ml-2 overflow-hidden"
                // onClick={() => toggel(false)}
              >
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={EmmaImage}
                  alt="Image"
                />
              </button>

              <div className="flex flex-col px-3 gap-[2px]">
                <h2 className="text-base text-white font-semibold">
                  Liliya Support
                </h2>
                <p className="text-xs text-gray-200 break-words">
                  Typically replies within a few minutes
                </p>
              </div>
            </nav>

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
        <div className="w-full bg-white flex justify-center py-2">
          <p className="flex gap-1 text-xs text-[#6B7280] font-semibold">
            Powered by <span className="text-[#034737]">Liliya.io</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Chatbox6_1;

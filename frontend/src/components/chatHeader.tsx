import EmmaImage from "../assets/EmmaAvatar.png";

const ChatHeader = () => {
  return (
    <>
      <nav className="flex items-center px-5 py-3 bg-brandBoxBgPrimary">
        <button className="rounded-full w-10 h-10 bg-white ml-2 overflow-hidden">
          <img className="h-full w-full" src={EmmaImage} alt="Image" />
        </button>
        <div className="flex flex-col px-5 gap-[2px]">
          <h2 className="text-base text-white font-semibold">Liliya Support</h2>
          <p className=" text-xs text-gray-200">AI Chatbot Assistant</p>
        </div>
      </nav>
    </>
  );
};

export default ChatHeader;

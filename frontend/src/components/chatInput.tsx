import { useState, useRef, useEffect } from "react";
const ChatInput = ({ sendButton = false }: { sendButton?: boolean }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="bottom-0 flex justify-center items-center">
      <div className="bg-white w-full rounded-full overflow-hidden flex items-center px-1 py-1 border border-[#E5E7EB]">
        <button className="mx-2 hover:bg-gray-200 h-7 w-7 rounded-full flex justify-center items-center duration-300 p-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="22"
            viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="#667085"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              color="#667085">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 15a5 5 0 0 0 4 2a5 5 0 0 0 4-2M8.009 9H8m8 0h-.009" />
            </g>
          </svg>
        </button>

        <div className="flex-grow flex items-center">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
            placeholder="Type a message"
            className=" flex items-center placeholder:text-gray-400 w-full resize-none overflow-hidden focus:outline-none placeholder:text-xs leading-none"
          />
        </div>

        {sendButton && (
          <button
            onClick={() => {
              console.log(message);
              setMessage("");
            }}
            className="ml-2 hover:bg-gray-200 h-7 w-7 rounded-full flex justify-center items-center duration-300 p-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16">
              <path
                // fill="#48C95F"
                className="fill-brandBoxBgSecondary"
                d="M1.724 1.053a.5.5 0 0 0-.714.545l1.403 4.85a.5.5 0 0 0 .397.354l5.69.953c.268.053.268.437 0 .49l-5.69.953a.5.5 0 0 0-.397.354l-1.403 4.85a.5.5 0 0 0 .714.545l13-6.5a.5.5 0 0 0 0-.894z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatInput;

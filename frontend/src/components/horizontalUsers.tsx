const HorizontalUsers = ({
  image,
  name,
  profession,
  status,
  isTrnsparent = false,
}: {
  image: string;
  name: string;
  profession: string;
  status: string;
  isTrnsparent?: boolean;
}) => {
  return (
    <>
      {isTrnsparent ? (
        <div className="h-[60px] w-[90%] bg-white/20 flex items-center justify-center rounded-lg px-3 cursor-pointer backdrop-blur-[1px] border border-white/30 p-4 border-l-4 rounded-tl-lg rounded-bl-lg border-l-brandBoxBgPrimary">
          <div className="rounded-full h-[40px] w-[40px] overflow-hidden">
            <img src={image} className="h-full w-full" />
          </div>
          <div className="w-[80%] px-5">
            <h4 className="text-sm">{name}</h4>
            <p className="text-xs text-gray-500">{profession}</p>
            <div className="flex flex-row items-center gap-1">
              <div className="w-[5px] h-[5px] bg-green-500 rounded-full"></div>
              <p className="text-xs text-green-500 ">{status}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[60px] w-[90%] bg-white flex items-center justify-center rounded-lg px-3 cursor-pointer">
          <div className="rounded-full h-[40px] w-[40px] overflow-hidden">
            <img src={image} className="h-full w-full" />
          </div>
          <div className="w-[80%] px-5">
            <h4 className="text-sm">{name}</h4>
            <p className="text-xs text-gray-500">{profession}</p>
            <div className="flex flex-row items-center gap-1">
              <div className="w-[5px] h-[5px] bg-green-500 rounded-full"></div>
              <p className="text-xs text-green-500 ">{status}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HorizontalUsers;

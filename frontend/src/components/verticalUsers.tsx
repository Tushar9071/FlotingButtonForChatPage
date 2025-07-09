const VerticalUsers = ({
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
        <div className="w-[35%] flex flex-col items-center justify-center rounded-lg px-3 py-2 cursor-pointer  bg-white/20 backdrop-blur-[1px] border border-white/30 p-4 border-t-4 rounded-tl-lg rounded-bl-lg border-t-brandBoxBgPrimary">
          <div className="rounded-full h-[40px] w-[40px] overflow-hidden mb-2">
            <img src={image} className="h-full w-full" />
          </div>
          <h4 className="text-sm font-medium">{name}</h4>
          <p className="text-xs text-gray-500 text-center">{profession}</p>
          <div className="flex flex-row items-center gap-1 mt-1">
            <div className="w-[5px] h-[5px] bg-green-500 rounded-full"></div>
            <p className="text-xs text-green-500">{status}</p>
          </div>
        </div>
      ) : (
        <div className="w-[35%] bg-white flex flex-col items-center justify-center rounded-lg px-3 py-2 cursor-pointer">
          <div className="rounded-full h-[40px] w-[40px] overflow-hidden mb-2">
            <img src={image} className="h-full w-full" />
          </div>
          <h4 className="text-sm font-medium">{name}</h4>
          <p className="text-xs text-gray-500 text-center">{profession}</p>
          <div className="flex flex-row items-center gap-1 mt-1">
            <div className="w-[5px] h-[5px] bg-green-500 rounded-full"></div>
            <p className="text-xs text-green-500">{status}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default VerticalUsers;

export default function ChatItem() {
  return (
    <li className="flex btn-ghost items-center p-2 py-3 rounded-md cursor-pointer gap-2">
      <div className="avatar">
        <div className="w-10 rounded-lg ">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="w-full flex justify-between ">
        <div className="flex flex-col justify-between">
          <h3 className="text-md font-semibold">Florencio Dorrance</h3>
          <p className="text-xs text-gray-500">Ok, see you later</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs text-gray-500">18:56</p>
          <p className="text-[10px] text-white bg-gray-500 rounded-full py-0.25 px-[0.3rem]">
            2
          </p>
        </div>
      </div>
    </li>
  );
}

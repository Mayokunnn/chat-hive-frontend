import ReactDOM from 'react-dom';
import useModal from '../hooks/useModal';

export default function ProfileModal() {
  const {handleShowModal} = useModal();
  return ReactDOM.createPortal(
    <dialog id="profile" className="modal">
      <div className="modal-box min-w-96 max-w-2xl min-h-96 max-h-4xl p-6">
        <div>
          <div className="flex gap-6 p-6 pb-3 cursor-pointer overflow-visible">
            <div className="avatar">
              <div className="w-24 rounded-lg ">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl font-semibold">Florencio Dorrance</h3>
              <h4 className="text-lg flex items-center gap-1 italic">
                @username
              </h4>
            </div>
          </div>
          <div className="divider"></div>
          <div className="p-6 pt-3">
            <h2 className="text-lg">Bio</h2>
            <p className="italic p-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aspernatur perspiciatis cupiditate similique, exercitationem cum ex minima numquam quod quos, vitae dolor temporibus iure autem tempore rem. Quis, ullam adipisci?</p>    
          </div>
          <div className="divider"></div>
          <ul className="space-y-5 flex flex-col justify-center px-5">
            <li className="">Set Chat Wallpaper</li>
            <li className="text-error cursor-pointer" onClick={() => handleShowModal('confirm')} >Block Conversation</li>
            <li className="text-error cursor-pointer" onClick={() => handleShowModal('confirm')} >Delete Conversation</li>
          </ul>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>,
    document.getElementById('root') // This is where the portal will render
  );
}

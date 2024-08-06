import useModal from '../hooks/useModal';
import { useConversation } from '../context/ConversationContext';
import Avatar from './Avatar';

export default function ProfileModal() {
  const {handleShowModal} = useModal();
  const {conversation} = useConversation()
  return (
    <dialog id="profile" className="modal">
      <div className="modal-box min-w-96 max-w-2xl min-h-96 max-h-4xl p-6">
        <div>
          <div className="flex gap-6 p-6 pb-3 cursor-pointer overflow-visible">
            <Avatar name={conversation?.name} image={conversation?.image} active={conversation?.active}/>
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl font-semibold">{conversation?.name}</h3>
              <h4 className="text-lg flex items-center gap-1 italic">
                @username
              </h4>
            </div>
          </div>
          <div className="divider"></div>
          <div className="p-6 pt-3">
            <h2 className="text-lg">Bio</h2>
            <p className="italic p-1">I am {conversation?.name}</p>    
          </div>
          <div className="divider"></div>
          <ul className="space-y-5 flex flex-col justify-center px-5">
            <li className="">Set Chat Wallpaper</li>
            <li className="text-error cursor-pointer" onClick={() => handleShowModal('block')} >Block Conversation</li>
            <li className="text-error cursor-pointer" onClick={() => handleShowModal('delete')} >Delete Conversation</li>
          </ul>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

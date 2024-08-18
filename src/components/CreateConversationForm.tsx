import { useConversation } from "../context/ConversationContext";
import { useConversations } from "../services/Conversations/useConversations";
import { useUsers } from "../services/Users/useUsers";
import { Conversation, UserResource } from "../utils/types";
import Avatar from "./Avatar";

interface Props {
  onCloseModal?: () => void;
}

export default function CreateConversationForm({ onCloseModal }: Props) {
  const { data: usersData, isLoading } = useUsers();
  const { conversations: conversationsData } = useConversations();
  const { data: conversations } = conversationsData;
  const { createConversationMutation } = useConversations();
  const { mutate, isSuccess } = createConversationMutation;

  const userId = localStorage.getItem("userId");

  // Get IDs of users that are part of existing conversations
  const conversationUserIds = conversations?.map((conversation: Conversation) => {
    return conversation.includes.users.map((user) => user.id);
  }).flat();

  // Filter users: Exclude logged-in user and users who already have a conversation
  const users = usersData?.filter((user) => 
    user.id !== Number(userId) && !conversationUserIds?.includes(user.id)
  );

  const handleCreateConversation = (data: UserResource) => {
    const newData = {
      user_ids: [Number(userId), data.id],
      name: data.name,
    };

    mutate(newData);

    isSuccess && onCloseModal?.();
  };

  return (
    <div className="space-y-2 w-full">
      <h3 className="font-bold text-xl">Search for a friend</h3>
      <input
        className="px-3 py-3 outline-none focus:outline-none bg-neutral rounded-md w-full mr-3 text-wrap"
        autoComplete="none"
        placeholder="Search"
      />

      {users?.length > 0 && <h2 className="m-1">Conversations</h2>}

      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <span className="loading loading-spinner text-secondary"></span>
        </div>
      ) : (
        <ul className="max-h-[400px] overflow-y-auto">
          {users && users.length > 0 ? (
            users.map((data, i) => (
              <li
                key={i}
                className="flex items-center p-2 py-3 hover:bg-neutral rounded-md cursor-pointer gap-2"
                onClick={() => handleCreateConversation(data)}
              >
                <Avatar
                  name={data.name}
                  image={data.image}
                  size="small"
                  active={!!data.active}
                />
                <div className="w-full flex justify-between">
                  <div className="flex flex-col justify-between">
                    <h3 className="text-md font-semibold">
                      {data.name}
                    </h3>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-xl text-center text-secondary font-semibold">
              Everyone is your friend right now
            </p>
          )}
        </ul>
      )}
    </div>
  );
}

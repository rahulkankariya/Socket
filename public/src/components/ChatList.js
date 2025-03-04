import { selectUser } from "../utils/helpers.js";

export function renderChatList(users) {
  const chatListContainer = document.createElement("div");
  chatListContainer.id = "chatList";

  if (!users || users.length === 0) {
    chatListContainer.innerHTML = `<p class="text-gray-500 p-3">No users available</p>`;
  } else {
    users.forEach((user) => {
      const userElement = document.createElement("div");
      userElement.className = "p-3 cursor-pointer border-b hover:bg-gray-200";
      userElement.textContent = `${user.first_name} ${user.last_name}`;
      userElement.dataset.user = `${user.first_name} ${user.last_name}`;
      userElement.addEventListener("click", () => selectUser(userElement.dataset.user));
      chatListContainer.appendChild(userElement);
    });
  }

  document.getElementById("userList").appendChild(chatListContainer);
}

import { renderChatSection } from "../components/ChatSection.js";
import { connectSocket,socket } from "../services/socket.js";

export function showChatUI(token) {
  renderChatSection();
  connectSocket(token);
}

export function selectUser(user) {
  document.getElementById("chatHeader").textContent = user;
  document.getElementById("chatSection").classList.remove("hidden");
}

export function displayMessage(message, side) {
  const chatBox = document.getElementById("chatBox");
  const newMessage = document.createElement("div");
  newMessage.className = `mb-2 p-2 rounded-lg w-max ${side === "right" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black"}`;
  newMessage.textContent = message;
  chatBox.appendChild(newMessage);
  chatBox.scrollTop = chatBox.scrollHeight;
}
export function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();

  if (!message) return;

  // ✅ Emit message to the server
  socket.emit("send-message", { message });

  // ✅ Append the message to the chat box
  const chatBox = document.getElementById("chatBox");
  const newMessage = document.createElement("div");
  newMessage.className = "mb-2 p-2 rounded-lg w-max bg-blue-500 text-white ml-auto";
  newMessage.textContent = message;

  chatBox.appendChild(newMessage);
  chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message

  input.value = ""; // Clear input after sending
}
export function renderChatSection() {
  document.getElementById("root").innerHTML = `
    <div class="w-full h-screen flex">
      <!-- Sidebar (User List) -->
      <div class="w-1/3 bg-gray-100 border-r overflow-y-auto h-full" id="userList"></div>

      <!-- Chat Section -->
      <div class="w-2/3 flex flex-col h-full" id="chatSection">
        <div class="bg-blue-500 p-4 text-white font-bold flex justify-between items-center">
          <span id="chatHeader">Select a User</span>
        </div>
        <div class="flex-1 p-4 overflow-y-auto" id="chatBox"></div>
        <div class="p-4 border-t flex">
          <input type="text" id="messageInput" class="flex-1 p-2 border rounded-lg" placeholder="Type a message..." />
          <button class="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg" id="sendMessageBtn">Send</button>
        </div>
      </div>
    </div>
  `;

  // ✅ Attach event listener AFTER the UI is rendered
  document.getElementById("sendMessageBtn").addEventListener("click", sendMessage);
  function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();
    
    if (!message) return;
  
    // ✅ Append the message to the chat box
    const chatBox = document.getElementById("chatBox");
    const newMessage = document.createElement("div");
    newMessage.className = "mb-2 p-2 rounded-lg w-max bg-blue-500 text-white ml-auto";
    newMessage.textContent = message;
  
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
  
    input.value = ""; // Clear input after sending
  }
  
}

import { useState, useEffect } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedChat = localStorage.getItem("codex_chat_history");
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    } else {
      // Default welcome message
      const initial = [
        { from: "bot", text: "Hi there! 👋" },
        { from: "bot", text: "I'm CodexBot. How can I help you today?" },
      ];
      setMessages(initial);
      localStorage.setItem("codex_chat_history", JSON.stringify(initial));
    }
  }, []);

  // Save chat history every time messages change
  useEffect(() => {
    localStorage.setItem("codex_chat_history", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    // Optional: send to backend
    try {
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMsg = { from: "bot", text: data.reply || "Sorry, I couldn’t get that." };
      setMessages([...newMessages, botMsg]);
    } catch (error) {
      setMessages([...newMessages, { from: "bot", text: "Error connecting to server." }]);
    }
  };

  const clearChat = () => {
    const initial = [
      { from: "bot", text: "Hi there! 👋" },
      { from: "bot", text: "Chat history cleared. How can I assist you?" },
    ];
    setMessages(initial);
    localStorage.setItem("codex_chat_history", JSON.stringify(initial));
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-pink-600 text-white p-4 rounded-full shadow-lg"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-lg rounded-2xl flex flex-col">
          <div className="bg-indigo-900 text-white p-3 rounded-t-2xl font-bold flex justify-between">
            <span>Hi there! 👋</span>
            <button onClick={clearChat} className="text-sm text-gray-200 hover:text-white">
              Clear
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`my-1 p-2 rounded-lg ${
                  msg.from === "bot" ? "bg-gray-200" : "bg-blue-500 text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-2 border-t flex">
            <input
              className="flex-1 border rounded-lg p-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question.."
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-600 text-white p-2 rounded-lg"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

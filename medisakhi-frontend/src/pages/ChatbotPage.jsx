import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PlusCircle, MessageSquare } from "lucide-react";

function ChatbotPage() {
  const location = useLocation();
  const autoSentRef = useRef(false);

  const [chats, setChats] = useState([
    {
      id: "default",
      title: "New Chat",
      messages: [
        {
          role: "assistant",
          content:
            "Hello! I'm **MediSakhi**, your AI healthcare assistant.\n\nHow can I help you today?",
        },
      ],
    },
  ]);

  const [activeChat, setActiveChat] = useState("default");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingReply, setTypingReply] = useState("");

  const currentChat = chats.find((c) => c.id === activeChat);

  // ➕ Create New Chat
  const createNewChat = (initialPrompt = null) => {
    const newChatId = Date.now().toString();

    const newChat = {
      id: newChatId,
      title: initialPrompt ? "Medicine Query" : "New Chat",
      messages: [
        {
          role: "assistant",
          content:
            "Hello! I'm **MediSakhi**, your AI healthcare assistant.\n\nHow can I help you today?",
        },
      ],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChatId);

    if (initialPrompt) {
      setTimeout(() => {
        sendMessage(initialPrompt, newChatId);
      }, 300);
    }
  };

  // ✅ Auto-create chat when coming from Medicine page
  useEffect(() => {
    if (location.state?.medicineName && !autoSentRef.current) {
      autoSentRef.current = true;

      const prompt = `Tell me about ${location.state.medicineName}.
Include uses, dosage, side effects, and precautions.`;

      createNewChat(prompt);
    }
  }, [location.state]);

  // 🧠 Send Message
  const sendMessage = async (text = input, chatId = activeChat) => {
    if (!text.trim()) return;

    const userMsg = { role: "user", content: text };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title:
                chat.title === "New Chat"
                  ? text.slice(0, 25)
                  : chat.title,
              messages: [...chat.messages, userMsg],
            }
          : chat
      )
    );

    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", {
        message: text,
      });

      typeEffect(res.data.reply, chatId);
    } catch {
      typeEffect("Sorry, something went wrong.", chatId);
    }
  };

  // ⌨ Typing Effect
  const typeEffect = (text, chatId) => {
    setTypingReply("");
    let index = 0;

    const interval = setInterval(() => {
      setTypingReply((prev) => prev + text.charAt(index));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
        finalizeReply(text, chatId);
      }
    }, 12);
  };

  // ✅ Finalize Assistant Reply
  const finalizeReply = (text, chatId) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { role: "assistant", content: text },
              ],
            }
          : chat
      )
    );
    setTypingReply("");
    setLoading(false);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">

      {/* SIDEBAR */}
      <div className="w-64 border-r bg-white p-4">

        <button
          onClick={() => createNewChat()}
          className="w-full flex items-center justify-center gap-2
                     bg-teal-600 text-white py-2 rounded-lg mb-4
                     hover:bg-teal-700 transition"
        >
          <PlusCircle size={18} />
          New Chat
        </button>

        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => setActiveChat(chat.id)}
            className={`w-full flex items-center gap-2 p-2 rounded mb-1 text-sm ${
              chat.id === activeChat
                ? "bg-teal-100 text-teal-800"
                : "hover:bg-slate-100"
            }`}
          >
            <MessageSquare size={16} className="text-teal-600" />
            <span className="truncate">{chat.title}</span>
          </button>
        ))}
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col bg-slate-50">

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {currentChat.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-xl p-4 rounded-lg ${
                msg.role === "user"
                  ? "ml-auto bg-teal-600 text-white"
                  : "bg-white shadow"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                msg.content
              )}
            </div>
          ))}

          {typingReply && (
            <div className="bg-white shadow p-4 rounded-lg max-w-xl">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {typingReply}
              </ReactMarkdown>
            </div>
          )}

          {loading && !typingReply && (
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <MessageSquare size={16} className="animate-pulse" />
              MediSakhi is thinking...
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="border-t bg-white p-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your health concern..."
            className="flex-1 border rounded-lg px-4 py-2"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={() => sendMessage()}
            className="bg-teal-600 text-white px-6 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatbotPage;
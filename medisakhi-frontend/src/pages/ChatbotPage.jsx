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
    const API_URL = import.meta.env.VITE_API_URL;

    const res = await axios.post(`${API_URL}/api/ai/chat`, {
      message: text,
    });

    typeEffect(res.data.reply, chatId);
  } catch (err) {
    console.error(err);
    typeEffect("Sorry, something went wrong.", chatId);
  }
};
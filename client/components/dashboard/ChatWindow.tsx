import axios from 'axios';
import { useState } from 'react';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

const ChatWindow: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async () => {
    // Make an API request to ChatGPT with the user's input
    const response = await axios.post('https://hiresafarijobs.com:3100/scrap/callChatGPT', { input });
    console.log(response)

    // Add the user's input and the response to the messages
    setMessages([...messages, { type: 'user', content: input }, { type: 'bot', content: response.data.output }]);

    // Clear the input field
    setInput('');
  };

  return (
    <div className="chat-window">
      {/* Render messages */}
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className={message.type}>
            {message.content}
          </div>
        ))}
      </div>

      {/* Input field and send button */}
      <div className="input-container">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;

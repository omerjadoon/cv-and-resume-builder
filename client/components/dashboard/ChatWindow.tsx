import axios from 'axios';
import { useState } from 'react';

import styles from './ChatWindow.module.scss';

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
    <div className={styles['chat-window']}>
      <h3>Chat GPT Assistant</h3>
      <p>Hello ! How can i assist you with your resume/career?</p>
      <br />
      {/* Render messages */}
      <div className={styles['message-container']}>
        {messages.map((message, index) => (
          <div key={index} className={styles[message.type]}>
            {message.content}
          </div>
        ))}
      </div>

      {/* Input field and send button */}
      <div className={styles['input-container']}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;

import { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.css';

const getQueryStringValue = (key) => {
  const search = window.location.search;

  let value = null;

  search.slice(1).split('&').forEach((chunk) => {
    const parts = chunk.split('=');

    if (parts[0] === key) {
      value = parts[1];
    }
  });

  return value;
}

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const chatId = useRef(getQueryStringValue('chat_id') || uuidv4());

  const getChatMessages = async () => {
    const response = await fetch(`http://localhost:8080/chat/${chatId.current}/messages`);
    const responseJson = await response.json();

    setMessages(responseJson.messages);
  };

  const onClickSendButton = async () => {
    const response = await fetch(`http://localhost:8080/chat/${chatId.current}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message,
      }),
    });

    const responseJson = await response.json();
    const userMessage = { text: message, senderType: 'USER' };

    setMessages([...messages, userMessage, responseJson.message]);
    console.log(messages)
    setMessage('');
  };

  const onChangeMessageInput = (event) => {
    setMessage(event.target.value);
  };

  const onKeyUpMessageInput = (event) => {
    if (event.code === 'Enter') {
      onClickSendButton();
    }
  };

  useEffect(() => {
    const queryStringChatId = getQueryStringValue('chat_id');

    if (queryStringChatId !== chatId.current) {
      window.location.replace(`${window.location.pathname}?chat_id=${chatId.current}`);
    }

    getChatMessages();
  }, [chatId]);

  return (
    <div className="container">
      <div className="message-list">
        {messages.map((message) => (
          <div className={`message ${message.senderType === "BOT" ? "message-bot" : "message-user"}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="footer">
        <input
          className="message-input"
          onChange={onChangeMessageInput}
          onKeyUp={onKeyUpMessageInput}
          value={message}
          style={{ flexGrow: 1 }}
        />
        <div
          className="send-button"
          onClick={onClickSendButton}
        >
          SEND
        </div>
      </div>
    </div>
  );
}

export default App;

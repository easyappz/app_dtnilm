import React, { useState, useRef, useEffect } from 'react';
import '../../styles/ChatWindow.css';

const ChatWindow = ({ chat, messages, isLoading, error, onSendMessage }) => {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  if (isLoading) {
    return <div className="chat-window loading">Загрузка сообщений...</div>;
  }

  if (error) {
    return <div className="chat-window error">Ошибка: {error.message}</div>;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-avatar">
          {chat.avatar ? (
            <img src={chat.avatar} alt={chat.name} />
          ) : (
            <div className="default-avatar">{chat.name.charAt(0)}</div>
          )}
        </div>
        <div className="chat-name">{chat.name}</div>
      </div>
      <div className="messages-area">
        {messages.length === 0 ? (
          <div className="no-messages">Нет сообщений</div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.isSentByMe ? 'sent' : 'received'}`}
            >
              <div className="message-text">{message.text}</div>
              <div className="message-time">{message.time}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-input-area">
        <input 
          type="text" 
          value={messageText} 
          onChange={(e) => setMessageText(e.target.value)} 
          onKeyPress={handleKeyPress}
          placeholder="Напишите сообщение..."
        />
        <button onClick={handleSend}>Отправить</button>
      </div>
    </div>
  );
};

export default ChatWindow;

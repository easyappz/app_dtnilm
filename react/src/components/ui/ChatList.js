import React from 'react';
import '../../styles/ChatList.css';

const ChatList = ({ chats, selectedChatId, onSelectChat }) => {
  return (
    <div className="chat-list">
      <h2>Чаты</h2>
      {chats.length === 0 ? (
        <p className="no-chats">Нет активных чатов</p>
      ) : (
        <ul>
          {chats.map((chat) => (
            <li 
              key={chat.id} 
              className={selectedChatId === chat.id ? 'selected' : ''}
              onClick={() => onSelectChat(chat)}
            >
              <div className="chat-avatar">
                {chat.avatar ? (
                  <img src={chat.avatar} alt={chat.name} />
                ) : (
                  <div className="default-avatar">{chat.name.charAt(0)}</div>
                )}
              </div>
              <div className="chat-info">
                <div className="chat-name">{chat.name}</div>
                <div className="chat-last-message">{chat.lastMessage || 'Нет сообщений'}</div>
              </div>
              {chat.unreadCount > 0 && (
                <div className="unread-badge">{chat.unreadCount}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;

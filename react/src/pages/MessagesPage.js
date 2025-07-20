import React, { useState, useEffect } from 'react';
import { useNavigate } from '../router';
import { useQuery } from '@tanstack/react-query';
import { instance } from '../api/axios';
import ChatList from '../components/ui/ChatList';
import ChatWindow from '../components/ui/ChatWindow';
import '../styles/MessagesPage.css';

const MessagesPage = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);

  // Fetch contacts/chats list
  const { data: chats = [], isLoading, error } = useQuery(
    ['chats'],
    async () => {
      const response = await instance.get('/api/chats');
      return response.data;
    },
    { staleTime: 60000 }
  );

  // Fetch messages for the selected chat
  const { data: messages = [], isLoading: messagesLoading, error: messagesError } = useQuery(
    ['messages', selectedChat?.id],
    async () => {
      if (!selectedChat) return [];
      const response = await instance.get(`/api/chats/${selectedChat.id}/messages`);
      return response.data;
    },
    { enabled: !!selectedChat, staleTime: 60000 }
  );

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = async (text) => {
    if (!selectedChat) return;
    try {
      await instance.post(`/api/chats/${selectedChat.id}/messages`, { text });
      // Refetch messages after sending
      // This could be optimized with a mutation and manual cache update
      // but keeping it simple for now
      // eslint-disable-next-line no-undef
      queryClient.invalidateQueries(['messages', selectedChat.id]);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleBack = () => {
    navigate('/feed');
  };

  if (isLoading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return <div className="error">Ошибка загрузки чатов: {error.message}</div>;
  }

  return (
    <div className="messages-page">
      <div className="messages-header">
        <button className="back-button" onClick={handleBack}>
          Назад
        </button>
        <h1>Сообщения</h1>
      </div>
      <div className="messages-container">
        <ChatList 
          chats={chats} 
          selectedChatId={selectedChat?.id} 
          onSelectChat={handleChatSelect} 
        />
        {selectedChat ? (
          <ChatWindow 
            chat={selectedChat} 
            messages={messages} 
            isLoading={messagesLoading} 
            error={messagesError} 
            onSendMessage={handleSendMessage} 
          />
        ) : (
          <div className="no-chat-selected">
            <p>Выберите чат, чтобы начать общение</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;

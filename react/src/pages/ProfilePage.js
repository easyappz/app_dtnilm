import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import '../styles/Profile.css';

const ProfilePage = () => {
  const user = {
    name: 'Иван Иванов',
    avatar: 'https://vk.com/images/camera_200.png',
    status: 'Онлайн',
    friends: 120,
    posts: 45,
  };

  return (
    <div className="vk-profile-container">
      <div className="vk-sidebar-left">
        <Card>
          <div className="vk-sidebar-item">Моя страница</div>
          <div className="vk-sidebar-item">Новости</div>
          <div className="vk-sidebar-item">Сообщения</div>
          <div className="vk-sidebar-item">Друзья</div>
          <div className="vk-sidebar-item">Сообщества</div>
        </Card>
      </div>
      <div className="vk-profile-content">
        <Card className="vk-profile-header">
          <img
            src={user.avatar}
            alt={user.name}
            className="vk-profile-avatar"
          />
          <div className="vk-profile-info">
            <h2 className="vk-profile-name">{user.name}</h2>
            <div className="vk-profile-status">{user.status}</div>
            <div className="vk-profile-stats">
              <div>Друзей: {user.friends}</div>
              <div>Записей: {user.posts}</div>
            </div>
            <Button variant="primary">Редактировать</Button>
          </div>
        </Card>
        <Card>
          <textarea
            className="vk-post-input"
            placeholder="Что у вас нового?"
          ></textarea>
          <button className="vk-post-submit">Опубликовать</button>
        </Card>
      </div>
      <div className="vk-sidebar-right">
        <Card>
          <div className="vk-sidebar-item">Рекомендации</div>
          <div className="vk-sidebar-item">Интересные страницы</div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;

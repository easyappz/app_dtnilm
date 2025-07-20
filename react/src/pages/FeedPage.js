import React from 'react';
import PostCard from '../components/ui/PostCard';
import Card from '../components/ui/Card';
import '../styles/Feed.css';

const mockPosts = [
  {
    id: 1,
    authorName: 'Иван Иванов',
    authorAvatar: '',
    date: 'сегодня в 14:30',
    text: 'Привет, друзья! Сегодня отличный день для прогулки.',
    image: 'https://picsum.photos/600/400',
  },
  {
    id: 2,
    authorName: 'Мария Петрова',
    authorAvatar: '',
    date: 'вчера в 18:45',
    text: 'Как вам новая книга? Поделитесь впечатлениями!',
    image: '',
  },
];

const FeedPage = () => {
  return (
    <div className="vk-feed-container">
      <div className="vk-sidebar-left">
        <Card>
          <div className="vk-sidebar-item">Моя страница</div>
          <div className="vk-sidebar-item">Новости</div>
          <div className="vk-sidebar-item">Сообщения</div>
          <div className="vk-sidebar-item">Друзья</div>
          <div className="vk-sidebar-item">Сообщества</div>
        </Card>
      </div>
      <div className="vk-feed-content">
        <Card>
          <textarea
            className="vk-post-input"
            placeholder="Что у вас нового?"
          ></textarea>
          <button className="vk-post-submit">Опубликовать</button>
        </Card>
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
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

export default FeedPage;

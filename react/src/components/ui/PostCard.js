import React from 'react';
import './PostCard.css';

const PostCard = ({ post }) => {
  return (
    <div className="vk-post-card">
      <div className="vk-post-header">
        <img
          src={post.authorAvatar || 'https://vk.com/images/camera_50.png'}
          alt={post.authorName}
          className="vk-post-avatar"
        />
        <div className="vk-post-info">
          <div className="vk-post-author">{post.authorName}</div>
          <div className="vk-post-date">{post.date}</div>
        </div>
      </div>
      <div className="vk-post-content">
        {post.text}
      </div>
      {post.image && (
        <div className="vk-post-image-container">
          <img src={post.image} alt="Post content" className="vk-post-image" />
        </div>
      )}
      <div className="vk-post-actions">
        <div className="vk-post-action">Нравится</div>
        <div className="vk-post-action">Комментировать</div>
        <div className="vk-post-action">Поделиться</div>
      </div>
    </div>
  );
};

export default PostCard;

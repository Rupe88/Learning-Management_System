# Learning Management System (LMS) Backend

## Overview

The Learning Management System (LMS) backend is a powerful and scalable API developed using modern technologies. This project includes advanced features such as token-based authentication, custom error handling, scheduled tasks, and user notifications. The backend is built with TypeScript, Node.js, Express.js, Redis, Upstash, Cloudinary, and more.

## Key Features

- **User Management**: Registration, login, profile management, role management, and token management.
- **Order Management**: Create and retrieve orders with role-based access control.
- **Notification System**: Create and update notifications, with automatic deletion after 30 days.
- **Layout Management**: Create and edit various layout types (Banner, FAQ, Categories).
- **Course Management**: Manage courses, including creation, updates, deletions, and content management.
- **Analytics**: Retrieve analytics for users, courses, and orders.
- **Security**: Token-based authentication with access and refresh tokens, and custom error handling.
- **Scheduled Tasks**: Use `node-cron` for periodic tasks such as notification cleanup.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side operations.
- **TypeScript**: Superset of JavaScript that adds static types.
- **Express.js**: Web framework for building RESTful APIs.
- **Redis**: In-memory data structure store for caching and session management.
- **Upstash**: Managed Redis-as-a-Service.
- **Cloudinary**: Media management for handling images and videos.
- **Node-cron**: For scheduling and managing periodic tasks.
- **MongoDB**: NoSQL database for persistent data storage.

## Installation and Setup

1. **Clone the Repository:**

   ```bash
   git clone <repository_url>
   cd server
   npm install
   npm run dev

2. **create .env file:**
 ```bash
PORT=8000
ORIGIN=['http://localhost:5173']
NODE_ENV=development
DB_URI=mongodb://127.0.0.1:27017/Learning-Management-System
CLOUD_NAME=<your_cloud_name>
CLOUD_API_KEY=<your_cloud_api_key>
CLOUD_SECRET_KEY=<your_cloud_secret_key>
REDIS_URL=<your_redis_url>
ACTIVATION_SECRET=<your_activation_secret>
ACCESS_TOKEN=<your_access_token>
REFRESH_TOKEN=<your_refresh_token>
ACCESS_TOKEN_EXPIRE=5
REFRESH_TOKEN_EXPIRE=3
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail
SMTP_MAIL=<your_smtp_mail>
SMTP_PASSWORD=<your_smtp_password>


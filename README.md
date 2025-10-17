# LeafAI – AI-Powered Bookstore (Backend)

LeafAI is a full-stack **AI-powered online bookstore** built using the MERN stack (MongoDB, Express, React, Node.js). It combines traditional e-commerce functionality with AI-driven features, providing readers with a modern, intelligent experience.

This repository contains the **backend** of LeafAI, handling authentication, book management, cart functionality, and AI summarization integration.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Architecture / Directory Structure](#architecture--directory-structure)
- [App Previews](#app-previews) 
- [Setup & Installation](#setup--installation)  
- [Environment Variables](#environment-variables)  
- [Running Locally](#running-locally)  
- [AI Integration](#ai-integration)    
- [Deployment](#deployment)  
- [Contributing](#contributing)  
- [License](#license)  
- [Acknowledgments](#acknowledgments)  

---

## Features

LeafAI backend supports:

- **Book Browsing & Storage**: CRUD operations for books with details, images, pricing, and availability.  
- **Smart Summaries**: Instant AI-generated book summaries via **DeepSeek R1** and **OpenRouter API**.  
- **AI-Powered Recommendations**: Suggests books based on user interests and reading history.  
- **Cart & Checkout**: Manage cart items, quantities, and live subtotal calculations.  
- **Authentication & User Context**: Secure signup/login system with hashed passwords (bcryptjs) and global state management on the frontend.  
- **Responsive & Modern Design**: Supports both desktop and mobile views (frontend).  
- **Scalable Backend**: Separate backend API, designed for cloud deployment.  

---

## Tech Stack

**Backend:**

- Node.js, Express.js  
- MongoDB, Mongoose  
- Authentication & Security: bcryptjs, JWT (if implemented)  
- Environment & Config: dotenv, CORS  

**Frontend (Integration):**

- React (Vite), TailwindCSS, React Router, Context API, Axios  

**AI Integration:**

- DeepSeek R1 via OpenRouter API for book summaries and recommendations  

**Deployment:**

- Backend: Render  
- Frontend: Vercel  

---

## Architecture / Directory Structure

Example backend structure:

```
LeafAI-Backend/
├── controllers/       # Request handlers
├── models/            # Mongoose schemas
├── routes/            # API endpoints
├── middleware/        # Auth, error handling, logging
├── utils/             # Helper functions
├── app.js             # Entry point
├── config.js          # DB and external API configs
├── package.json
├── .env               # Environment variables
└── README.md
```

---

## App Previews

### 🏠 Book Details with AI Summary Button
<img width="1366" height="768" alt="Screenshot (352)" src="https://github.com/user-attachments/assets/65b3debf-4115-4989-9e64-893dbc7d03bc" />


### 📚 AI Book Summary 
<img width="1366" height="768" alt="Screenshot (351)" src="https://github.com/user-attachments/assets/13d9f40f-12ae-434f-84cb-c6b33fd35dfa" />


### Mood Based AI Recommendation
<img width="1366" height="768" alt="Screenshot (353)" src="https://github.com/user-attachments/assets/89a1ce07-9d55-4dd4-8e3d-7a26001d5ba7" />
#### Our AI can also show the books that are not available on the store
<img width="1366" height="768" alt="" src="https://github.com/user-attachments/assets/348fa1f1-a872-4089-be07-706bdb951391" />


---

## Setup & Installation

1. **Clone the repository**

```bash
git clone https://github.com/ShahShelby7/LeafAI-Backend.git
cd LeafAI-Backend
```

2. **Install dependencies**

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
OPENROUTER_API_KEY=<your_openrouter_api_key>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<if using Cloudinary>
CLOUDINARY_API_KEY=<if using Cloudinary>
CLOUDINARY_API_SECRET=<if using Cloudinary>
```

> Replace values with your credentials.

---

## Running Locally

```bash
npm run dev
```

Server should start at `http://localhost:5000`.

---

## AI Integration

LeafAI uses **DeepSeek R1** via OpenRouter API to generate **smart summaries** for books:

- Users can view concise, human-like summaries instantly.  
- Summaries can be requested through API endpoints exposed by this backend.  
- Makes browsing and selecting books faster and more efficient.  

---

## Deployment

- **Backend** deployed on **Render**: handles API requests, DB operations, and AI requests.  
- **Frontend** deployed on **Vercel**: React app consumes backend API for full functionality.  

---

## Contributing

We welcome contributions! Steps:

1. Fork the repo  
2. Create a feature branch: `git checkout -b feature/YourFeature`  
3. Make your changes  
4. Commit: `git commit -m "Add feature"`  
5. Push: `git push origin feature/YourFeature`  
6. Open a Pull Request  

---

## License

Specify your license here (e.g., MIT License).  

---

## Acknowledgments

- Inspired by modern e-commerce platforms  
- AI integration powered by DeepSeek R1  
- Built using MERN stack best practices  
- Special thanks to OpenRouter API and open-source contributors  

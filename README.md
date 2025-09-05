# 📱 Fullstack Todo App  
React Native (Expo) + Node.js (Express) + MongoDB Atlas  

A simple fullstack Todo app that demonstrates CRUD operations with a React Native frontend, Node.js backend, and MongoDB Atlas database.  

---

## 🚀 Features  
- Add, toggle, and delete todos  
- Backend with Express + Mongoose  
- Cloud database (MongoDB Atlas)  
- Mobile app with React Native + Expo  
- Docker support (optional local MongoDB)  

---

## 📦 Tech Stack  
- **Frontend**: React Native (Expo)  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB Atlas (or local via Docker)  
- **ORM**: Mongoose  

---

## 🏗️ Architecture  

```mermaid
flowchart TD
    A[📱 React Native App] -->|HTTP Requests| B[🌐 Express Server]
    B -->|CRUD via Mongoose| C[(🍃 MongoDB Atlas)]
    C -->|Data Response| B -->|JSON Response| A

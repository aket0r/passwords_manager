
# 🛡️ Passwords Manager 3.0.5-beta

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Electron-blue" />
  <img src="https://img.shields.io/badge/Node.js-18.x-green" />
  <img alt="Static Badge" src="https://img.shields.io/badge/Status-beta-orange">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" />
  <img alt="Static Badge" src="https://img.shields.io/badge/MongoDB-integrated-success">
  <img src="https://img.shields.io/badge/SCSS-29.7%25-blue">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

A secure and minimalistic password manager with MongoDB backend and support for offline mode and Telegram integration.

> ⚠️ **Note**: Starting from version `3.0.5-beta`, the app now uses **MongoDB** as the primary storage. Local JSON files are no longer used.

---

## 🚀 What's New in 3.0.5-beta

- 🧩 Migration to MongoDB backend
- 🛠️ Refactored user registration interface and logic
- 🐞 Fixed registration-blocking bugs
- 📦 Removed JSON file dependencies (`passwords.json`, `settings.json`, etc.)
- 📝 Added detailed setup guide for integrating Telegram Bot notifications

---

## 💡 Features

- 🔒 MongoDB-based local password storage
- 🔍 Search by title or login
- ⚙️ Add, edit, delete entries easily
- 🧪 Optional Telegram notifications
- 🖥️ Cross-platform (Windows, Linux, macOS)

---

## 📁 Project Structure

```bash
📁 passwords-manager/
├── index.html               # Main GUI
├── loading.html             # Pre-launch checker
├── *.js                     # JavaScript files
├── /icon                    # Icons
├── /style                   # Responsive styles
```

---

## 🧱 Technology Stack

- Electron + Node.js (fs, path, os)
- MongoDB (via `mongodb` Node.js driver)
- node-telegram-bot-api
- Vanilla JavaScript, HTML, SCSS/CSS

---

<div align="center">

## ⚙️ Installation and Run

</div>

### 1. Clone the repository

```bash
git clone https://github.com/aket0r/passwords_manager.git
cd passwords_manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install and run MongoDB

> You need to install and run MongoDB locally. Use [MongoDB Community Edition](https://www.mongodb.com/try/download/community).

Start MongoDB with:

```bash
mongod
```

> ⚠️ Make sure MongoDB is running before starting the app.

---

### Launch in development mode

```bash
npm start
```

### Build distributable

```bash
# Windows
npm run build-win

# Linux
npm run build-linux

# macOS
npm run build-mac
```

---

## 📩 Telegram Integration

> A Telegram bot integration is available. You’ll need a bot token from [@BotFather](https://t.me/BotFather).

Setup instructions are included in the GUI after registration.

---

## 📸 Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/2f95e891-cc99-4916-b327-0837de2a4c5c" width="350" />
  <img src="https://github.com/user-attachments/assets/61f90a6d-8e1c-4ba8-b4ff-bd84907703ef" width="350" />
  <img src="https://github.com/user-attachments/assets/ee47b54e-a339-4a20-8bfd-c2c23e49d3d7" width="350" />
  <img src="https://github.com/user-attachments/assets/5b0993b4-c36e-4da4-bce2-3faaaab354ef" width="350" />
  <img src="https://github.com/user-attachments/assets/5fc81f15-bfd2-4818-b91c-d54c6a32bfef" width="350" />
</p>

---

## 📜 License

This project is licensed under the MIT License.

# 🛡️ Passwords Manager 3.0.5-beta (MongoDB)

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Electron-blue" />
  <img src="https://img.shields.io/badge/Node.js-18.x-green" />
  <img alt="Static Badge" src="https://img.shields.io/badge/Status-100%25%20complete-green">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" />
  <img alt="Static Badge" src="https://img.shields.io/badge/SCSS-29.7%25-blue">
  <img alt="Static Badge" src="https://img.shields.io/badge/Languages-6-blue">
  <img src="https://img.shields.io/badge/MongoDB-4ea94b?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white" />
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white" />
  <img src="https://img.shields.io/badge/Less-1D365D?style=for-the-badge&logo=less&logoColor=white" />
  <img src="https://img.shields.io/badge/bat-4D4D4D?style=for-the-badge&logo=windows&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS-264de4?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4ea94b?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

<p align="center"><b>Minimalist password manager with offline local storage and optional Telegram integration.</b></p>




---

## ⚠️ Важно:

> Версия `3.0.5-beta` использует **MongoDB** вместо файлов JSON.
>
> Убедитесь, что MongoDB установлена и запущена локально перед запуском приложения.
>
> **Обычные пользователи:** просто установите MongoDB и запустите приложение.
>
> **Разработчики:** следуйте инструкциям ниже для запуска MongoDB и подключения.

```bash
# Пример установки MongoDB (на Windows)
choco install mongodb

# Запуск MongoDB вручную (если не как сервис)
mongod --dbpath C:/data/db
```

---
## 🚀 Новое в версии 3.0

- 🧪 Добавлен загрузочный экран `loading.html`:
  - Проверка наличия файлов до запуска GUI
  - Поддержка путей: `Documents` и `OneDrive/Documents`
  - Автоматическое создание недостающих файлов
- 🎨 Улучшены стили:
  - Поддержка высоких DPI
  - Адаптация под разные экраны
  - Улучшено масштабирование элементов

---

## ⚙️ Основные возможности

- 📁 Хранение паролей в локальном JSON-файле
- 🔍 Поиск по названию или логину
- 🛠️ Добавление, редактирование и удаление записей
- 🧪 Поддержка Telegram-уведомлений (опционально)
- 🖥️ Поддержка Windows, Linux и macOS
- 💾 Все данные хранятся в `Documents/passwords_data`

---

## 📁 Структура проекта

```bash
📁 passwords-manager/
├── index.html               # Основной интерфейс
├── loading.html             # Проверка перед запуском
├── *.js                     # Скрипты приложения
├── /icon                    # Иконки
├── /style                   # CSS-оформление
└── /Documents/passwords_data/
    ├── user.json
    ├── passwords.json
    ├── settings.json
    └── logs.json
```

---

## 🧱 Используемые технологии

- Electron
- Node.js (fs, os, path)
- node-telegram-bot-api
- Vanilla JS, HTML, CSS

---

<div align="center"><h2>⚙️ Установка и запуск</h2></div>

### 📥 Клонирование репозитория

```bash
git clone https://github.com/aket0r/passwords_manager
cd passwords_2_7_5
```

### 📦 Установка зависимостей

```bash
npm install
npm i safe-regex-test
npm i fs
npm i os
npm i node-telegram-bot-api
npm i electron
npm i electron-packager
npm i electron --save
```

> Или используйте файл `init-modules.cmd` для быстрой установки

📥 Готовый релиз доступен [в разделе Release](https://github.com/aket0r/passwords_2_7_5/releases/tag/Download)

---

## 📩 Telegram-интеграция

> Интеграция с Telegram уже реализована, но доступна в отдельных версиях.  
> Используйте [@BotFather](https://t.me/BotFather) для создания бота и укажите токен.

---

## 🧪 Разработка и сборка

### ▶️ Запуск в dev-режиме

```bash
npm start
```

### 📦 Сборка дистрибутива

```bash
# Для Windows
npm run build-win

# Для Linux
npm run build-linux

# Для macOS
npm run build-mac
```

---

<div align="center"><h2>📸 Скриншоты</h2></div>

<p align="center">
  <img src="https://github.com/user-attachments/assets/2f95e891-cc99-4916-b327-0837de2a4c5c" width="350" />
  <img src="https://github.com/user-attachments/assets/61f90a6d-8e1c-4ba8-b4ff-bd84907703ef" width="350" />
  <img src="https://github.com/user-attachments/assets/ee47b54e-a339-4a20-8bfd-c2c23e49d3d7" width="350" />
  <img src="https://github.com/user-attachments/assets/5b0993b4-c36e-4da4-bce2-3faaaab354ef" width="350" />
  <img src="https://github.com/user-attachments/assets/5fc81f15-bfd2-4818-b91c-d54c6a32bfef" width="350" />
  <img src="https://img.shields.io/badge/MongoDB-4ea94b?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

---

## 📜 Лицензия

MIT License © [aket0r](https://github.com/aket0r)

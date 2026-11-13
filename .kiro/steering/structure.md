# Project Structure

## Overview

SleepyCat — простое Electron-приложение с плоской структурой.

## Directory Organization

```
.
├── .kiro/              # Kiro configuration and steering rules
│   └── steering/       # AI assistant guidance documents
├── main.js             # Electron main process
├── index.html          # UI markup
├── style.css           # Styles for transparent window and cat
├── cat.js              # Cat behavior and animation logic
├── package.json        # Project configuration
└── README.md           # Installation and usage instructions
```

## Conventions

- Плоская структура — все файлы в корне проекта
- main.js — главный процесс Electron
- index.html, style.css, cat.js — рендер-процесс
- Никаких дополнительных папок для прототипа

## File Naming

- kebab-case для файлов (main.js, cat.js)
- camelCase для переменных в JavaScript
- Русский язык в README.md, английский в коде

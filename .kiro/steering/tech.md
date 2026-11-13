# Technology Stack

## Build System

- electron-builder для создания дистрибутивов

## Languages & Frameworks

- Node.js + Electron
- Vanilla JavaScript (без React/TypeScript)
- HTML + CSS

## Key Libraries

- electron (runtime)
- electron-builder (build tool)

## Common Commands

### Development
```bash
# Install dependencies
npm install

# Start development
npm start

# Build for production
npm run dist
```

## Development Guidelines

- Только ванильный JavaScript, никаких фреймворков
- Минимум зависимостей — только Electron и electron-builder
- Код и комментарии на английском, README на русском
- Вся анимация через requestAnimationFrame
- Кроссплатформенность: один код для Windows и macOS

const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

let mainWindow;
let settingsWindow = null;
let clickThroughEnabled = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');

  // Toggle click-through with Ctrl+Shift+C
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.shift && input.key.toLowerCase() === 'c') {
      clickThroughEnabled = !clickThroughEnabled;
      mainWindow.setIgnoreMouseEvents(clickThroughEnabled, { forward: true });
      console.log('Click-through mode:', clickThroughEnabled ? 'enabled' : 'disabled');
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function openSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.focus();
    return;
  }

  settingsWindow = new BrowserWindow({
    width: 350,
    height: 250,
    frame: true,
    resizable: false,
    alwaysOnTop: true,
    parent: mainWindow,
    modal: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  settingsWindow.loadFile('settings.html');
  settingsWindow.setMenuBarVisibility(false);

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
}

// Handle context menu request from renderer
ipcMain.on('show-context-menu', (event) => {
  const template = [
    {
      label: '⏱️ Таймер 1 минута',
      click: () => { mainWindow.webContents.send('start-timer', 1, 'Пора отдохнуть!'); }
    },
    {
      label: '⏱️ Таймер 5 минут',
      click: () => { mainWindow.webContents.send('start-timer', 5, 'Пора отдохнуть!'); }
    },
    {
      label: '⏱️ Таймер 10 минут',
      click: () => { mainWindow.webContents.send('start-timer', 10, 'Пора отдохнуть!'); }
    },
    {
      label: '⏱️ Таймер 25 минут (Pomodoro)',
      click: () => { mainWindow.webContents.send('start-timer', 25, 'Пора отдохнуть!'); }
    },
    { type: 'separator' },
    {
      label: '⚙️ Свой таймер...',
      click: () => { openSettingsWindow(); }
    },
    { type: 'separator' },
    {
      label: '🔄 Сбросить таймер',
      click: () => { mainWindow.webContents.send('reset-timer'); }
    },
    { type: 'separator' },
    {
      label: '❌ Закрыть',
      click: () => { app.quit(); }
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  menu.popup(BrowserWindow.fromWebContents(event.sender));
});

// Handle custom timer from settings window
ipcMain.on('start-custom-timer', (event, minutes, message, action) => {
  mainWindow.webContents.send('start-timer', minutes, message, action);
  if (settingsWindow) {
    settingsWindow.close();
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

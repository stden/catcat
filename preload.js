const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  showContextMenu: () => ipcRenderer.send('show-context-menu'),
  onStartTimer: (callback) => ipcRenderer.on('start-timer', (event, minutes, message, action) => callback(minutes, message, action)),
  onResetTimer: (callback) => ipcRenderer.on('reset-timer', () => callback()),
  startCustomTimer: (minutes, message, action) => ipcRenderer.send('start-custom-timer', minutes, message, action)
});

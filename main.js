const { app, BrowserWindow, ipcMain, screen } = require('electron')

function createWindow () {
  const { width, height } = screen.getPrimaryDisplay().size

  const win = new BrowserWindow({
    width: width,
    height: height,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.setIgnoreMouseEvents(true, { forward: true })
  win.loadFile('index.html')

  ipcMain.on('set-ignore-mouse-events', (event, ignore) => {
    const webContents = event.sender
    const currentWin = BrowserWindow.fromWebContents(webContents)
    if (currentWin) {
        currentWin.setIgnoreMouseEvents(ignore, { forward: true })
    }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

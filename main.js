const { app, BrowserWindow, ipcMain, screen } = require('electron')
const path = require('path')

function createWindow () {
  // Ekranın tam boyutlarını al
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  const win = new BrowserWindow({
    width: width,
    height: height,
    transparent: true, // Şeffaf arka plan
    frame: false,      // Çerçevesiz
    alwaysOnTop: true, // Her zaman üstte
    skipTaskbar: true, // Görev çubuğunda görünmesin (tam maskot hissi)
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // Başlangıçta tüm pencereyi tıklamalara karşı "Geçirgen" yap (Arkaya tıklansın)
  win.setIgnoreMouseEvents(true, { forward: true })

  win.loadFile('index.html')

  // index.html'den gelen sinyale göre farenin geçirgenliğini aç/kapat
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

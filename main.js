const { app, BrowserWindow, ipcMain, screen } = require('electron')

function createWindow () {
  // Ekranın tam çözünürlüğünü al (Uçtan uca, görev çubuğu dahil)
  const { width, height } = screen.getPrimaryDisplay().size

  const win = new BrowserWindow({
    width: width,
    height: height,
    transparent: true, // Şeffaf arka plan
    frame: false,      // Çerçevesiz tasarım
    alwaysOnTop: true, // Her zaman en üstte
    skipTaskbar: true, // Alt görev çubuğunda simgesi gizli kalır
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  // Başlangıçta tüm pencereyi tıklamalara karşı "Geçirgen" yap
  win.setIgnoreMouseEvents(true, { forward: true })

  win.loadFile('index.html')

  // HTML'den gelen sinyalle farenin arkaya tıklamasını aç/kapat
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

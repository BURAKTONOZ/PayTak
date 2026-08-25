const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    transparent: true, // Şeffaf arka plan
    frame: false,      // Çerçevesiz (Kapatma, küçültme tuşları yok)
    alwaysOnTop: true, // Her zaman açık olan pencerelerin üstünde kalır
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

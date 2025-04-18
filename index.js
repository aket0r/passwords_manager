const path = require("path");
const url = require("url");
const { app, BrowserWindow, Menu, Tray, ipcMain } = require("electron");
const fs = require("fs");
const os = require("os");

let mainWindow = null;
let loadingWindow = null;
let appTray = null;
let forceQuit = false;

const config = {
    app: {
        name: "Passwords Manager",
        ver: "3.0"
    }
};

const trayMenuTemplate = [
    {
        label: "Выйти",
        click: () => {
            forceQuit = true;
            app.quit();
        }
    }
];

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    app.on("second-instance", () => {
        if (mainWindow) {
            if (!mainWindow.isVisible()) mainWindow.show();
            mainWindow.focus();
        }
    });
}

function createTray() {
    const trayIcon = path.join(__dirname, "icon", "icon.ico");
    appTray = new Tray(trayIcon);
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    appTray.setToolTip(`${config.app.name} v${config.app.ver}`);
    appTray.setContextMenu(contextMenu);

    appTray.on("click", () => {
        if (!mainWindow) {
            createMainWindow();
            return;
        }

        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    });
}

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        show: false,
        autoHideMenuBar: true,
        icon: path.join(__dirname, "icon", "icon.ico"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "index.html"),
            protocol: "file:",
            slashes: true
        })
    );

    mainWindow.maximize();
    mainWindow.removeMenu();
    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    });

    mainWindow.on("close", (e) => {
        if (!forceQuit) {
            e.preventDefault();
            mainWindow.hide();
        }
    });
}

function createLoadingWindow() {
    loadingWindow = new BrowserWindow({
        width: 600,
        height: 300,
        resizable: false,
        frame: false,
        autoHideMenuBar: true,
        icon: path.join(__dirname, "icon", "icon.ico"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    loadingWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "loading.html"),
            protocol: "file:",
            slashes: true
        })
    );

    loadingWindow.on("closed", () => {
        loadingWindow = null;
    });
}

ipcMain.on("loading-complete", () => {
    if (loadingWindow) {
        loadingWindow.close();
        loadingWindow = null;
    }

    createMainWindow();
    createTray();
});

app.whenReady().then(createLoadingWindow);

app.on("window-all-closed", () => {});

app.on("before-quit", () => {
    forceQuit = true;
});

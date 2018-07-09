/* jshint esversion: 6 */

const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const remote = electron.remote;
const axios = require('axios');
const $ = require('jquery');
const ipc = electron.ipcRenderer;

const notifyVal = $('#notifyVal')[0];
const updateBtn = $('#updateBtn')[0];

const addWin = electron.remote.getCurrentWindow();

addWin.setOpacity(0.85);
addWin.setTitle('Notification Settings');
addWin.setAlwaysOnTop(true);

updateBtn.addEventListener('click', function() {
	ipc.send('update-notify-value', $('#notifyVal')[0].value);
	remote.getCurrentWindow().close();
});
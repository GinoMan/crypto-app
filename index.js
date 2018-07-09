/* jshint esversion: 6 */

const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const ipc = electron.ipcRenderer;
const axios = require('axios');
const $ = require('jquery');

const notifyBtn = $('#notifyBtn')[0];

const notification = {
	title: 'BTC Alert',
	body: 'BTC just beat your target price!',
	icon: path.join(__dirname, '../assets/images/btc.png')
};

var price = $('h1#price')[0];
var targetPrice = $('#targetPrice')[0];
var targetPriceVal;

function getBTC() {
	axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD').then(res => {
		const cryptos = res.data.BTC.USD;
		price.innerHTML = '$' + cryptos.toFixed(2);

		if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
			const myNotification = new window.Notification(notification.title, notification);
			targetPrice.innerHTML = '$' + targetPriceVal.toFixed(2) + ' Reached!';
		}
	});
}

notifyBtn.addEventListener('click', function(event) {
	const modalPath = path.join('file://', __dirname, 'add.html');
	let win = new BrowserWindow({ maximizable: false, minimizable: false, width: 400, height: 200, title: "Notify me...", transparent: true });
	win.on('close', function() { win = null; });
	win.setMenuBarVisibility(false);
	win.loadURL(modalPath);
	win.show();
});

ipc.on('targetPriceVal', function(event, arg) {
	targetPriceVal = Number(arg);
	targetPrice.innerHTML = '$' + targetPriceVal.toFixed(2);
});

getBTC();
setInterval(getBTC, 10000);
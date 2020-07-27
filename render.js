window.onload = function() {
	//Require the module
	const ElectronTitlebarWindows = require('electron-titlebar-windows');
	const { remote } = require('electron');

	//Create the title bar
	const titlebar = new ElectronTitlebarWindows({draggable: true, backgroundColor: '#202225'});

	//Append title bar to page
	titlebar.appendTo(document.getElementById("titleBar"));

	//Set event listeners
	win = remote.getCurrentWindow()
	titlebar.on('close', e => {
	    win.close();
	});
	titlebar.on('fullscreen', e => {
	    win.maximize();
	});
	titlebar.on('maximize', e => {
	    win.unmaximize();
	});
	titlebar.on('minimize', e => {
	    win.minimize();
	});
};
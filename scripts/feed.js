//Function changes the feed background to loading gif
function loading() {
	$('#feed').prop('src', 'images/loading.gif');
}

//Function changes feed background to default
function standard() {
	$('#feed').prop('src', 'images/kayne.png');
}

//Function changes feed to the live feed
function live(url) {
	$('#feed').prop('src', url);
}


module.exports.loading= loading;
module.exports.standard = standard;
module.exports.live = live;


// 浏览器搞笑标题
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
	if (document.hidden) {
		$('[rel="icon"]').attr('href', "/img/favicon.png");
		document.title = '必承其重';
		clearTimeout(titleTime);
	} else {
		$('[rel="icon"]').attr('href', "/img/favicon.png");
		document.title = '欲戴皇冠' + OriginTitle;
		titleTime = setTimeout(function () {
			document.title = OriginTitle;
		}, 2000);
	}
});
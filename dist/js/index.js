"use strict";

function index() {
	//切换搜索框；
	$(".header .search-bar .fa-search").on("touchstart", function (e) {
		e.preventDefault();
	});
}
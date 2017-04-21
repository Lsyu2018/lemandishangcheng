function index(){
	//切换搜索框；
	$(".header .search-bar .fa-search").on("touchstart",function(e){
		e.preventDefault();
		$(".header").css({
			"display":"none"
		});
		$(".layout_body").css({
			"display":"none"
		});
		$(".layout_footer").css({
			"display":"none"
		})
		$(".search_content").css({
			"display":"block"
		});
		$(".group_input").css({
			"display":"block"
		})
	})
	$(".search_content .fa-remove").on("touchstart",function(e){
		  e.preventDefault();
		$(".header").css({
			"display":"block"
		});
		$(".layout_body").css({
			"display":"block"
		});
		$(".layout_footer").css({
			"display":"block"
		})
		$(".search_content").css({
			"display":"none"
		});
		$(".group_input").css({
			"display":"none"
		})
	})
	

}           
   
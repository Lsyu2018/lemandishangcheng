function footer(){
	$(".layout_footer").find("a").on("touchstart",function(){
		 $(this).css({
		 	"color":"#EE0000"
		 }).siblings().css({
		 	"color":"#ABABAB"
		 })
	})
}

function right_nav(){
		//右弹框
	var fg=0;
	$(".header .fa-list-ul").on("touchstart",function(e){
		fg++;
		if(fg>=2){
			fg=0;
		}
		e.preventDefault();
		if(fg==1){
			$(".category_right").css({
			"display":"block"
		    })
		}else{
			$(".category_right").css({
			"display":"none"
		    })
		}
	  
	})
}

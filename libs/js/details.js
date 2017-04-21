$(function(){
	//轮播图
	 var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoplay: 2000//可选选项，自动滑动
       });
         //右弹窗
         right_nav();
         //数据的保存
         SaveData();
	    //切换页面
	    $(".details .search-bar").find("span").on("touchstart",function(){
	    	$(this).css({
	    		"background":"#fff",
	    		"color":"#000"
	    	}).siblings("span").css({
	    		"background":"#c53866",
	    		"color":"#fff"
	    	});
	    	if($(".details .search-bar").find("span").eq(0).css("color")=="rgb(0, 0, 0)"){
	    		 $(".body_5 .showdeatil").css({
	    		 	"display":"block"
	    		 });
	    		  $(".body_5 .comment").css({
	    		 	"display":"none"
	    		 })
	    	}else if($(".details .search-bar").find("span").eq(1).css("color")=="rgb(0, 0, 0)"){
	    		 $(".body_5 .showdeatil").css({
	    		 	"display":"none"
	    		 });
	    		  $(".body_5 .comment").css({
	    		 	"display":"block"
	    		 })
	    	}
	    	
	    });
//	    //记录商品数量;
	    var i=0;
	    $(".detail .shopcart").on("touchstart",function(){
	    	  i++;
	    	  if(i<10){
	    	  	i="0"+i;
	    	  }
	    	 $(this).siblings().eq(0).find(".num").text(i);
	    });
	    $(".detail").find(".col-xs-5").on("touchstart",function(){
	    	    $(".body_5").css({
	    	    	"display":"none"
	    	    });
	    	    $(".buy").show();
	    });
	    $(".buyui").find("div").on("touchstart",function(e){
	    	 $(this).css("background","royalblue").children("input").attr("checked","checked");
             $(this).css("background","royalblue").siblings().css("background","#FFE4E1");
	    });
	    $(".get>input").on("touchstart",function(){
	    	$(this).parentsUntil(".buy").hide();
	    	$(".moneyvip").css({
	    		"display":"block",
	    	});
	    });
	    $(".moneyvip .btnbuy").on("touchstart",function(){
	    	window.location.href="MyOrder.html";
	    })
})

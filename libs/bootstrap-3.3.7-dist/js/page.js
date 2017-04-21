$(function(){
	// 初始化轮播
	$("#myCarousel").carousel('cycle');
	//每个项目的轮播时间
	$('#myCarousel').carousel({
	  interval: 100
	 })
	  //导航栏
	  var _obj= {
		baseDom:'#content .show5 ul>li',
		cloneSize: 4,
		url: 'libs/json/content.json',
		pageContainer: null,
		page: true
	   };
	 var _obj2={
     	 parent:$("#content .show5 ul>li"),
     	 child:$(".Runing")
     }
      
      //footer
      footer();
      window.onload=function(){
      	new Iscroll("#content",_obj,_obj2);
      }
     
     //搜索框
     index();
           
           
//		$(".start-slide").click(function(){
//			$("#myCarousel").carousel('cycle');
//		});
//		// 停止轮播
//		$(".pause-slide").click(function(){
//			$("#myCarousel").carousel('pause');
//		});
//		// 循环轮播到上一个项目
//		$(".prev-slide").click(function(){
//			$("#myCarousel").carousel('prev');
//		});
//		// 循环轮播到下一个项目
//		$(".next-slide").click(function(){
//			$("#myCarousel").carousel('next');
//		});
//		// 循环轮播到某个特定的帧 
//		$(".slide-one").click(function(){
//			$("#myCarousel").carousel(0);
//		});
//		$(".slide-two").click(function(){
//			$("#myCarousel").carousel(1);
//		});
//		$(".slide-three").click(function(){
//			$("#myCarousel").carousel(2);
//		});
})

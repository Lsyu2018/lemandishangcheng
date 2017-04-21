$(function(){
	//右弹窗
	right_nav();
    //登陆
    $(".login .goIn").on("touchstart",function(){
    	 var _array=JSON.parse(localStorage.getItem("user"));
         var user=$(".login .user").val();
         var password=$(".login .password").val();
    	$.each(_array, function(_index,_ele) {
		   if(_ele.phone==user&&_ele.password==password){
		   	   $(".loadshow_login").css({
						"display":"block"
				})
		   	   setTimeout(function(){
					window.location.href = "Members.html?phone="+_ele.phone;
		   	   },3000);
		     }
	    });
    })
	
	
})

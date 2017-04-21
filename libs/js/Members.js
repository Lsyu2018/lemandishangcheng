$(function(){
	//有弹窗
	right_nav();
	//获取login传过来的参数
	var phone=window.location.href.split("=")[1];
	//获取用户数据
	var _array= JSON.parse(localStorage.getItem("user"));
	//遍历
	$.each(_array, function(_index,_ele){
		 if(_ele.phone==phone){
		 	$(".body_4 .container .col-xs-4 .name").text(_ele.user);
		 }
	});
	//footer
	footer();
})

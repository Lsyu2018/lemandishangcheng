function url(){
    var flag=0;//0代表鼠标拖动，1代表点击
	$("#content3 .list").on( "touchstart",".list-group-item .title",function(e){
		e.preventDefault();
//		console.log($(this).parent())
        //防止错误触发;
        var index = $(this).parent().index()+1;
	    var url = "details.html?id="+index;  
	    window.location.href = url; 
       
	 });
}

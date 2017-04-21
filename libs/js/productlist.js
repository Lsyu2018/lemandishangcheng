$(function(){
	   //列表
	 var _obj= {
		baseDom:'#content3 .list>li',
		cloneSize: 4,
		url: '../libs/json/productlist.json',
		pageContainer: null,
		page: true
	}; 
	 new  $("").cloneDom(_obj,1);
      var _obj2={
     	 parent:$(".list>li"),
     	 child:$(".Runing")
      }
      window.onload=function(){
      	new Iscroll("#content3",_obj,_obj2);
      }
     //右弹窗
     right_nav();
	//页面传参
	 url();
	 //footer
	 footer();
	
})

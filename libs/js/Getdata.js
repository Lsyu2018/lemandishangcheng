$(function(){
	function Getdata(options){
	//使用对象存储数据
	var _Cartobj={
		 cloneSize: 4,
		 page:true
	}
	_Cartobj.baseDom=".body_3>.list";
	var self=this;
	this.init=function(){
		_Cartobj.data=JSON.parse(localStorage.getItem("cart"));
		if(_Cartobj.data){
			new $("").cloneDom(_Cartobj,1)
		}
		calculation();
	}
      this.init();
      function calculation(){
     	//商品全选
     	var _total=0;
     	var num=0;
     	var checked=$(".layout_footer3 .shoppingcar-toolbar .col-xs-3")
     	    checked.on("touchstart",function(e){
     	    	e.preventDefault();
     	    	//闲情利空单选商品
     	    	num=0;
     	    	_total=0;
     	    	if($(this).children("i").attr("class")=="fa fa-circle-o ng-scope"){
     	    		$(this).children("i").attr("class","fa fa-check-circle ng-scope").css({
     	    		 "color":"red"
     	    	   });
     	    		$(".list .option").find("i").attr("class","fa fa-check-circle ng-scope").css({
     	    		 "color":"red"
     	    	   });
     	    	   //遍历数据
     	    	   $.each(_Cartobj.data, function(_index,_obj) {
     	    	   	      _total+=(_Cartobj.data[_index].count)*(_Cartobj.data[_index].price);
     	    	   });
     	    	   $(".layout_footer3 .col-xs-5 a").children("span").text(_total);
     	    		
     	    	}else if($(this).children("i").attr("class")=="fa fa-check-circle ng-scope"){
     	    		$(this).children("i").attr("class","fa fa-circle-o ng-scope").css({
     	    		 "color":"#000"
     	    	   });
     	    		$(".list .option").find("i").attr("class","fa fa-circle-o ng-scope").css({
     	    		 "color":"#000"
     	    	   });
     	    	    _total=0;
     	    	   $(".layout_footer3 .col-xs-5 a").children("span").text(_total)
     	    	}
     	    })
     	    
     	    //商品单选
     	    
     	    $(".body_3").on("touchstart",".option",function(e){
     	    	e.preventDefault();
     	    	var _price=$(this).siblings(".content").find(".product-price").text();
     	    	if($(this).children("i").attr("class")=="fa fa-circle-o ng-scope"){
     	    		$(this).children("i").attr("class","fa fa-check-circle ng-scope").css({
     	    		 "color":"red"
     	    	    });
     	    	    
     	    	     num=$(this).siblings(".content").find(".ng-binding").eq(1).text();
     	    	     
     	    	    _total+=parseInt(num)*_price; 
     	    	    $(".layout_footer3 .col-xs-5 a").children("span").text(_total);
     	    	}else if($(this).children("i").attr("class")=="fa fa-check-circle ng-scope"){
     	    		$(this).children("i").attr("class","fa fa-circle-o ng-scope").css({
     	    		 "color":"#000"
     	    	     });
     	    	       num=$(this).siblings(".content").find(".ng-binding").eq(1).text(); 
     	    	     _total-=parseInt(num)*_price;  
     	    	    $(".layout_footer3 .col-xs-5 a").children("span").text(_total);
     	    	}
     	    })
     	    //商品数量的加减
     	    //reduce;
     	    $(".body_3").on("touchstart",".list .item-controller .calc .disabled",function(e){
     	    	 var _price=$(this).parent().siblings().eq(0).text();
     	    	  e.preventDefault();
     	    	 var reduce=$(this).siblings(".ng-binding").text();
     	    	      reduce-=1;
     	    	      if(reduce<=0){
     	    	      	reduce=0;
     	    	      }
     	    	      $(this).siblings(".ng-binding").text(reduce);
     	    	      //更新商品的总数量,只有商品被选中的情况下改变;
     	    	      if($(this).parentsUntil().eq(2).siblings().eq(0).children("i").attr("class")=="fa fa-check-circle ng-scope"){
	     	    	      _total-=_price;
	     	    	      if(_total<=0){
	     	    	      	_total=0;
	     	    	      }
	     	    	      $(".layout_footer3 .col-xs-5 a").children("span").text(_total);
     	    	      }
     	    	   $(".layout_footer3 .col-xs-5 a").children("span").text(_total);
     	    	      //更新存储数据
     	    	     var id = $(this).parentsUntil("item-content").eq(2).siblings(".product-img").find("img").attr("id");
     	             updateData(reduce,id);
     	           
     	    })
     	    //add
     	     $(".body_3").on("touchstart",".list .item-controller .calc .add",function(e){
     	    	 e.preventDefault();
     	    	 var _price=$(this).parent().siblings().eq(0).text();
//   	    	 console.log(_price)
     	    	 console.log($(this).parent().siblings().eq(0))
     	    	 var add=parseInt($(this).siblings(".ng-binding").text())
     	    	      add+=1;
     	    	      $(this).siblings(".ng-binding").text(add);
     	    	      //更新商品的总数量,只有商品被选中的情况下改变；
     	    	       if($(this).parentsUntil().eq(2).siblings().eq(0).children("i").attr("class")=="fa fa-check-circle ng-scope"){
	     	    	      _total+=parseInt(_price);
	     	    	      $(".layout_footer3 .col-xs-5 a").children("span").text(_total);
     	    	      }
     	    	       var id = $(this).parentsUntil("item-content").eq(2).siblings(".product-img").find("img").attr("id");
     	               updateData(add,id);
     	    });
     	    //删除商品
     	    $(".body_3").on("touchstart",".list .content .bussiness",function(e){
     	    	e.preventDefault();
     	    	var _price=$(this).siblings().eq(0).text();
     	    	var _num=$(this).siblings().eq(1).children(".ng-binding").text();
     	    	console.log(_num)
     	    	//删除商品结构
     	    	var parent=$(this).parentsUntil().eq(2);
     	    	    parent.remove();
     	    	var id=$(this).parentsUntil("item-content").eq(1).siblings(".product-img").find("img").attr("id");
     	        var index=updateIndex(id);//获取下标；
   	             _Cartobj.data=JSON.parse(localStorage.getItem("cart"));
   	             //遍历
   	             $.each( _Cartobj.data, function(_index,_ele){
   	             	    if(_index==index){
   	             	    	_Cartobj.data.splice(_index,1);
   	             	    }
   	             });
   	             //减少金额
   	              _total-=parseInt(_price)*_num;
   	              
   	             $(".layout_footer3 .col-xs-5 a").children("span").text(_total);
   	             //重新存数据
                localStorage.setItem("cart", JSON.stringify(_Cartobj.data));
     	    })
     	    
     	    //获取数组下标
     	    function updateIndex(id){
     	    	_Cartobj.data=JSON.parse(localStorage.getItem("cart"));
     	    	var i=0;
     	    	//先遍历数据
     	    	$.each(_Cartobj.data, function(_index,_ele) {
     	    		   if(_ele.id==id){
     	    		   	 //配对成功，判断进行了哪些操作，首先更新数据
     	    		   	 i=_index;//知道了数组的下标；
     	    		   }
     	    	});
     	    	return i; 
     	    }
     	    //刷新数据
     	    function updateData(e,id){
     	    	 var index=updateIndex(id);
     	             _Cartobj.data=JSON.parse(localStorage.getItem("cart"));
     	             //遍历
     	             $.each( _Cartobj.data, function(_index,_ele){
     	             	    if(_index==index){
     	             	    	_ele.count=e;
     	             	    }
     	             });
     	             //重新存数据
	                localStorage.setItem("cart", JSON.stringify(_Cartobj.data));
     	    }
     }
     }
	 new Getdata();
	 //右弹窗
	 right_nav();
})




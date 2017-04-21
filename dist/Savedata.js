function SaveData(){
	//获取页面传参过来的id;
	var id=window.location.href.split("=")[1];
	//进行ajax键值对匹配
	$.get("../libs/json/productlist.json",function(_reposer){ 
		 var _obj=typeof _reposer=="string"?JSON.parse(_reposer):_reposer;
	     //匹配id。先遍历数据
	     for(var i=0;i<_obj.length;i++){
	     	   if(id==_obj[i].id){
	     	   	 $(".swiper-container .swiper-wrapper").find("img").attr("src",_obj[i].img)
	     	   }
	     }
	     
	})
	//加入购物车
	
	$(".detail .shoppingcar-toolbar .col-xs-4").find("span").on("touchstart",function(e){
		e.preventDefault();
		var obj={};
		obj.oimg= $(".swiper-container .swiper-wrapper").find("img").eq(0).attr("src");
		obj.title=$(".category1 .title").text();
		obj.price=$(".category1 .price span").text();
		obj.count=2;
		obj.id=id;
		SetData(obj);
		console.log("2232");
	})
	
}

//把数据存储在本地里
function SetData(options){
	var _array=[];
	var _objdata={
		oimg:null,
	    title:null,
	    price:null,
	    count:1
	 };
	
	var $_objdata=$.extend(true, _objdata, options);
	 console.log($_objdata);
    var getItem=localStorage.getItem("cart");//检查是否存储数据
   
    var _falg=false;
    if(getItem){
    	 _array=JSON.parse(getItem);
    	
    	$.each(_array, function(_index,_obj){
    		 if(_obj.id==$_objdata.id){
    		 	 _obj.count+=1;
    		 	 _falg=true;
    		 	 return true;
    		 }
    	});
    }
    if(!_falg){
      $_objdata.count=$_objdata.count||1;
      _array.push($_objdata);
    }
    
	//存储数据
	localStorage.setItem("cart", JSON.stringify(_array));
	
}

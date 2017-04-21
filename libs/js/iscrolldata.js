  //Iscroll//数据记载
    
	 function Iscroll(id,_obj,_obj2){
		  var myScroll;  
	      var pullDownEl, pullDownL;  
	      var pullUpEl, pullUpL;  
	      var Downcount = 0 ,Upcount = 0;  
	      var loadingStep = 0;//加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新  
          var total=0;
          if(_obj2){
          	var Height=_obj2.parent.height();
            var ulHeight=_obj2.child.height();
          }
          myScroll = new IScroll(id, {
            probeType: 1,//probeType：1对性能没有影响。在滚动事件被触发时，滚动轴是不是忙着做它的东西。probeType：2总执行滚动，除了势头，反弹过程中的事件。这类似于原生的onscroll事件。probeType：3发出的滚动事件与到的像素精度。注意，滚动被迫requestAnimationFrame（即：useTransition：假）。  
            scrollbars: true,//有滚动条  
            mouseWheel: true,//允许滑轮滚动  
            fadeScrollbars: true,//滚动时显示滚动条，默认影藏，并且是淡出淡入效果  
            bounce:true,//边界反弹  
            interactiveScrollbars:true,//滚动条可以拖动  
            shrinkScrollbars:'scale',// 当滚动边界之外的滚动条是由少量的收缩。'clip' or 'scale'.  
            click: false ,// 允许点击事件  
            useTransition:false,
            keyBindings:false,//允许使用按键控制  
            momentum:true// 允许有惯性滑动  
            
        });
         this.pullDownAction=function() {//下拉事件
            setTimeout(function() {  
            pullDownEl.removeClass('');  
            pullDownL.html('');  
            pullDownEl['class'] = pullDownEl.attr('class');  
            pullDownEl.attr('class','').hide();  
            myScroll.refresh();  
            loadingStep = 0;
            myScroll.refresh();
        }, 1000); //1秒  
      }  
      this.pullUpAction=function(_obj) {//上拉事件  
        setTimeout(function() {
            var el, li, i;  
            el = $('.Runing');
            //每次刷新数据的时候更新长度
            $(".loadshow_login").css({
            	"z-index":10,
            	"display":"block"
            });
            setTimeout(function(){
            	 $(".loadshow_login").css({
            	"z-index":0,
            	"display":"none"
                })
            	if(_obj2){
            		   total+=Height*2;
            	     ulHeight+=total;
                    el.css("height",ulHeight);
            	}
             if(_obj){
             	Upcount++;
	            if(Upcount>=8){
	            	Upcount=8;
	            }else{
	                new  $("").cloneDom(_obj,Upcount);
	                myScroll.refresh();
	            }
             }
          },2000)
            
            pullUpEl.removeClass('');  
            pullUpL.html('');  
            pullUpEl['class'] = pullUpEl.attr('class');  
            pullUpEl.attr('class','').hide();  
            myScroll.refresh();  
            loadingStep = 0;  
        }, 500); 
      }  
  
     this.init=function(_obj){
      	 
        pullDownEl = $('#pullDown');  
        pullDownL = pullDownEl.find('.pullDownLabel');  
        pullDownEl['class'] = pullDownEl.attr('class');  
        pullDownEl.attr('class','').hide();  
        pullUpEl = $('#pullUp');  
        pullUpL = pullUpEl.find('.pullUpLabel');  
        pullUpEl['class'] = pullUpEl.attr('class');  
        pullUpEl.attr('class','').hide(); 
        this.move(_obj);
      } 
      this.move=function(_obj){
       //滚动时  
      
        myScroll.on('scroll', function(){
            if(loadingStep == 0 && !pullDownEl.attr('class').match('flip|loading') && !pullUpEl.attr('class').match('flip|loading')){  
            if (this.y > 5) {  
                //下拉刷新效果  
                pullDownEl.attr('class',pullUpEl['class'])  
                pullDownEl.show();  
                myScroll.refresh();  
                pullDownEl.addClass('flip');  
                pullDownL.html('');  
                loadingStep = 1;  
            }else if (this.y < (this.maxScrollY - 5)) {  
                //上拉刷新效果  
                pullUpEl.attr('class',pullUpEl['class'])  
                pullUpEl.show();  
                myScroll.refresh();  
                pullUpEl.addClass('flip');  
                pullUpL.html('');  
                loadingStep = 1;  
            }   
         }     
            var self=this;
            if(this.y<-500){
            	 
            	  $(".scroll_top").css({
	   	    	      "display":"block"
	   	          })
            	 $(".scroll_top").on("touchstart",function(e){
            	  	e.preventDefault();
            	  	self.y=0;
            	  	myScroll.refresh();
//          	  	myScroll.scrollToElement(".layout_body", 100, 0, 0,true)
            	  	$(".scroll_top").css({
	   	    	      "display":"none"
	   	             })
              })
            }else{
            	$(".scroll_top").css({
	   	    	      "display":"none"
	   	         });
            }
            
        });  
        //滚动完毕  
        var self=this;
            this.obj=_obj;
        myScroll.on('scrollEnd',function(_obj){
            if(loadingStep == 1){  
            if (pullUpEl.attr('class').match('flip|loading')) {  
                    pullUpEl.removeClass('flip').addClass('loading');  
                pullUpL.html('Loading...');  
                loadingStep = 2;  
                    self.pullUpAction(self.obj);
                    myScroll.refresh();
            }else if(pullDownEl.attr('class').match('flip|loading')){  
                pullDownEl.removeClass('flip').addClass('loading');  
                pullDownL.html('Loading...');  
                loadingStep = 2;  
                self.pullDownAction();
                myScroll.refresh();
            }  
            }  
        });
       
      }
      this.init(_obj);
      document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	 }
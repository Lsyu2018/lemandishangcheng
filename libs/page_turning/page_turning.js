
	$.fn.cloneDom = function(opts,_page) {
	//默认配置
	var _default = {
		baseDom: null,
		url: null, // 权重次于 data， 如果 data 为空，url 不为空的情况下，则 ajax 请求 url 解析出 data
		data: [], // 权重最高，如果 data 不为空则直接当数据源使用
		cloneSize: 0,
		page: false, //如果 page = true 的情况，要实现分页
		pageContainer: null
	}
	var $this = this;
	//对象合并，生成一个全新的对象,
	//后面的对象属性替换前面对象已有的属性，如果是新属性，则添加
	//深度克隆	
	$this.newObj = $.extend(_default, opts);
	console.log($this.newObj)
	//确定数据源
	var init = function(_callback){
		
		//如果数据源为空则不执行其它操作
		if(!$this.newObj.data && !$this.newObj.url){
			return false;
		}
		//如果 baseDom为空 或者 cloneSize 小于 0， 则不执行其它操作
		if(!$this.newObj.baseDom || $this.newObj.cloneSize < 1){
			return false;
		}
		//如果 data 不为空则把 data 当数据源操作
		if($this.newObj.data[0]){
			$this.newObj.data = !$this.newObj.data instanceof Array ? [$this.newObj.data] : $this.newObj.data;
		} else if($this.newObj.url)	{
			$.get($this.newObj.url + '?_=' + Math.random(), function(_response){
				$this.newObj.data = typeof _response == 'string' ? JSON.parse(_response) : _response;
				//solution1
				if(_callback && typeof _callback == 'function'){
					_callback();
				}
			})
		}
		return true;
	}
	var generateHtml = function(_page){
		_page = _page || 1;
		//计算每页显示的数量
		var _pageSize = $this.newObj.cloneSize;
		//每页显示的数组最小下标
		var _min = (_page - 1) * _pageSize;
		//每页显示的数组最大下标
		var _max = _page * _pageSize -1;

		if(!$this.newObj.data[0]){
			return false;
		}
		$($this.newObj.baseDom).not(':first-child').remove();
		for(var i =0; i <= _max; i++){
			if($this.newObj.data[i]){
				var _cloneDom = $($this.newObj.baseDom).eq(0).clone().appendTo($($this.newObj.baseDom).parent());
				$.each($('[dk-bind]', _cloneDom), function(_index, _element){
					if($(_element).is('img')){
						$(_element).attr('src', $this.newObj.data[i][$(_element).attr('dk-bind')]);
						if($this.newObj.data[i].id){
						 $(_element).attr('id',$this.newObj.data[i].id);
						}
						$(_element).attr('src', $this.newObj.data[i][$(_element).attr('dk-id')]);
					} else {
						$(_element).text($this.newObj.data[i][$(_element).attr('dk-bind')]);
					}
					
				})
			}
		}
		$($this.newObj.baseDom).eq(0).remove();
	}

	var dkpage = function(_page){
//		$($this.newObj.pageContainer).pagination({
//          dataSource: $this.newObj.data,
//          pageSize: $this.newObj.cloneSize,
//          callback: function (response, pagination) {
            	$this.refresh(_page);
//              // window.console && console.log(response, pagination); 
////             
//          }
//      });
//
//      $($this.newObj.pageContainer).addHook('beforePageOnClick', function(_event, _pagenumber){
//      	// arguments 是调用函数时的参数集合
//      	// console.log(arguments);
//      	// $this.refresh(_pagenumber);
//      	
//      })		
//      $($this.newObj.pageContainer).addHook('beforeInit', function(_event, _pagenumber){
//      	// arguments 是调用函数时的参数集合
//      	// console.log(arguments);
//      	// $this.refresh(123);
//      })	        
}
	this.refresh = function(_page){
		//如果数据源 data 为空，而且 url 不为空，则定为需要 ajax 请求数据源
		if(!this.newObj.data[0] && this.newObj.url){
			//调用初始化方法并把生成 html 方法当回调函数执行
			// init(generateHtml);
			init(function(){
				generateHtml(_page);
				if($this.newObj.page){
					dkpage(_page);
				}					
			});
		}else if(this.newObj.data && this.newObj.data instanceof Array){
			generateHtml(_page);
		}
	}
	
	this.refresh(_page);
	}

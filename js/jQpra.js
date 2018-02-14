!function(w) {
	function $(obj) {
		var typeO = (typeof obj).toLowerCase();
		//输入函数或者选择器或者DOM对象

		if (typeO === "function") 
		{
			//jq中可以多次添加入口函数,此处只能添加一次
			window.onload = obj;
		} 
		else if (typeO === "string" || "object") 
		{
			return new Init(obj);
		}

	};

	function Init(str) {
		this.length = this.init(str);
	}

	Init.prototype = {
		//获取js对象
		init: function(str) {
			var arr = [];
			var typestr = (typeof str).toLowerCase();
			if (typestr === "string") 
			{
				if ( str[0] === "#" ) 
				{
					arr[0] = document.getElementById( str.replace(/#/, '') );
				}
				else if (str[0] === ".")
				{
					var cName = str.replace(/\./, '');
					if (document.getElementsByClassName) 
					{
						var aJso = document.getElementsByClassName(cName);
						var len = aJso.length;
						for (var i = 0; i < len; i++) {
							arr[i] = aJso[i];
						}
					}
					else 
					{
						var allE = document.getElementsByTagName("*");
						var reg = new RegExp("\\b" + cName + "\\b");
						for (var i = 0, len = allE.length; i < len; i++) {
							if (reg.test(allE[i].className)) {
								arr.push(allE[i]);
							}
						}
					}
				}
				else 
				{
					var aJso = document.getElementsByTagName(str);
					var len = aJso.length;
					for (var i = 0; i < len; i++) {
						arr[i] = aJso[i];
					}			
				}
			
			}
			else if (typestr === "object")
			{
				//此时有几种情况:1 DOM对象, 2 DOM对象数组, 3 jq对象, 4jq对象数组
				if (str.length) 
				{
					//如果是伪数组,也可以视作数组进行处理
					for (var i = 0, len = str.length; i < len; i++) {
						//可能的情况,DOM数组,jq对象(,jq对象数组 不考虑)
						arr.push(str[i]);
					}
				}
				else 
				{
					arr.push(str);
				}
			}
			for (var i in arr) {
				this[i] = arr[i];
			}
			return arr.length;	

		},

		//遍历
		each: function (fn) {
			for ( var i = 0, len = this.length; i < len; i++ ) {
				fn.call(this[i], i);
			}
		}, 

		// 返回js对象
		get: function(i) {
			return this[i];
		},

		//返回对应的jQ对象
		eq:function(i) {
			return Init(this[i]);
		},

		size: function() {
			return this.length;
		},

		index: function(str) {
			var typeS = (typeof str).toLowerCase();
			if (typeS === undefined) {
				var siblings = this[0].parentNode.children();
				for (var i = 0, len = siblings.length; i < len; i++) {
					if (siblings[i] === this[0]) {
						return i;
					}
				}
			}
			else if (typeS === "string")
			{
				var arr = $(str);
				for (var i = 0, len = arr.length; i < len; i++) {
					if (arr[i] === this[0]) {
						return i;
					}
				}
			}
			else if (typeS === "object")
			{
				var arr = str;
				for (var i = 0, len = arr.length; i < len; i++) {
					if (arr[i] === this[0]) {
						return i;
					}
				}
			}
			return -1;
		},

		click: function(fn) {
			this.each(function() {
				this.onclick = fn;
			});
		},

		mousedown: function(fn) {
			this.each(function() {
				this.onmousedown = fn;
			});
		},

		mouseup: function(fn) {
			this.each(function() {
				this.onmouseup = fn;
			});
		},

		hover: function() {
			var argu = arguments;
			var len = argu.length;
			var num = len === 1 ? 0 : 1; 
			this.each(function() {
				this.onmouseenter = argu[0];
				this.onmouseleave = argu[num];
			});
		},

		//获取,设置css属性
		css: function () {
			var argu = arguments;
			var arguType = (typeof argu[0]).toLowerCase();
			if ( argu.length === 2 ) {
				this.each( function () {
					this.style[argu[0]] = argu[1];
				} );
			}
			else if (  arguType=== "string" )
			{
				return this[0].currentStyle?this[0].currentStyle[argu[0]]:getComputedStyle(this[0])[argu[0]];
			}
			else if ( arguType === "object") 
			{
				for ( var attr in argu[0] ) {
					this.each( function() {
						this.style[attr] = argu[0][attr];
					});
				}
			}
			return this;
		},

		offset: function() {
			var obj = {
				top: 0,
				left: 0
			};
			var oDOM = this[0];
			while(oDOM !== document.body) 
			{
				obj.top += oDOM.offsetTop;
				obj.left += oDOM.offsetLeft;
				oDOM = oDOM.offsetParent;
			}
			return obj;
		},

		position: function() {
			var obj = {
				top: this[0].offsetTop,
				left: this[0].offsetLeft
			};
			return obj;
		},

		scrollTop: function(num) {
			if (num) 
			{
				this.each(function () {
					if (this === document) 
					{
						document.docuemntElement.scrollTop = num + "px";
						dcoument.body.scrollTop = num + "px";
					}
					else 
					{
						this.scrollTop = num + "px";
					}
				});
				return this;
			}
			else 
			{
				if (this[0] === document) 
				{
					return document.documentElement.scrollTop ||document.body.scrollTop;
				}
				else 
				{
					return this[0].scrollTop;
				}
			}
		},

		scrollLeft: function(num) {
			if (num) 
			{
				this.each(function () {
					if (this === document) 
					{
						document.docuemntElement.scrollLeft = num + "px";
						dcoument.body.scrollLeft = num + "px";
					}
					else 
					{
						this.scrollLeft = num + "px";
					}
				});
				return this;
			}
			else 
			{
				if (this[0] === document) 
				{
					return document.documentElement.scrollLeft ||document.body.scrollLeft;
				}
				else 
				{
					return this[0].scrollLeft;
				}
			}
		},

		width: function(num) {
			if (num) 
			{
				if (parseInt(num) === num)
				{
					num += "px";
				}
				this.css("width", num);
			}
			else 
			{
				return parseInt(this.css("width"));
			}
		},

		height: function(num) {
			if (num) 
			{
				if (parseInt(num) === num)
				{
					num += "px";
				}
				this.css("height", num);
			}
			else 
			{
				return parseInt(this.css("height"));
			}
		},

		innerWidth: function() {
			return this[0].clientWidth;
		},

		innerHeight: function() {
			return this[0].clientHeight;
		},

		outerWidth: function() {
			return this[0].offsetWidth;
		},

		outerHeight: function() {
			return this[0].offsetHeight;
		},

		html: function(str) {
			if (str) 
			{
				this.each(function() {
					this.innerHTML = str;
				});
			}
			else 
			{
				return this[0].innerHTML;
			}
			return this;
		},

		text: function(str) {
			if (str) 
			{
				this.each(function() {
					this.innerText = str;
				});
			}
			else 
			{
				return this[0].innerText;
			}
			return this;
		},

		addClass: function(str) {
			var arr = str.split(" ");
			var len = arr.length;
			for ( var i = 0; i < len; i++ ) {
				this.each(function() {
					var className = this.className;
					var reg = new RegExp("\\b" + arr[i] + "\\b");
					if (reg.test(className)) 
					{
						return;
					}
					else 
					{
						var s = className?" ":"";
						this.className = className + s + arr[i];
					}
					
				});
			}
			return this;
		},

		removeClass: function(str) {
			var arr = str.split(" ");
			var len = arr.length;
			for ( var i = 0; i < len; i++ ) {
				this.each(function() {
					var className = this.className;
					var reg = new RegExp("[\\s]?" + "\\b" + arr[i] + "\\b");
					if (reg.test(className)) 
					{
						this.className = className.replace(reg, "");
						if (/^\s/.test(this.className)) {
							this.className = this.className.replace(/^\s/, "");
						}
					}
					else 
					{
						return;
					}
					
				});
			} 
			return this;
		},

		toggleClass: function(str) {
			var arr = str.split(" ");
			var len = arr.length;
			for ( var i = 0; i < len; i++ ) {
				this.each(function() {
					var className = this.className;
					var reg = new RegExp("[\\s]?" + "\\b" + arr[i] + "\\b");
					if (reg.test(className)) 
					{	
						this.className = className.replace(reg, "");
						if (/^\s/.test(this.className)) {
							this.className = this.className.replace(/^\s/, "");
						}
					}
					else 
					{
						var s = className?" ":"";
						this.className = className + s + arr[i];
					}					
				});
			}
			return this;
		},

		attr: function () {
			var argu = arguments;
			var arguType = (typeof argu[0]).toLowerCase();
			if ( argu.length === 2 ) {
				this.each( function () {
					this.setAttribute(argu[0], argu[1]);
				} );
			}
			else if (  arguType=== "string" )
			{
				return this[0].getAttribute(argu[0]);
			}
			else if ( arguType === "object") 
			{
				for ( var attr in argu[0] ) {
					this.each( function() {
						this.setAttribute(attr, argu[0][attr]);
					});
				}
			}
			return this;
		},

		removeAttr: function(str) {
			this.each(function() {
				this.removeAttribute(str);
			});
			return this;
		},

		val: function(str) {
			if(str !== undefined) {
				this.each(function() {
					this.value = str;
				});
				
			}
			else 
			{
				return this[0].value;
			}
			return this;
		},

		show: function() {
			this.each(function() {
				this.style.display = "block";
			});
			return this;
		},

		hide: function() {
			this.each(function() {
				this.style.display = "none";
			});
			return this;
		},

		//淡入,参数作为  时间(毫秒数,slow,normal,fast), 回调函数, 
		fadeIn: function() {
			var arr = arguments;
			var len = arr.length;
			var time, callback;
			for ( var i = 0; i < len; i++ ) {
				var typeI = (typeof arr[i]).toLowerCase;
				switch (typeI) {
					case "number": 
						time = arr[i];
						break;
					case "function":
						callback = arr[i];
						break;
					case "string":
						switch(arr[i]) {
							case "slow":
								time = 800;
								break;
							case "normal":
								time = 600;
								break;
							case "fast":
								time = 400;
								break;
						}
						break;
				}
			}
			if (time === undefined) time = 400;
			this.each(function() {
				var startVal = getCss(this, "opacity");
				if (startVal === undefined) {
					startVal = getCss(this, "filter").replace(/\D/g, "")/100;
				}
				if(getCss(this, "display") === "none") {
					this.style.display = "block";
					this.style.opacity = 0;
					this.style.filter = "alpha(opacity = 0)";
					startVal = 0;
				}
				var startTime = new Date();
				var endVal = 1;
				var This = this;
				var timer = setInterval(function() {
					var nowTime = new Date();
					var prop = (nowTime - startTime) / time;
					if (prop >= 1) {
						prop = 1;
						callback && callback();
						clearInterval(timer);
					}
					var val = startVal + (endVal-startVal)*prop;
					This.style.opacity = val;
					This.style.filter = "alpha(opacity = "+ 100 * val +")";
				}, 70);
			});
			function getCss(obj, attr) {
				var jsO = obj.currentStyle?obj.currentStyle:getComputedStyle(obj);
				return jsO[attr];
			}
			return this;
		},

		fadeOut: function() {
			var arr = arguments;
			var len = arr.length;
			var time, callback;
			for ( var i = 0; i < len; i++ ) {
				var typeI = (typeof arr[i]).toLowerCase;
				switch (typeI) {
					case "number": 
						time = arr[i];
						break;
					case "function":
						callback = arr[i];
						break;
					case "string":
						switch(arr[i]) {
							case "slow":
								time = 800;
								break;
							case "normal":
								time = 600;
								break;
							case "fast":
								time = 400;
								break;
						}
						break;
				}
			}
			if (time === undefined) time = 400;
			this.each(function() {
				var startVal = getCss(this, "opacity");
				if (startVal === undefined) {
					startVal = getCss(this, "filter").replace(/\D/g, "")/100;
				}
				var startTime = new Date();
				var endVal = 0;
				var This = this;
				var timer = setInterval(function() {
					var nowTime = new Date();
					var prop = (nowTime - startTime) / time;
					if (prop >= 1) {
						prop = 1;
						callback();
						clearInterval(timer);
					}
					var val = startVal + (endVal-startVal)*prop;
					This.style.opacity = val;
					This.style.filter = "alpha(opacity = "+ 100 * val +")";
				}, 70);
			});
			function getCss(obj, attr) {
				var jsO = obj.currentStyle?obj.currentStyle:getComputedStyle(obj);
				return jsO[attr];
			}
			return this;			
		}

	};

	w.$ = $;
}(window);
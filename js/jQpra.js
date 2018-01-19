!function(w) {
	function $(obj) {
		var typeO = (typeOf obj).toLowCase();
		//输入函数或者选择器

		if (typeO === "function") 
		{
			window.onload = obj;
		} 
		else if (typeO === "string") 
		{
			return new Init(obj);
		}

	};

	function Init(str) {
		this.jsObj = this.init(str);
		//this.jsObj 指向选中的js DOM对象
	}

	Init.prototype = {
		init: function(str) {
			var arr = [];

			if ( str[0] === "#" ) 
			{
				arr[0] = document.getElementById( str.replace(/#/, '') );
			}
			else if (str[0] === ".")
			{
				var cName = str.replace(/\./, '');
				if (document.getElementsByClassName) {
					arr = document.getElementsByClassName(cName);
				}
				else 
				{
					var allE = document.getElementsByTagName(*);
					var reg = new RegExp("\\b" + cName + "\\b");
					for (var i = 0, len = allE.length; i < len; i++) {
						if (reg.test(allE[i].className)) {
							arr.push(allE[i]);
						}
					}
				}
			}
			return arr;
		},

		each: function (fn) {
			for ( var i = 0, len = this.jsObj.length; i < len; i++ ) {
				fn.call(this.jsObj[i], i);
			}
		}, 

		css: function () {
			var argu = arguments;
			if ( argu.length === 2 ) {
				this.each( function () {
					this.style[argu[0]] = argu[1];
				} );
			}
			else if ( typeOf argu[0].toLowCase === "string" )
			{
				return this.jsObj[0].currentStyle?this.jsObj[0].currentStyle[argu[0]]:getComputedStyle(this.jsObj[0])[argu[0]];
			}
			else if ( typeOf argu[0].toLowCase === "object") 
			{
				for ( var attr in argu[0] ) {
					this.each( function() {
						this.style[attr] = argu[0][attr];
					});
				}
			}
		}
	};

	w.$ = $;
}(window);
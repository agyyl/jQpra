!function(w) {
	function $(obj) {
		var typeO = (typeOf obj).toLowCase();
		//输入函数或者选择器

		if (typeO === "function") 
		{
			window.onload = obj;
		} 
		else if 
		(typeO === "string") {
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
				arr[0] = document.getElementById( str. )
			}
		}
	};

	w.$ = $;
}(window);
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
		}
	};

	w.$ = $;
}(window);
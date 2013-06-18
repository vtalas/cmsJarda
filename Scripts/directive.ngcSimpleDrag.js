function simpleDragDirective() {
	return  {
		link: function (scope, element, attr) {
			element.bind("mousedown", function () {
				console.log("kasjbdjkasb");
			})
			$(element).bind("drag", function (e) {
		//			console.log(e.originalEvent.layerX, e.originalEvent.clientX, e.originalEvent.pageX, e.originalEvent.offsetX);
				var off = e.originalEvent.offsetX;
				var neleft = off + e.originalEvent.pageX;
				console.log(neleft);
				element.css("left", (neleft) )
			})
		}
	}
};
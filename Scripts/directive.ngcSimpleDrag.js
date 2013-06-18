function simpleDragDirective() {
	return  {
		link: function (scope, element, attr) {
			var offsetX = 0;
			var offsetY = 0;
			element.bind({
				dragstart: function (e) {
					offsetX = e.originalEvent.offsetX;
					offsetY = e.originalEvent.offsetY;
				},
				dragover: function (e) {
					var event = e.originalEvent;
					e.stopPropagation();
					e.preventDefault();
					var dt = e.originalEvent.dataTransfer;
					dt.effectAllowed = dt.dropEffect = 'none';

					if (event.pageX && event.pageY) {
						var neleft = event.pageX - offsetX;
						var newtop = event.pageY - offsetY;
						element.css("left", neleft);
						element.css("top", newtop);
					}
				},
				dragenter: function (e) {
					e.stopPropagation();
					e.preventDefault();
					var dt = e.originalEvent.dataTransfer;
					dt.effectAllowed = dt.dropEffect = 'none';
				},
			});
		}
	}
}
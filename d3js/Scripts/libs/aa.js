var Animator = (function () {

	function Animator(selector) {
		this.svg = d3.select(selector)
			.append("svg")
			.attr("width", 1000)
			.attr("height", 1000);

		var self = this;
		this.r = 150;
		this.x = 100;
		this.y = 100;

		var circle = this.svg.append("circle");

		var rect = this.svg.append("rect")
			.style("stroke", "red")
			.style("fill", "red")
			.on("click", function () {
				console.log(self.timer);
			})
			.attr("x", 900)
			.attr("y", this.y)
			.attr("width", 2 * this.r)
			.attr("height", 2 * this.r);

		this.startState(circle);

		var chuj = false;
		circle
			.on("mouseenter", function () {
				clearTimeout(self.timer);
				if (self.timer > 0) {
					return;
				}
				self.animate1(circle);
				self.timer = -1;
			})
			.on("mouseout", function () {
				console.log("mouseout");
				self.setTimer(circle);
			});
	}

	Animator.prototype.setTimer = function (circle) {
		var self = this;

		if (this.timer > 0){
			console.log("clear");
			clearTimeout(this.timer);
		}

		this.timer = setTimeout(function () {
			console.log("----------", self.timer);
			self.svg.selectAll(".xxx").style("display", "none");
			self.startState(circle);
			self.timer = -1;
		}, 500);

	};
	Animator.prototype.startState = function (circle) {
		circle.style("stroke", "gray")
			.style("fill", "green")
			.attr("r", this.r)
			.attr("cx", this.x + this.r)
			.attr("cy", this.y + this.r);
		return circle;
	};

	Animator.prototype.all = function (elem) {

	};
	Animator.prototype.animate1 = function (elem) {
		var rpul = this.r / 2;
		var self = this;
		elem
			.style("fill", "blue")
			.attr("r", this.r / 2)
			.attr("cx", this.x + 3 * rpul)
			.attr("cy", this.y + rpul);

		var x = d3.selectAll(".xxx");
		if (x[0].length > 0) {
			x.style("display", "block");
			return;
		}

		this.svg.insert("circle", "rect")
			.style("fill", "green")
			.on("mouseover", function () {
				clearTimeout(self.timer);
			})
			.on("mouseout", function () {
				self.setTimer(elem);
			})
			.attr("class", "xxx")
			.attr("r", this.r / 2)
			.attr("cx", this.x + rpul)
			.attr("cy", this.y + rpul);

		this.svg.insert("circle", "rect")
			.style("fill", "red")
			.on("mouseover", function () {
				clearTimeout(self.timer);
			})
			.on("mouseout", function () {
				self.setTimer(elem);
			})
			.attr("class", "xxx")
			.attr("r", this.r / 2)
			.attr("cx", this.x + rpul)
			.attr("cy", this.y + 3 * rpul);

		this.svg.append("a")
			.attr("xlink:href", function (d) {
				return "http://somelink.com/link.php?id=" + d
			})
			.append("circle")
			.style("fill", "yellow")
			.on("mouseover", function () {
				clearTimeout(self.timer);
			})
			.on("mouseout", function () {
				self.setTimer(elem);
			})
			.attr("class", "xxx")
			.style("opacity", 0.5)
			.attr("r", this.r / 2)
			.attr("cx", this.x + 3 * rpul)
			.attr("cy", this.y + 3 * rpul);
	};
	Animator.prototype.animate2 = function (elem) {
		elem.transition()
			.duration(200)
			.style("fill", "white")
			.attr("r", 40)
			.attr("cx", 50)
			.attr("cy", 50)
	};

	return Animator;
}());





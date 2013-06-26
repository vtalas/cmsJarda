var Animator = (function () {

	function Animator(selector) {
		this.svg = d3.select(selector)
			.append("svg")
			.attr("width", 1000)
			.attr("height", 1000);

		var self = this;
		this.r = 350;
		this.x = 100;
		this.y = 100;

		var circle = this.svg.append("circle");
	this.mainCircle = circle;

		var rect = this.svg.append("rect")
			.style("stroke", "#eee")
			.style("fill", "#eee")
			.on("click", function () {
				console.log(self.timer);
			})
			.attr("x", 900)
			.attr("y", this.y)
			.attr("width", 2 * this.r)
			.attr("height", 2 * this.r);

		this.startState(circle);

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
				self.setTimer();
			});
	}

	Animator.prototype.setTimer = function () {
		var self = this;

		if (this.timer > 0){
			console.log("clear");
			clearTimeout(this.timer);
		}

		this.timer = setTimeout(function () {
			console.log("----------", self.timer);
			self.svg.selectAll(".xxx")
				.style("display", "none")
				.attr("r", 10);
			;
			self.startState(self.mainCircle);
			self.timer = -1;
		}, 1500);

	};
	Animator.prototype.startState = function (circle) {
		circle.style("stroke", "gray")
			.style("display", "block")
			.style("fill", "green")
			.attr("r", this.r/3)
			.attr("cx", this.x + this.r)
			.attr("cy", this.y + this.r)
			.transition()
			.duration(400)
			.attr("r", this.r)
		;
		return circle;
	};

	Animator.prototype.all = function (elem) {

	};
	Animator.prototype.animate1 = function (elem) {
		var rpul = this.r / 2;
		elem.style("display", "none");
//		elem
//			.style("fill", "blue")
//			.attr("r", this.r / 2)
//			.attr("cx", this.x + 3 * rpul)
//			.attr("cy", this.y + rpul);

		var x = d3.selectAll(".xxx");
		if (x[0].length > 0) {
			x.style("display", "block")

			return;
		}

		this.smallCircle(this.x + rpul, this.y + rpul, "red");
		//this.smallCircle(this.x + rpul, this.y + 3 * rpul, "green");
		this.smallCircle(this.x + 3 * rpul, this.y + 3 * rpul, "pink");
		this.smallCircle(this.x + 3 * rpul, this.y + rpul, "pink");
	};

	Animator.prototype.smallCircle = function (cx, cy, color) {
		var self = this;
		this.svg.append("a")
			.attr("xlink:href", function (d) {
				return "http://somelink.com/link.php?id=" + d
			})
			.append("circle")
			.style("fill", color)
			.on("mouseover", function () {
				clearTimeout(self.timer);
			})
			.on("mouseout", function () {
				self.setTimer();
			})
			.attr("class", "xxx")
			.attr("r", this.r / 4)
			.attr("cx", this.x + this.r)
			.attr("cy", this.y + this.r)
			.transition()
			.duration(200)
			.attr("r", this.r/2)
			.attr("cx", cx)
			.attr("cy", cy)
	};

	return Animator;
}());





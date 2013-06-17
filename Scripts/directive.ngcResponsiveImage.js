var ngcResponsiveImage = function () {
	var getWidth = function (scope) {
		return scope.windowWidth;
	};

	var imageByWindowSize = function (windowWidth, galleryImage) {
		var imageUrl = galleryImage.FullSize.PhotoUri;

		if (windowWidth >= 768 && windowWidth < 1200) {
			imageUrl = galleryImage.getLarge();
		}
		if (windowWidth >= 480 && windowWidth < 768) {
			imageUrl = galleryImage.getLarge();
		}

		if (windowWidth < 480) {
			imageUrl = galleryImage.getSmall();
		}

		return imageUrl;
	};

	var getImage = function (url) {
		var image = new Image(),
			x;

		image.src = url;
		x = $.Deferred();

		$(image).load(function () {
			x.resolve(this);
		});

		return x.promise();
	};

	var renderImage = function (scope) {
		var imageOverFlows = getWidth(scope) < scope.imageWidth;

		if (imageOverFlows) {
			scope.containerWidth = null;
		} else {
			scope.containerWidth = scope.imageWidth;
		}
	};

	var renderImageFullSize = function (scope) {
		scope.containerWidth = scope.imageWidth;
	};

	var refreshImage = function (scope, galleryImage) {
		var windowWidth = getWidth(scope),
			url = imageByWindowSize(windowWidth, galleryImage);

		getImage(url, scope).then(function (image) {
			console.log(image);
			scope.imageWidth = image.width;
			renderImage(scope);
			scope.source = url;
			scope.$apply();
		});
	};

	return {
		scope: {
			galleryImage: "="
		},
		controller: function ($scope) {
			$scope.containerWidth = "55";
			$scope.windowWidth = $(window).width();

			$scope.isFullSize = function () {
				return $scope.imageWidth <= $scope.containerWidth;
			};

			$scope.isFullSizeCssClass = function () {
				if ($scope.isFullSize() && $scope.windowWidth < $scope.imageWidth ){
					return "show low";
				}
				if (!$scope.isFullSize()){
					return "show full";
				}
				return "hide";
			};

			$scope.showFullSize = function () {
				if ($scope.isFullSize()) {
					renderImage($scope);
				}
				else {
					renderImageFullSize($scope);
				}
			};
			$scope.getCssWidth = function (width) {
				return width === null ? "auto" : width + "px";
			};
		},
		restrict: "E",
		templateUrl: "imageGalleryTemplate.html",
		link: function (scope, iElement, iAttrs) {
			console.log("xx");
			scope.$watch("galleryImage", function (galleryImage, oldValue) {
				if (galleryImage === undefined) {
					return;
				}
				debugger;
				refreshImage(scope, galleryImage)
			});

			scope.$on("windowChanged", function (x, data) {
				scope.windowWidth = data.width;
				refreshImage(scope, scope.galleryImage)
			});

		}
	};
};
var ngcResponsiveImage = function () {
	var getWidth = function (scope) {
		return scope.windowWidth;
	};
	var getWindowHeight = function (scope) {
		return scope.windowHeight;
	};

	var imageByWindowSize = function (windowWidth, galleryImage) {
		var imageUrl = galleryImage.FullSize.PhotoUri;

		if (windowWidth >= 768 && windowWidth < 1200) {
			imageUrl = galleryImage.Large.PhotoUri;
		}
		if (windowWidth >= 480 && windowWidth < 768) {
			imageUrl = galleryImage.Medium.PhotoUri;
		}

		if (windowWidth < 480) {
			imageUrl = galleryImage.Small.PhotoUri;
		}

		return imageUrl;
	};

	var getImage = function (url) {
		var image = new Image(),

			promise;

		image.src = url;
		promise = $.Deferred();


		$(image).load(function () {
			var loadimage = this;
			setTimeout(function () {
				promise.resolve(loadimage);
			},1000)
		});

		return promise.promise();
	};

	var renderImage = function (scope) {
		var overflowWidth = getWidth(scope) < scope.imageWidth;
		var overflowHeight = getWindowHeight(scope) < scope.imageWidth;

		if (overflowWidth) {
			scope.containerWidth = null;
		} else {
			scope.containerWidth = scope.imageWidth;
		}

		if (overflowHeight) {
			var windowHeight = getWindowHeight(scope);
			scope.containerWidth = Math.round(scope.imageWidth / scope.imageHeight * (windowHeight - 50 ));
		}
	};

	var renderImageFullSize = function (scope) {
		scope.containerWidth = scope.imageWidth;
	};

	var refreshImage = function (scope, galleryImage) {
		var windowWidth = getWidth(scope),
			url = imageByWindowSize(windowWidth, galleryImage);
		scope.loading = true;
		getImage(url, scope).done(function (image) {
			scope.imageWidth = image.width;
			scope.imageHeight = image.height;
			renderImage(scope);
			scope.source = url;
			scope.loading = false;
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
			$scope.windowHeight = $(window).height();

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
				if (!$scope.isFullSize()) {
					renderImageFullSize($scope);
				}
				else {
					renderImage($scope);
				}
			};
			$scope.getCssWidth = function (width,a) {
				//console.log($scope.galleryImage.Small.PhotoUri);
				return width === null ? "auto" : width + "px";
			};
			$scope.getCssHeight = function (height) {
				return height === null ? "auto" : height + "px";
			};
		},
		restrict: "E",
		templateUrl: "imageGalleryTemplate.html",
		link: function (scope, iElement, iAttrs) {
			scope.$watch("galleryImage", function (galleryImage, oldValue) {
				if (galleryImage === undefined) {
					return;
				}
				refreshImage(scope, galleryImage)
			});

			scope.$on("windowChanged", function (x, data) {
				scope.windowWidth = data.width;
				scope.windowHeight = data.height;
				refreshImage(scope, scope.galleryImage)
			});

		}
	};
};
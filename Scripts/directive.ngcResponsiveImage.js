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
			}, 10)
		});

		return promise;
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
		scope.imagePromise = getImage(url).done(function (image) {
			scope.imageWidth = image.width;
			scope.imageHeight = image.height;
			renderImage(scope);
			scope.source = url;
			scope.loading = false;
			scope.skipping = false;
			scope.$apply();
		});
	};

	return {
		scope: {
			galleryImage: "="
		},
		controller: function ($scope) {
			$scope.containerWidth = "16";
			$scope.windowWidth = $(window).width();
			$scope.windowHeight = $(window).height();

			$scope.isFullSize = function () {
				return $scope.imageWidth <= $scope.containerWidth;
			};

			$scope.isFullSizeCssClass = function () {
				if (!$scope.isFullSize()) {
					return "icon-resize-full";
				}
				return "icon-resize-small";
			};

			$scope.showFullSize = function () {
				if (!$scope.isFullSize()) {
					renderImageFullSize($scope);
				}
				else {
					renderImage($scope);
				}
			};

			$scope.fullSizeTooltip = function () {
				return $scope.isFullSize() ? "Přizpůsobit na stránku" : "Zobrazit původní velikost";
			};

			$scope.isOverFlowable = function () {
				return $scope.windowHeight < $scope.imageHeight || $scope.windowWidth < $scope.imageWidth;
			};

			$scope.getCssWidth = function (width, a) {
				return width === null ? "auto" : width + "px";
			};
			$scope.getCssHeight = function (height) {
				return height === null ? "auto" : height + "px";
			};
		},
		restrict: "E",
		replace:true,
		templateUrl: "imageGalleryTemplate.html",
		compile: function (tElement) {
			return function (scope, element, iAttrs) {
				scope.source = null;
				scope.$watch("galleryImage", function (galleryImage, oldValue) {
					if (galleryImage === undefined) {
						return;
					}
					if (scope.imagePromise) {
						if (scope.imagePromise.state() === "pending"){
							scope.imagePromise.reject();
							scope.skipping = true;
						}
					}
					refreshImage(scope, galleryImage);
					element.css("left", 40 );
					element.css("top", 40 );
				});

				scope.$watch("containerWidth", function (value, oldValue) {
					var isShrinking = oldValue > value;
					if (isShrinking ) {
						element.css("left", 40);
						element.css("top", 40 );
					}
					element.css("width", value);
				});

				scope.$on("windowChanged", function (x, data) {
					scope.windowWidth = data.width;
					scope.windowHeight = data.height;
					refreshImage(scope, scope.galleryImage)
				});
			}
		}

	};
};
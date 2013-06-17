/*global MaspartiData, ApiWrapper*/
function galleryImageController($scope, $routeParams, test, $location) {

	$scope.$on("getAlbumPhotosSuccess", function (e, data) {
		$scope.gallery = data;
		console.log($routeParams.i)
		console.log($location.search().i)

	});

	function getImageIndex () {
		return $routeParams.i;
	}

	function handleUrlParams () {
		var galleryId = $routeParams.g,
			index = getImageIndex();

		if (typeof index !== "undefined" && typeof galleryId !== "undefined"){
			$scope.image = $scope.gallery[index];
		}
	}

	$scope.$on("$locationChangeSuccess", function () {
		var index = getImageIndex();
		console.log("xxx", $routeParams.i)
		if (typeof index === "undefined"){
			$scope.gallery = null;
		}
		handleUrlParams();

	});


	$scope.imageUrl = function () {
		var x = "";
		if ($scope.ready) {
			x = $scope.image.fullsize.url;
		}
		return x;
	};

	$scope.close = function () {
		console.log("xx")
		location.hash = $location.path();
	};

	$scope.next = function () {
		var length = $scope.gallery.length,
			imageIndex = getImageIndex();

		imageIndex++;
		if (imageIndex >= length) {
			imageIndex = 0;
		}

		$scope.image = $scope.gallery[imageIndex];
		$location.search("i", imageIndex);
	};

	$scope.prev = function () {
		var length = $scope.gallery.length,
			imageIndex = getImageIndex();

		imageIndex--;
		if (imageIndex <= 0) {
			imageIndex = length - 1;
		}
		$scope.image = $scope.gallery[imageIndex];
		$location.search("i", imageIndex);
	};

	$scope.$on("global-keydown", function (e, $event) {
		var key = $event.keyCode;

		switch (key){
			case 27 : $scope.close();
				break;
		}
	});


}






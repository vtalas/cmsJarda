/*global MaspartiData, ApiWrapper*/
function galleryImageController($scope, $routeParams, test, $location) {

	$scope.$on("getAlbumPhotosSuccessx", function (e, data) {
		console.log("galleryImageController")
		$scope.gallery = data;
	});

	var getImageIndex = function () {
		return $routeParams.i;
	};

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






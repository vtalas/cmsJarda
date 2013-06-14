/*global MaspartiData, ApiWrapper*/
function galleryImageController($scope, $routeParams, api) {
	var galleryId = $routeParams.galleryId,
		imageIndex = $routeParams.imageIndex;

	$scope.route = {
		link: $routeParams.link,
		galleryId: $routeParams.galleryId,
		imageIndex: $routeParams.imageIndex
	};
	$scope.referrer = "#/page/" + $scope.route.link + "/";

	api.getAlbumPhotos(galleryId).then(function (data) {
		var copy = data.slice();
		$scope.firstPhoto = copy.splice(0, 1)[0];
		$scope.gdataAlbumPhotos = copy;

		$scope.gallery = copy;
		$scope.image = copy[imageIndex];
		$scope.ready = true;
		console.log(galleryId, copy, $scope.image.FullSize.PhotoUri)
	});

	$scope.imageUrl = function () {
		var x = "";
		if ($scope.ready) {
			x = $scope.image.fullsize.url;
		}
		return x;
	};

	$scope.close = function () {
		location.hash = $scope.referrer;
	};

	$scope.next = function () {
		var length = $scope.gallery.length;

		imageIndex++;
		if (imageIndex >= length) {
			imageIndex = 0;
		}

		location.hash =	$scope.referrer + galleryId + "/" + imageIndex;
	};

	$scope.prev = function () {
		var length = $scope.gallery.length;

		imageIndex--;
		if (imageIndex <= 0) {
			imageIndex = length - 1;
		}

		location.hash =	$scope.referrer + galleryId + "/" + imageIndex;
	};
}




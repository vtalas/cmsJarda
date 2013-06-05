/*global MaspartiData, ApiWrapper*/
function galleryImageController($scope, cmsApi, $routeParams) {
	var galleryId = $routeParams.galleryId,
		imageIndex = $routeParams.imageIndex,
		api = new ApiWrapper(cmsApi);

//	maspartiData.galleryWithInfo(galleryId).done(function (data) {
//		$scope.gallery = data;
//		$scope.image = data.images[imageIndex];
//		$scope.ready = true;
//	});


	api.getAlbumPhotos($scope.gdataAlbumId).then(function (data) {
		$scope.firstPhoto = data.splice(0, 1)[0];
		$scope.gdataAlbumPhotos = data;
		console.log($scope.gdataAlbumId, data)

		$scope.gallery = data;
		$scope.image = data[imageIndex];
		$scope.ready = true;

	});

	$scope.imageUrl = function () {
		var x = "";
		if ($scope.ready) {
			x = $scope.image.fullsize.url;
		}
		return x;
	};

	$scope.close = function () {
		location.hash = "#/g/" + galleryId;
	};

	$scope.next = function () {
		var length = $scope.gallery.images.length;

		imageIndex++;
		if (imageIndex >= length) {
			imageIndex = 0;
		}

		location.hash = "#/g/" + galleryId + "/" + imageIndex;
	};

	$scope.prev = function () {
		var length = $scope.gallery.images.length;

		imageIndex--;
		if (imageIndex <= 0) {
			imageIndex = length - 1;
		}

		location.hash = "#/g/" + galleryId + "/" + imageIndex;
	};
}




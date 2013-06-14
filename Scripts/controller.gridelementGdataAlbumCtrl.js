function gridelementGdataAlbumCtrl($scope, cmsApi, $routeParams) {
	var api = new ApiWrapper(cmsApi);

	$scope.gdataAlbumId = getAlbumId();
	$scope.route = {
		link: $routeParams.link,
		galleryId: $routeParams.galleryId,
		imageIndex: $routeParams.imageIndex
	};

	function getAlbumId() {
		var x = $scope.gridelement.Content;
		return x !== null ? x.gdataAlbumId : null;
	}

	api.getAlbumPhotos($scope.gdataAlbumId).then(function (data) {
		$scope.firstPhoto = data.splice(0, 1)[0];
		$scope.gdataAlbumPhotos = data;
	});

}
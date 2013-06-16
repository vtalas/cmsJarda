function gridelementGdataAlbumCtrl($scope, test, $routeParams, $location) {
	$scope.gdataAlbumId = getAlbumId();
	$scope.route = {
		link: $routeParams.link
	};

	function getAlbumId() {
		var x = $scope.gridelement.Content;
		return x !== null ? x.gdataAlbumId : null;
	}

	function handleUrlParams () {
		var galleryId = $routeParams.g,
			index = $routeParams.i;

		if (typeof index !== "undefined" &&  galleryId === $scope.gdataAlbumId){
			$scope.templatesss = "galleryImage.html";
			$scope.showImage(galleryId, index);
			return;
		}

		if (typeof index === "undefined"){
			$scope.show = false;
		}
		$scope.templatesss = null;
	}

	$scope.$on("$locationChangeSuccess", function () {
		handleUrlParams();
	});



	test.getAlbumPhotos($scope.gdataAlbumId).then(function (data) {
		var copy = data.slice();
		$scope.firstPhoto = copy.splice(0, 1)[0];
		$scope.gdataAlbumPhotos = copy;
		handleUrlParams();
	});

	$scope.showImage = function (galleryId, imageIndex ) {
		$location.search("i", imageIndex);
		$location.search("g", galleryId);
		$scope.image = $scope.gdataAlbumPhotos[imageIndex];
		$scope.show = true;
		$scope.$emit("getAlbumPhotosSuccess", $scope.gdataAlbumPhotos);
	};

}
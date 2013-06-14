function pageController($scope, cmsApi, $routeParams) {
	var api = new ApiWrapper(cmsApi);

	$scope.link = $routeParams.link;

	api.getPage($scope.link).then(function (data) {
		$scope.page = data;
	});

	$routeParams.aaa = "asdlaskndklas"

	//location.hash = location.hash + "key=asdkbjasdkjasbd"

	$scope.$on("set-message", function(e, message) {
	    $scope.message = message;
	});
}
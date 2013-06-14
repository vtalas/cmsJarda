var module = angular.module("defaultClient", ["apiModule"]);

module.factory('cache', ['$cacheFactory', function ($cacheFactory) {
	return $cacheFactory("jarda");
}]);

module.factory("test", ['cmsApi' ,'cache', function (cmsApi, cache) {
	return new ApiWrapper(cmsApi, cache);
}]);

module.config(['$routeProvider', '$provide', function ($routeProvider) {
	$routeProvider
		.when('/page/:link', {controller: pageController, templateUrl: 'template.page.html', resolve: {api: "test"}})
		.when('/page/:link/:galleryId/:imageIndex', {controller: galleryImageController, templateUrl: 'galleryImage.html', resolve: {api: "test"}})
		.when('/home', {controller: homeController, templateUrl: 'template.home.html'})
		.when('/login', {controller: loginController, templateUrl: 'template.login.html'})
		.otherwise({redirectTo: '/home'});
}]);

module.directive("gridelement", function ($compile, $templateCache	) {
	var directiveDefinitionObject = {
		scope: { grid: "=", gridelement: "=" },
		link: function (scope, iElement, tAttrs, controller) {
			scope.getGridElement = function (){
				return scope.gridelement;
			};

			var skin = scope.gridelement.Skin || "";
			var template = $templateCache.get(scope.gridelement.Type + skin+".thtml");
			var compiled = $compile(template)(scope);
			iElement.html(compiled);
		}
	};
	return directiveDefinitionObject;
});

module.directive("ngcGdataAlbum", ngcGdataAlbumDirective);
module.directive("ngcLazyImage", ngcLazyImage);
module.directive("ngcResponsiveImage", ngcResponsiveImage);





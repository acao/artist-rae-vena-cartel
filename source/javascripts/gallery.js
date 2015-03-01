(function () {

  var MyApp = angular.module('MyApp', ['ng', 'ngResource']);

  MyApp.factory('flickrPhotos', function ($resource) {
    return $resource('https://api.flickr.com/services/feeds/activity.gne', { format: 'json', user_id: 'raevena', jsoncallback: 'JSON_CALLBACK' }, { 'load': { 'method': 'JSONP' } });
  });

  MyApp.directive('masonry', function ($parse) {
    return {
      restrict: 'AC',
      link: function (scope, elem, attrs) {
        elem.masonry({ itemSelector: '.masonry-item', columnWidth: $parse(attrs.masonry)(scope) });
      }
    };
  });

  MyApp.directive('masonryItem', function () {
    return {
      restrict: 'AC',
      link: function (scope, elem, attrs) {
        elem.imagesLoaded(function () {
          elem.parents('.masonry').masonry('reload');
        });
      }
    };
  });

  MyApp.controller('MasonryCtrl', function ($scope, flickrPhotos) {
    $scope.photos = flickrPhotos.load({ tags: 'dogs' });
  });
});

  // // Modules
  // angular.module('gallery', [
  //   'ngRoute',
  //   'myApp.filters',
  //   'myApp.services',
  //   'myApp.directives',
  //   'myApp.controllers',
  //   'prismic.io',
  //   'ngSanitize'
  // ]).
  // config(['$routeProvider', function($routeProvider) {
  //   $routeProvider.when('/:page?', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  //   $routeProvider.when('/document/:id/:slug', {templateUrl: 'partials/document.html', controller: 'DocumentCtrl'});
  //   $routeProvider.when('/search/:q*/:page?', {templateUrl: 'partials/search.html', controller: 'SearchCtrl'});
  //   $routeProvider.otherwise({redirectTo: '/'});
  // }]).
  // config(['PrismicProvider', function(PrismicProvider) {
  //   PrismicProvider.setApiEndpoint('https://lesbonneschoses.prismic.io/api');
  //   PrismicProvider.setAccessToken('');
  //   PrismicProvider.setClientId('');
  //   PrismicProvider.setClientSecret('');
  //   PrismicProvider.setLinkResolver(function(ctx, doc) {
  //     return '#/document/' + doc.id + '/' + doc.slug + ctx.maybeRefParam;
  //   });
  // }]);
  //
  // angular.module('gallery.controllers', [])
  // .controller('GalleryCtrl', ['$scope', '$routeParams', 'Prismic', function($scope, $routeParams, Prismic) {
  //   var page = parseInt($routeParams.page) || "1";
  //   Prismic.ctx().then(function(ctx){
  //     ctx.api.form('everything').page(page).ref(ctx.ref).submit(function(err, documents){
  //       if (err) {
  //         // Should display some kind of error; will just redirect to / for now
  //         $location.path('/');
  //       }
  //       else {
  //         $scope.documents = documents;
  //         // Angular doesn't repeat over collections created on the fly, so we have to create it here
  //         if (documents.total_pages > 1) $scope.paginationRange = _.range(1, documents.total_pages+1);
  //       }
  //     });
  //   });
  // }])
  // .controller('WorkCtrl', ['$scope', '$routeParams', 'Prismic', '$location', function($scope, $routeParams, Prismic, $location) {
  //   Prismic.document($routeParams.id).then(function(document){
  //     if (document.slug === $routeParams.slug) {
  //       Prismic.ctx().then(function(ctx) {
  //         $scope.documentHtml = document.asHtml(ctx);
  //       })
  //     }
  //     else if (document.slugs.indexOf($routeParams.slug) >= 0) {
  //       $location.path('/document/'+document.id+'/'+document.slug);
  //     }
  //     else {
  //       // Should display some kind of error; will just redirect to / for now
  //       $location.path('/');
  //     }
  //   });
  // }])
  // .controller('GallerySearchCtrl', ['$scope', '$routeParams', 'Prismic', function($scope, $routeParams, Prismic) {
  //   $scope.searchq = $routeParams.q;
  //   $scope.q = $routeParams.q;
  //   var page = parseInt($routeParams.page) || "1";
  //   Prismic.ctx().then(function(ctx){
  //     ctx.api.form('everything').query('[[:d = fulltext(document, "'+$routeParams.q+'")]]')
  //     .page(page).ref(ctx.ref).submit(function(err, documents){
  //       if (err) {
  //         // Should display some kind of error; will just redirect to / for now
  //         $location.path('/');
  //       }
  //       else {
  //         $scope.documents = documents;
  //         // Angular doesn't repeat over collections created on the fly, so we have to create it here
  //         if (documents.total_pages > 1) $scope.paginationRange = _.range(1, documents.total_pages+1);
  //       }
  //     });
  //   });
  // }]);

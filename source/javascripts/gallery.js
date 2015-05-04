(function () {
// 'use strict';



  // Modules
  var gallery = angular.module('gallery', [
    'ngRoute',
    // 'gallery.directives',
    'prismic.io',
    'ngLodash'
  ]).run(function(){

  });


  gallery.config(['PrismicProvider', function(PrismicProvider) {
    PrismicProvider.setApiEndpoint('https://artist-rae-vena.cdn.prismic.io/api');
    // PrismicProvider.setAccessToken('');
    //PrismicProvider.setClientId('asdsadsa');
    // PrismicProvider.setClientSecret('');
    // PrismicProvider.setLinkResolver(function(ctx, doc) {
    //     return 'detail.html?id=' + doc.id + '&slug=' + doc.slug + ctx.maybeRefParam;
    // });
  }]);

  gallery.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/:page?', {templateUrl: 'views/artwork.html', controller: 'galleryCtrl'});
    $routeProvider.when('/artwork/:id/:slug', {templateUrl: 'views/artwork.html', controller: 'artWorkController'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);


  gallery.controller('galleryCtrl', ['$scope', '$routeParams', 'Prismic', function($scope, $routeParams, Prismic, lodash) {
    console.log('hey!');

    function getYear(year, key){
      if (!year){
        console.error('no year supplied');
        return
      }
      if (year.length !== 4){
        console.error('improper length');
        return
      }
      Prismic.api().then(function(api){
        return Prismic.ctx()
        .then(function(ctx){
          api.form('everything')
          .query('[[:d = at(document.type, "work")]]')
          .query('[[:d = at(my.work.year, "' + year + '")]]')
          .pageSize(100).page(0)
          .ref(ctx.ref).submit(function(err, queryResult) {
            if (err){
              console.log(err.data.type + ":", err.data.message);
              return;
            }
            //console.log(queryResult);
            $scope.galleryCollection[key] = {'year': year , 'items': queryResult.results};
            console.log($scope.galleryCollection);
          });
        });
      });
    }

    function getYears(){
      $scope.galleryCollection = [];
      var key=0;
      var years = ["2015", "2014", "2013", "2012", "2011"];
      angular.forEach(years, function(year, key){
        getYear(year, key);
        key++;
      })
      console.log($scope.galleryCollection)
      console.log('woah');
    }

    getYears();

    // Prismic.query('[[:d = any(document.type, "work")]]').then(function(artworks){
    //   // Set the results to scope
    //   $scope.artworks = artworks.results;
    //   console.log(artworks);
    //   zoomwall.create(window.document.getElementById('gallery-list'));

    //  //  // Angular doesn't repeat over collections created on the fly, so we have to create it here
    //  // if (artworks.total_pages > 1) $scope.paginationRange = lodash.range(page, artworks.total_pages+1);
    // });

    // init

  }]);

  // gallery.controller('artWorkController', ['$scope', '$routeParams', 'Prismic', '$location', function($scope, $routeParams, Prismic, $location) {
  //   Prismic.document($routeParams.id).then(function(document){
  //     if (document.slug === $routeParams.slug) {
  //       Prismic.ctx().then(function(ctx) {
  //         $scope.documentHtml = document.asHtml(ctx);
  //       })
  //     }
  //     else if (document.slugs.indexOf($routeParams.slug) >= 0) {
  //       $location.path('/artwork/'+document.id+'/'+document.slug);
  //     }
  //     else {
  //       // Should display some kind of error; will just redirect to / for now
  //       $location.path('/');
  //     }
  //   });
  // }]);
  // gallery.directive('galleryList', [function () {
  //   return {
  //     priority: 0,
  //     // template: '<div></div>',
  //     // templateUrl: 'directive.html',
  //     replace: true,
  //     transclude: true,
  //     restrict: 'A',
  //     scope: {},
  //     controller: function($scope, $element, $attrs, $transclude) {
  //       console.log('cats')
  //       zoomwall.create(window.document.getElementById('gallery-list'));
  //     },
  //     compile: function compile(tElement, tAttrs, transclude) {
  //       return function postLink(scope, iElement, iAttrs, controller) {
  //         pre: function preLoad(scope, iElement, iAttrs, controller) {

  //               console.log('hey again!');
  //             }
  //       }
  //     },
  //     link: function postLink(scope, iElement, iAttrs) {

  //     }
  //   };
  // }]);

  // gallery.directive('galleryItem', function ($parse){
  //   return {
  //       restrict: 'AC',
  //       // template: [
  //       //   '<div class="">',
  //       //   '',
  //       //   ''
  //       //  ].join(),
  //       link: function (scope, elem, attrs) {

  //       }
  //   };
  // });

})();

(function () {
'use strict';



  // Modules
  var gallery = angular.module('gallery', [
    'ngRoute',
    // 'gallery.directives',
    'prismic.io'
  ]).run(function(){

  });



  var container = document.querySelector('#gallery-list');
  angular.element(container).ready(function() {

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


  gallery.controller('galleryCtrl', ['$scope', '$routeParams', 'Prismic', function($scope, $routeParams, Prismic) {
    var page = parseInt($routeParams.page) || "1";
    Prismic.all().then(function(artworks){
      $scope.artworks = artworks.results;
      console.log(artworks);
      var $container = $('#gallery-list');
       angular.element($container).ready(function(){
          $container.packery({
            itemSelector: '.masonry-brick',
            width:200,
            gutter: 10
          });
          $(".fancybox").fancybox({
            padding : 0,
            beforeShow : function() {
                var alt = this.element.find('img').attr('alt');

                this.inner.find('img').attr('alt', alt);

                this.title = alt;
            },
            helpers : {
              overlay : {
                css : {
                    'background' : 'rgba(0, 0, 0, 0.95)'
                }
              }
            }
          });
        });

      // Angular doesn't repeat over collections created on the fly, so we have to create it here
     if (artworks.total_pages > 1) $scope.paginationRange = _.range(page, artworks.total_pages+1);
    });

    // init

  }]);

  gallery.controller('artWorkController', ['$scope', '$routeParams', 'Prismic', '$location', function($scope, $routeParams, Prismic, $location) {
    Prismic.document($routeParams.id).then(function(document){
      if (document.slug === $routeParams.slug) {
        Prismic.ctx().then(function(ctx) {
          $scope.documentHtml = document.asHtml(ctx);
        })
      }
      else if (document.slugs.indexOf($routeParams.slug) >= 0) {
        $location.path('/artwork/'+document.id+'/'+document.slug);
      }
      else {
        // Should display some kind of error; will just redirect to / for now
        $location.path('/');
      }
    });
  }]);

  gallery.directive('galleryList', function ($parse) {
      return {
        restrict: 'AC',
        link: function (scope, elem, attrs) {
          elem.packery({ itemSelector: '.masonry-brick', columnWidth: $parse(attrs.packery)(scope) });
        }
      };
    });

  gallery.directive('galleryItem', function () {
      return {
        restrict: 'AC',
        link: function (scope, elem, attrs) {
          elem.imagesLoaded(function () {
            elem.packery('#gallery-list').packery('reload');
          });
        }
      };
    });

})();

(function () {

  // Modules
  angular.module('gallery', ['contentful']);

  angular
  .module('gallery')
  .config(function (contentfulProvider) {
    contentfulProvider.setOptions({
      space: 'xx2y9wp4kg3n',
      accessToken: 'afb596b5275b93045f310ea870868236e6509c46f6b0a5c5a54c0df055402aba'
    });
  });

  angular
  .module('gallery')
  .controller('GalleryCtrl', function ($scope, contentful) {

    var promise;

    $scope.busy = false;
    $scope.response = null;

    $scope.$watch('action', function (action, old) {

      // Still performing previous request
      if ($scope.busy) {
        return;
      }

      if (action === old) {
        return;
      }

      promise = null;
      $scope.busy = true;

      if (action === 'space') {
        promise = contentful.space();
      }

      if (action === 'contentTypes') {
        promise = contentful.contentTypes();
      }

      if (action === 'entry') {
        promise = contentful.entry('6KntaYXaHSyIw8M6eo26OK');
      }

      if (action === 'entries') {
        promise = contentful.entries();
      }

      if (!promise) {
        $scope.response = null;
        $scope.busy = false;
        return;
      }

      promise.then(
        function (response) {
          $scope.response = response;
          $scope.busy = false;
        },
        function (response) {
          $scope.response = response;
          $scope.busy = false;
        }
      )

    });

  });

})();

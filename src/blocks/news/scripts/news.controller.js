(function(angular){
    'use strict';

    angular
        .module('tuzameApp')
        .controller('newsController', newsController);

    newsController.$inject = ['News', 'NYTimes','$scope'];

    function newsController(News, NYTimes, $scope) {

    }


})(angular);
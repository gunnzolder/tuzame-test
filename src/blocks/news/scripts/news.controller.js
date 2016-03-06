(function(angular){
    'use strict';

    angular
        .module('tuzameApp')
        .controller('newsController', newsController);

    newsController.$inject = ['News', 'NYTimes','$timeout'];

    function newsController(News, NYTimes, $timeout ) {

    }


})(angular);
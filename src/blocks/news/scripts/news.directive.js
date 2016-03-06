(function(angular){
    'use strict';

    angular
        .module('tuzameApp')
        .directive('newsWidget', newsWidget);

    newsWidget.$inject = ['News', 'NYTimes'];

    function newsWidget(News, NYTimes) {

        var directive = {
            link: link,
            controller : 'newsController',
            controllerAs : 'news',
            scope: {},
            templateUrl: 'views/news/news.html',
            restrict: 'EA'
        };

        return directive;

        function link(scope){

        }
    }


})(angular);
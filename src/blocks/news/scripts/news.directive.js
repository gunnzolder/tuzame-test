(function(angular){
    'use strict';

    angular
        .module('tuzameApp')
        .directive('newsWidget', newsWidget);

    newsWidget.$inject = ['NYTimes','$animate'];

    function newsWidget(NYTimes,$animate) {

        var directive = {
            link: link,
            scope: true,
            templateUrl: 'views/news/news.html',
            restrict: 'EA'
        };

        return directive;

        function link(scope, element, attrs){

            scope.ready = false;
            NYTimes
                .getNews({section:'world'})
                .$promise
                .then(function(data){
                    console.log(data.results);

                    scope.data = data.results;
                    scope.ready = true;
                    scope.showNews();

                });

            scope.index = 0;
            scope.current = {};

            scope.showNews = function(direction){

                var widget = angular.element(document.querySelector('.tuzame-news__widget'));

                $animate.removeClass(widget, 'animated').then(function() {
                    widget.addClass('animated');
                });

                if (scope.index>=0 && scope.index < scope.data.length && direction) {
                    (direction == 'next') ? scope.index++ : scope.index-- ;
                }

                scope.current = scope.data[scope.index];
            };

        }
    }


})(angular);
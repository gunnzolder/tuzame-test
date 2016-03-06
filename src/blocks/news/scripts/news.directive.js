(function(angular){
    'use strict';

    angular
        .module('tuzameApp')
        .directive('newsWidget', newsWidget)
        .directive('errSrc', errSrc);



    newsWidget.$inject = ['NYTimes','News','$animate'];

    function newsWidget(NYTimes,News,$animate) {

        var directive = {
            link: link,
            scope: true,
            templateUrl: 'views/news/news.html',
            restrict: 'EA'
        };

        return directive;

        function link(scope){

            scope.ready = false;
            scope.api = 'NYTimes';

            NYTimes
                .getNews({section:'world'})
                .$promise
                .then(function(data){
                    scope.data = data.results;
                    scope.ready = true;
                    scope.showNews();
                });

            scope.index = 0;
            scope.current = {};

            scope.showGivenApi = function(){
                scope.index = 0;
                scope.api = 'News';
                    News
                        .getNews()
                        .$promise
                        .then(function(data){
                            scope.data = data;
                            scope.ready = true;
                            scope.showNews();
                        });
            }

            scope.showNews = function(direction){

                var widget = angular.element(document.querySelector('.tuzame-news__widget--'+scope.api));

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

    function errSrc() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('error', function() {
                    if (attrs.src != attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);
                    }
                });
            }
        }
    }


})(angular);
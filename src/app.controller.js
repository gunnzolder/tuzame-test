(function(){
    'use strict';

    angular.module('tuzameApp')
        .run(testCtrl);

    testCtrl.$inject = ['News', 'NYTimes'];

    function testCtrl(News, NYTimes){
        var vm = this;

        //News
        //  .getNews()
        //  .$promise
        //  .then(function(data){
        //    console.log(data);
        //    angular.extend(vm,data);
        //  });

        //NYTimes
        //    .getNews({section:'world'})
        //    .$promise
        //    .then(function(data){
        //        //console.log(JSON.parse(data));
        //        console.log(data.results);
        //    });
    }


})();

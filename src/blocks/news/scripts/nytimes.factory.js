/**
 * NYT API Factory
 * @namespace Factories
 * @memberof tuzameApp
 */

(function(angular){
    'use strict';

    var NYTIMES_URL = 'http://api.nytimes.com/svc/news/v3/content/all/',
        NYTIMES_API_KEY = '29707f6e4e029b2a8d24924ef73e30fc:5:74629606';

    angular.module('tuzameApp')
        .factory ('NYTimes', NYTimesFactory);

    /**
     * @function NYTimes
     * @desc Gets the news from NYT API
     * @memberOf Factories
     * @returns {Object}
     */

    NYTimesFactory.$inject = ['$resource'];

    function NYTimesFactory($resource){

        return $resource(
            NYTIMES_URL ,
            { callback: 'JSON_CALLBACK' },
            {
                'getNews': {
                    url: NYTIMES_URL + ':section//.json',
                    section : '@section',
                    method: 'GET',
                    params : {
                        'api-key' : NYTIMES_API_KEY
                    }
                }
            }
        );
    }

})(angular);

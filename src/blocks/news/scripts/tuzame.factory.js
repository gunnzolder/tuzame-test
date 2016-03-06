/**
 * News Factory
 * @namespace Factories
 * @memberof tuzameApp
 */

(function(angular){
    'use strict';

    var NEWS_URL_BASE = 'http://test-be.tsuru2.tuzame.com/api';

    angular.module('tuzameApp')
        .factory ('News', newsFactory);

    /**
     * @function News
     * @desc Gets the news from Tuzame API
     * @memberOf Factories
     * @returns {Object}
     */

    newsFactory.$inject = ['$resource'];

    function newsFactory($resource){

        return $resource(
            NEWS_URL_BASE + '/news/:id',
            { 'id': '@id' },
            {
                'getNews': {
                    isArray: true,
                    url: NEWS_URL_BASE + '/news',
                    method: 'GET'
                }
            }
        );
    }

})(angular);

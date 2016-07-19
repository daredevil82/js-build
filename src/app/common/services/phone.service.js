/**
 *
 * @author Jason Johns <jason@academiccatalog.com>
 * Created on 7/19/16.
 */

angular.module('services')
    .factory('PhoneService', function($resource) {
        return $resource('build/assets/data/:phoneId.json', {}, {
            query : {
                method: 'GET',
                params: {phoneId: 'phones'},
                isArray: true
            }
        });
    });
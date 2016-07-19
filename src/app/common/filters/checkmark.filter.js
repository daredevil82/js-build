/**
 *
 * @author Jason Johns <jason@academiccatalog.com>
 * Created on 7/19/16.
 */

angular.module('filters')
    .filter('checkmark', function () {
        return function(input) {
            return input ? '\u2713' : '\u2718';
        }
    });
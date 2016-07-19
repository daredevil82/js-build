/**
 *
 * @author Jason Johns <jason@academiccatalog.com>
 * Created on 7/15/16.
 */

angular.module('phonecatApp', [
    'routing',
    'templates',
    'ngAnimate',
    'common',
    'phone'
])
.config(function ($logProvider) {
    $logProvider.debugEnabled(true);
})
.run(function($rootScope,$log) {

});
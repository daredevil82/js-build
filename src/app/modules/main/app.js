/**
 *
 * @author Jason Johns <jason@academiccatalog.com>
 * Created on 7/15/16.
 */

angular.module('phonecatApp', [
    'routing',
    'templates',
    'ngAnimate',
    'phone'
])
.config(function ($logProvider) {
    $logProvider.debugEnabled(true);
})
.run(function($rootScope, $state, $log) {
    $rootScope.$on('$stateChangeError', console.log.bind(console));
});
angular.module('routing', ['ngRoute'])
    .config(function ($locationProvider, $routeProvider) {
        $routeProvider.
            when('/phones', {
                template: '<phone-list></phone-list>'
            })
            .when('/phones/:phoneId', {
                template: '<phone-detail></phone-detail>'
            })
            .otherwise('/phones');
    });
        
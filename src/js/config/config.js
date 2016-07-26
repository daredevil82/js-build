function AppConfig($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
    'ngInject';

    //If you don't want hashbang routing, uncomment this line.
    // $locationprovider.html5Mode(true);

    $stateProvider
        .state('app', {
            abstract: true,
            templateUrl: 'js/layout/app-view.html'
        });

    $urlRouterProvider.otherwise('/');

}

export default AppConfig;
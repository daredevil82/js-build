function ProfileConfig($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.profile', {
            url: '/profile',
            controller: 'ProfileCtrl as $ctrl',
            templateUrl: 'js/profile/profile.html'
        });
};

export default ProfileConfig;
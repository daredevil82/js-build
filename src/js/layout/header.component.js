class AppHeaderCtrl {
    constructor(AppConstants) {
        'ngInject';

        this.appName = AppConstants.appName;
    }
}

let AppHeader =  {
    controller: AppHeaderCtrl,
    templateUrl: 'js/layout/header.html'
};

export default AppHeader;
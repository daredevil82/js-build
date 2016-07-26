class AppFooterCtrl {
    constructor(AppConstants) {
        'ngInject';
        this.appName = AppConstants.appName;
        this.date = new Date();
    }
}

let AppFooter =  {
    controller: AppFooterCtrl,
    templateUrl: 'js/layout/footer.html'
};

export default AppFooter;
class AuthCtrl {
    constructor(User, $state, $log) {
        'ngInject';

        this.title = $state.current.title;
        this.authType = $state.current.name.replace('app.', '');
    }

    submitForm() {
        this.isSubmitting = true;
        $log.info(this.formData);
    }
}

export default AuthCtrl;
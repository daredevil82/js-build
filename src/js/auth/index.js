import angular from 'angular';
import AuthConfig from './auth.config';
import AuthCtrl from './auth.controller';

let authModule = angular.module('app.auth', [])
                    .config(AuthConfig)
                    .controller('AuthCtrl', AuthCtrl);

export default authModule;
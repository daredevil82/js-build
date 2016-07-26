import angular from 'angular';
import ProfileConfig from './profile.config';
import ProfileCtrl from './profile.controller';

let profileModule = angular.module('app.profile', []);
profileModule.config(ProfileConfig);
profileModule.controller('ProfileCtrl', ProfileCtrl);

export default profileModule;
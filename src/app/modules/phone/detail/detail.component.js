/**
 *
 * @author Jason Johns <jason@academiccatalog.com>
 * Created on 7/19/16.
 */

angular.module('phoneDetail')
    .component('phoneDetail', {
       templateUrl: 'modules/phone/detail/detail.tpl.html',
        controller: function PhoneDetailController($routeParams, $http, PhoneService) {
            var self = this;
            self.phone = PhoneService.get({phoneId: $routeParams.phoneId}, function (phone) {
                self.setImage(phone.images[0]);
            });

            self.setImage = function setImage(imageUrl) {
                self.mainImageUrl = imageUrl;
            };

            // $http.get('build/assets/data/' + $routeParams.phoneId + '.json')
            //     .then(function(response) {
            //         self.phone = response.data;
            //         self.setImage(self.phone.images[0]);
            //     });
        }
    });
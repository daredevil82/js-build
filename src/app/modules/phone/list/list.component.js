/**
 *
 * @author Jason Johns <jason@academiccatalog.com>
 * Created on 7/15/16.
 */

angular.module('phoneList')
    .component('phoneList', {
        templateUrl: 'phone/list/list.tpl.html',
        controller : function PhoneListController ($http) {
            // this.phones = [
            //     {
            //         name: 'Nexus S',
            //         snippet: 'Fast just got faster with Nexus S.',
            //         age : 1
            //     },
            //     {
            //         name: 'Motorola XOOM™ with Wi-Fi',
            //         snippet: 'The Next, Next Generation tablet.',
            //         age: 2
            //     },
            //     {
            //         name: 'MOTOROLA XOOM™',
            //         snippet: 'The Next, Next Generation tablet.',
            //         age : 3
            //     }
            // ];
            
            var self = this;
            self.orderProp = 'age';

            $http.get('build/assets/data/phones.json')
                .then(function(response) {
                    self.phones = response.data;
                });
        }
    });
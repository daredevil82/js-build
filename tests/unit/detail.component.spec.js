/**
 *
 * @author Jason Johns <jason@academiccatalog.com>
 * Created on 7/19/16.
 */

describe('phoneDetail', function() {
    beforeEach(module('ngRoute')); //Need to inject router for details access
    beforeEach(module('phoneDetail'));

    describe('PhoneDetailController', function () {
        var $httpBackend, ctrl;

        beforeEach(inject(function ($componentController, _$httpBackend_, $routeParams) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('build/assets/data/xyz.json')
                .respond({name: 'phone xyz'});

            $routeParams.phoneId = 'xyz';
            ctrl = $componentController('phoneDetail');
        }));

        it('should fetch phone details', function () {
            expect(ctrl.phone).toBeUndefined();
            $httpBackend.flush();
            expect(ctrl.phone).toEqual({name: 'phone xyz'});
        });
    });
});
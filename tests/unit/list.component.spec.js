/**
 *
 * @author Jason Johns <jason@academiccatalog.com>
 * Created on 7/15/16.
 */

describe('phoneList', function () {
    
    //load the module that contains the 'phoneList' component before each test
    beforeEach(module('phoneList'));

    describe('PhoneListController', function() {

        var ctrl, $httpBackend;
        var testData = [{'name': 'Nexus S'}, {'name': 'Motorola DROID'}];

        beforeEach(inject(function($componentController, _$httpBackend_){
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('build/assets/data/phones.json')
                .respond(testData);

            ctrl = $componentController('phoneList');
        }));

        it('should create a `phones` property with 2 items fetched via $http', function () {
            expect(ctrl.phones).toBeUndefined();

            $httpBackend.flush();
            expect(ctrl.phones).toEqual(testData);
        });

        // it('should create a `phones` model with 3 phones', inject(function ($componentController) {
        //     ctrl = $componentController('phoneList');
        //
        //     expect(ctrl.phones.length).toBe(3);
        // }));

        it('should set a default value for the `orderProp` model', function () {
            expect(ctrl.orderProp).toBe('age');
        });

    });
    
    
});
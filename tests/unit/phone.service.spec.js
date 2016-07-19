/**
 *
 * @author Jason Johns <jason@academiccatalog.com>
 * Created on 7/19/16.
 */

describe('PhoneService', function () {
    var $httpBackend,
        PhoneService,
        phoneData = [
            {name: 'Phone X'},
            {name: 'Phone Y'},
            {name: 'Phone Z'}
        ];
    
    //add custom equality tester before each test
    beforeEach(function () {
        jasmine.addCustomEqualityTester(angular.equals);
    });

    beforeEach(module('ngResource'));
    beforeEach(module('services'));

    //instanciate service and 'train' $httpBackend before each test
    beforeEach(inject(function($_httpBackend_, _PhoneService_) {
        $httpBackend = $_httpBackend_;
        PhoneService = _PhoneService_;

        $httpBackend.expectGET('build/assets/data/phones.json')
            .respond(phoneData);
    }));

    //verify there are no outstanding expectations or requests after each test
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    })

    it('should fetch phone data from /build/assets/data/phones.json', function () {
        expect(phones).toEqual([]);
        $httpBackend.flush();
        expect(phones).toEqual(phoneData);
    });
});
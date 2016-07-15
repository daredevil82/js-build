/**
 *
 * @author Jason Johns <jason@academiccatalog.com>
 * Created on 7/15/16.
 */


describe('PhoneCat Application', function () {
    describe('phoneList', function () {
        beforeEach(function () {
            browser.get('index.html');
        });
        
        it('should filter phone list as user types into search box', function () {
            var phoneList = element.all(by.repeater('phone in $ctrl.phones')),
                query = element(by.model('$ctrl.query'));
            
            expect(phoneList.count()).toBe(3);
            
            query.sendKeys('nexus');
            expect(phoneList.count()).toBe(1);
            
            query.clear()
            query.sendKeys('motorola');
            expect(phoneList.count()).toBe(2);
            
        });

        it('should be possible to control phone order by dropdown', function () {
            var queryField = element(by.model('$ctrl.query')),
                orderSelect = element(by.model('$ctrl.orderProp')),
                nameOption = orderSelect.element(by.css('option[value="name"]')),
                nameColumn = element.all(by.repeater('phone in $ctrl.phones').column('phone.name'));

            function getNames() {
                return nameColumn.map(function(elem) {
                    return elem.getText();
                });
            }

            queryField.sendKeys('tablet');

            expect(getNames()).toEqual([
                'Motorola XOOM\u2122 with Wi-Fi',
                'MOTOROLA XOOM\u2122'
            ]);

            nameOption.click();

            expect(getNames()).toEqual([
                'MOTOROLA XOOM\u2122',
                'Motorola XOOM\u2122 with Wi-Fi'
            ]);


        });
    });
});
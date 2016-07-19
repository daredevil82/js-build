/**
 *
 * @author Jason Johns <jason@academiccatalog.com>
 * Created on 7/19/16.
 */

describe('checkmark', function () {
    beforeEach(module('common'));

    it('should convert boolean values to unicode checkmark or cross', inject(function (checkmarkFilter) {
        expect(checkmarkFilter(true)).toBe('\u2713');
        expect(checkmarkFilter(false)).toBe('\u2718');
    }));
});
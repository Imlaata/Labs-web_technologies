import { expect } from 'chai';
import { Validation } from '../src/utils/validators';

describe('Validation Namespace Tests', () => {
    it('should validate non-empty string', () => {
        expect(Validation.isNonEmpty('  Test  ')).to.be.true;
        expect(Validation.isNonEmpty('   ')).to.be.false;
    });

    it('should validate numeric user ID', () => {
        expect(Validation.isNumericId('1725533394038')).to.be.true;
        expect(Validation.isNumericId('123abc')).to.be.false;
    });

    it('should validate publication year', () => {
        expect(Validation.isValidYear('2024')).to.be.true;
        expect(Validation.isValidYear('1999')).to.be.true;
        expect(Validation.isValidYear('99')).to.be.false;
        expect(Validation.isValidYear('2050')).to.be.false;
    });
});
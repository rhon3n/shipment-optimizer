import assert from 'assert';
import { calculateSuitabilityScore, calculateTotalSuitabilityScore, optimizeShipments } from '../app.js';

// Test calculateSuitabilityScore function
describe('calculateSuitabilityScore', () => {
    it('should calculate suitability score correctly for even length shipment', () => {
      const ss = calculateSuitabilityScore('44 Fake Dr., San Diego, CA 92122', 'Danielya');
      assert.strictEqual(ss, 9); // Even destination length, 4 vowels, 2 common factors (2, 4) --> 4 * 1.5 = 6 * 1.5 = 9
    });
  
    it('should calculate suitability score correctly for odd length shipment', () => {
      const ss = calculateSuitabilityScore('100 Elm Ave., Springfield, IL 62701', 'John Smit');
      assert.strictEqual(ss, 6); // Odd destination length, 6 consonants --> 6 * 1 = 6
    });
  
    it('should increase suitability score if even shipment length shares common factors with driver length', () => {
      const ss1 = calculateSuitabilityScore('100 Elm St., Springfield, IL 62701', 'John Jonn');
      const ss2 = calculateSuitabilityScore('88 Oak Ave., Tampa, FL 33610', 'John Johnson');
      assert.strictEqual(ss1, 3); // Even destination legnth, so base SS is , no common factor
      assert.strictEqual(ss2, 6.75); // Even destination length, so base SS is 4.5, common factor so 4.5 * 1.5
    });

    it('should increase suitability score if odd shipment length shares common factors with driver length', () => {
        const ss1 = calculateSuitabilityScore('100 Elm Ave., Springfield, IL 62701', 'John Johnson');
        const ss2 = calculateSuitabilityScore('88 Oak St., Tampa, FL 33610', 'John Jinn');
        assert.strictEqual(ss1, 8); // Odd destination length, so base SS is 8, no common factor
        assert.strictEqual(ss2, 9); // Odd destination length, so base SS is 6, common factor so 6 * 1.5
    });
  });

// Test optimizeShipments function
describe('optimizeShipments', () => {
    it('should return a map of size 3 if 3 shipments and 3 drivers are provided', () => {
        const matches = optimizeShipments(['1', '2', '3'], ['John Johnson', 'John Jonn', 'Vulture Mango']);
        assert.strictEqual(matches.size, 3);
    });    
});

// Test calculateTotalSuitabilityScore function
describe('calculateTotalSuitabilityScore', () => {
    it('should return a total suitability score of 0 if no matches are provided', () => {
        const matches = new Map();
        const totalSS = calculateTotalSuitabilityScore(matches);
        assert.strictEqual(totalSS, 0);
    });
});

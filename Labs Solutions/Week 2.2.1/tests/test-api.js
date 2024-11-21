// test-api.js
import { DictionaryAPI } from '../modules/api.js';

async function testDictionaryAPI() {
  try {
    // Test 1: Valid word with structure validation
    console.log('Testing valid word "keyboard"...');
    const result = await DictionaryAPI.searchWord('Car');
    
    // Validate data structure
    validateWordData(result[0]);
    console.log('✓ Data structure is valid');
    console.log('Response:', result[0]);

    // Test 2: Non-existent word
    console.log('\nTesting non-existent word "asdfgh"...');
    try {
      await DictionaryAPI.searchWord('asdfgh');
      console.log('✗ Should have thrown an error');
    } catch (error) {
      console.log('✓ Expected error:', error.message);
    }

    // Test 3: Network error simulation
    console.log('\nTesting network error handling...');
    try {
      // Force a TypeError
      const originalFetch = window.fetch;
      window.fetch = () => Promise.reject(new TypeError('Failed to fetch'));
      
      await DictionaryAPI.searchWord('test');
      console.log('✗ Should have thrown an error');
      
      window.fetch = originalFetch;
    } catch (error) {
      console.log('✓ Expected error:', error.message);
    }

  } catch (error) {
    console.error('Test failed:', error);
  }
}

function validateWordData(data) {
  // Required fields
  const requiredFields = ['word', 'phonetics', 'meanings', 'sourceUrls'];
  
  requiredFields.forEach(field => {
    if (!(field in data)) {
      throw new Error(`Missing required field: ${field}`);
    }
  });

  // Validate phonetics structure
  if (!Array.isArray(data.phonetics)) {
    throw new Error('Phonetics should be an array');
  }

  // Validate meanings structure
  if (!Array.isArray(data.meanings)) {
    throw new Error('Meanings should be an array');
  }

  data.meanings.forEach(meaning => {
    if (!meaning.partOfSpeech || !Array.isArray(meaning.definitions)) {
      throw new Error('Invalid meaning structure');
    }
  });

  return true;
}

// Run tests
testDictionaryAPI();
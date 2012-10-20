'use strict';

module('API.getSuggestions()');

test('Google should return search suggestions', function () {
  stop();

  API.getSuggestions('google', 'Hello', function (result) {
    ok(Array.isArray(result), 'result is an array.');

    ok(true, 'results: ' + result.join(','));
    start();
  });
});

test('Yahoo should return search suggestions', function () {
  stop();

  API.getSuggestions('yahoo', 'Hello', function (result) {
    ok(Array.isArray(result), 'result is an array.');

    ok(true, 'results: ' + result.join(','));
    start();
  });
});

test('Google should return search Chinese suggestions', function () {
  stop();

  API.getSuggestions('google', '康熙', function (result) {
    ok(Array.isArray(result), 'result is an array.');

    ok(true, 'results: ' + result.join(','));
    start();
  });
});

test('Yahoo should return search Chinese suggestions', function () {
  stop();

  API.getSuggestions('yahoo', '康熙', function (result) {
    ok(Array.isArray(result), 'result is an array.');

    ok(true, 'results: ' + result.join(','));
    start();
  });
});

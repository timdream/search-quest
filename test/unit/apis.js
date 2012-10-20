'use strict';

module('API.getSuggestions()');

test('Google should return search suggestions', function () {
  stop();

  API.getSuggestions('google', 'Hello', function (result) {
    ok(Array.isArray(result), 'result is an array.');

    ok(true, 'results: ' + (result || []).join(','));
    start();
  });
});

test('Yahoo should return search suggestions', function () {
  stop();

  API.getSuggestions('yahoo', 'Hello', function (result) {
    ok(Array.isArray(result), 'result is an array.');

    ok(true, 'results: ' + (result || []).join(','));
    start();
  });
});

test('Bing should return search suggestions', function () {
  stop();

  API.getSuggestions('bing', 'Hello', function (result) {
    ok(Array.isArray(result), 'result is an array.');

    ok(true, 'results: ' + (result || []).join(','));
    start();
  });
});

test('Google should return search Chinese suggestions', function () {
  stop();

  API.getSuggestions('google', '康熙', function (result) {
    ok(Array.isArray(result), 'result is an array.');

    ok(true, 'results: ' + (result || []).join(','));
    start();
  });
});

test('Yahoo should return search Chinese suggestions', function () {
  stop();

  API.getSuggestions('yahoo', '康熙', function (result) {
    ok(Array.isArray(result), 'result is an array.');

    ok(true, 'results: ' + (result || []).join(','));
    start();
  });
});

test('Bing should return search Chinese suggestions', function () {
  stop();

  API.getSuggestions('bing', '康熙', function (result) {
    ok(Array.isArray(result), 'result is an array.');

    ok(true, 'results: ' + (result || []).join(','));
    start();
  });
});

module('API.getYSearchText()');

test('Function should return search result text', function () {
  stop();

  API.getYSearchText('Hello', function (result) {
    ok(result, 'result returned.');

    ok(true, 'results: ' + result);
    start();
  });
});

test('Function should return Chinese search result text', function () {
  stop();

  API.getYSearchText('康熙', function (result) {
    ok(result, 'result returned.');

    ok(true, 'results: ' + result);
    start();
  });
});

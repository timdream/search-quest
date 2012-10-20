'use strict';

// All server bound function goes here (except special one)

var API = API || {};

(function ($) {

API.getSuggestions = function (source, term, callback) {
  term = $.trim(term).toLowerCase();
  switch (source.toLowerCase()) {
    case 'yahoo':
      $.getJSON(
        'http://sugg.tw.search.yahoo.net/gossip-tw/?output=fxjsonp&droprotated=1' +
          '&command=' + encodeURIComponent(term) + '&callback=?',
        function (data) {
          if (!data || !data[1] || !Array.isArray(data[1])) {
            callback();
            return;
          }

          callback(data[1]);
        }
      );
      break;

    case 'google':
      $.getJSON(
        'https://clients1.google.com/complete/search?client=serp&q=' +
          encodeURIComponent(term) + '&callback=?',
        function (data) {
          if (!data || !data[1] || !Array.isArray(data[1])) {
            callback();
            return;
          }

          // flatten Google result
          var result = [];
          data[1].forEach(function (item) {
            result.push(item[0].replace(/<\/?b>/g, ''));
          });

          callback(result);
        }
      );
      break;

    case 'bing':
      $.getJSON(
        'http://api.bing.com/qsonhs.aspx?type=cb&q=' +
          encodeURIComponent(term) + '&cb=?',
        function (data) {
          if (!data ||
              !data.AS ||
              !data.AS.Results ||
              !data.AS.Results[0] ||
              !data.AS.Results[0].Suggests) {
            callback();
            return;
          }

          // flatten Bing result
          var result = [];
          data.AS.Results[0].Suggests.forEach(function (item) {
            result.push(item.Txt);
          });

          callback(result);
        }
      );
      break;
  }
};

})(jQuery);

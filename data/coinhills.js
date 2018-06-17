var fs = require('fs');
var casper = require('casper').create({
  verbose: true,
  logLevel: 'debug'
});
var resultJSON = {};
var result = [];
var arr = [
  '/',
  '/rank-for/btc/',
  '/rank-for/bch/',
  '/rank-for/eth/',
  '/rank-for/etc/',
  '/rank-for/ltc/',
  '/rank-for/dash/',
  '/rank-for/eos/',
  '/rank-for/iota/',
  '/rank-for/xrp/',
  '/rank-for/xmr/',
  '/rank-for/qtum/'
];

casper.start().each(arr, function(self, data) {
  self.thenOpen(
    'https://www.coinhills.com/ko/market/exchange' + data,
    function() {
      self.waitForSelector('#el_container');

      self.then(function() {
        var tempObj = {};
        var tradingVolume = this.evaluate(function() {
          return document.querySelector(
            '#mt_h_container .c-bitcoin'
          ).textContent;
        });
        var altVolume = this.evaluate(function() {
          return document.querySelector(
            '#mt_h_container .c-altcoin'
          ).textContent;
        });
        var info = this.evaluate(function() {
          var els = document.querySelectorAll('.el:not(#el_template)');
          return Array.prototype.map.call(els, function(el) {
            return {
              name: el.querySelector('.src-name').textContent,
              info: {
                market: el.querySelector('.market span:nth-of-type(1)')
                  .textContent,
                coin: el.querySelector('.market span:nth-of-type(2)')
                  .textContent
              },
              volume: el.querySelector('.c-bitcoin').textContent,
              rank: el.querySelector('.rank').textContent,
              portion: el.querySelector('.portion').textContent,
              altCoin: el.querySelector('.c-altcoin').textContent
            };
          });
        });

        tempObj['volume'] = tradingVolume;
        tempObj['altVolume'] = altVolume;
        tempObj['data'] = info;
        result.push(tempObj);
      });
    }
  );
});

casper.then(function() {
  resultJSON['data'] = result;
  fs.write('./json/coinhills.json', JSON.stringify(resultJSON), 'w');
});
casper.run();

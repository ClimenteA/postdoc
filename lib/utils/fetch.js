const https = require('https');

/**
 * Creates a simple fetch-like response.
 *
 * @param {string} data
 */
const makeFetchResponse = (data) => ({
  text: () => data,
  json: () => JSON.parse(data)
});

/**
 * A very simple Fetch API polyfill.
 *
 * @param {string|URL} url
 * @param {import('https').RequestOptions} [options] 
 */
exports.fetch = (url, options) => new Promise((resolve, reject) => 
  https.request(url, options)
    .on('response', (response) => {
      let data = '';

      response
        .setEncoding('utf8')
        .on('data', (chunk) => data += chunk)
        .on('error', reject)
        .on('end', () => resolve(makeFetchResponse(data)));
    })
    .on('error', reject)
    .end()
);

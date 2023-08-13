const { JSDOM } = require("jsdom");

// https://github.com/jsdom/jsdom

function getUrlFromHTML(htmlBody, baseUrl) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.startsWith("/")) {
      // relative url
      try {
        const urlObj = new URL(baseUrl + linkElement.href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`error with relative url: ${error.message}`);
      }
    } else {
      // absolute url
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`error with absolute url: ${error.message}`);
      }
    }
  }
  return urls;
}

function normalizeUrl(urlString) {
  const url = new URL(urlString);

  if (url.pathname.length > 0 && url.pathname.endsWith("/")) {
    const path = url.pathname.slice(0, -1);
    return url.hostname + path;
  }
  return url.hostname + url.pathname;
}

module.exports = {
  normalizeUrl,
  getUrlFromHTML,
};

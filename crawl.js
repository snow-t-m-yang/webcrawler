const { JSDOM } = require("jsdom");

// https://github.com/jsdom/jsdom

async function crawl(baseUrl, currentUrl, pages) {
  const baseUrlObj = new URL(baseUrl);
  const currentUrlObj = new URL(currentUrl);

  if (baseUrlObj.hostname !== currentUrlObj.hostname) {
    return pages;
  }

  const normalizeCurrentUrl = normalizeUrl(currentUrl);

  if (pages[normalizeCurrentUrl] > 0) {
    pages[normalizeCurrentUrl] += 1;
    return pages;
  }

  // first time we've seen this page
  pages[normalizeCurrentUrl] = 1;

  console.log(`📣 crawling ${currentUrl}`);

  try {
    const resp = await fetch(currentUrl);

    if (resp.status > 399) {
      console.log(`⚠️ error fetching ${currentUrl}: ${resp.status}`);
      return pages;
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`⚠️ error fetching ${currentUrl}: not html on ${currentUrl}`);
    }

    const htmlBody = await resp.text();
    const nextUrls = getUrlFromHTML(htmlBody, baseUrl);
    for (const nextUrl of nextUrls) {
      pages = await crawl(baseUrl, nextUrl, pages);
    }
  } catch (error) {
    console.log(`⚠️ error fetching ${currentUrl}: ${error.message}`);
  }

  return pages;
}

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
  crawl,
  normalizeUrl,
  getUrlFromHTML,
};

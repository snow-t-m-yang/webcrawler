const { normalizeUrl, getUrlFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeUrl strip protocal", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";

  expect(actual).toBe(expected);
});

test("normalizeUrl strip trailling slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";

  expect(actual).toBe(expected);
});

test("normalizeUrl capitals", () => {
  const input = "https://BLOG.boot.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";

  expect(actual).toBe(expected);
});

test("normalizeUrl strip http", () => {
  const input = "http://blog.boot.dev/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";

  expect(actual).toBe(expected);
});

test("getUrlFromHTML absolute", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href='https://blog.boot.dev/'>
        Boot.dev Blog
      </a>
    </body>
  </html>
  `;
  const inputBaseUrl = "blog.boot.dev";
  const actual = getUrlFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/"];

  expect(actual).toEqual(expected);
});

test("getUrlFromHTML relative", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href='/path/'>
        Boot.dev Blog
      </a>
    </body>
  </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getUrlFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = ["https://blog.boot.dev/path/"];

  expect(actual).toEqual(expected);
});

test("getUrlFromHTML both", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href='https://blog.boot.dev/path1/'>
        Boot.dev Blog path 1
      </a>
      <a href='/path2/'>
        Boot.dev Blog path 2
      </a>
    </body>
  </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getUrlFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = [
    "https://blog.boot.dev/path1/",
    "https://blog.boot.dev/path2/",
  ];

  expect(actual).toEqual(expected);
});

test("getUrlFromHTML invalid", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href='invalid'>
        invalid URL!
      </a>
    </body>
  </html>
  `;
  const inputBaseUrl = "https://blog.boot.dev";
  const actual = getUrlFromHTML(inputHTMLBody, inputBaseUrl);
  const expected = [];

  expect(actual).toEqual(expected);
});

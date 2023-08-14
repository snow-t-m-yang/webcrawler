const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sortPages 2 pages", () => {
  const input = {
    "https://snow-yang.vercel.app/path": 1,
    "https://snow-yang.vercel.app/": 3,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://snow-yang.vercel.app/", 3],
    ["https://snow-yang.vercel.app/path", 1],
  ];

  expect(actual).toEqual(expected);
});

test("sortPages", () => {
  const input = {
    "https://snow-yang.vercel.app/path": 1,
    "https://snow-yang.vercel.app/": 3,
    "https://snow-yang.vercel.app/path2": 2,
    "https://snow-yang.vercel.app/path3": 6,
    "https://snow-yang.vercel.app/path4": 9,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://snow-yang.vercel.app/path4", 9],
    ["https://snow-yang.vercel.app/path3", 6],
    ["https://snow-yang.vercel.app/", 3],
    ["https://snow-yang.vercel.app/path2", 2],
    ["https://snow-yang.vercel.app/path", 1],
  ];

  expect(actual).toEqual(expected);
});

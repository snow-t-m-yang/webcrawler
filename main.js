const { crawl } = require("./crawl.js");
const { printReport, sortPages } = require("./report.js");

async function main() {
  if (process.argv.length < 3) {
    console.log("not wbesite provided");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("one argument only");
    process.exit(1);
  }

  const baseUrl = process.argv[2];

  console.log("🔥 starting crawling 👉", baseUrl);

  const pages = await crawl(baseUrl, baseUrl, {});
  printReport(pages);
}

main();

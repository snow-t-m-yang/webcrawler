const { crawl } = require("./crawl.js");

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

  console.log("starting main.js 👉", baseUrl);

  const pages = await crawl(baseUrl, baseUrl, {});

  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}

main();

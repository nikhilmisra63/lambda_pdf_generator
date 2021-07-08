const chromium = require("chrome-aws-lambda");
exports.handler = async (event) => {
  return new Promise(function (resolve, reject) {
    const { html } = event;
    let pdfBuffer;
    let browser;
    try {
      browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
      });
    } catch (error) {
      return reject(error);
    }
    try {
      const page = await browser.newPage();
      await page.setContent(html);

      pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: `<div id="header-template" style="font-size:10px !important; color:#808080; padding-left:10px"> Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`,
        footerTemplate: `<div />`,
        margin: {
          top: "50px",
          bottom: "30px",
          right: "30px",
          left: "30px",
        },
      });
    } catch (error) {
      return reject(error);
    } finally {
      if (browser !== null) {
        await browser.close();
      }
    }
    return resolve(pdfBuffer);
  });
};

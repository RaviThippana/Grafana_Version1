const { test, expect, Page } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");
const LoginTestData = JSON.parse(
  JSON.stringify(require("../TestData/LoginPageTestData.json"))
);
const AboutPageTestData = JSON.parse(
  JSON.stringify(require("../TestData/AboutPageTestData.json"))
);

test.describe.serial("About Page", async () => {
  let page = Page;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      recordVideo: { dir: "./videos/" },
    });
    page = await context.newPage();

    await page.goto("https://104.211.229.198/");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveTitle("Grafana");
  });

  test("01.Login", async () => {
    const poManager = new POManager(page);
    const loginpage = poManager.GetLoginPage();
    await loginpage.Login(LoginTestData.userName, LoginTestData.password);
    await page.waitForLoadState("networkidle");
  });

  test("02. Verifying About Page - VQA - 218/219 & 221", async () => {
    const poManager = new POManager(page);
    const aboutPage = poManager.GetAboutPage();
    await aboutPage.VuSmartMaps.hover();

    await page.waitForLoadState("networkidle");
    await aboutPage.About.click(),
      // ***VQA-218 -Verifying the About Page ****
      await expect
        .soft(aboutPage.SoftwareRelease)
        .toHaveText(AboutPageTestData.SoftwareRelease);
    await expect
      .soft(aboutPage.CompanyInfo)
      .toHaveText(AboutPageTestData.CompanyInfo);

    // ***VQA-219 -Software Release Section in About Page ****

    await expect.soft(aboutPage.Version).toHaveText(AboutPageTestData.Version);
    await expect.soft(aboutPage.Vienna).toHaveText(AboutPageTestData.Vienna);
    await expect.soft(aboutPage.Cairo).toHaveText(AboutPageTestData.Cairo);

    //***VQA-221 Verify the Company Information section in About page */

    await expect
      .soft(aboutPage.CompanyName)
      .toHaveText(AboutPageTestData.CompanyName);
    await expect.soft(aboutPage.Email).toHaveText(AboutPageTestData.Email);
    await expect
      .soft(aboutPage.PhoneNumber)
      .toHaveText(AboutPageTestData.PhoneNumber);
  });

  test("03. Validating Tool Tips in Edit Pop Screen - VQA-224", async () => {
    const poManager = new POManager(page);
    const aboutPage = poManager.GetAboutPage();
    await aboutPage.EditButton.click();
    await aboutPage.AboutToolTipValidation(page);
  });

  test("04. Verifying the company information section after editing the details-VQA-232", async () => {
    const poManager = new POManager(page);
    const aboutPage = poManager.GetAboutPage();

    await aboutPage.CompanyNameTextField.fill(
      AboutPageTestData.EditCompanyName
    );
    await aboutPage.EmailTextField.fill(AboutPageTestData.EditEmailID);
    await aboutPage.PhoneNoTextField.fill(AboutPageTestData.EditPhoneNumber);

    await aboutPage.SaveButton.click();

    const ActualCompanyInfo = await aboutPage.ActualCompanyInfo.textContent();
    expect.soft(AboutPageTestData.EditCompanyName).toEqual(ActualCompanyInfo);
    const ActualEmailIDInfo = await aboutPage.ActualEmailID.textContent();
    expect.soft(AboutPageTestData.EditEmailID).toEqual(ActualEmailIDInfo);
    const ActualPhoneNo = await aboutPage.ActualPhoneNumber.textContent();
    expect.soft(AboutPageTestData.EditPhoneNumber).toEqual(ActualPhoneNo);
  });
});

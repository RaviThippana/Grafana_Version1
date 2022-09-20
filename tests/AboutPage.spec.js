const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObjects/POManager");
const { ReusableFunctions } = require("../Utilities/ReusableFunctions");
const LoginTestData = JSON.parse(
  JSON.stringify(require("../TestData/LoginPageTestData.json"))
);
const AboutPageTestData = JSON.parse(
  JSON.stringify(require("../TestData/AboutPageTestData.json"))
);

test("Grafana About Page", async ({ page }) => {
  // const context = await browser.newContext({ ignoreHTTPSErrors: true });
  //  const page = await context.newPage();
  const poManager = new POManager(page);
  const ReuseFunctions = new ReusableFunctions();
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveTitle("Grafana");
  const loginpage = poManager.GetLoginPage();
  await loginpage.Login(LoginTestData.userName, LoginTestData.password);

  await page.waitForLoadState("networkidle");
  const aboutPage = poManager.GetAboutPage();
  await aboutPage.VuSmartMaps.hover();

  await page.waitForLoadState("networkidle");
  await aboutPage.About.click(),
    // ***VQA-218 -Verifying the About Page ****
    await page.waitForLoadState("networkidle");

  let softrele = await aboutPage.SoftwareRelease.textContent();
  softrele = softrele.trim();
  expect.soft(softrele).toEqual(AboutPageTestData.SoftwareRelease);
  let compinfo = await aboutPage.CompanyInfo.textContent();
  compinfo = compinfo.trim();
  expect.soft(compinfo).toEqual(AboutPageTestData.CompanyInfo);

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

  //***VQA-224  Validating the tooltips in Edit pop-up screen */

  await aboutPage.EditButton.click();
  await aboutPage.AboutToolTipValidation(page);

  //******   VAQ-226 Verifying the Character limit of Company name field
  // VQA-229 Verifying the Email field....
  // VQA-230 Verifying the Phone Number field....
  await aboutPage.TextFieldValidations(page);

  // VQA-232 Verifying the company information section after editing the details

  await aboutPage.CompanyNameTextField.fill(AboutPageTestData.EditCompanyName);
  await aboutPage.EmailTextField.fill(AboutPageTestData.EditEmailID);
  await aboutPage.PhoneNoTextField.fill(AboutPageTestData.EditPhoneNumber);

  await aboutPage.SaveButton.click();

  const ActualCompanyInfo = await aboutPage.ActualCompanyInfo.textContent();
  expect.soft(AboutPageTestData.EditCompanyName).toEqual(ActualCompanyInfo);
  const ActualEmailIDInfo = await aboutPage.ActualEmailID.textContent();
  expect.soft(AboutPageTestData.EditEmailID).toEqual(ActualEmailIDInfo);
  const ActualPhoneNo = await aboutPage.ActualPhoneNumber.textContent();
  expect
    .soft(AboutPageTestData.EditPhoneNumber, "Phone Number Mismatches..")
    .toEqual(ActualPhoneNo);

  await aboutPage.Admin.hover();
  await aboutPage.SignOut.click();
});

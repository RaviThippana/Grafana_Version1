const { expect } = require("@playwright/test");
const AboutPageTestData = JSON.parse(
  JSON.stringify(require("../TestData/AboutPageTestData.json"))
);
const { ReusableFunctions } = require("../Utilities/ReusableFunctions");

class AboutPage {
  constructor(page) {
    this.VuSmartMaps = page.locator("[aria-label='vuSmartMaps']");
    this.About = page.locator("//div[contains(text(),'About')]");
    this.Admin = page.locator("//a[@aria-label='admin']");
    this.SignOut = page.locator("//div[contains(text(),'Sign out')]");
    this.EditButton = page.locator("[aria-label='Edit']");
    this.SoftwareRelease = page.locator(
      "(//h2[normalize-space()='Software Release'])"
    );
    this.CompanyInfo = page.locator(
      "(//h2[normalize-space()='Company Information'])"
    );
    this.Version = page.locator("(//span[normalize-space()='Version'])");
    this.Vienna = page.locator("(//span[normalize-space()='Vienna'])");
    this.Cairo = page.locator("(//span[normalize-space()='Cairo'])");
    this.CompanyName = page.locator(
      "(//span[normalize-space()='Company Name'])"
    );
    this.Email = page.locator("(//span[normalize-space()='Email'])");
    this.PhoneNumber = page.locator(
      "(//span[normalize-space()='Phone Number'])"
    );
    this.CompanyNameToolTip = page.locator(
      "//div[normalize-space()='Company Name']//div[@class='css-r6b460-Icon']//*[name()='svg']"
    );
    this.EmailIDToolTip = page.locator(
      "//div[normalize-space()='Email']//div[@class='css-r6b460-Icon']//*[name()='svg']"
    );

    this.PhoneToolTip = page.locator(
      "//div[normalize-space()='Phone Number']//div[@class='css-r6b460-Icon']//*[name()='svg']"
    );

    this.CompanyNameToolTipText = page.locator(
      "//div[@class='popper__background' and contains(text(),'company')]"
    );
    this.EmailIDToolTipText = page.locator(
      "//div[@class='popper__background' and contains(text(),'Email')]"
    );
    this.PhoneToolTipText = page.locator(
      "//div[@class='popper__background' and contains(text(),'phone')]"
    );
    this.CompanyNameTextField = page.locator(
      "//input[@name='enterprise_name']"
    );
    this.EmailTextField = page.locator("//input[@name='email']");
    this.PhoneNoTextField = page.locator("//input[@name='phone_no']");
    this.SaveButton = page.locator("//button[@class='css-1yy8gtw-button']");
    this.ActualCompanyInfo = page.locator("(//div[@class='td css-0'])[8]");
    this.ActualEmailID = page.locator("(//div[@class='td css-0'])[10]");
    this.ActualPhoneNumber = page.locator("(//div[@class='td css-0'])[12]");
    this.Alert = page.locator("//div[@role='alert']");
  }

  async AboutToolTipValidation(page) {
    //* Validating the Company Name Tool Tip
    await this.CompanyNameToolTip.hover();
    const ActualCompanyToolTip =
      await this.CompanyNameToolTipText.textContent();
    expect.soft(AboutPageTestData.CompanyToolTip).toEqual(ActualCompanyToolTip);

    //* Validating the Email ID Tool Tip
    await this.EmailIDToolTip.hover();
    const ActualEmailIDToolTip = await this.EmailIDToolTipText.textContent();
    expect.soft(AboutPageTestData.EmailToolTip).toEqual(ActualEmailIDToolTip);

    //* Validating the Phone Number Tool Tip
    await this.PhoneToolTip.hover();
    const ActualPhoneToolTip = await this.PhoneToolTipText.textContent();
    expect.soft(AboutPageTestData.PhoneNOTooTip).toEqual(ActualPhoneToolTip);
  }

  async TextFieldValidations(page) {
    const ReuseFunctions = new ReusableFunctions();
    //******   VAQ-226 Verifying the Character limit of Company name field */
    const LessThan3Charc = ReuseFunctions.GetRandomCharacs(3);
    await this.CompanyNameTextField.fill(LessThan3Charc);
    await expect.soft(this.Alert).toBeVisible();

    const TextAlertMessage = await this.Alert.textContent();

    expect
      .soft(TextAlertMessage)
      .toEqual(AboutPageTestData.ActualTextAlertMessage);

    // Providing name with more than 100 Characters
    const MoreThan100Characs = ReuseFunctions.GetRandomCharacs(101);

    await this.CompanyNameTextField.fill(MoreThan100Characs);
    await expect.soft(this.Alert).toBeVisible();

    // Providing name 100 Characters
    const Entering100Characs = ReuseFunctions.GetRandomCharacs(100);
    await this.CompanyNameTextField.fill(Entering100Characs);
    await expect.soft(this.Alert).not.toBeVisible();

    // VQA-229 Verifying the Email field....

    await this.EmailTextField.fill(LessThan3Charc);
    await expect.soft(this.Alert).toBeVisible();
    const EmailAlertMessage = await this.Alert.textContent();
    expect
      .soft(EmailAlertMessage)
      .toEqual(AboutPageTestData.ActualEmailAlertMessage);

    await this.EmailTextField.fill("test@abc.com");
    await expect.soft(this.Alert).not.toBeVisible();

    // Verifying the Phone Number Field
    await this.PhoneNoTextField.fill(ReuseFunctions.GetRandomNumbers(8));
    await expect.soft(this.Alert).toBeVisible();
    const PhoneAlertMessage = await this.Alert.textContent();
    expect
      .soft(PhoneAlertMessage)
      .toEqual(AboutPageTestData.ActualPhoneAlertMessage);
  }
}
module.exports = { AboutPage };

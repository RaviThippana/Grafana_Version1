class LoginPage {
  constructor(page) {
    this.page = page;
    this.UserName = page.locator("[aria-label='Username input field']");
    this.Password = page.locator("[type='password']");
    this.LoginButton = page.locator("[aria-label='Login button']");
  }

  async Login(UserName, Password) {
    await this.UserName.type(UserName);
    await this.Password.type(Password);
    await this.LoginButton.click();
  }
}
module.exports = { LoginPage };

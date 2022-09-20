const { LoginPage } = require("./LoginPage");
const { AboutPage } = require("./AboutPage");
class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.aboutPage = new AboutPage(this.page);
  }

  GetLoginPage() {
    return this.loginPage;
  }

  GetAboutPage() {
    return this.aboutPage;
  }
}
module.exports = { POManager };

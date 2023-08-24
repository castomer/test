class PageManager {
    constructor(browser) {
      this.browser = browser;
    }
  
    async openNewPage(device, locale) {
      const context = await this.browser.newContext({
        ...device,
        locale,
      });
      return context.newPage();
    }
  
    createPageObjects(page) {
      return {
        homePage: new HomePage(page),
        donatForm: new DonatForm(page),
        CreditCardForm: new CreditCardForm(page),
        PersInform: new PersInform(page),
        PaymentForm: new PaymentForm(page),
      };
    }
  }
  
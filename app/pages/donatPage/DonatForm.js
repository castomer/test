const { expect } = require("@playwright/test");
const { BasePage } = require("../base/basePage");
const texts = require("./textCheck");

exports.DonatForm = class DonatForm extends BasePage {
  constructor(page) {
    super(page);
    this.basePage = new BasePage(page);
    this.frameName = "__checkout2";
  }

  // Проверка наличия форм
  async formCheck() {
    await this.waitLoadPage(this.frameName);

    await this.waitElementFrame(
      this.frameName,
      `//div[@class="campaign campaign-desktop"]`,
    ); // Блок А
    await this.waitElementFrame(
      this.frameName,
      `//div[@class="widget-main widget-main-desktop"]`,
    ); // Блок б
    await this.waitElementFrame(
      this.frameName,
      `//div[@class="campaign campaign-desktop"]`,
    ); // Блок С
  }

  // Проверка наличия текста в форме
  async textCheck() {
    await this.waitElementText(this.frameName, texts.text1); // Провеока присутствия текста к форме А
    await this.waitElementText(this.frameName, texts.text2); // Провеока присутствия текста к форме B
    await this.waitElementText(this.frameName, texts.text3); // Провеока присутствия текста к форме C
  }

  // Проверка гиперссылок
  async linkCheck() {
    await this.linkGiper(
      this.frameName,
      "Other Ways to Give",
      "https://demo.fundraiseup.com",
    ); // Проверка линка формы Other Ways to Give
    await this.linkGiper(
      this.frameName,
      "How We Use Your Gift",
      "https://demo.fundraiseup.com",
    ); // Проверка линка формы How We Use Your Gift
    await this.linkGiper(
      this.frameName,
      "Manage Your Donations",
      "https://donor.helping-hand.org/demo",
    ); // Проверка линка формы Manage Your Donations
  }

  // Проверка наличия текста в форме
  async paymentInput() {
    const selector = "//input[@data-qa='amount']";
    await this.frameClick(this.frameName, this.textLoc("Monthly")); // Клик по полю Monthly
    await this.enterText(this.frameName, selector, "100"); // Вводим сумму
    await this.enterKey(this.frameName, selector, "Enter"); // жмем интер
  }

  // Проверка наличия текста в форме
  async openForm() {
    await this.frameClickCatch(this.frameName, this.textLoc("Donate now")); // Клик по полю donat
  }

  async changeUsd() {
   // await this.waitElementText(this.frameName, texts.minCost); // проверка сообщения о минимальном курсе
   await this.waitElementFrame(this.frameName, `//*[contains(text(), '${texts.minDonat}')]`); // проверка сообщения о минимальном курсе
   await this.selectOptionInFrame(
      this.frameName,
      "select.currency-select-control",
    ); //  смена валюты
  }

  // смена валюты
  async selectOptionInFrame(nameFrame, selector) {
    console.log("Смена валюты");
    const frame = this.page.frame({ name: nameFrame });
    await frame.waitForLoadState(); // Ожидание загрузки фрейма
    await frame.selectOption("select.currency-select-control", {
      value: "USD",
    }); // Выбор опции по значению
    await frame.waitForSelector(
      '//span[@data-qa="selected-currency" and text()="USD"]',
      { state: "visible" },
    ); // Ожидаем видимость элемента
  }
};

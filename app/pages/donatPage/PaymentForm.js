const { expect } = require('@playwright/test');
const { BasePage } = require('../base/basePage');
const texts = require('./textCheck');

exports.PaymentForm = class PaymentForm extends BasePage{

  constructor(page) {
    super(page);
    this.basePage = new BasePage(page)
    this.frameName = '__checkout2'
  }

  // Проверка наличия текста в форме 
  async paymentCheck() {
    await this.frameClick(this.frameName, this.textLoc("Donate monthly")) // Переход на форму 
    await this.frameClick(this.frameName, '//span[@class="p-abs centered"]'); // Нажимаем по чекбоксу
    await this.waitElementText(this.frameName, texts.text4); // Проверяем всплывающие уведомление
  }

  // Проверка наличия элементов на странице
  async paymentFillCheck() {
    await this.waitElementFrame(this.frameName, this.textLoc("Credit card")); // Проверяем наличие кнопки Credit card
    await this.waitElementFrame(this.frameName, '[aria-label="Google Pay"]'); // Проверяем наличие кнопки Google Pay
    await this.waitElementFrame(this.frameName, '[aria-label="Click to Pay"]'); // Проверяем наличие кнопки Click to Pay
    await this.waitElementFrame(this.frameName, this.textLoc("Bank transfer")); // Проверяем наличие кнопки Bank transfer


  }


  
};

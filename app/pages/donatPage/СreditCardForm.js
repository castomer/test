const { expect } = require('@playwright/test');
const { BasePage } = require('../base/basePage');
const texts = require('./textCheck');

exports.CreditCardForm = class CreditCardForm extends BasePage{

  constructor(page) {
    super(page);
    this.basePage = new BasePage(page)
    this.frameName = '__checkout2'
  }


 // Ввод карты 
 async payment() {
    const frame1Selector = `iframe[title='Secure card number input frame']`; // Номер карты
    const frame2Selector = `iframe[title='Secure expiration date input frame']`; // Дата/год
    const frame3Selector = `iframe[title='Secure CVC input frame']`; // Номер csv

    await this.typeNumber(this.frameName, frame1Selector, "4242 4242 4242 4242"); // Пример с  выбором локатора внутри фрейма 
    await this.typeNumber(this.frameName,frame2Selector, '0424') // Дата/год
    await this.typeNumber(this.frameName, frame3Selector, "000") // Наводим курсор на текстовое поле 
  }

   // Ввод карты 
  async textCheck() {
    await this.waitElementText(this.frameName, "Credit card") // Проверка наличия текста
    await this.waitElementText(this.frameName, texts.creditformSsl) // ssl text
    await this.waitElementText(this.frameName, "Safe & Secure") // 3 Tекст к форме А
  }


   // Ошибочный ввод карты
  async errorCheck() {
    await this.frameClick(this.frameName, '[data-tracking-element-name="payButton"]'); 
    await this.waitElementText(this.frameName, "Credit card") // Проверка смены формы
  }

   // Перекход к форме
  async openFormCredit() {
    await this.frameClick(this.frameName, "//span[text()='Credit card']"); // Переход на следующую форму

  }






  
};


const { expect } = require('@playwright/test');
const { BasePage } = require('../base/basePage');
const texts = require('./textCheck');

exports.PersInform = class PersInform extends BasePage {

  constructor(page) {
    super(page);
    this.basePage = new BasePage(page)
    this.frameName = '__checkout2'
  }

  
 // Проверка формы Personal information
 async textCheck() {
    await this.frameClick(this.frameName, '[data-qa="card-continue"]') // Переходим к форме Personal information
    await this.waitElementText(this.frameName, texts.persInform) // Провеока присутствия текста к форме А
    await this.waitElementText(this.frameName, "Personal information") // Провеока присутствия текста к форме А
  }

   // ввод атрибутов 
  async inputName() {
    const firstName = `input[name='firstName']`; 
    const email = `input[type='email']`; 
    const lastName = `input[name='lastName']`; 

    await this.typeNumber(this.frameName, firstName, "First name"); 
    await this.typeNumber(this.frameName,lastName, 'Last name')  
    await this.typeNumber(this.frameName, email, "E-mail")  
    await this.frameClick(this.frameName, "button[data-qa='privacy-continue']") // Нажимаем на кеопку Donate  
  }

   // Проверка сообщения об ошибке
  async errorMassage() {
    await this.waitElementFrame(this.frameName, "div.group.p-rel.has-error") // Провеока сообщения об ошибке
    await this.typeNumber(this.frameName, "input[type='email']", "E-mail@E-mail.com")  //Вводим кривой Email
    await this.frameClick(this.frameName, "button[data-qa='privacy-continue']") // Нажимаем на кеопку Donate  
    await this.waitElementText(this.frameName, texts.persInformError) // Провеока присутствия текста к форме А

  }

};

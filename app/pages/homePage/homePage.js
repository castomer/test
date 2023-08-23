
const { expect } = require('@playwright/test');
const { BasePage } = require('../base/basePage');

exports.HomePage = class HomePage extends BasePage{

  constructor(page) {
   super(page);
   this.basePage = new BasePage(page);
   this.frameName = 'XBGSFAMB'
  }

  // Проверка наличия элемента в футере
  async goToFrom() {
    console.log("____________Переход к форме пожертвования____________");
    await this.basePage.frameClick(this.frameName, this.textLoc('Give Now')) // клик элементу внутри фрейма
    await this.basePage.pageLoad() // ожиание загрузки 
  }


};


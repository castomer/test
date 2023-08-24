const { test, expect, devices } = require('@playwright/test');
const { DonatForm } = require('../pages/donatPage/DonatForm');
const { HomePage } = require('../pages/homePage/homePage');
const { BasePage } = require('../pages/base/basePage');
const { allure } = require('allure-playwright');
const { CreditCardForm } = require('../pages/donatPage/СreditCardForm');
const { PersInform } = require('../pages/donatPage/PersInForm');
const { PaymentForm } = require('../pages/donatPage/PaymentForm');

let page;


test.describe.serial('Mobile Tests', () => {

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['Pixel 5'], // Здесь вы выбираете нужное устройство
      locale: 'en-US', // Локализация
    });
    page = await context.newPage();
  });

  function createPageObjects(page) {
    return {
      homePage: new HomePage(page),
      donatForm: new DonatForm(page),
      CreditCardForm: new CreditCardForm(page),
      PersInform: new PersInform(page),
      PaymentForm: new PaymentForm(page)
    };
  }

  
  
  test.describe.serial('Проверка страницы оплаты мобильная версия', () => {

    test('Донор переходит на сайт и нажимает на кнопку “Give now', async () => {
      const { homePage } = createPageObjects(page);
      
      await test.step("Переход по ссылке ", async()=>{
        await page.goto('https://data.fundraiseup.com/qa-test-7R58U3/');
        await homePage.goToFrom();
      })

    });


    test('Проверка основных форм пожертвования ', async () => {
      const { donatForm } = createPageObjects(page);
      await test.step("Проверяем наличие текста", async()=>{
        await donatForm.textCheck();
      })
  
    });


    test('Проверка формы Secure donation/ ввод суммы пожертвования', async () => {
      const { donatForm } = createPageObjects(page);

      await test.step("Выбирает “Monthly” пожертвование/ввод суммы", async()=>{
        await donatForm.openForm();
        await donatForm.paymentInput();
      }) 
      
      await test.step("Cмена курса", async()=>{
        await donatForm.changeUsd();
      }) 

    });


    test('Проверка формы Payment Payment option/ ввод суммы пожертвования', async () => {
      const { PaymentForm } = createPageObjects(page);

      await test.step("Убираем чек-бокс покрытия комиссии “Cover transaction costs”", async()=>{
        await PaymentForm.paymentCheck();
      }) 

      await test.step("Проверяем наличие кнопок на форме”", async()=>{
        await PaymentForm.paymentFillCheck();
      }) 
    });


    test('Проверка формы Credit card', async () => {
      const { CreditCardForm} = createPageObjects(page);

      await test.step("Выбирает оплату кредитной картой “Credit card", async()=>{
          await CreditCardForm.openFormCredit(); 
      })

      await test.step("Проверка на сл. этап платежа без ввода карты", async()=>{
          await CreditCardForm.errorCheck(); 
      })

      await test.step("Ввод карточных данных для оплаты", async()=>{
          await CreditCardForm.payment(); 
      })

      await test.step("Проверка наличия текстовых данных на форме", async()=>{
          await CreditCardForm.textCheck(); 
      })

    });


    
    test('Проверка формы Personal information', async () => {
      const { PersInform} = createPageObjects(page);

      await test.step("Проверка наличия текстовых данных на форме", async()=>{
        await PersInform.textCheck(); 
      })

      await test.step("Вводим данные First name/Last name/E-mail/Donate", async()=>{
        await PersInform.inputName(); // Ввод основных значений в поля 
      })

      await test.step("Проверяем сообщения об ошибке ввода карты", async()=>{
        await PersInform.errorMassage(); // Проверяем сообщение об ошибке
      })
    });


    test.afterAll(async () => {
        await page.close();
    })

    });
});

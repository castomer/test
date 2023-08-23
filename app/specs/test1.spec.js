const { test, expect } = require('@playwright/test');
const { DonatForm } = require('../pages/donatPage/DonatForm');
const { HomePage } = require('../pages/homePage/homePage');
const { BasePage } = require('../pages/base/basePage');
const { allure } = require('allure-playwright');
const { CreditCardForm } = require('../pages/donatPage/СreditCardForm');
const { PersInform } = require('../pages/donatPage/PersInForm');
const { PaymentForm } = require('../pages/donatPage/PaymentForm');

let page; 

// Функция-помощник для создания экземпляров страниц
function createPageObjects(page) {
  return {
    homePage: new HomePage(page),
    donatForm: new DonatForm(page),
    CreditCardForm: new CreditCardForm(page),
    PersInform: new PersInform(page),
    PaymentForm: new PaymentForm(page)
  };
}

test.describe.serial('two tests', () => {


  test('Донор переходит на сайт и нажимает на кнопку “Give now', async () => {
    const { homePage } = createPageObjects(page);
    
    await test.step("Переход по ссылке ", async()=>{
      await page.goto('https://data.fundraiseup.com/qa-test-7R58U3/');
      await homePage.goToFrom();
    })

  });


  test('Выбирает “Monthly” пожертвование', async () => {
    const { donatForm } = createPageObjects(page);

    await test.step("Проверяем наличие форм", async()=>{
      await donatForm.formCheck(); 
    })

    await test.step("Проверяем наличие текста", async()=>{
      await donatForm.textCheck();
    })

    await test.step("Проверяем гиперссылки", async()=>{
      await donatForm.linkCheck();
    })    
  });


  test('Вводит сумму 100 USD', async () => {
    const { donatForm, CreditCardForm, PaymentForm } = createPageObjects(page);

    await test.step("Смена валюты", async()=>{

      await donatForm.paymentInput();
      await PaymentForm.paymentCheck();
      await PaymentForm.paymentFillCheck();
    }) 
      
    await test.step("Выбор месячной подпииски/ прожатие чекбокса", async()=>{
      //await donatForm.paymentCheck();
    })    
    await test.step("В1", async()=>{
      await CreditCardForm.errorCheck(); 
      await CreditCardForm.payment(); 
      await CreditCardForm.textCheck(); 
    })    
  
   });

  test('Проверка формы Personal information', async () => {
    const { PersInform} = createPageObjects(page);
    await PersInform.textCheck(); // Проверяем текст в доступных полях
    await PersInform.inputName(); // Ввод основных значений в поля 
    await PersInform.errorMassage(); // Проверяем сообщение об ошибке
   });

  
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });
  
  test.afterAll(async () => {
    await page.close();
  });
});
# test

## Требования 
* [Chrome](https://www.google.com/chrome/) актуальной версии
* [Node.js](https://nodejs.org/) актуальной версии

## Запуск тестов локально
Перед запуском тестов выполнить в корне репозитория **npm install**

* Запуск всех тестов: **node run-tests.js**
* запуск конкретного теста десктоп **node run-tests.js --test app/specs/testDesktop.spec.js**
* или мобильная версия **node run-tests.js --test app/specs/testMobie.spec.js**

* После завершения тестов запустится отчет

* Отчет в папке **allure-report**
* Генерация отчета **npx allure generate allure-results --clean**

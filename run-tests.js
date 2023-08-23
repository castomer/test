// run-tests.js
const { execSync } = require('child_process');

(async () => {
  // const testFiles = ['./app/specs']; // Укажите здесь пути к вашим тестовым файлам
  // for (const file of testFiles) {
  //   const command = `npx playwright test ${file} --reporter allure`;
  //   execSync(command, { stdio: 'inherit' });
  // }

  // Генерация отчета Allur
  execSync('npx playwright test --headed', { stdio: 'inherit' });
  
  execSync('npx allure generate allure-results --clean', { stdio: 'inherit' });
  execSync('npx allure open allure-report', { stdio: 'inherit' });
})();
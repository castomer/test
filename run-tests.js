const { exec } = require('child_process');

(async () => {
  // Запуск тестов
  try {
    await execAsync('npx playwright test --headed');
  } catch (error) {
    console.error(`Ошибка при запуске тестов: ${error.message}`);
  }

  // Генерация отчета Allure
  try {
    await execAsync('npx allure generate allure-results --clean');
    await execAsync('npx allure open allure-report');
  } catch (error) {
    console.error(`Ошибка при генерации отчета: ${error.message}`);
  }
})();

async function execAsync(command) {
  return new Promise((resolve, reject) => {
    const childProcess = exec(command);

    childProcess.stdout.on('data', (data) => {
      process.stdout.write(data); // Выводим данные в консоль
    });

    childProcess.stderr.on('data', (data) => {
      process.stderr.write(data); // Выводим данные об ошибках в консоль
    });

    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Команда завершилась с кодом возврата ${code}`));
      }
    });
  });
}

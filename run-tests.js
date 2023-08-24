const { exec } = require("child_process");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2)); // Получаем аргументы командной строки

(async () => {
  // Запуск тестов
  try {
    let testCommand = "npx playwright test --headed";

    if (args.test) {
      testCommand += ` ${args.test}`;
    }

    await execAsync(testCommand);
  } catch (error) {
    console.error(`Ошибка при запуске тестов: ${error.message}`);
  }

  // Генерация отчета Allure
  try {
    await execAsync("npx allure generate allure-results --clean");
    await execAsync("npx allure open allure-report");
  } catch (error) {
    console.error(`Ошибка при генерации отчета: ${error.message}`);
  }
})();

async function execAsync(command) {
  return new Promise((resolve, reject) => {
    const childProcess = exec(command);

    childProcess.stdout.on("data", (data) => {
      process.stdout.write(data); // Выводим данные в консоль
    });

    childProcess.stderr.on("data", (data) => {
      process.stderr.write(data); // Выводим данные об ошибках в консоль
    });

    childProcess.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Команда завершилась с кодом возврата ${code}`));
      }
    });
  });
}

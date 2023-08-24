const { expect } = require("@playwright/test");

exports.BasePage = class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  // общий локатор для наименований
  textLoc(name) {
    return `//*[normalize-space(text())='${name}']`;
  }

  // Клик по текстовому локатору
  async clickName(name) {
    console.log(`Нажимаем по наименованию'${name}'`);
    await this.page.waitForSelector(name), { timeout: 15000 }; // ожидаем элемент
    await this.page.click(this.textLoc(name));
  }

  // пауза
  async pause(mls) {
    console.log(`Ожидание'${mls}'млс`);
    await this.page.waitForTimeout(mls); // Подождать 2 секунды
  }

  // Ожидание по текстовому локатору
  async waitName(name) {
    console.log(`Ожиание по наименованию'${name}'`);
    try {
      await this.page.waitForSelector(this.textLoc(name), { timeout: 15000 });
      //console.log(`Элемент '${name}' найден!`);
    } catch (error) {
      console.log(`Элемент '${name}' не найден!`);
    }
  }

  // Ожидание локатора во фрейме
  async waitElementFrame(nameFrame, nameElement) {
    console.log(`Ожидание элемента''${(nameFrame, nameElement)}'`);
    const frame = await this.page.frame({ name: `${nameFrame}` });
    await frame.waitForLoadState(); // ожидаем загрузки фрейма
    await frame.waitForSelector(nameElement), { timeout: 15000 }; // ожидаем элемент в фрейме
  }

  // Ожидание локатора во фрейме
  async waitElementText(nameFrame, nameText) {
    console.log(`Ожидание текста элемента''${(nameFrame, nameText)}'`);
    const frame = await this.page.frame({ name: `${nameFrame}` });
    await frame.waitForLoadState(); // ожидаем загрузки фрейма
    await frame.waitForLoadState("load");
    await frame.waitForLoadState("domcontentloaded");
    await frame.waitForSelector(`//*[normalize-space(text())='${nameText}']`),
      { timeout: 15000 }; // ожидаем элемент в фрейме
  }

  // Клик по элементу в фрейме
  async frameClick(nameFrame, nameElement) {
    console.log(
      `Был выбран фрейм '${nameFrame}' клик по наименованию '${nameElement}'`,
    );
    const frame = this.page.frame({ name: `${nameFrame}` });
    await frame.waitForLoadState(); // ожидаем загрузки фрейма
    await frame.waitForSelector(nameElement), { timeout: 15000 }; // ожидаем элемент в фрейме
    // await frame.locator(this.textLoc(`${nameElement}`)).click();  // ожидаем элемент в фрейме
    await frame.locator(nameElement).click(); // ожидаем элемент в фрейме
  }

  async frameClickCatch(nameFrame, nameElement) {
    console.log(
      `Был выбран фрейм '${nameFrame}' клик по наименованию '${nameElement}'`,
    );
    const frame = this.page.frame({ name: nameFrame });

    await frame.waitForLoadState(); // ожидаем загрузки фрейма

    const elementExists = await frame
      .waitForSelector(nameElement, { state: "visible", timeout: 5000 })
      .then(() => true)
      .catch(() => false);

    if (elementExists) {
      console.log(`Элемент '${nameElement}' найден во фрейме. Выполняем клик.`);
      await frame.locator(nameElement).click();
    } else {
      console.log(`Элемент '${nameElement}' не найден во фрейме.`);
    }
  }

  // Эдемент ожидания
  async pageLoad() {
    console.log("Ожидание доступности страницы");
    await this.page.waitForFunction(
      () => {
        const element = document.querySelector("img.fun-widget-backdrop");
        return !element; // Вернуть true, если элемент отсутствует
      },
      { timeout: 15000 },
    );
  }

  // Проверка гиперссылок
  async linkGiper(nameFrame, locator, expectedLink) {
    console.log(
      `Проверяем привзку href '${expectedLink}' к наименовнию '${locator}'`,
    );
    const frame = await this.page.frame({ name: nameFrame });
    await frame.waitForLoadState(); // ожидаем загрузки фрейма
    const links = await frame.locator(
      `//*[normalize-space(text())='${locator}']`,
    );
    const href = await links.getAttribute("href");
    expect(href).toBe(expectedLink);
  }

  // Ввод текста
  async enterText(nameFrame, selector, text) {
    console.log(`Вводим текст '${text}' в поле'${selector}'`);

    const frame = this.page.frame({ name: `${nameFrame}` });
    await frame.waitForLoadState(); // ожидаем загрузки фрейма
    const inputElement = await frame.$(selector); // очищаем поле
    await inputElement.fill(text);
  }

  // Прожатие клавиш
  async enterKey(frame, selcetor, key) {
    console.log(`Нажимаем кнопку '${key}'`);
    await this.frameClick(frame, selcetor);
    await this.page.keyboard.press(key, { frame: frame }); // Нажатие клавиши вниз внутри фрейма
  }

  // Прожатие клавиш
  async typeNumber(frame, selcetor, number) {
    console.log(`Вводим текст '${number}' в форму '${selcetor}'`);
    const digits = number.toString().split("");
    await this.frameClick(frame, selcetor);
    for (const digit of digits) {
      await this.page.keyboard.press(digit, { frame: frame });
      await this.page.waitForTimeout(100); // ожидание 100 миллисекунд между вводом каждой цифры
    }
  }

  // Ожидание загруки страницы/фрейм
  async waitLoadPage(nameFrame) {
    console.log(`Ожидание загруки страницы/фрейма''${nameFrame}'`);
    const frame = await this.page.frame({ name: `${nameFrame}` });
    await frame.waitForLoadState(); // ожидаем загрузки фрейма
    await frame.waitForLoadState("load");
    await frame.waitForLoadState("domcontentloaded");
  }
};

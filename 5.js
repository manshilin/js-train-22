// Мементо (Memento) — це патерн програмування, який забезпечує збереження стану об'єкта для подальшого відновлення

// Клас Writer відповідає за роботу з текстом.
class Writer {
  // Властивість #content представляє поточний текст. Вона ініціалізується порожнім рядком.
  #content = "";

  // Сетер для властивості content. Він приймає значення newContent (новий текст),
  // який потрібно встановити як поточний текст. Кожен раз, коли присвоюється нове значення,
  // викликається метод #store(), який зберігає поточний стан тексту у версіях.
  set content(newContent) {
    this.#content = newContent;
    this.#store();
  }

  // Метод гетер для властивості content, повертає this.#content.
  get content() {
    return this.#content;
  }

  // Приватний метод #store використовується для зберігання поточного стану тексту.
  #store() {
    // Він викликає статичний метод класу Version, create, передаючи йому поточний текст як аргумент.
    Version.create(this.#content);
  }

  // Метод restore відновлює попередній стан тексту, викликаючи статичний метод класу Version, restore.
  // Цей метод оновлює властивість #content поточного об'єкта класу Writer.
  restore() {
    const previousContent = Version.restore();
    if (previousContent !== undefined) {
      this.#content = previousContent;
    }
  }
}

// Клас Version відповідає за створення та зберігання версій тексту.
class Version {
  // В конструкторі класу Version приймається аргумент content та встановлює його.
  // Це вхідний аргумент, який представляє теку збережену версію тексту.
  constructor(content) {
    this.content = content;
  }

  // Властивість #versions це приватний статичний масив, пустий за замовчуванням, що зберігає всі створені версії.
  static #versions = [];

  // Статичний метод create приймає аргумент content (текст версії) і створює новий екземпляр класу Version
  // в який передає content.
  static create(content) {
    this.#versions.push(new Version(content));
  }

  // Створений екземпляр додається до масиву версій versions.
  // Статичний метод restore видаляє останній елемент масиву,
  // та повертає останню збережену версію тексту з масиву версій.
  static restore() {
    const lastVersion = this.#versions.pop();
    if (lastVersion) {
      return lastVersion.content;
    }
    return undefined;
  }
}

console.log("Завдання 5 ====================================");

// Після виконання розкоментуйте код нижче

// Створюємо новий екземпляр класу Writer
const writer = new Writer();

// Присвоюємо текст за допомогою сетера
writer.content = "Це початковий текст.";
writer.content = "Редагований текст.";
writer.content = "Оновлений текст.";

// Друкуємо поточний текст
console.log(writer.content);

// Відновлюємо попередній текст
writer.restore();
console.log(writer.content);

// Ще раз відновлюємо попередній текст
writer.restore();
console.log(writer.content);

// Ще раз відновлюємо попередній текст
writer.restore();
console.log(writer.content);
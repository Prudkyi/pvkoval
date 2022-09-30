Для роботи виконайте наступні кроки:
1. Встановіть Node.js на ПК (якщо він ще не встановлений) - [https://nodejs.org/en/](https://nodejs.org/en/)
2. Виконайте в терміналі команду - node init

Для запуску роботи в режимі **розробки** виконайте команду

`npm run dev`

Для запуску роботи в режимі **публікації** виконайте команду

`npm run build`

///////////////

**!!!В звязку із особливістю даної збірки,** скрипт встановлення фонового зображення в блоки із даних іншого блока, який знаходиться в файлі app.js стр. 61. Функція setImgForBlock в режимі розробки вказувати відносний шлях, в режимі продакшина шлях від кореня

**Приклад:**

**Режим DEV:**

`$('.'+forBlock).css('background-image', 'url(../'+src+')');`

**Режим Build**

`$('.'+forBlock).css('background-image', 'url('+src+')');`
# Задание 3 — реализовать алгоритм

## TODO

1.  ~~Добавить валидацию исходных данных через json-scheme~~

## Решение

Вся оптимизация заключается в этих строчках:

```
  devicesScheme.sort((a, b) => b.power - a.power);
  devicesScheme.forEach(device => {
    device.posiblePositions.sort((a, b) => a.price - b.price);
  });
```

В чем смысл: сделать так, чтобы суммарная стоимость работы приборов росла максимально быстро, так мы можем делать наименьшее количество итераций, чтобы достигнуть minPrice и переходить к следующей возможной позиции.

В худшем случае - это будет полный перебор.

Больше в голову ничего не пришло (никакие из известных стратегий к решению задачи оптимизации применить не смог). Жду разбора заданий.

## Валидация

Валидацию сделал с помощью Joi. Дополнительно добавил проверку на перекрытие rates.
Находится в checkInput.js.

## Запуск

```
const alg = require('entrance-task-3-2/index');
const output = alg(input);
```

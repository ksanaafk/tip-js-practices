
import { demoTasks, variantNumber, variantTasks } from "./data.js";

import {
    createTask,
    findTaskById,
    getPendingTasks,
    getTaskTitles,
    getTaskStats,
    addTask,
    setTaskCompleted,
    renameTask,
    removeTask,
} from "./task-service.js";

console.log("=== Практическая работа № 2 ===");
console.log("Общий демонстрационный сценарий");

// Функция вывода статистики
function printStats(tasks) {
    const { total, completed, pending, progress } = getTaskStats(tasks);

    console.log(`Всего задач: ${total}`);
    console.log(`Выполнено: ${completed}`);
    console.log(`Осталось: ${pending}`);

    if (total === 0) {
        console.log("Задач пока нет");
    } else {
        console.log(`Прогресс: ${progress.toFixed(1)}%`);
    }
}

// Исходный набор
let currentTasks = demoTasks;

console.log("\n1. Исходные задачи:");
console.table(currentTasks);

console.log("Названия задач:", getTaskTitles(currentTasks));
console.log("Невыполненные задачи:");
console.table(getPendingTasks(currentTasks));

printStats(currentTasks);

// 2. Добавление задачи
console.log("\n2. Добавление задачи id = 20");

const addResult = addTask(
    currentTasks,
    20,
    "Добавить проверку",
    "high"
);

if (addResult.ok) {
    currentTasks = addResult.tasks;
    printStats(currentTasks);
} else {
    console.log("Ошибка:", addResult.error);
}

// 3. Изменение статуса
console.log("\n3. Выполнение задачи id = 4");

const completeResult = setTaskCompleted(
    currentTasks,
    4,
    true
);

if (completeResult.ok) {
    currentTasks = completeResult.tasks;
    printStats(currentTasks);
} else {
    console.log("Ошибка:", completeResult.error);
}

// 4. Переименование
console.log("\n4. Переименование задачи id = 10");

const renameResult = renameTask(
    currentTasks,
    10,
    "Подготовить инструкцию запуска"
);

if (renameResult.ok) {
    currentTasks = renameResult.tasks;
    printStats(currentTasks);
} else {
    console.log("Ошибка:", renameResult.error);
}

// 5. Удаление задачи
console.log("\n5. Удаление задачи id = 7");

const removeResult = removeTask(currentTasks, 7);

if (removeResult.ok) {
    currentTasks = removeResult.tasks;
    printStats(currentTasks);
} else {
    console.log("Ошибка:", removeResult.error);
}

// 6. Проверка обработки ошибки
console.log("\n6. Попытка добавить повторяющийся id = 20");

const errorResult = addTask(
    currentTasks,
    20,
    "Повторная задача",
    "medium"
);

if (errorResult.ok) {
    currentTasks = errorResult.tasks;
} else {
    console.log("Ошибка:", errorResult.error);
}

console.log("Состояние после ошибки:");
printStats(currentTasks);

// 7. Проверка сохранности исходных данных
console.log("\n7. Проверка исходного массива");

console.log("Исходный demoTasks:");
console.table(demoTasks);

console.log("Итоговый currentTasks:");
console.table(currentTasks);

console.log("Итоговые ID:", currentTasks.map(task => task.id));

console.log("Исходный набор сохранился:",
    JSON.stringify(demoTasks) === JSON.stringify([
        { id: 1, title: "Изучить функции", completed: true, priority: "medium" },
        { id: 4, title: "Подготовить модель задач", completed: false, priority: "high" },
        { id: 7, title: "Проверить методы массивов", completed: false, priority: "low" },
        { id: 10, title: "Оформить README", completed: true, priority: "medium" }
    ])
);


console.log("\n=== Индивидуальный вариант № 7 ===");
console.log("Тема: Подготовка учебного релиза");
console.log("Номер варианта:", variantNumber);

// Сохраняем исходные данные для проверки
const originalVariant = JSON.stringify(variantTasks);

// Создаём переменную для текущего состояния
let currentVariantTasks = variantTasks;

// 1. Вывод исходных данных
console.log("\n1. Исходный набор задач:");
console.table(currentVariantTasks);
printStats(currentVariantTasks);

// 2. Добавление задачи id = 80
console.log("\n2. Добавление задачи id = 80");

const variantAddResult = addTask(
    currentVariantTasks,
    80,
    "Проверить опубликованный релиз",
    "high"
);

if (variantAddResult.ok) {
    currentVariantTasks = variantAddResult.tasks;
    console.log("Задача успешно добавлена");
} else {
    console.log("Ошибка:", variantAddResult.error);
}

printStats(currentVariantTasks);

// 3. Изменение статуса задачи id = 11
console.log("\n3. Установка completed = true для id = 11");

const variantCompleteResult = setTaskCompleted(
    currentVariantTasks,
    11,
    true
);

if (variantCompleteResult.ok) {
    currentVariantTasks = variantCompleteResult.tasks;
    console.log("Статус задачи успешно установлен");
} else {
    console.log("Ошибка:", variantCompleteResult.error);
}

printStats(currentVariantTasks);

// 4. Переименование задачи id = 23
console.log("\n4. Переименование задачи id = 23");

const variantRenameResult = renameTask(
    currentVariantTasks,
    23,
    "Подготовить финальную версию исходного кода"
);

if (variantRenameResult.ok) {
    currentVariantTasks = variantRenameResult.tasks;
    console.log("Задача успешно переименована");
} else {
    console.log("Ошибка:", variantRenameResult.error);
}

printStats(currentVariantTasks);

// 5. Удаление задачи id = 37
console.log("\n5. Удаление задачи id = 37");

const variantRemoveResult = removeTask(
    currentVariantTasks,
    37
);

if (variantRemoveResult.ok) {
    currentVariantTasks = variantRemoveResult.tasks;
    console.log("Задача успешно удалена");
} else {
    console.log("Ошибка:", variantRemoveResult.error);
}

printStats(currentVariantTasks);

// 6. Попытка повторного добавления id = 80
console.log("\n6. Повторное добавление id = 80");

const variantDuplicateResult = addTask(
    currentVariantTasks,
    80,
    "Повторная проверка релиза",
    "high"
);

if (variantDuplicateResult.ok) {
    currentVariantTasks = variantDuplicateResult.tasks;
} else {
    console.log("Ожидаемая ошибка:", variantDuplicateResult.error);
}

// Проверяем, что состояние осталось прежним
printStats(currentVariantTasks);

// 7. Итоговое состояние
console.log("\n7. Итоговый набор задач:");
console.table(currentVariantTasks);

console.log(
    "Итоговые ID:",
    currentVariantTasks.map(task => task.id)
);

// 8. Проверка неизменности исходного массива
console.log("\n8. Проверка исходных данных:");

console.log(
    "Исходный variantTasks сохранился:",
    JSON.stringify(variantTasks) === originalVariant
);

console.log("Количество исходных задач:", variantTasks.length);
console.log("Количество итоговых задач:", currentVariantTasks.length);

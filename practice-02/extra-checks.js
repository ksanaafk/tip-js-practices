
import {
    addTask,
    removeTask,
    findTaskById,
    renameTask
} from "./src/task-service.js";

console.log("=== Дополнительные проверки ===");

// Проверка 1: удаление и повторное использование ID
console.log("\nПроверка 1: повторное использование ID");

const initialTasks = [
    {
        id: 1,
        title: "Первая задача",
        completed: false,
        priority: "medium"
    },
    {
        id: 2,
        title: "Вторая задача",
        completed: true,
        priority: "high"
    }
];

const removed = removeTask(initialTasks, 2);

const added = removed.ok
    ? addTask(removed.tasks, 2, "Новая задача", "low")
    : removed;

const passed =
    removed.ok &&
    added.ok &&
    added.tasks.length === 2 &&
    findTaskById(added.tasks, 2).title === "Новая задача" &&
    initialTasks[1].title === "Вторая задача";

console.log("Ожидаемый результат: ID 2 можно использовать повторно");
console.log("Фактический результат:", passed ? "PASS" : "FAIL");



import { setTaskCompleted } from "./src/task-service.js";

// Проверка 2: повторная установка статуса
console.log("\nПроверка 2: повторное изменение статуса");

const statusTasks = [
    {
        id: 5,
        title: "Проверить документацию",
        completed: true,
        priority: "medium"
    }
];

const statusResult = setTaskCompleted(statusTasks, 5, true);

const statusPassed =
    statusResult.ok &&
    statusResult.tasks[0].completed === true &&
    statusResult.tasks !== statusTasks &&
    statusResult.tasks[0] !== statusTasks[0] &&
    statusTasks[0].completed === true;

console.log("Ожидаемый результат: статус true сохранён, созданы новые массив и объект");
console.log("Фактический результат:", statusPassed ? "PASS" : "FAIL");


 // Проверка 3: последовательное переименование
console.log("\nПроверка 3: два переименования подряд");

const renameTasks = [
    {
        id: 15,
        title: "Старое название",
        completed: false,
        priority: "high"
    }
];

const firstRename = renameTask(
    renameTasks,
    15,
    "Первое новое название"
);

const secondRename = firstRename.ok
    ? renameTask(
        firstRename.tasks,
        15,
        "  Итоговое название  "
    )
    : firstRename;

const renamePassed =
    firstRename.ok &&
    secondRename.ok &&
    firstRename.tasks[0].title === "Первое новое название" &&
    secondRename.tasks[0].title === "Итоговое название" &&
    secondRename.tasks[0].completed === false &&
    secondRename.tasks[0].priority === "high" &&
    renameTasks[0].title === "Старое название" &&
    firstRename.tasks !== secondRename.tasks;

console.log(
    "Ожидаемый результат: последнее название сохранено, исходная задача не изменена"
);

console.log(
    "Фактический результат:",
    renamePassed ? "PASS" : "FAIL"
);

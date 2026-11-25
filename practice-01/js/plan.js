"use strict";

const totalTasks = 10;
const completedTasks = 7;
const dailyLimit = 3;

// Проверка количества задач
if (typeof totalTasks !== "number" ||
    typeof completedTasks !== "number") {
    console.log("Ошибка: вместо числа передана строка.");

} else if (!Number.isFinite(totalTasks) ||
           !Number.isFinite(completedTasks)) {
    console.log("Ошибка: недопустимое числовое значение.");

} else if (!Number.isInteger(totalTasks) ||
           !Number.isInteger(completedTasks)) {
    console.log("Ошибка: дробное количество задач.");

} else if (totalTasks < 0 || completedTasks < 0) {
    console.log("Ошибка: отрицательное количество задач.");

} else if (totalTasks > 1000) {
    console.log("Ошибка: превышена верхняя граница задач.");

} else if (completedTasks > totalTasks) {
    console.log("Ошибка: выполнено больше задач, чем существует.");

// Проверка дневной нормы
} else if (typeof dailyLimit !== "number") {
    console.log("Ошибка: дневная норма должна быть числом.");

} else if (!Number.isFinite(dailyLimit)) {
    console.log("Ошибка: недопустимое значение дневной нормы.");

} else if (!Number.isInteger(dailyLimit)) {
    console.log("Ошибка: дробная дневная норма.");

} else if (dailyLimit < 1) {
    console.log("Ошибка: дневная норма должна быть не меньше 1.");

} else if (dailyLimit > 1000) {
    console.log("Ошибка: превышена верхняя граница дневной нормы.");

} else {
    let remainingTasks = totalTasks - completedTasks;
    let day = 0;

    if (remainingTasks === 0) {
        console.log("Все задачи уже выполнены.");
        console.log("Потребуется дней: 0");
    } else {
        console.log("Осталось задач:", remainingTasks);

        while (remainingTasks > 0) {
            day++;

            const tasksToday = Math.min(dailyLimit, remainingTasks);
            remainingTasks -= tasksToday;

            console.log(
                `День ${day}: выполнено ${tasksToday}, осталось ${remainingTasks}`
            );
        }

        console.log("Потребуется дней:", day);
    }
}

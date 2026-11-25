// Заготовка модуля. throw ниже отмечает отсутствие реализации,
// а не способ обработки некорректных данных в готовом решении.
// Для предусмотренных ошибок необходимо возвращать { ok: false, error: "..." }.
// console.log(), prompt(), document и чтение внешнего состояния здесь не нужны.


export function createTask(id, title, priority = "medium") {
    // Проверка идентификатора
    if (!Number.isSafeInteger(id) || id <= 0) {
        return {
            ok: false,
            error: "ID должен быть положительным безопасным целым числом"
        };
    }

    // Проверка типа названия
    if (typeof title !== "string") {
        return {
            ok: false,
            error: "Название задачи должно быть строкой"
        };
    }

    // Удаляем пробелы в начале и конце названия
    const cleanTitle = title.trim();

    // Проверка длины названия
    if (cleanTitle.length < 1 || cleanTitle.length > 100) {
        return {
            ok: false,
            error: "Длина названия должна быть от 1 до 100 символов"
        };
    }

    // Проверка приоритета
    if (
        priority !== "low" &&
        priority !== "medium" &&
        priority !== "high"
    ) {
        return {
            ok: false,
            error: "Приоритет должен быть low, medium или high"
        };
    }

    // Создание новой задачи
    const task = {
        id: id,
        title: cleanTitle,
        completed: false,
        priority: priority
    };

    return {
        ok: true,
        task: task
    };
}



export function findTaskById(tasks, id) {
    return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
    return tasks.filter((task) => task.completed === false);
}

export function getTaskTitles(tasks) {
    return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
    const total = tasks.length;
    let completed = 0;

    for (const task of tasks) {
        if (task.completed === true) {
            completed++;
        }
    }

    const pending = total - completed;
    const progress = total === 0
        ? 0
        : (completed / total) * 100;

    return {
        total,
        completed,
        pending,
        progress
    };
}



export function addTask(tasks, id, title, priority = "medium") {
    const result = createTask(id, title, priority);

    if (!result.ok) {
        return {
            ok: false,
            error: result.error
        };
    }

    const existingTask = findTaskById(tasks, id);

    if (existingTask !== undefined) {
        return {
            ok: false,
            error: "Задача с таким ID уже существует"
        };
    }

    const newTasks = [...tasks, result.task];

    return {
        ok: true,
        tasks: newTasks
    };
}



export function setTaskCompleted(tasks, id, completed) {
    // Проверяем ID
    if (!Number.isSafeInteger(id) || id <= 0) {
        return {
            ok: false,
            error: "ID должен быть положительным безопасным целым числом"
        };
    }

    // Проверяем тип статуса
    if (typeof completed !== "boolean") {
        return {
            ok: false,
            error: "Статус completed должен быть boolean"
        };
    }

    // Проверяем существование задачи
    const existingTask = findTaskById(tasks, id);

    if (existingTask === undefined) {
        return {
            ok: false,
            error: "Задача с таким ID не найдена"
        };
    }

    // Создаём новый массив с обновлённой задачей
    const newTasks = tasks.map((task) => {
        if (task.id === id) {
            return {
                ...task,
                completed: completed
            };
        }

        return task;
    });

    return {
        ok: true,
        tasks: newTasks
    };
}



export function renameTask(tasks, id, title) {
    // Проверяем идентификатор
    if (!Number.isSafeInteger(id) || id <= 0) {
        return {
            ok: false,
            error: "ID должен быть положительным безопасным целым числом"
        };
    }

    // Проверяем тип названия
    if (typeof title !== "string") {
        return {
            ok: false,
            error: "Название задачи должно быть строкой"
        };
    }

    // Удаляем пробелы по краям
    const cleanTitle = title.trim();

    // Проверяем длину названия
    if (cleanTitle.length < 1 || cleanTitle.length > 100) {
        return {
            ok: false,
            error: "Длина названия должна быть от 1 до 100 символов"
        };
    }

    // Проверяем существование задачи
    const existingTask = findTaskById(tasks, id);

    if (existingTask === undefined) {
        return {
            ok: false,
            error: "Задача с таким ID не найдена"
        };
    }

    // Создаём новый массив и новый объект выбранной задачи
    const newTasks = tasks.map((task) => {
        if (task.id === id) {
            return {
                ...task,
                title: cleanTitle
            };
        }

        return task;
    });

    return {
        ok: true,
        tasks: newTasks
    };
}



export function removeTask(tasks, id) {
    // Проверяем корректность идентификатора
    if (!Number.isSafeInteger(id) || id <= 0) {
        return {
            ok: false,
            error: "ID должен быть положительным безопасным целым числом"
        };
    }

    // Проверяем существование задачи
    const existingTask = findTaskById(tasks, id);

    if (existingTask === undefined) {
        return {
            ok: false,
            error: "Задача с таким ID не найдена"
        };
    }

    // Создаём новый массив без удаляемой задачи
    const newTasks = tasks.filter((task) => task.id !== id);

    return {
        ok: true,
        tasks: newTasks
    };
}

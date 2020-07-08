export const deleteTodo = (newTodo) => {
    return {
        type: "DELETE_TODO",
        payload:{newTodo}
    }
}
export const editTodo = (reminders) => {
    return {
        type: "EDIT_POST",
       payload:{reminders}
    }
}

export const addTodo = (reminders) => {
    return {
        type: "ADD_POST",
       payload:{reminders}
    }
}
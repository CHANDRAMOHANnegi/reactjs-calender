const initState = {
    reminders: [
        { user: 'cm', date: '12/6/2019', time: '2', color: 'red', text: "do project" },
        { user: 'mohan', date: '3/6/2019', time: '20', color: 'pink', text: "do redux" },
        { user: 'mohan', date: '9/6/2019', time: '20', color: 'indigo', text: "do redux" },
        { user: 'ram', date: '1/6/2019', time: '6', color: 'blue', text: "do react " },
        { user: 'cm', date: '12/6/2019', time: '2', color: 'green', text: "do project" },
        { user: 'mohan', date: '6/6/2019', time: '20', color: 'violet', text: "do redux" },
        { user: 'mohan', date: '15/6/2019', time: '20', color: 'orange', text: "do redux" },
        { user: 'ram', date: '13/6/2019', time: '6', color: 'blue', text: "do react " },
        { user: 'mohan', date: '15/7/2019', time: '20', color: 'orange', text: "do redux" },
        { user: 'ram', date: '13/7/2019', time: '6', color: 'blue', text: "do react " }
    ]
}

const rootReducer = (state = initState, action) => {

    switch (action.type) {
        case "DELETE_TODO":
            return {
                ...state,
                reminders: action.payload.newTodo
            }
        case 'EDIT_TODO':
            return {
                ...state,
                reminders: action.payload.reminders
            }
        case "ADD_TODO":
            return {
                ...state,
                reminders: action.payload.reminders
            }
        default:
            return state
    }
 }
export default rootReducer;
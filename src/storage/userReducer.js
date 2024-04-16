import {createSlice} from "@reduxjs/toolkit";


export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        totalCount: 0,
        selectedUser: {},
        selectedUserIndex: -1
    },
    reducers: {
        setTotalCount: (state, action) => {state.totalCount = action.payload
        state.users.length = action.payload},
        setChunk: (state, action) => {state.users.splice(action.payload[0], action.payload[1], ...action.payload[2])},
        addEnd: (state, action) => {action.payload && state.users.push(...action.payload)},//
        addStart: (state, action) => {action.payload && state.users.unshift(...action.payload)},
        deleteEnd: (state, action) => {state.users.splice(-action.payload)},
        deleteStart: (state, action) => {state.users.splice(0, action.payload)},
        setSelected: (state, action) => {
            state.selectedUserIndex = action.payload
            state.selectedUser = state.users[action.payload]
        },
        changeSelected: (state, action) => {state.selectedUser[action.payload.name] = action.payload.value},
        applyChange: (state) => {
           state.users[state.selectedUserIndex] = state.selectedUser
        }

    }})

export const {
    addEnd,
    addStart,
    deleteEnd,
    deleteStart,
    setTotalCount,
    setChunk,
    setSelected,
    changeSelected,
    applyChange,
} = usersSlice.actions

export default usersSlice.reducer


// export const userReducer = (state = defaultState, action) => {
//     switch (action.type) {
//         case "ADD_END":
//             return {...state}
//         case "ADD_START":
//             return {...state}
//         case "DELETE_END":
//             return {...state}
//         case "DELETE_START":
//             return {...state}
//         default:
//             return state
//     }
// }


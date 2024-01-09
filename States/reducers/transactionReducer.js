import { CREATE_TRANSACTION } from "../actions/transaction/transactionTypes"

const initialState = {
    iconName: "pizza",
    iconColor: "red",
    iconBackgroundColor: "#FDD5D7",
    title: "Takeout",
    description: "Got Takeout for the family",
    amount: "20",
    time: "12:00 PM",
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TRANSACTION:
            return {
                state: action.payload
            }
        default:
            return state
    }
}


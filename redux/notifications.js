import * as ActionTypes from './ActionTypes';

export const notifications = (state = [], action) => {
    switch (action.type) {
        
        case ActionTypes.ADD_NOTIFICATION:
            if (state.includes(action.payload)) {
                return state;
            }
            return state.concat(action.payload);

        case ActionTypes.DELETE_NOTIFICATION:
            return state.filter(notification => notification.plant.id !== action.payload);

        default:
            return state;
    }
};
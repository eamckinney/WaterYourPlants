import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const postNotification = (plant, notificationDatesAndTimes) => dispatch => {
    
    const newNotification = {
        plant,
        notificationDatesAndTimes
    };
    
    setTimeout(() => {
        dispatch(addNotification(newNotification));
    }, 1000);
};

export const addNotification = notification => ({
    type: ActionTypes.ADD_NOTIFICATION,
    payload: notification
});

export const deleteNotification = plantId => ({
    type: ActionTypes.DELETE_NOTIFICATION,
    payload: plantId
}); 
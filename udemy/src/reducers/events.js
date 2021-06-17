import _ from 'lodash';
import { 
    CREATE_EVENT, 
    READ_EVENTS, 
    READ_EVENT, 
    DELETE_EVENTS, 
    UPDATE_EVENT } from '../actions';

// eslint-disable-next-line import/no-anonymous-default-export
export default (events = {}, action) => {
    switch (action.type) {
        case CREATE_EVENT:
        case READ_EVENT:
        case UPDATE_EVENT:
            const data = action.response.data
            return { ...events, [data.id]: data }
        case READ_EVENTS:
            return _.mapKeys(action.response.data, 'id')
        case DELETE_EVENTS:
            delete events[action.id]
            return { ...events }
        default:
            return events
    }
}
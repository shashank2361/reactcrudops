import {TOGGLE_LOADER} from '../Loader/loadingTypes'

export default function loadingReducer(state = false, action) {
    switch (action.type) {
        case TOGGLE_LOADER:
            return !state;
        default:
            return state;
    }
}


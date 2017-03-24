const defaultState = {
    value: 'vacuum'
};

const tabs = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_TAB_VALUE':
            return {
                value: action.value
            };

        default:
            return state;
    }
};

export default tabs;

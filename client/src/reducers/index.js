const initialState = {
  items: [],
  status: "idle",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ITEMS_FETCHING":
      return {
        ...state,
        status: "loading",
      };
    case "ITEMS_FETCHED":
      return {
        ...state,
        items: action.payload,
        status: "idle",
      };
      case 'REMOVE_ITEM':
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload)
        };
    case "ITEMS_FETCHING_ERROR":
      return {
        ...state,
        status: "error",
      };

    default:
      return state;
  }
};

export default reducer;
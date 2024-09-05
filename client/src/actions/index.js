export const itemsFetching = () => {
    return {
        type: 'ITEMS_FETCHING'
    }
}
export const itemsFetched = (items) => {
    return {
        type: 'ITEMS_FETCHED',
        payload: items
    }
}
export const itemsFetchingError= () => {
    return {
        type: 'ITEMS_FETCHING_ERROR'
    }
}
export const removeItem = (id) => ({
    type: 'REMOVE_ITEM',
    payload: id
  });
  
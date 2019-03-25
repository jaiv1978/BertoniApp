import {SELECT_ITEMS, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from "../../actions/actions-constants"

export const Items = (state = [], action) =>{
    switch(action.type){
        case SELECT_ITEMS :
            return state
            break;
        case CREATE_ITEM :
            return [...state, action.newItem]
            break;
        case UPDATE_ITEM :
            var newArray = state.filter(item => item.id !== action.updatedItem.id)
            return [...newArray, action.updatedItem]
            break;
        case DELETE_ITEM :
            var newArray = [...state]
            for(var i=0; i<action.items.length; i++){
                newArray = newArray.filter(item => item.id !== action.items[i])
            }
            return newArray
            break;
        default :
            return state;
    }
}

export default Items
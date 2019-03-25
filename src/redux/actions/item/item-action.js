import {SELECT_ITEMS, CREATE_ITEM, UPDATE_ITEM, DELETE_ITEM } from "../actions-constants"

export const SelectItems = () => {
    return {type : SELECT_ITEMS}
}

export const CreateItem = (newItem) => {
    return {type : CREATE_ITEM,
    newItem
    }
}

export const UpdateItem = (updatedItem) => {
    return {type : UPDATE_ITEM,
    updatedItem
    }
}

export const DeleteItem = (items) => {
    return {type : DELETE_ITEM,
        items
    }
}

export default SelectItems
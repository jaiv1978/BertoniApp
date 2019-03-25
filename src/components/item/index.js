import React from "react"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import ListingItems from "./list-items"
import CreateItemForm from "./create-item"
import { connect } from "react-redux"
import store from "../../redux/store"
import {DeleteItem} from "../../redux/actions/item/item-action"

class MainItem extends React.Component{
    constructor(props){
        super(props)
        this.state = { showCreateItemForm : false }
        this.arraySelectedItems = []
        this.itemToEdit = { id : "", firstname : "", lastname : "", age : "", phonenumber : ""}
        this.createItem = this.createItem.bind(this)
        this.deleteItems = this.deleteItems.bind(this)
        this.getSelectedItems = this.getSelectedItems.bind(this)
        this.editItem = this.editItem.bind(this)
        this.resetItemToEdit = this.resetItemToEdit.bind(this)
    }

    createItem(){
        this.setState({showCreateItemForm : !this.state.showCreateItemForm})
    }

    resetItemToEdit(){
        this.itemToEdit = { id : "", firstname : "", lastname : "", age : "", phonenumber : ""}
    }

    editItem(id){
        var items = [...store.getState().Items]
        this.itemToEdit = items.filter(item => item.id === id)[0]
        this.createItem()
    }

    deleteItems(){
        if(this.arraySelectedItems.length === 0){ alert("you must selected at least one item to delete");  return }
        if(window.confirm("Are you sure to delete the selected items?")){
            this.props.onDeleteItems(this.arraySelectedItems)
        }
    }

    getSelectedItems(array){
        this.arraySelectedItems = array;
    }

    render(){
        return(
            <Grid container style={{ padding : " 2em 2em 2em 2em" }}>
                <Grid item xs={12} style={{ paddingBottom : "2em" }} >
                    <span style={{ fontWeight : "bold", fontSize : "18px" }} >CRUD ITEMS</span>
                </Grid>
                <Grid item xs={12} style={{ paddingBottom : "2em" }} >
                    <Button variant="contained" color="primary" onClick={this.createItem} >Create Item</Button>
                    <Button variant="contained" color="primary" onClick={this.deleteItems} >Delete Items</Button>
                </Grid>
                <Grid item xs={12} >
                {
                    this.state.showCreateItemForm ? <CreateItemForm funcShowHideComponent={this.createItem} editItem={this.itemToEdit} resetItemToEdit={this.resetItemToEdit}  /> : <div></div>
                }
                </Grid>                
                <Grid item xs={12} >
                    <ListingItems funcGetSelectedItems={this.getSelectedItems} funcGetEditItem={this.editItem} />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) =>{
    return { listItems : state.Items }
}

const mapDispatchToProps = (dispatch) => {
    return { onDeleteItems : (items) => {
                dispatch(DeleteItem(items))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainItem)
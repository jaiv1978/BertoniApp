import React from "react"
import {CreateItem, UpdateItem} from "../../redux/actions/item/item-action"
import Grid from "@material-ui/core/Grid"
import TextField from '@material-ui/core/TextField'
import Button from "@material-ui/core/Button"
import { connect } from "react-redux"
import { getItemId } from "../../utils/helper"

class CreateItemForm extends React.Component{
    constructor(props){
        super(props)
        this.state = { id : this.props.editItem.id, firstname : this.props.editItem.firstname, lastname : this.props.editItem.lastname, 
            age : this.props.editItem.age, phonenumber : this.props.editItem.phonenumber  } 
        this.itemObject = { id : "", firstname : "", lastname : "", age : "", phonenumber : ""}
        this.onChangeText = this.onChangeText.bind(this)
        this.Save = this.Save.bind(this)
        this.Hide = this.Hide.bind(this)
    }

    onChangeText(event){
        switch(event.target.id){
            case "firstname" :
                this.itemObject.firstname = event.target.value 
                this.setState({firstname : event.target.value})
                break;
            case "lastname" :
                this.itemObject.lastname = event.target.value 
                this.setState({lastname : event.target.value})
                break;            
            case "age" :
                this.itemObject.age = event.target.value 
                this.setState({age : event.target.value})
                break;
            case "phonenumber" :
                this.itemObject.phonenumber = event.target.value
                this.setState({phonenumber : event.target.value}) 
                break;
        }
    }

    Save(){
        const {editItem} = this.props   
        if(editItem.id === ""){
            this.itemObject.id = getItemId();
            this.props.onSave(this.itemObject)
        }else{
            this.itemObject = {id : this.state.id, firstname : this.state.firstname, 
                lastname : this.state.lastname, age : this.state.age, phonenumber : this.state.phonenumber}
            this.props.onUpdate(this.itemObject)
            this.props.resetItemToEdit()
        }
    }

    Hide(){
        this.props.funcShowHideComponent()
    }

    render(){
        const {ListItems, editItem} = this.props
        if (ListItems.length > 0){
            if(ListItems.filter(item => item.id === this.itemObject.id).length > 0) { this.props.funcShowHideComponent(); return (<div></div>) }
        }

        return(<Grid container >
                <Grid item xs={12} >
                    <TextField id="firstname" label="Fist Name" onChange={this.onChangeText} value={ this.state.firstname} />    
                </Grid>
                <Grid item xs={12} >
                        <TextField id="lastname" label="Last Name" onChange={this.onChangeText} value={ this.state.lastname} />     
                </Grid>
                <Grid item xs={12} >
                        <TextField id="age" label="Age" onChange={this.onChangeText} value={ this.state.age} />    
                </Grid>
                <Grid item xs={12} style={{ paddingBottom : "1em" }} >
                        <TextField id="phonenumber" label="Phone Number" onChange={this.onChangeText} value={ this.state.phonenumber} />    
                </Grid>
                <Grid item xs={12} >
                    <Button variant="contained" color="primary" onClick={this.Save} >Save</Button>
                    <Button variant="contained" color="primary" onClick={this.Hide} >Cancel</Button>
                </Grid>                
            </Grid>)
    }
}

const mapStateToProps = (state) => {
    return { ListItems : state.Items }
}

const mapDispatchToProps = (dispatch) => {
    return { onSave : (newItem) => {
                dispatch(CreateItem(newItem))
            },
            onUpdate : (item) => {
                dispatch(UpdateItem(item))
            },
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CreateItemForm)
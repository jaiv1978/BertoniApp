import React from "react"
import {SelectItems} from "../../redux/actions/item/item-action"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from "react-redux";
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button"

class ListingItems extends React.Component{
    constructor(props){
        super(props)
        this.arrayItemsChecked = []
        this.onChangeCheckbox = this.onChangeCheckbox.bind(this)
        this.onEditItem = this.onEditItem.bind(this)
    }

    componentDidMount(){
        this.arrayItemsChecked = []
    }

    onChangeCheckbox(id, event){
        if(event.target.checked){
            this.arrayItemsChecked.push(id)
        }else{
            this.arrayItemsChecked = this.arrayItemsChecked.filter(item => item !== id) 
        }
        this.props.funcGetSelectedItems(this.arrayItemsChecked)
    }

    onEditItem(id){
        this.props.funcGetEditItem(id)    
    }

    render(){
        const {listItems, classes} = this.props
        if(listItems.length === 0){ return(<div></div>) }
        
        return(
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">Age</TableCell>
                        <TableCell align="right">phone number</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {listItems.map(row => (
                    <TableRow >
                        <TableCell align="center" >
                            <Checkbox onChange={(event) => this.onChangeCheckbox(row.id, event)} />
                        </TableCell>
                        <TableCell align="left">{row.firstname}</TableCell>
                        <TableCell align="left">{row.lastname}</TableCell>
                        <TableCell align="right">{row.age}</TableCell>
                        <TableCell align="right">{row.phonenumber}</TableCell>
                        <TableCell align="right">
                            <Button variant="contained" color="primary" onClick={() => {this.onEditItem(row.id)}} >Edit</Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        )
    }

}

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

const mapStateToProps = (state) =>{
    return { listItems : state.Items }
}

const mapDispatchToProps = (dispatch) => {
    return { onListItems : () => {
                dispatch(SelectItems())
            }
    }
}

ListingItems.propTypes = {
    classes : PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(ListingItems))
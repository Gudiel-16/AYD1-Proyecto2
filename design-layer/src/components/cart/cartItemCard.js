import React, { Component, Fragment } from 'react'

import axios from 'axios';

import {HOST} from '../../host';
import { RiTruckLine } from 'react-icons/ri';


class ItemCard extends Component {

    constructor(props) {

        super(props);
        this.state = {
            showCategory: false,
            changing:false,
            quantity:this.props.quantity
        }

        this.deleteItem = this.deleteItem.bind(this);
        this.editQuantity = this.editQuantity.bind(this);
    }

    deleteItem() {

        fetch(HOST+'eliminarProductoCarrito', {
            method: 'DELETE', // or 'PUT'
            body: JSON.stringify({
                producto:parseInt(this.props.id),
                usuario:parseInt(this.props.user)}), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => alert('Articulo no eliminado.'))
          .then(response => {
              if(response){
                window.location.replace('/cart')
              }
          });
    }


    async editQuantity(e){

        if(e.target.value>=0){

            this.setState({changing:true, quantity:parseInt(e.target.value)})
            await axios.post(HOST+'actualizarCarrito',{
                producto:parseInt(this.props.id),
                usuario: parseInt(this.props.user),
                cantidad:parseInt(e.target.value)
            }).then((res)=>{
                this.setState({changing:false})
            }).catch((err)=>{
                console.log(err)
            })
        }

    }


    render() {

        return (

            <Fragment>

                <div className="row" style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <div className="col-2" >
                        <img src={this.props.image} alt="" style={{ maxHeight: "100px", maxWidth: "150px" }} />
                    </div>
                    <div className="col" style={{ paddingRight: 20, paddingLeft: 20 }}>
                        <h5 style={{ color: "blue" }}> {this.props.name}</h5>
                        <p>  {this.props.description} </p>
                        <u style={{ color: "blue", cursor: "pointer" }} onClick={this.deleteItem} > Eliminar </u>
                    </div>

                    <div className="col" style={{ alignSelf: 'center' }}>
                        <h6 style={{ color: "red" }}>
                            <strong>$ {this.props.price} </strong>
                        </h6>
                    </div>

                    <div className="col" style={{ alignSelf: 'center' }} >
                        <div className="btn btn-info">
                            <p> Unidades </p>
                            <input type="number" min={0} step={1} disabled={this.state.changing}  onChange={ this.editQuantity } value={this.state.quantity} />
                        </div>
                    </div>
                    <div className="col" style={{ alignSelf: 'center' }} >
                        <div className="btn btn-warning">
                            $ {this.state.quantity * this.props.price}
                        </div>
                    </div>

                </div>
                <hr />

            </Fragment>

        )

    }


}


export default ItemCard;
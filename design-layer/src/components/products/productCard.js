import React, { Component, Fragment } from 'react'

import FadeIn from 'react-fade-in';

import { BiCart, BiDollar } from "react-icons/bi";

import axios from 'axios';

import { HOST } from '../../host';

class ProductCard extends Component {

    constructor(props) {

        super(props);
        this.state = {
            showCategory: false,
            quantity: 0
        }

        this.addToCart = this.addToCart.bind(this);
    }


    async addToCart() {

        //(this.props)
        if (parseInt(this.state.quantity) > 0) {
            if (parseInt(this.state.quantity) > this.props.stock) {
                alert('No hay tantas unidad disponibles. Consulte el stock')
            } else {
                await axios.post(HOST + "agregarProductoCarrito/", {
                    producto: parseInt(this.props.id),
                    usuario: parseInt(this.props.user),
                    cantidad: parseInt(this.state.quantity)
                }).then(res => {
                    if (res.data === "agregado") {
                        alert('Producto agregado')
                        window.location.reload();
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }


    }


    render() {

        return (

            <Fragment>

                <div className="card" style={{ marginBottom: 20, padding: 10 }}>
                    {
                        this.state.showCategory &&

                        <FadeIn key={0}>
                            <div className="btn btn-warning" style={{ position: 'absolute', alignSelf: 'flex-start', margin: 10 }}>
                                {this.props.category}
                            </div>
                        </FadeIn>
                    }
                    <div className="btn btn-success" style={{ position: 'absolute', alignSelf: 'flex-end', margin: 10 }}>
                        <BiDollar /> {this.props.price}
                    </div>
                    <img src={this.props.image} alt="" onMouseOver={() => this.setState({ showCategory: true })} onMouseLeave={() => this.setState({ showCategory: false })} style={{ maxHeight: 300, minHeight: 300 }} />

                    <div className="card-body" style={{ alignItems: 'center' }}>
                        <h5> {this.props.name} </h5>
                        <hr />
                        <p class="card-text"> {this.props.description} </p>
                        {
                            /*
                            <div class="alert alert-success" style={{marginTop:0, marginBottom:0}}>
                                <strong style={{marginTop:0, marginBottom:0}} > Categoria {this.props.category} </strong>
                            </div>
                            */
                        }
                    </div>
                    <div>

                    </div>
                    <div className="card-footer">
                        <div>
                            <div className="row">
                                <div style={{ alignItems: "center", textAlign: "center" }}>
                                    <strong> {this.props.stock} </strong> Unidades disponibles
                                </div>

                                <input type="number" step={1} placeholder="Cantidad a agregar" max={this.props.stock} onChange={(e) => this.setState({ quantity: e.target.value })} />
                                {
                                    this.props.stock !== 0 &&
                                    <div className="btn btn-danger" style={{ color: "#fff" }} onClick={() => this.addToCart()}>
                                        Agregar al carrito <BiCart />
                                    </div>
                                }
                                {
                                    this.props.stock === 0 &&
                                    <div className="btn btn-danger disabled" style={{ color: "#fff" }} >
                                        Agotado
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>

        )

    }


}


export default ProductCard;


/**
{
    this.props.stock + "" !== "0" &&

    <div>
        <input type="number" step={1} placeholder="Cantidad a agregar" max={this.props.stock} onChange={(e) => this.setState({ quantity: e.target.value })} />
        <div className="btn btn-danger" style={{ color: "#fff" }} onClick={() => this.addToCart()}>
            Agregar al carrito <BiCart />
        </div>
    </div>
}
 */



/*
<input type="number" step={1} placeholder="Cantidad a agregar" max={this.props.stock} onChange={(e) => this.setState({ quantity: e.target.value })} />
<div className="btn btn-danger" style={{ color: "#fff" }} onClick={() => this.addToCart()}>
    Agregar al carrito <BiCart />
</div>
*/
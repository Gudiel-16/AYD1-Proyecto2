import React, { Component, Fragment } from 'react'

import NavBar from '../components/navigationBar/navBar';

import ItemCard from '../components/cart/cartItemCard';

import { BsCreditCard } from 'react-icons/bs';

import { IoMdTrash } from 'react-icons/io';

import { Modal, Button } from 'react-bootstrap'

import CreditCard from '../components/payment/creditCard';

import axios from 'axios';

import { HOST } from '../host'


class Cart extends Component {

    constructor(props) {

        super(props);
        this.state = {
            showModal: false,
            cartItems: [],
            user:0
        }

        this.modal = this.modal.bind(this);
        this.emptyCart = this.emptyCart.bind(this);
        this.getTotal = this.getTotal.bind(this);
    }


    async componentDidMount() {


        if (typeof (Storage) !== "undefined") {

            if(localStorage.getItem('user')!==null){
                await this.setState({user:parseInt(localStorage.getItem('user'))})
                
                await axios.get(HOST + 'leerCarrito/' + this.state.user)
                .then((res) => {
                    // handle success
                    //console.log(res.data)
                    if (res.data.productos !== undefined) {
                        this.setState({ cartItems: res.data.productos })
                    } else {
                        this.setState({ cartItems: [] })
                    }
    
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })

            }
            else{
                window.location.replace('/login')    
            }

        }else{
            window.location.replace('/login')
        }

    }

    getTotal(){

        var total = 0;
        this.state.cartItems.forEach(item => {
            total += item.precio*item.cantidad
        });

        return total;
    }

    modal() {

        return (
            <>
                <Modal
                    show={this.state.showModal}
                    onHide={() => { this.setState({ showModal: false }) }}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title> Compra </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div style={{ padding: 10 }}>
                            <CreditCard user = {this.state.user} total={this.getTotal()} ></CreditCard>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => { this.setState({ showModal: false }) }}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }


    emptyCart() {

        axios.delete(HOST + 'limpiarCarrito/' + this.state.user, {})
            .then(res => {
                // Observe the data keyword this time. Very important
                // payload is the request body
                // Do something
                if (res.data === true) {
                    window.location.replace('/cart/'+this.state.user)
                } else {
                    console.log('No se pudo eliminar')
                }
            })
            .catch(err => {
                console.log(err.data)
            })

    }


    render() {

        return (

            <Fragment>

                <NavBar></NavBar>

                <div className="row" style={{ margin: 0 }}>

                    <div className="col">
                        {
                            this.state.cartItems.length > 0 &&

                            <div className="btn btn-success" onClick={() => this.setState({ showModal: true })}>
                                Ir a pagar <BsCreditCard></BsCreditCard>
                            </div>
                        }
                    </div>
                    <div className="col" style={{ paddingRight: 20, paddingLeft: 20 }}>
                        {
                            this.state.cartItems.length > 0 &&

                            <div className="btn btn-danger" onClick={this.emptyCart}>
                                Vaciar carrito <IoMdTrash></IoMdTrash>
                            </div>
                        }
                    </div>
                    <div className="col">
                        <h6><strong>Precio</strong></h6>
                    </div>

                    <div className="col">
                        <h6><strong>Cantidad</strong></h6>
                    </div>

                    <div className="col">
                        <h6><strong>Subtotal</strong></h6>
                    </div>

                </div>

                <hr />

                {
                    this.state.cartItems.map((item, i) => {
                        return (
                            <ItemCard key={i} user={this.state.user} id={item.identificador} name={item.nombre_producto} description={item.descripcion} image={item.imagen} price={item.precio} quantity={item.cantidad} >  </ItemCard>
                        )
                    })
                }

                {this.modal()}


            </Fragment >

        )

    }


}


export default Cart;
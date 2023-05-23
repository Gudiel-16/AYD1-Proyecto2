import React, { Component, Fragment } from 'react'

import NavBar from '../components/navigationBar/navBar';

import axios from 'axios';

import Categories from '../components/categories/categories';

import { HOST } from '../host';

import { Modal, Button } from 'react-bootstrap'

import ProductCard from '../components/products/productCard';

class Home extends Component {

    constructor(props) {

        super(props);
        this.state = {
            products: [],
            categories: [],
            showModal: false,
            selectedProduct: {},
            selectedCategorie:"",
            quantity: 0,
            user: 0
        }


        this.modal = this.modal.bind(this);
    }


    async componentDidMount() {

        if (typeof (Storage) !== "undefined") {

            if (localStorage.getItem('user') !== null) {
                this.setState({ user: parseInt(localStorage.getItem('user')) })

                await axios.get(HOST + 'obtenerProductos')
                    .then((res) => {
                        // handle success
                        this.setState({ products: res.data.productos })
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })

                await axios.get(HOST + 'categorias')
                    .then((res) => {
                        // handle success
                        this.setState({ categories: res.data.categorias })
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })


            }
            else {
                window.location.replace('/login')
            }

        } else {
            window.location.replace('/login')
        }


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
                    <Modal.Body>

                        <div style={{ padding: 10 }}>
                            <ProductCard key={0} user={this.state.user} id={this.state.selectedProduct.identificador} quantity={0} category={ this.state.selectedCategorie } description={this.state.selectedProduct.descripcion} stock={this.state.selectedProduct.existencia} image={this.state.selectedProduct.imagen} name={this.state.selectedProduct.nombre_producto} price={this.state.selectedProduct.precio}> </ProductCard>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => { this.setState({ showModal: false, selectedProduct: {} }) }}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }


    render() {

        return (
            <Fragment>

                <NavBar key={0}></NavBar>

                <div className="card" style={{position:"relative", alignContent:"center", textAlign:"center"}}>
                    <Categories></Categories>
                </div>



                {
                    this.state.categories.map((cat, i) => {

                        return (

                            <div key={i} style={{position:"relative"}}>
                                <div style={{ marginLeft: 25 }}>
                                    <a href={"products/" + cat.categoria} style={{ fontSize: 25 }}> {cat.nombre} </a>
                                </div>
                                <div style={{ overflowX: 'scroll', overflowY: 'hidden', display: 'inline-block', whiteSpace: 'nowrap', height: 250, alignItems: 'center', padding: 10, marginBottom: 30 }}>

                                    {
                                        this.state.products.map((p, i) => {
                                            if (cat.categoria === p.categoria) {
                                                return (
                                                    <img key={i} src={p.imagen} alt="" style={{ width: '100%', maxWidth: 300, maxHeight: 200, marginRight: 10, marginLeft: 10 }} onClick={() => this.setState({ selectedProduct: p, showModal: true, selectedCategorie:cat.nombre })} />
                                                )
                                            }
                                        })
                                    }

                                </div>
                            </div>

                        )

                    })
                }

                {this.modal()}


            </Fragment>

        )

    }


}


export default Home;
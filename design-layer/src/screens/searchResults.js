import React, { Component, Fragment } from 'react'

import NavBar from '../components/navigationBar/navBar';

import Page from '../components/pagination/page';

import axios from 'axios';

import { HOST } from '../host';

class SearchResults extends Component {

    constructor(props) {

        super(props);
        this.state = {
            pages: [],
            items: [],
            currentPage: 1,
            user: 0,
            found: false
        }

        this.searchForProduct = this.searchForProduct.bind(this);
    }


    async componentDidMount() {


        if (typeof (Storage) !== "undefined") {

            if (localStorage.getItem('user') !== null) {
                this.setState({ user: parseInt(localStorage.getItem('user')) })

                this.searchForProduct();
            }
            else {
                window.location.replace('/login')
            }

        } else {
            window.location.replace('/login')
        }

    }


    async fillPages() {

        var page = []
        let pages = [];

        await this.state.items.forEach((item, i) => {
            if (!Number.isInteger((i + 1) / 10)) {
                page.push(item)
            } else {
                page.push(item)
                pages.push(page);
                page = [];
            }
        })
        await pages.push(page);
        await this.setState({ pages: pages });
    }



    async searchForProduct() {

        var prodsFound = [];
        var product = this.props.match.params.product.slice(1);
        await axios.get(HOST + 'obtenerProductos')
            .then((res) => {
                // handle success
                var temp = "";
                res.data.productos.forEach(p => {
                    temp = p.nombre_producto + ""
                    if (temp.search(product) !== -1) {
                        prodsFound.push(p)
                    }
                });
                this.setState({ items: prodsFound, found:true }, () => this.fillPages())
            })
            .catch(function (error) {
                console.log(error)
            })
    }


    render() {

        return (
            <Fragment>

                <NavBar key={0}></NavBar>

                {
                    this.state.items.length === 0 && !this.state.found &&

                    <div style={{ textAlign: "center" }}>
                        <h1> Buscando ... </h1>
                    </div>
                }

                {
                    this.state.items.length === 0 && this.state.found &&

                    <div style={{ textAlign: "center" }}>
                        <h1> No hay resultados </h1>
                    </div>
                }

                {
                    this.state.pages.length > 0 && this.state.found &&

                    <div>

                        <Page key={this.state.currentPage} user={this.state.user} products={this.state.pages[this.state.currentPage - 1]} category = {""} > </Page>

                        <div className="" style={{ margin: 20, alignItems: "center", textAlign: "center" }} >
                            <div className="btn-group">

                                {
                                    this.state.currentPage > 1 &&

                                    <div className="btn btn-success" onClick={() => { this.setState({ currentPage: this.state.currentPage - 1 }, () => window.scrollTo(0, 0)) }} >
                                        Prev
                                    </div>
                                }


                                {
                                    this.state.currentPage > 1 &&

                                    <div className="btn btn-success" onClick={() => { this.setState({ currentPage: this.state.currentPage - 1 }, () => window.scrollTo(0, 0)) }}>
                                        {this.state.currentPage - 1}
                                    </div>
                                }

                                <div className="btn btn-primary">
                                    {this.state.currentPage}
                                </div>

                                {
                                    this.state.pages.length - 1 >= this.state.currentPage &&

                                    <div className="btn btn-success" onClick={() => { this.setState({ currentPage: this.state.currentPage + 1 }, () => window.scrollTo(0, 0)) }}>
                                        {this.state.currentPage + 1}
                                    </div>
                                }


                                {
                                    this.state.pages.length > this.state.currentPage &&

                                    <div className="btn btn-success" onClick={() => { this.setState({ currentPage: this.state.currentPage + 1 }, () => window.scrollTo(0, 0)) }}>
                                        Next
                                    </div>
                                }

                            </div>
                        </div>


                    </div>

                }


            </Fragment>

        )

    }


}


export default SearchResults;
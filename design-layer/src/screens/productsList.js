import React, { Component, Fragment } from 'react'

import NavBar from '../components/navigationBar/navBar';

import Page from '../components/pagination/page';

import axios from 'axios';

import { HOST } from '../host';

class ProductsList extends Component {

    constructor(props) {

        super(props);
        this.state = {
            pages: [],
            items: [],
            currentPage: 1,
            user: 0
        }

    }


    async componentDidMount() {


        if (typeof (Storage) !== "undefined") {

            if (localStorage.getItem('user') !== null) {
                this.setState({ user: parseInt(localStorage.getItem('user')) })

                await axios.get(HOST + 'filtroCategoria/' + this.props.match.params.idCategory)
                    .then((res) => {
                        // handle success
                        //console.log(res.data.productos);
                        this.setState({ items: res.data.productos });
                        this.fillPages();
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })


                await axios.get(HOST + 'categorias')
                    .then((res) => {
                        // handle success
                        res.data.categorias.forEach(cat => {
                            if (cat.categoria + "" === this.props.match.params.idCategory) {
                                this.setState({ category: cat.nombre })
                            }
                        });
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


    render() {

        return (
            <Fragment>

                <NavBar key={0}></NavBar>

                {
                    this.state.pages.length === 0 &&

                    <div style={{textAlign:"center"}}>
                        <h1> Cargando ... </h1>
                    </div>
                }

                {
                    this.state.pages.length > 0 &&

                    <div>


                        <Page key={this.state.currentPage} user={this.state.user} products={this.state.pages[this.state.currentPage - 1]} category={this.state.category} > </Page>

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
                {
                    this.state.pages.length === 0 &&

                    <h2> Cargando ... </h2>

                }


            </Fragment>

        )

    }


}


export default ProductsList;
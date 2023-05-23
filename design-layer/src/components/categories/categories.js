import React, { Component, Fragment } from 'react'

import { Carousel } from 'react-bootstrap';

class Categories extends Component {

    constructor(props) {

        super(props);
        this.state = {

        }

    }


    render() {

        return (

            <Fragment>

                <div className="container" style={{ width: "80%", height: "50%", marginBottom: 20, maxWidth: 1000, maxHeight: 800 }}>

                    <Carousel fade>

                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://images-na.ssl-images-amazon.com/images/I/71jN27mYlhL._SL1500_.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3 style={{color:"black"}}>Play Station 4</h3>
                                <p style={{color:"black"}}>Las consolas más vendidas..</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://www.apple.com/v/iphone-11/d/images/meta/og__f2jtwncwsl2e_specs.png?202012181258"
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3 style={{color:"black"}}>iPhone 11</h3>
                                <p style={{color:"black"}}>Los elulares más recientes.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://images-na.ssl-images-amazon.com/images/I/A1LBkD12AHL._AC_SL1500_.jpg"
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3 style={{color:"black"}}>Samsung UHD TV</h3>
                                <p style={{color:"black"}}>Las pantallas con mejor resolución.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                src="https://cdn.andro4all.com/files/2021/04/amazon-fire-hd-10-1.jpg"
                                alt="Second slide"
                                style={{width:"80%", height:"80%", position:"relative", alignSelf:"center"}}
                            />

                            <Carousel.Caption>
                                <h3 style={{color:"black"}}>Fire HD10</h3>
                                <p style={{color:"black"}}>Las mejores tablets a tu alcance.</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                    </Carousel>

                </div>

            </Fragment>

        )

    }


}


export default Categories;
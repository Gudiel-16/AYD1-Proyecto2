import React, { Component, Fragment } from 'react'

import ProductCard from '../products/productCard';

class Page extends Component {

    constructor(props) {

        super(props);
        this.state = {
            products:[]
        }

    }


    componentDidMount(){
        this.setState({products:this.props.products})
    }


    render() {

        return (

            <Fragment>

                <div className="row-12">

                    <div className="row" style={{justifyContent:"center", paddingLeft:100, paddingRight:100}}>

                        {
                            this.state.products.map((p, i)=>{

                                return(
                                    <div className="col-4">
                                        <ProductCard key={i} user={this.props.user} id={p.identificador} category={this.props.category} description={p.descripcion} quantity={0} stock={p.existencia} image={p.imagen} name={p.nombre_producto} price={p.precio} > </ProductCard>
                                    </div>
                                )

                            })
                        }

                    </div>

                </div>
                
            </Fragment>

        )

    }


}


export default Page;
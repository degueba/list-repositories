import React, { Component } from 'react';

import api from '../../services/api';


import {Link} from 'react-router-dom';

// css
import './styles.css';

export default class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            products: [],
            productInfo: {},
            page: 1
        }
    }

    // Executado assim que o componente for mostrado em tela.
    componentDidMount(){
        this.loadProducts();
    }


    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);    

        const { docs, ...productInfo } = response.data;

        this.setState({products : response.data.docs, productInfo, page})
    };

    nextPage = () => {
        const { page, productInfo } = this.state;
        
        if(page == productInfo.pages) return;

        const pageNumber = page + 1;


        this.loadProducts(pageNumber);
    }

    prevPage = () => {
        const { page, productInfo } = this.state;
        
        if(page == 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    }
    
    render(){
        const { products, page, productInfo } = this.state;


        return (
            <div className="product-list"> 
                {products.map((product, index) => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>

                        <Link to={`/product/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button className={page == 1 && 'disabled'} disabled={page == 1} onClick={this.prevPage}>Anterior</button>
                    <button className={ page == productInfo.pages && 'disabled'} disabled={page == productInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    }
}
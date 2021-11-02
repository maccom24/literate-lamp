import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';


class Product extends Component
{
	state={
		products:[],
		loading:true,
	}

	async componentDidMount(){
		const res = await axios.get('http://127.0.0.1:8000/api/product');
		// console.log(res);

		if (res.data.status === 200) {
			this.setState({
				products: res.data.products,
				loading:false,
			});
		}
	}

	deleteProduct = async (e,id)=>{
		const thidClickedFunda = e.currentTarget;
		thidClickedFunda.innerText = "Deleting";
		const res = await axios.delete(`http://127.0.0.1:8000/api/delete-product/${id}`);
		if (res.data.status === 200) {
			thidClickedFunda.closest("tr").remove();
			console.log(res.data.message);
		}
	}


	render(){
    const onToken = (token) => {
      console.log(token);
    };

		var product_HTMLTABLE ="";
		if (this.state.loading) {
			product_HTMLTABLE = <tr><td colSpan="4"><h2>Loading...</h2></td></tr>
		}else {
			product_HTMLTABLE =
			this.state.products.map((item)=>{
				return(
					<tr key={item.id}>
						<td>{item.id}</td>
						<td>{item.name}</td>
						<td>{item.code}</td>
						<td>{item.price}</td>
						<td>
             <StripeCheckout
              token={this.onToken}
              stripeKey="pk_test_51JpRZOKRfdDyuGNLOzqAeAflFZOk9tRDmAogRh3bj21rpM4vpWyHH1UNBM0RuWPB8jH695COuUcR9AOQzz9cISz800E4dnVvs5"
              >
              <button className="btn btn-primary">
                checkout
              </button>
            </StripeCheckout>
        </td>
					</tr>
				);
			});
		}




		return(
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="card">
							<div className="card-header">
								<h4>
									Product List
									<Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
								</h4>
							</div>
							<div className="card-body">
								<table className="table table-border">
									<thead>
										<tr>
											<th>#</th>
											<th>Product Name</th>
											<th>Product Code</th>
											<th>Product Price</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{product_HTMLTABLE}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default Product;

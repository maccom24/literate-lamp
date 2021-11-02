import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


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
							<Link to={`/edit-product/${item.id}`} className="btn btn-info btn-sm">Edit</Link>
							<button type="submit" onClick={(e)=>this.deleteProduct(e,item.id)} className="btn btn-danger btn-sm">Delete</button>
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
									Product Data
									<Link to={'add-product'} className="btn btn-primary btn-sm float-end">Add Products</Link>
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

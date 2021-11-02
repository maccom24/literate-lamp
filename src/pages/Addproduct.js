import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Addproduct extends Component
{

	state = {
		pname:'',
		pcode:'',
		pprice:'',
	}

	handleInput = (e) =>{
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	saveStudent = async(e)=>{
		e.preventDefault();
		const res = await axios.post('http://127.0.0.1:8000/api/add-product', this.state);
		if (res.data.status === 200) {
			console.log(res.data.message);
			this.setState({
				pname:'',
				pcode:'',
				pprice:'',
			});
		}
	}


	render(){
		return(
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<div className="card">
							<div className="card-header">
								<h4>
									Add Product
									<Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
								</h4>
							</div>
							<div className="card-body">
								<form onSubmit={this.saveStudent}>
									<div className="form-group py-2">
										<label>Product Name</label>
										<input type="text" name="pname" onChange={this.handleInput} value={this.state.pname} className="form-control" />
									</div>
									<div className="form-group">
										<label>Product Code</label>
										<input type="text" name="pcode" onChange={this.handleInput} value={this.state.pcode} className="form-control" />
									</div>
									<div className="form-group">
										<label>Product Price</label>
										<input type="text" name="pprice" onChange={this.handleInput} value={this.state.pprice} className="form-control" />
									</div>
									<div className="form-group py-2">
										<button type="submit" className="btn btn-primary">Save Product</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Addproduct;

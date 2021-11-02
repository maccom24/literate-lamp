import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Editproduct extends Component
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

 async componentDidMount() {
   const pro_id = this.props.match.params.id;
   // console.log(pro_id);

   const res = await axios.get(`http://127.0.0.1:8000/api/edit-product/${pro_id}`);
   if (res.data.status === 200) {
     this.setState({
     		pname:res.data.products.name,
				pcode:res.data.products.code,
     		pprice:res.data.products.price,
     });
   }
 }

	updateStudent = async(e)=>{
		e.preventDefault();

    document.getElementById('updatebtn').disabled = true;
    document.getElementById('updatebtn').innerText = "Updating...";
    const pro_id = this.props.match.params.id;
		const res = await axios.put(`http://127.0.0.1:8000/api/update-product/${pro_id}`, this.state);
		if (res.data.status === 200) {
			console.log(res.data.message);
      document.getElementById('updatebtn').innerText = "Update Product";
      document.getElementById('updatebtn').disabled = false;
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
									Edit Product
									<Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
								</h4>
							</div>
							<div className="card-body">
								<form onSubmit={this.updateStudent}>
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
										<button type="submit" id="updatebtn" className="btn btn-primary">Update Product</button>
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
export default Editproduct;

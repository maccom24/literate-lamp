import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Addclient extends Component
{
  state = {
    cname:'',
    caddress:'',
    cemail:'',
  }

  handleInput=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  saveClient = async(e)=>{
    e.preventDefault();
    const res = await axios.post('http://127.0.0.1:8000/api/add-client', this.state);
    if (res.data.status === 200) {
        console.log(res.data.message);
        this.setState({
          cname:'',
          caddress:'',
          cemail:'',
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
                  Add client
                  <Link to={'/client'} className="btn btn-primary btn-sm float-end">Back</Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={this.saveClient}>
                  <div className="form-group">
                    <label>Client Name</label>
                    <input type="text" name="cname" onChange={this.handleInput} value={this.state.cname} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Client Address</label>
                    <input type="text" name="caddress" onChange={this.handleInput} value={this.state.caddress} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="cemail" onChange={this.handleInput} value={this.state.cemail} className="form-control" />
                  </div>
                  <div className="form-group py-2">
                    <button type="submit" className="btn btn-success btn-sm">Add Client</button>
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
export default Addclient;

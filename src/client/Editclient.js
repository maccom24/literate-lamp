import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Editclient extends Component
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

  async componentDidMount(){
    const client_id = this.props.match.params.id;

    const res = await axios.get(`http://127.0.0.1:8000/api/edit-client/${client_id}`);
      if (res.data.status === 200) {
        this.setState({
          cname:res.data.clients.name,
          caddress:res.data.clients.address,
          cemail:res.data.clients.email,
        });
      }
  }

  updateClient = async(e)=>{
    e.preventDefault();
    document.getElementById('updatebtn').disabled = true;
    document.getElementById('updatebtn').innerText = "Updating...";
    const client_id = this.props.match.params.id;
    const res = await axios.put(`http://127.0.0.1:8000/api/update-client/${client_id}`, this.state);
    if (res.data.status === 200) {
    			console.log(res.data.message);
          document.getElementById('updatebtn').innerText = "Update Client";
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
                  Edit client profile
                  <Link to={'/client'} className="btn btn-primary btn-sm float-end">Back</Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={this.updateClient}>
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
                    <button type="submit" id="updatebtn" className="btn btn-success btn-sm">Update Client</button>
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
export default Editclient;

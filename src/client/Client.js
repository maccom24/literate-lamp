import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


class Client extends Component
{
  state = {
    clients:[],
    loading:true,
  }

  async componentDidMount(){
    const res = await axios.get('http://127.0.0.1:8000/api/client');
    if (res.data.status === 200) {
      this.setState({
        clients: res.data.clients,
        loading:false,
      });
    }
  }

  deleteClient = async (e,id)=>{
		const thidClickedFunda = e.currentTarget;
		thidClickedFunda.innerText = "Deleting";
		const res = await axios.delete(`http://127.0.0.1:8000/api/delete-client/${id}`);
		if (res.data.status === 200) {
			thidClickedFunda.closest("tr").remove();
			console.log(res.data.message);
		}
	}

  render(){

    var client_HTMLTABLE = "";
    if (this.state.loading) {
      client_HTMLTABLE = <tr><td colSpan="5"><h2>Loading.....</h2></td></tr>
    }else{
      client_HTMLTABLE =
      this.state.clients.map((item)=>{
        return(
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>{item.email}</td>
            <td>
              <Link to={`/edit-client/${item.id}`} className="btn btn-info btn-sm">Edit</Link>
              <button type="submit" onClick={(e)=>this.deleteClient(e,item.id)} className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>

        )
      });
    }


    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Client data
                  <Link to={'/add-client'} className="btn btn-primary btn-sm float-end">Add Client</Link>
                </h4>
              </div>
              <div className="card-body">
                <table className="table table-border">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Client Name</th>
                      <th>Client Address</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {client_HTMLTABLE}
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

export default Client;

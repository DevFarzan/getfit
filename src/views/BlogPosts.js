/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";
import { HttpUtils } from '../Services/HttpUtils';
import { Switch } from 'antd';
import PageTitle from "../components/common/PageTitle";
const axios = require('axios');

const about = {
  first:'',
  second:''
}

class BlogPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers:[],
      obj:{},
      alltrainny:[],
      selectedTrainner:'',
      selectedTrainny:'',
      selectedTrainnyId:'',
      about:{},
      alertSuccess:false
    }
  }
  componentDidMount () {
    this.getAllTrainner();
    this.getAllTrainne();
    this.aboutObject();
  }
  aboutObject (){
    this.setState({
      about:about
    })
  }
  assignValue = async (event) => {
    //console.log(value,'checking value');
    //console.log(e.target.value,'valueeeeeeeee');
    let obj = JSON.parse(event.target.value); //object
    console.log(obj,'checking obj1')
    if(obj.type == 'trainner'){
      await this.setState({
        selectedTrainner:obj.name,
        selectedTrainnerId:obj._id
      })
    }
    else if(obj.type == 'trainee'){
      await this.setState({
        selectedTrainny:obj.name,
        selectedTrainnyId:obj._id
      })
    }
  }
   

  handleTrainner =  async () =>{
    let obj = {
      trainnerName:this.state.selectedTrainner,
      trainnyName:this.state.selectedTrainny,
      trainnerId:this.state.selectedTrainnerId,
      trainnyId:this.state.selectedTrainnyId
    }
    console.log(obj,'checking obj2')
    let res = await HttpUtils.post('updateuser',obj);
     console.log(res,'server response')
     console.log('trainnerName',this.state.selectedTrainner);
     console.log('trainnyName',this.state.selectedTrainny);
     this.setState({
      alertSuccess:true
     })
  }
   getAllTrainner(){
    fetch('https://getfit-server.herokuapp.com/gettrainner')
  .then(response => response.json())
  .then(data => this.setState({ allUsers:data.content}));
  }

  getAllTrainne(){
   fetch('https://getfit-server.herokuapp.com/gettrainny')
 .then(response => response.json())
 .then(data => this.setState({ alltrainny:data.content}));
 }

  render() {
    const { allUsers,alltrainny,selectedTrainner,selectedTrainny,alertSuccess } = this.state;
    console.log(alltrainny,'trainny');
    console.log(allUsers,'trainner');
    return(
      <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
              <Card small style={{marginTop:'10px',marginBottom:'35%'}}>
                <CardHeader className="border-bottom">
                    <h6 className="m-0">Assign User To Trainner</h6>
                </CardHeader>
                <div className="row" style={{marginTop:'23px'}}>
                  <div className="col-md-4">
                    <label style={{paddingLeft:'15px'}}>Select Trainner:</label>
                  </div>
                  <div className="col-md-4">
                        <select className="form-control" onChange={this.assignValue}>
                        <option>Select Value</option>
                        {allUsers && allUsers.map((elem, index) => {
                          return (
                            <option key={index} value={JSON.stringify(elem)}>{elem.name}</option>
                              )
                          })
                        }
                        </select>
                  </div>
                  <div className="col-md-4"></div>
                </div>{/*row*/}
                <br/>
                <div className="row">
                    <div className="col-md-4">
                      <label style={{paddingLeft:'15px'}}>Select Users</label>
                    </div>
                    <div className="col-md-4">
                    <select className="form-control" onChange={this.assignValue}>
                    <option>select value</option>
                    {alltrainny && alltrainny.map((elem, index) => {
                      return (
                        <option key={index} value={JSON.stringify(elem)}>{elem.name}</option>
                          )
                      })
                    }
                    </select>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12" style={{marginBottom:'17px',textAlign:'center'}}>
                        <button onClick={this.handleTrainner} className="btn btn-primary">Assign Trainner</button>
                    </div>
                </div>
                { alertSuccess &&  <div className="alert alert-success" style={{marginTop:'8px'}}>
                      Status changed successfully.
                    </div>}
              </Card>
          </div>
          <div className="col-md-2"></div>
      </div>
    )
    
  }
}

export default BlogPosts;

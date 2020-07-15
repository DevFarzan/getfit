import React from "react";
import ReactQuill from "react-quill";
import { Card, CardBody,Form, FormInput } from "shards-react";
import { Icon, Input, Button, Checkbox } from 'antd';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { HttpUtils } from "../../Services/HttpUtils";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

class NewUser extends React.Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            obj:{},
            userDetail:[],
            selectedId:'',
            alertSuccess:false
        }
            
    }
    createNotification = (type) => {
        console.log('inside function')
        //return () => {
          switch (type) {
            case 'info':
              NotificationManager.info('Info message');
              console.log('inside case')
              break;
            case 'success':
              NotificationManager.success('Success message', 'Title here');
              console.log('inside success')
              break;
            case 'warning':
              NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
              break;
            case 'error':
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
              });
              break;
          }
        //}
    }

    componentDidMount(){
        this.getAllUserEmail()
    }

    handleSubmit (event){
    event.preventDefault();
    console.log('Target Event Value >>',event.target.value)
    const data = new FormData(event.target);
    console.log(data.get('username'));
     this.state.obj = {
         id:this.state.selectedId,
         type:data.get('type')  
     }
     console.log(this.state.obj,'ooobbbjjj')
     this.postUserByAdmin(this.state.obj);
    }
    postUserByAdmin = async (obj) =>{
        let response = await HttpUtils.post('adminuser',obj);
        // let sqlDatabase = await fetch('http://crm.getfitathletic.pk/webapi/api/UpdateUserType?UserID=123&Type=1')
        // console.log('sqlDatabase >>>', await sqlDatabase.json());
        // console.log(response,'checking user')
        console.log(NotificationManager);
        this.setState({
            alertSuccess:true
        })
    }

    getAllUserEmail = async() =>{
        let allEmails = await HttpUtils.get('getemailadmin');
        console.log(allEmails,'All user emails');
        this.setState({
            userEmails:allEmails.content
            
        })
        //console.log(this.state.userEmail,'checking')
    }

    handleUserByEmail = async (event) =>{
        let selectedEmail = JSON.parse(event.target.value);
        console.log('handleUserByEmail >>',selectedEmail);
        this.setState({
            selectedId:selectedEmail.id
        })
        let emailObj = {
            email:selectedEmail.Email
        }
        
        let specificEmailUser = await HttpUtils.post('getuserbyemail',emailObj)
        console.log(specificEmailUser,'after response');
        this.setState({
            userDetail:specificEmailUser.content[0]
        })
    }
    
    render(){
        const { userEmails, userDetail, alertSuccess } = this.state;
        console.log(userEmails,'checking');
        return(
            <div>
                <Card small className="mb-3">
                        <CardBody>
                        <ReactNotification />
                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                        <div className="col-md-4">
                                            <label>Email:</label>
                                        </div>
                                        <div className="col-md-8">
                                            {/* <input type="text" name ="email" className="form-control" placeholder="email" /> */}
                                            <select className="form-control" onChange={this.handleUserByEmail}>
                                                <option>Select Value</option>
                                                {userEmails && userEmails.map((elem, index) => {
                                                return (
                                                    <option key={index} value={JSON.stringify(elem)}>{elem.Email}</option>
                                                    )
                                                })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label  htmlFor="username">Name:</label>
                                        </div>
                                        <div className="col-md-8">
                                            {/* <input id="username" name="username" type="text" className="form-control" placeholder="Name" style={{width:'100%'}} /> */}
                                            <label>{userDetail.name}</label>
                                        </div>
                                    </div>
                                    <br/>
                                    
                                    {/* <div className="row">
                                        <div className="col-md-4">
                                            <label>Password:</label>
                                        </div>
                                        <div className="col-md-8">
                                            {/* <input type="password" name="password" className="form-control" placeholder="password" /> 

                                        </div>
                                    </div>
                                    <br/> */}
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Mobile No:</label>
                                        </div>
                                        <div className="col-md-8">
                                            {/* <input type="text" name="mobileNo" className="form-control" placeholder="Mobile No" /> */}
                                            <label>{userDetail.mobileNo}</label>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Verified</label>
                                        </div>
                                        <div className="col-md-8">
                                            {/* <input type="text" name="mobileNo" className="form-control" placeholder="Mobile No" /> */}
                                            <label>{JSON.stringify(userDetail.verified)}</label>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Blocked</label>
                                        </div>
                                        <div className="col-md-8">
                                            {/* <input type="text" name="mobileNo" className="form-control" placeholder="Mobile No" /> */}
                                            <label>{JSON.stringify(userDetail.blocked)}</label>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Change Status:</label>
                                        </div>
                                        <div className="col-md-8">
                                            <select name="type" className="form-control" onChange={this.changeStatus}>
                                                <option>trainer</option>
                                                {/* <option>trainee</option> */}
                                            </select>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-12" style={{textAlign:'center'}}>
                                            <button className="btn btn-primary">Change Status</button>
                                        </div>
                                        
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                        { alertSuccess &&  <div className="alert alert-success" style={{marginTop:'8px'}}>
                                          Status changed successfully to Trainer.
                                        </div>}
                                        </div>
                                    </div>
                                </form>    
                                </div>
                                <div className="col-md-2"></div>
                            </div>
                        
                        </CardBody>
                </Card>
            </div>
        )
    }


}

export default NewUser;
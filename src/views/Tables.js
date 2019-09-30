import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody,FormCheckbox } from "shards-react";
import { HttpUtils } from '../Services/HttpUtils';
import { Switch } from 'antd';
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import firebase from '../config/firebase';
import images from '../images/backarrow.png';
import "./css/custom.css";
//import '../../src/shards-dashboard/styles/accents/';
//import ToggleButtons from "../components/components-overview/ToggleButtons";

import PageTitle from "../components/common/PageTitle";
const db = firebase.database();
class Tables extends React.Component {
  constructor(props) {
        super(props)
        this.state = {
          allUsers:[],
          checkingWidget:false,
          tableWidget:true,
          conversation:false,
          name:'',
          email:'',
          phone:'',
          block:'',
          verified:'',
          type:'',
          chatArrayTemp:[],
          bothuser:''
        }
}
  componentDidMount () {
    this.getAllBusiness();
    
  }
  
    
  changeStatusBlocked = (data) => {
    console.log(data,'checking status');
    this.setState({
      checkingWidget:true,
      tableWidget:false,
      name:data.name,
      email:data.email,
      phone:data.mobileNo,
      block:data.blocked,
      verified:data.verified,
      type:data.type
    })
  }

  backToAllUser = () =>{
    this.setState({
      checkingWidget:false,
      tableWidget:true,
      conversation:false
    })
  }

  blockUser = async (data) => {
    alert('block user');
    let obj = {
      email:data,
      status:true,
      key:'blocked'
    }
    console.log(data,'checking emailllllll');
    let getResponse = await HttpUtils.post('block',obj);
    console.log(getResponse)
    this.setState({
      checkingWidget:false,
      tableWidget:true,
      conversation:false
    })
    this.getAllBusiness();
  }
  verifiedUser = async (data) =>{
    let obj = {
      email:data,
      status:true,
      key:'verified'
    }
    console.log(data,'checking emailllllll');
    let getResponse = await HttpUtils.post('block',obj);
    console.log(getResponse)
    this.setState({
      checkingWidget:false,
      tableWidget:true,
      conversation:false
    })
    this.getAllBusiness();
  }
  unBlockUser = async (data)=>{
    alert('block user');
    let obj = {
      email:data,
      status:false,
      key:'blocked'
    }
    console.log(data,'checking emailllllll');
    let getResponse = await HttpUtils.post('block',obj);
    console.log(getResponse)
    this.setState({
      checkingWidget:false,
      tableWidget:true,
      conversation:false
    })
    this.getAllBusiness();
  }
  unVerifiedUser = async (data) =>{
    let obj = {
      email:data,
      status:false,
      key:'verified'
    }
    console.log(data,'checking emailllllll');
    let getResponse = await HttpUtils.post('block',obj);
    console.log(getResponse)
    this.setState({
      checkingWidget:false,
      tableWidget:true,
      conversation:false
    })
    this.getAllBusiness();
  }

  chatScreen = (chatObj) => {
    //let chatArrayTemp = [];
    console.log(chatObj,'chat dataaaaaa');
    this.setState({
      bothuser:chatObj
    })
    this.setState({
      conversation:true,
      tableWidget:false
    })
    let arraychat = [];
    db.ref('chatRoom').on("value", snapshot => {
      let data = snapshot.val()
      for (let i in data) {
        let firbaseData = data[i]
        console.log(firbaseData,'fffffffff')
        if (firbaseData.reciverId == chatObj._id && firbaseData.senderId == chatObj.trainnerId
          || firbaseData.senderId == chatObj.tainnyId) {
            arraychat.push(firbaseData);

          //console.log(this.state.chatArrayTemp,'final Array')
        }
        if (firbaseData.senderId == chatObj._id && firbaseData.reciverId == chatObj.trainnerId ||
          firbaseData.senderId == chatObj._id && firbaseData.reciverId == chatObj.tainnyId) {
          arraychat.push(firbaseData);
          //console.log(this.state.chatArrayTemp,'final Array')
        }
      }
      if (chatObj.trainnerId) {
        this.setState({
          opponentId: chatObj.trainnerId,
        })
      }
      
      else if (chatObj.tainnyId) {
        this.setState({
          opponentId: chatObj.tainnyId,
        })
      }
  })
  this.setState({
    chatArrayTemp:arraychat
  })
  //arraychat = [];
  
}

  async getAllBusiness(){
    fetch('http://localhost:8000/getuser')
 .then(response => response.json())
 .then(data => this.setState({ allUsers:data.content}));

}


render() {
  console.log(this.state.chatArrayTemp,'dasdsasda')
  const { allUsers,checkingWidget,tableWidget,name,email,phone,block,verified,type,conversation,bothuser,chatArrayTemp } = this.state;
  //console.log(allUsers,'sdsaasdsad');
  return (
  <Container fluid className="main-content-container px-4">
    {tableWidget && <span>
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Get Fit All Users" subtitle="Blog Posts" className="text-sm-left" />
    </Row>

    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">GetFit Users</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    #
                  </th>
                  <th scope="col" className="border-0">
                    Name
                  </th>
                  <th scope="col" className="border-0">
                    Email
                  </th>
                  <th scope="col" className="border-0">
                    Phone Number
                  </th>
                  <th scope="col" className="border-0">
                    Assign Trainer
                  </th>
                  <th scope="col" className="border-0">
                    Blocked User
                  </th>
                  <th>
                    Change Status
                  </th>
                  <th scope="col" className="border-0">
                    View Chat
                  </th>
                </tr>
              </thead>

     {allUsers && allUsers.map((elem, key) => {
                return (<tbody>
                    <tr>
                        <th scope="row">{key}</th>
                        <td className='tableTd'>{elem.name}</td>
                        <td className='tableTd'>{elem.email}</td>
                        <td className='tableTd'>{elem.mobileNo}</td>
                        <td className='tableTd'>{elem.assignTrainner}</td>
                        {elem.blocked==false && <td className='tableTd'>Not Blocked</td>}
                        {elem.blocked==true && <td className='tableTd'>Blocked</td>}
                        <td><button className="btn btn-danger" onClick={this.changeStatusBlocked.bind(this,elem)}>Change Status</button></td>
                        <td className="tableTd" onClick={this.chatScreen.bind(this,elem)}><a href="#">Messages</a></td>
                    </tr>
                </tbody>
                )
            })
          }
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
    </span>}
    {checkingWidget &&<span>
    <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Blocked this User" subtitle="Blog Posts" className="text-sm-left" />
    </Row>
    <Card>
      <CardHeader className="border-bottom">
            <h6 className="m-0">Blocked This User</h6>
      </CardHeader>
      <CardBody>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-3">Name:</div>
          <div className="col-md-7">{name}</div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-3">Email</div>
          <div className="col-md-7">{email}</div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-3">Phone</div>
          <div className="col-md-7">{phone}</div>
        </div>
        <div class="row">
          <div class="col-md-2"></div>
          <div className="col-md-3">Verified</div>
          <div className="col-md-7">{JSON.stringify(verified)}</div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-3">Blocked</div>
          <div className="col-md-7">{JSON.stringify(block)}</div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-3">Type</div>
          <div className="col-md-7">{type}</div>
        </div>
          <div className="row">
              <div className="col-md-6"></div>
                <div className="col-md-6" style={{marginTop:'13px'}}>
                  <button onClick={this.backToAllUser} className="btn btn-primary" style={{margin:'8px'}}>Back To All Users</button>
                  {block==false && <button onClick={this.blockUser.bind(this,email)} className="btn btn-danger" style={{margin:'5px'}}>Block this user</button>}
                  {block==true &&<button onClick={this.unBlockUser.bind(this,email)} className="btn btn-success" style={{margin:'5px'}}>Unblock this user</button>}
                  {verified == true && <button className="btn btn-danger" onClick={this.unVerifiedUser.bind(this,email)}>Un Verified this user</button>}
                  {verified == false && <button className="btn btn-success" onClick={this.verifiedUser.bind(this,email)}>Verified this user</button>}
              </div>
         </div>
      </CardBody>
    </Card>
    </span>}
    { conversation && <span>
    <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Chat Screen" subtitle="Blog Posts" className="text-sm-left" />
    </Row>
    <Card>
        <CardHeader className="border-bottom">
          <div className="row">
              <img onClick={this.backToAllUser} src={images} style={{width:'4%',height:'3%',cursor:'pointer'}} />
              <span style={{marginLeft: '17px',marginTop: '7px'}}><h6 className="m-0">Conversation between {bothuser.name} and {bothuser.assignTrainner}</h6></span>
        </div>
        </CardHeader>
        <CardBody>
         {chatArrayTemp && chatArrayTemp.map((elem,key)=>(
          // console.log(bothuser , 'elem')
        // return (
        <span> 
           {elem.senderId == bothuser._id && 
            <div className="containercustom">
                 {/*<img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1567493770/eeiylsvtluxvn2ohixni.jpg" alt="Avatar" style={{width:"100%;"}} /> */}
                <span>{elem.name}:</span>
                {elem.type == 'text' && <p key={key}>{elem.message}</p>}
                {elem.type == 'image' && <img src={elem.message.secure_url} style={{width:'80px',height:'80px'}} />}
                {elem.type == 'mp4' && <video width="400" controls src={elem.message.secure_url}></video>}
                {elem.type == 'wma' || elem.type == 'mp3' && <audio width="400" controls src={elem.message.secure_url}></audio>}
                <span className="time-right">{elem.time}</span>
          </div>
          
           } 
           {elem.senderId == bothuser.trainnerId && <div className="containercustom darkercustom">
            <span style={{}}>{elem.name}:</span>
            {elem.type == 'text' && <p style={{}}>{elem.message}</p>}
            {elem.type == 'image' && <img src={elem.message.secure_url} style={{}} />}
            {elem.type == 'mp4' && <video width="400" controls src={elem.message.secure_url}></video>}
            {elem.type == 'wma' || elem.type == 'mp3' && <audio width="400" controls src={elem.message.secure_url}></audio>}
            <span style={{}}>{elem.time}</span>
           </div> }
        </span>
        // )  
        ))
        } 
        
        </CardBody>
      </Card>
    </span>}
  </Container>
)
}
};

export default Tables;



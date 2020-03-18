import React from "react";
import { Container, Row, Col } from "shards-react";
import { Redirect } from "react-router-dom";
import './css/custom.css';
import PageTitle from "../components/common/PageTitle";
// import Editor from "../components/add-new-post/Editor";
// import NewUser from "../components/add-new-post/NewUser";
// import SidebarActions from "../components/add-new-post/SidebarActions";
// import SidebarCategories from "../components/add-new-post/SidebarCategories";

import logoImage from '../images/logo.png';



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            redirect: false,
            popUpAlert: false
        };
    }

    handleChangeUserName = (e) => {
        console.log(e.target.value, 'e.target.value user name')
        this.setState({
            userName: e.target.value,
            popUpAlert: false
        })
    }

    handleChangePassword = (e) => {
        console.log(e.target.value, 'e.target.value password')

        this.setState({
            password: e.target.value,
            popUpAlert: false
        })
    }
    onSubmit = (e) => {
        let database = [];
        e.preventDefault();
        if (this.state.userName != '' && this.state.password != '') {
            const form = {
                userName: this.state.userName,
                password: this.state.password
            }

            console.log(form, 'form data')
            database.push(form);
            this.setState({
                userName: '',
                password: '',
                popUpAlert: false
            })
        }
        else {
            this.setState({
                popUpAlert: true
            })
        }
        console.log(database, 'checking');
        if (database) {
            if (database.length > 0) {
                for (var i = 0; i < database.length; i++) {
                    console.log(database[i], 'i')
                    if (database[i].userName == 'admin' && database[i].password == '123') {
                        console.log('hit')
                        this.setState({
                            redirect: true,
                            popUpAlert: false

                        })
                    }
                    else {
                        this.setState({
                            redirect: false,
                            popUpAlert: true
                        })
                    }

                }
            }
        }
    }
    render() {
        const { popUpAlert } = this.state;
        if (this.state.redirect) {
            return <Redirect to="/blog-overview" />
        }
        console.log('login form')
        return (
            <div className="row">
                {popUpAlert && alert('Kindly cheak your user name or password')}
                <div className="col-md-6" style={{ marginTop: '10%' }}>
                    <div className="login-form">
                        <form action="/examples/actions/confirmation.php" method="post">
                            <h2 className="text-center">Log in</h2>
                            <div className="form-group">
                                <input type="text" className="form-control" name='name'
                                    value={this.state.userName}
                                    onChange={e => this.handleChangeUserName(e)} placeholder="Username" required="required" />
                            </div>
                            <div class="form-group">
                                <input type="password" className="form-control" placeholder="Password" name='password'
                                    value={this.state.password}
                                    onChange={e => this.handleChangePassword(e)} required="required" />
                            </div>
                            <div class="form-group">
                                <button type="submit" onClick={(e) => this.onSubmit(e)} className="btn btn-primary btn-block">Log in</button>
                            </div>
                            <div className="clearfix">

                                {/* <a href="#" className="pull-right">Forgot Password?</a> */}
                            </div>
                        </form>
                        {/* <p className="text-center"><a href="#">Create an Account</a></p> */}
                    </div>
                </div>
                <div classname="col-md-6">
                    <img src={logoImage} style={{ marginTop: '57%' }} />
                </div>
            </div>
        )
    }
}

export default Login;

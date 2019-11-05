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
            name: ' ',
            email: ' ',
            redirect: false
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        let database = [];
        e.preventDefault();
        const form = {
            name: this.state.name,
            email: this.state.email
        }

        database.push(form);
        this.setState({
            name: '',
            email: ''
        })
        console.log(database, 'checking');
        if (database.length > 0) {
            if (database[0].name == 'admin' || database.email[0] == '123') {
                console.log('hit')
                this.setState({
                    redirect: true
                })
            }
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/blog-overview" />
        }
        return (
            <div className="row">
                <div className="col-md-6" style={{ marginTop: '10%' }}>
                    <div className="login-form">
                        <form action="/examples/actions/confirmation.php" method="post">
                            <h2 className="text-center">Log in</h2>
                            <div className="form-group">
                                <input type="text" className="form-control" name='name'
                                    value={this.state.name}
                                    onChange={e => this.handleChange(e)} placeholder="Username" required="required" />
                            </div>
                            <div class="form-group">
                                <input type="password" className="form-control" placeholder="Password" name='email'
                                    value={this.state.email}
                                    onChange={e => this.handleChange(e)} required="required" />
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

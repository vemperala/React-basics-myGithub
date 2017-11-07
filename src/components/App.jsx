import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';

class App extends Component {

    constructor(props){
       super(props);
       this.state = {
           username: 'vemperala',
           userData: [],
           userRepos: [],
           perPage: 5
       } 
    }
    
    //get users data from github
    getUserData(){
        $.ajax({
            url: 'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({userData: data});
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err){
                this.setState({username: null});
                alert(err);
            }.bind(this)
        });
    }

    getUserReops() {
        $.ajax({
            url: 'https://api.github.com/users/'+this.state.username+'/repos?per_page='+this.state.perPage+'&client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'&sort=created',
            dataType: 'json',
            cache: false,
            success: function(data){
                this.setState({userRepos: data});
                console.log(this.state.userRepos)
            }.bind(this),
            error: function(xhr, status, err){
                this.setState({username: null})
            }.bind(this)
        });
    }

    handleOnFormSubmit(username){
        this.setState({username: username}, function(){
            this.getUserData();
            this.getUserReops();
        });
        
    }

    componentDidMount() {
        this.getUserData();
        this.getUserReops();
    }

    render(){
        return (
            <div>
                <Search onFormSubmit={this.handleOnFormSubmit.bind(this)} />
             <Profile {...this.state}/>
            </div>
        )
    }
}

App.propTypes = {
    clientId: React.PropTypes.string,
    clientSecret: React.PropTypes.string
};

App.defaultProps = {
    clientId: 'e93ab3d8967ba2d8303b',
    clientSecret: '006e45b8787c500305b1520c7b28272fd55b7316'
}

export default App
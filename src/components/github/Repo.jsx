import React, {Component} from 'react';


class Repo extends Component{
    render() {

        const {repo} = this.props;
        console.log(repo)
        return(

                <li className="list-group-item">
                    <a href={repo.html_url}>
                        {repo.name}
                    </a> : {repo.created_at}
                </li>
           
        )
    }
}

export default Repo
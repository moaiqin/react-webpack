import React, {Component} from 'react';

export default (loader, conlection) => {
    return class AsyncComponent extends Component {
        constructor(props){
            super(props);
            this.state = {
                component:AsyncComponent.component
            }
        }
        componentWillMount(){
            const component = this.state.component;
            if(!component){
                loader().then((component) => {
                    AsyncComponent.component = component;
                    this.setState({component});
                })
            }
        }
        render(){
            const component = this.state.component;
            if(component){
                return <this.state.component {...this.props} {...conlection}/>
            }
            return null;
        }
    }
}
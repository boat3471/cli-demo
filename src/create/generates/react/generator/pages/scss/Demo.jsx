import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/pages/demo.scss';

class App extends React.Component {
    render() {
        return (
            <div className="demo-box">
                <h1>DEMO</h1>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));

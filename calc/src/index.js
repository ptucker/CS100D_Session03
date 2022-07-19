import React from 'react';
import ReactDOM from 'react-dom/client';
import './calc.css';

class Main extends React.Component {
    render() {
        return (
            <div className='main'>
                <img className='logo' src="https://d2o2figo6ddd0g.cloudfront.net/6/w/31cxsxy4no5n2j/Flagonly.jpg" alt="Whitworth University"/>
                <h1 style={{"textAlign":"center"}}>π-rates Calculator</h1>
                <table className='calc'>
                    <tbody>
                    <tr className='calc'>
                        <td colSpan="5"><span className="display" id="display">0</span></td>
                    </tr>
                    <tr>
                        <td><button className="number" value='7'>7</button></td>
                        <td><button className="number" value='8'>8</button></td>
                        <td><button className="number" value='9'>9</button></td>
                        <td><button className="op">/</button></td>
                        <td><button className="op">?</button></td>
                    </tr>
                    <tr>
                        <td><button className="number" value='4'>4</button></td>
                        <td><button className="number" value='5'>5</button></td>
                        <td><button className="number" value='6'>6</button></td>
                        <td><button className="op">*</button></td>
                        <td><button className="op">?</button></td>
                    </tr>
                    <tr>
                        <td><button className="number" value='1'>1</button></td>
                        <td><button className="number" value='2'>2</button></td>
                        <td><button className="number" value='3'>3</button></td>
                        <td><button className="op">-</button></td>
                        <td><button className="op">?</button></td>
                    </tr>
                    <tr>
                        <td><button className="number" value='0'>0</button></td>
                        <td><button className="op">CE</button></td>
                        <td><button className="op">=</button></td>
                        <td><button className="op">+</button></td>
                        <td><button className="op">?</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main user='Pete' />);
import React from 'react';
import { render } from 'react-dom';
import { slideDown, slideUp } from './anim';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from 'react-bootstrap'
import Select from '../basicComponents.js/select';
import Button from "../basicComponents.js/button";


function formatDate(str) {
  return str.substr(0, 10);
}

function capitalize(str) {
  return str.split(' ').map(s => {
    return s.charAt(0).toUpperCase() + s.substr(1);
  }).join(' ');
}


class UserTableRow extends React.Component {
  state = { expanded: false }

  toggleExpander = (e) => {
    if (e.target.type === 'checkbox') return;

    if (!this.state.expanded) {
      this.setState(
        { expanded: true },
        () => {
          if (this.refs.expanderBody) {
            slideDown(this.refs.expanderBody);
          }
        }
      );
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => { this.setState({ expanded: false }); }
      });
    }
  }

  render() {
    const { user } = this.props;
    return [
      <tr key="main" onClick={this.toggleExpander}>
        <td><input className="uk-checkbox" type="checkbox" /></td>
        <td className="uk-text-nowrap">{this.props.index}.</td>
        <td><img className="uk-preserve-width uk-border-circle" src={user.picture.thumbnail} width={48} alt="avatar" /></td>
        <td>{capitalize(user.name.first + ' ' + user.name.last)}<br /><small>{user.email}</small></td>
        <td>{capitalize(user.location.city)} ({user.nat})</td>
        <td>{formatDate(user.registered)}</td>
      </tr>,
      this.state.expanded && (
        <tr className="expandable" key="tr-expander">
          <td className="uk-background-muted" colSpan={6}>
            <div ref="expanderBody" className="inner uk-grid">
              <div className="uk-width-1-4 uk-text-center">
                <img className="uk-preserve-width uk-border-circle" src={user.picture.large} alt="avatar" />
              </div>
              <div className="uk-width-3-4">
                <h3>{capitalize(user.name.first + ' ' + user.name.last)}</h3>
                <p>
                  Address:<br/>
                  <i>
                    {capitalize(user.location.street)}<br/>
                    {user.location.postcode} {capitalize(user.location.city)}<br/>
                    {user.nat}
                  </i>
                </p>
                <p>
                  E-mail: {user.email}<br/>
                  Phone: {user.phone}
                </p>
                <p>Date of birth: {formatDate(user.dob)}</p>
              </div>
            </div>
          </td>
        </tr>
      )
    ];
  }
}



class Table extends React.Component {
  state = { users: null }

  componentDidMount() {
    fetch('https://randomuser.me/api/1.1/?results=10')
      .then(response => response.json())
      .then(data => { 
        this.setState({users: data.results});
        console.log(data.results);
      });
  }

  render() {
    const { users } = this.state;
    const isLoading = users === null;
    return (
      <main>
        <div className="table-container">
          <div className="uk-overflow-auto">
            <table className="uk-table uk-table-hover uk-table-striped uk-table-small">
              <thead>
                <tr>
                  <th className="uk-table-shrink" />
                  <th className="uk-table-shrink" />
                  <th className="uk-table-shrink">Avatar</th>
                  <th>Fullname</th>
                  <th>City</th>
                  <th>Registered</th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? <tr><td colSpan={6} className="uk-text-center"><em className="uk-text-muted">Loading...</em></td></tr>
                  : users.map((user, index) =>
                      <UserTableRow key={index} index={index + 1} user={user}/>
                    )
                }
              </tbody>
            </table>
          </div>
          <br/>
          <Row>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <Card.Body className='uk-float-left table-btm all-inline'>
                  <p className=''>Show rows :</p>
                  <div className='pag-sel'>
                      <Select 
                      items={[
                        {name: 5},
                        {name: 10},
                        {name: 20},
                        {name: 50},
                        {name: 100},
                        
                      ]}
                    />
                  </div>
              </Card.Body>
            </Col>
            <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
              <Card.Body className='uk-float-right table-btm all-inline'>
              <Button 
                text={'Back'}
                classes={[
                  "no-fill", 
                  "pad-bg-18", 
                  "fnt-norm",
                  "waves-effect",  
                  "waves-light",
                  "color-gray",
                  "no-border",
                  'hov-green'

                  ]}
                />
                <ul className='all-inline pag-list'>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                </ul>
                <Button 
                  text={'Next'}
                  classes={[
                    "no-fill", 
                    "pad-bg-18", 
                    "fnt-norm",
                    "waves-effect",  
                    "waves-light",
                    "color-gray",
                    "no-border",
                    'hov-green'
                  ]}
                />
              </Card.Body>
            </Col>
        </Row>
        </div>
      </main>
    );
  }
}

export default Table;
// render(<App />, document.getElementById('root'));

import React, { useState, useEffect } from "react";
import { render } from 'react-dom';
import { slideDown, slideUp } from './anim';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from 'react-bootstrap'
import Select from '../basicComponents.js/select';
import Button from "../basicComponents.js/button";
var pge = 5;
var pge_num = 1;

function formatDate(str) {
  return str.substr(0, 10);
}

function capitalize(str) {
  return str.split(' ').map(s => {
    return s.charAt(0).toUpperCase() + s.substr(1);
  }).join(' ');
}

function paginate(limit, total) {
  var step = total.length/limit;
  var rem = total.length % limit;
  var pages = {};
  var datta = '';
  var last_index = parseInt(step);
  for (let index = 1; index <= parseInt(step); index++) {
    pages[index] = [];
    for (let inx = (index-1)*limit; inx < index*limit; inx++) {
      datta = total[inx];
      datta['index'] = inx + 1;
      pages[index].push(datta);
    }
  }
  if(rem > 0){
    pages[last_index + 1] = [];
    for (let inx = (last_index)*limit; inx < total.length; inx++) {
      datta = total[inx];
      datta['index'] = inx;
      pages[last_index + 1].push(datta);
    }
  }
  

  return pages;
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
  
}

function setup(_this, data){
  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName('pag-sel')[0].getElementsByClassName("custom-select");
  
  l = x.length;
  for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      
      ll = selElmnt.length;
  
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      for (j = 1; j < ll; j++) {
          /* For each option in the original select element,
          create a new DIV that will act as an option item: */
          c = document.createElement("DIV");
          c.innerHTML = selElmnt.options[j].innerHTML;
          
          c.addEventListener("click", function(e){
              /* When an item is clicked, update the original select box,
              and the selected item: */
              pge = parseInt(this.innerText);
              recalibrate(_this, data);
              var y, i, k, s, h, sl, yl;
              s = this.parentNode.parentNode.getElementsByTagName("select")[0];
              sl = s.length;
              h = this.parentNode.previousSibling;
              for (i = 0; i < sl; i++) {
                  if (s.options[i].innerHTML == this.innerHTML) {
                      s.selectedIndex = i;
                      h.innerHTML = this.innerHTML;
                      y = this.parentNode.getElementsByClassName("same-as-selected");
                      yl = y.length;
                      for (k = 0; k < yl; k++) {
                          y[k].removeAttribute("class");
                      }
                      this.setAttribute("class", "same-as-selected");
                      break;
                  }
              }
              h.click();
          });
          b.appendChild(c);
      }
      x[i].appendChild(b);
      a.addEventListener("click", function(e) {
          /* When the select box is clicked, close any other select boxes,
          and open/close the current select box: */
          e.stopPropagation();
          closeAllSelect(this);
          this.nextSibling.classList.toggle("select-hide");
          this.classList.toggle("select-arrow-active");
      });
  }
  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);
  
}


function currentPg(pg_num, data, _this){
  pge_num = pg_num;
  var pg = paginate(pge, data);
  _this.setState({users: pg[pg_num]});
}

function recalibrate(_this, _data){
  var dta = paginate(pge, _data.results);
  _this.setState({users: dta[pge_num]});
  _this.setState({data: _data.results});
  _this.setState({parsed: dta});
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
  state = { users: null, data: null, parsed: null }

  componentDidMount() {
    fetch('https://randomuser.me/api/1.1/?results=10')
      .then(response => response.json())
      .then(data => { 
        var dta = paginate(pge, data.results);
        this.setState({users: dta[pge_num]});
        this.setState({data: data.results});
        this.setState({parsed: dta});
        console.log(dta);
        console.log(data.results);
        setup(this, data);
      });
    
  }

  

  render() {
    const { users, data, parsed } = this.state;
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
                      <UserTableRow key={index} index={user.index} user={user}/>
                    )
                }
              </tbody>
            </table>
          </div>
          <br/>
          {
            users && users.length > 0 ? (
              isLoading
                  ? null
                  : <Row>
                  <Col xs={12} md={12} lg={6} xl={6} xxl={6}>
                    <Card.Body className='uk-float-left table-btm all-inline'>
                        <p className=''>Show rows :</p>
                        <div className='pag-sel'>
                            <Select 
                              items={[
                                {name: 5},
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
                        {parsed == null
                          ? null
                          : Object.keys(parsed).map((page, index) =>
                            <li onClick={() => {
                              currentPg(page, data, this);
                            }}>{page}</li>
                          )
                        }
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
            ): null 
          }
          
        </div>
      </main>
    );
  }
}

export default Table;
// render(<App />, document.getElementById('root'));

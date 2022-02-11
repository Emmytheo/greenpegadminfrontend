import React, { useState, useEffect } from "react";
import { render } from 'react-dom';
import { slideDown, slideUp } from './anim';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from 'react-bootstrap'
import Select from '../basicComponents.js/select';
import Button from "../basicComponents.js/button";
import firepump from '../../images/greenpegs/fire-pump-set1 3.png'
import endressCat from '../../images/greenpegs/Group 1749.png'
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
  if(parseInt(step) === 0){
    step = 1;
  }
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
      datta['index'] = inx + 1;
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
  _this.setState({users: pg[pge_num]});
  _this.setState({data: data});
  _this.setState({parsed: pg});
}

function recalibrate(_this, _data){
  var dta = paginate(pge, _data.results);
  _this.setState({users: dta[1]});
  _this.setState({data: _data.results});
  _this.setState({parsed: dta});
}

function setPagLimit(data){
  var limits = [5, 10, 20];
  var final_limits = [{
    name: 5
  }];
  
  limits.forEach(ele => {
    
    if(ele <= data.length){
      final_limits.push({
        name: ele
      });
      if(ele === 20){
        if(data.length > 20){
          
          var mult = 10;
          for(let ind = 0; ind < limits.length; ind++){
            if(limits[ind] * mult <= data.length){
              final_limits.push({
                name: limits[ind] * mult
              });
            }
            else{
              if(data.length > limits[ind] * mult && ind == limits.length - 1){
                mult *= 10;
                ind = 0;
              }
            }
          }
        }


      }
    }
  });
  return final_limits;
}




class UserTableRow extends React.Component {
  state = { expanded: false }

  componentDidMount() {
    // var y = document.getElementsByClassName('table-row');
    // for (let index = 0; index < y.length; index++) {
    //   const element = y[index];
    //   element.addEventListener("click", this.toggleExpander);
    //   console.log(element);

      
    // }
  }

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
  
  generateRow = (typ) => {
    var user = this.props.user;
    var index = this.props.index;
    var outp = [];
    switch (typ) {
      case 'requests':
        outp[0] = 
          <tr key="main" className="table-row" onClick={this.toggleExpander}>
            <td><input className="uk-checkbox" type="checkbox" /></td>
            <td className="uk-text-nowrap">{`${index}`}.</td>
            <td>{capitalize(`${user.name.first}` + ' ' + `${user.name.last}`)}</td>
            <td>{capitalize(`${user.location.city}`)} ({`${user.nat}`})</td>
            <td><small>{`${user.email}`}</small></td>
            <td></td>
            
          </tr>
        ;
        outp[1] = this.state.expanded && (
          <tr className="expandable" key="tr-expander">
            <td className="uk-background-muted" colSpan={6}>
              <div ref="expanderBody" className="inner uk-grid uk-width-expand uk-child-width-expand prd-sans no-height">
                <div>
                  <h6>{capitalize(user.name.first + ' ' + user.name.last)}</h6>
                  <br/>
                  <p className="fnt-light-grey fnt-size-13 no-margins">
                    Phone
                  </p>
                  <p>
                    {user.phone}
                  </p>
                  <br/>
                  <p className="fnt-light-grey fnt-size-13 no-margins">
                    Email Address
                  </p>
                  <p>
                    {user.email}
                  </p>
                  <br/>
                  <p className="fnt-light-grey fnt-size-13 no-margins">
                    Company
                  </p>
                  <p>
                    {capitalize(`${user.location.city}`)} ({`${user.nat}`})
                  </p>
                  <br/>
                  <span className="all-inline">
                    <p className="fnt-light-grey fnt-size-13 side-margins-10">
                      {formatDate(user.dob)}
                    </p>
                    <p className="fnt-light-grey fnt-size-13 side-margins-10">
                      Time
                    </p>
                  </span>

                </div>
                <div className="uk-width-1-2@s uk-width-1-2@l  ">
                  <div className="brk-wrd">
                    <h5>{capitalize("S SERIES GEARBOX COUPLED WITH ELECTRIC MOTOR")}</h5>
                    <br/>
                    <h6 className="req-body">
                      I will like you to give us quotation for the procurement of this drive<br/> 
                      for maintenance of our equipment. Note i will like to have the full<br/> 
                      specification for the equipment.<br/>
                    </h6>
                    <p>
                      <br/>
                      <br/>
                      Regards.
                    </p>
                    <p>
                      <br/>
                      <br/>
                      Soyingbe B
                    </p>
                    <Button 
                        text={'Reply Now'}
                        classes={[
                            "btn-primary", 
                            "w-sm", 
                            "waves-effect", 
                            "reply-now", 
                            "waves-light"
                        ]}
                    />
                    <br/>
                    <br/>
                  </div>                  
                </div>
                <div className="inner uk-width-1-2@s uk-width-1-3@l">
                  <img className="uk-preserve-width uk-card-body brk-wrd uk-card uk-card-default uk-border-square" src={firepump} alt="avatar" />
                </div>
                
                
                
              </div>
            </td>
          </tr>
        )
        break;
      ;
      case "products":
          outp[0] = 
          <tr key="main" className="table-row">
            <td><input className="uk-checkbox" type="checkbox" /></td>
            <td className="uk-text-nowrap">{`${index}`}.</td>
            <td>
              <div className="frame">
                <img className="uk-preserve-width" src={`${user.picture.thumbnail}`} width={38} height={43} alt="avatar" />
              </div>
              
            </td>
            <td>
              <p>
                {capitalize(`${user.name.first}` + ' ' + `${user.name.last}`)}<br/><br/>
                <div className="all-inline all-marg-10">
                  <small>Edit</small>
                  <small>View</small>
                  <small>Delete</small>
                </div>
                
                <br/>
              </p>
            </td>
            <td><img className="uk-preserve-width" src={`${endressCat}`} width={80} alt="category" /></td>
            <td>{capitalize(`${'000SKU'}`)}</td>
            <td><small>{formatDate(user.dob)}</small></td>
            
            
            
            <td></td>
            
          </tr>;
        break;
        ;


      default:
        outp[0] = 
          <tr key="main" className="table-row" onClick={this.toggleExpander}>
            <td><input className="uk-checkbox" type="checkbox" /></td>
            <td className="uk-text-nowrap">{`${index}`}.</td>
            <td><img className="uk-preserve-width uk-border-circle" src={`${user.picture.thumbnail}`} width={48} alt="avatar" /></td>
            <td>{capitalize(`${user.name.first}` + ' ' + `${user.name.last}`)}<br /><small>{`${user.email}`}</small></td>
            <td>{capitalize(`${user.location.city}`)} ({`${user.nat}`})</td>
            <td>{formatDate(`${user.registered}`)}</td>
          </tr>
        ;
        outp[1] = this.state.expanded && (
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
        break;
    }
    return outp;
  }

  render() {
    const { user, type } = this.props;
    return [
      this.generateRow(type)
    ];
  }
}



class Table extends React.Component {
  state = { users: null, data: null, parsed: null, errState: false, smallsize: false, strip: true, divide: false }
  props = { type: null };

  componentDidMount() {
    fetch('https://randomuser.me/api/1.1/?results=50')
      .catch(e => {
        
      })
      .then((response) => {
        if(response == undefined){
          console.log("No Response from the server, Please Check your internet connection and reload the page")
          this.setState({errState: true});
        }
        else{
          response.json()
          .then(data => { 
              console.log(data)
              if(Object.keys(data).includes('results')){
                if(data.results.length < 1){
                  console.log('Data Packet is empty')
                }
                else{
                  var dta = paginate(pge, data.results);
                  this.setState({users: dta[pge_num]});
                  this.setState({data: data.results});
                  this.setState({parsed: dta});
                  setup(this, data);
                }
              }
              else{
                if(Object.keys(data).includes('error')){
                  console.log(data.error);
                }
                else{
                  console.log("Bad Response");
                }

              }
              
            }
          );
          
              
        } 
      });
      
    
  }
  generateHead = (typ) => {
    var outph = '';
    switch (typ) {
      case 'requests':
        outph = 
          <thead>
            <tr>
              <th className="uk-table-shrink" />
              <th className="uk-table-shrink" />
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th/>
            </tr>
          </thead>
        ;
        break
      ;

      case 'products':
        outph = 
          <thead>
            <tr>
              <th className="uk-table-shrink" />
              <th className="uk-table-shrink" />
              <th>Product</th>
              <th>Name</th>
              <th>Category</th>
              <th>SKU</th>
              <th>Date Added</th>
              <th/>
            </tr>
          </thead>
        ;
        break
      ;

    
      default:
        outph = 
          <thead>
            <tr>
              <th className="uk-table-shrink" />
              <th className="uk-table-shrink" />
              <th className="uk-table-shrink"  style={{textTransformStyle: "Capitalize"}}>Avatar</th>
              <th>Fullname</th>
              <th>City</th>
              <th>Registered</th>
            </tr>
          </thead>
        ;
        break;
    }
    return outph;

  }
  generateNull = (typ, err) => {
    var outph = [];
    if(err){
      outph[0] = <tr><td colSpan={6} className="uk-text-center"><em className="uk-text-muted">Check Your Internet Connection</em></td></tr>;
    }
    else{
      switch (typ) {
        case 'request':
          
          break;
      
        default:
          outph[0] = <tr><td colSpan={6} className="uk-text-center"><em className="uk-text-muted">Loading...</em></td></tr>;
          break;
      }
    }
    
    return outph;
  }

  

  render() {
    const { users, data, parsed, errState, smallsize, strip, divide } = this.state;
    var { type, big, stripped, divider } = this.props;
    if(big == null){
      big = smallsize;
    }
    if(stripped == null){
      stripped = strip;
    }
    if(divider == null){
      divider = divide;
    }

    // else{
    //   // smallsize = big;
      
    // }
    const isLoading = users === null;
    return (
      <main>
        <div className="table-container">
          <div className="uk-overflow-auto">
            <table className={`uk-table uk-table-hover ${divider ? "uk-table-divider" : ""}  ${stripped ? "uk-table-striped" : ""} ${big ? "uk-table-small" : "uk-table-large"}`}>
              {
                this.generateHead(type)
              }
              <tbody>
                {isLoading && parsed == null
                  ? this.generateNull(type, errState)
                  : users.map((user, index) =>
                      <UserTableRow key={index} index={user.index} user={user} type={type}/>
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
                            {parsed == null
                              ? null
                              : <Select 
                                  items={setPagLimit(data)}
                                />
                            }
                            
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


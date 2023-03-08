import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class GroceryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      productId: '',
      productName: '',
      price: ''
    };
    this.addItem = this.addItem.bind(this);
    this.getItems = this.getItems.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    axios.get('http://localhost:8080/getgroceryList')
      .then(response => {
        this.setState({ items: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  addItem(event) {
    event.preventDefault();
    const newItem = {
      productId: this.state.productId,
      productName: this.state.productName,
      price: this.state.price
    };
    axios.post('http://localhost:8080/groceryList', newItem)
      .then(response => {
        const items = this.state.items.concat(response.data);
        this.setState({
          items: items,
          productId: '',
          productName: '',
          price: ''
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteItem(id) {
    axios.delete("http://localhost:8080/del/" + id);
    var items=this.state.items.filter(n=>n.id!==id);
    this.setState({items});  
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="grocery-list">
        <h2>Grocery List</h2>
        <form onSubmit={this.addItem}>
          <label>
            Product ID:
            <input type="text" name="productId"placeholder='ID' value={this.state.productId} onChange={this.handleInputChange} />
          </label>
          <label>
            Product Name:
            <input type="text" name="productName" placeholder='Product-name' value={this.state.productName} onChange={this.handleInputChange} />
          </label>
          <label>
            Price:
            <input type="text" name="price" placeholder='Price in dollars' value={this.state.price} onChange={this.handleInputChange} />
          </label>
          <button type="submit">Add Item</button>
        </form>
        <ul>
          {this.state.items.map(item => (
            <li key={item.id}>
              <span style={{padding:20}}> PRODUCT_ID:{item.productId} | PRODUCT_NAME:{item.productName} | PRICE :${item.price}</span>
            <button onClick={() => this.updateItem(item.id)}>Update</button>
              <span style={{whiteSpace:20}}> </span>
              <button onClick={() => this.deleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default GroceryList;

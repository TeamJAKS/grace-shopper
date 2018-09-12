//not yet using redux
//not yet using material UI -- so this looks simple at the moment
//props would be passed down from a single product, single product component not yet assigned/made
//double check the state
//what are the types for forms in react
//default values not currently present
import React, {Component} from 'react'

class UpdateProductForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          value: '',
          quantity: null
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      alert('An updated product was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
            ImgUrl:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
            Price:
            <input type="number" value={this.state.quantity} onChange={this.handleChange} />
          </label>
          <label>
            Description:
            <input type="url" value={this.state.quantity} onChange={this.handleChange} />
          </label>
          <label>
            Quantity:
            <input type="number" value={this.state.quantity} onChange={this.handleChange} />
          </label>
          <label>
            Category:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

  export default UpdateProductForm;
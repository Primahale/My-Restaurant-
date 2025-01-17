import React from "react";
import data from "../data.json";
// import  {RestaurantCart}  from "./RestaurantCard";
import { RestaurantCard } from "./RestaurantCard";


export default class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterRating: 0,
      paymentMethod: "all",
      sortMethod: null,
      activePage: 1,
      perPage: 4
    };
  }
  handleRating = (rating) => {
    this.setState({
      filterRating: rating
    });
  };
  handlePayment = (payment) => {
    this.setState({
      paymentMethod: payment
    });
  };
  handleSort = (order) => {
    this.setState({
      sortMethod: order
    });
  };
  handlePageChange = (page) => {
    this.setState({
      activePage: page
    });
  };

  filterLogic = ({ rating, payment_methods }, index) => {
    const { paymentMethod, filterRating, activePage, perPage } = this.state;

    const { cash, card } = payment_methods;
    let paymentCondition = true;
    if (paymentMethod === "cash") {
      paymentCondition = cash ? true : false;
    } else if (paymentMethod === "card") {
      paymentCondition = card ? true : false;
    }

    // pagination
    const offset = (activePage - 1) * perPage;
    const pageCondition = index >= offset && index < offset + perPage;

    return rating >= filterRating && paymentCondition && pageCondition;
  };

  render() {
    const { sortMethod, activePage, perPage } = this.state;
    const totalPages = Math.ceil(data.length / perPage);
    return (
      <>
        <h2 style={{color:"red"}}> $ukkad's Dhaba </h2>
        {/* {new Array(totalPages).fill(0).map((a, i) => (
          <button key={i} onClick={() => this.handlePageChange(i + 1)} style={{backgroundColor:'gray',margin:"10px"}}>
            {i + 1}
          </button>
        ))} */}
        <div>
          {[4.0,3.0,2.0,1.0,0].map((rating) => (
            <button key={rating} onClick={() => this.handleRating(rating)} style={{backgroundColor:"black",color:"white",margin:"10px",border:"3px solid dodgerblue",borderRadius:"3px"}}>
              {rating === 0 ? "All" : rating + "⋆"}
            </button>
          ))}
        </div>
        {/* <div>
          {["cash", "card", "all"].map((method) => (
            <button key={method} onClick={() => this.handlePayment(method)}>
              {method}
            </button>
          ))}
        </div> */}
        <div>
          {["Low - High", "High - Low"].map((order) => (
            <button key={order} onClick={() => this.handleSort(order)} style={{backgroundColor:"black",color:"white",marginLeft:"20px",border:"3px solid dodgerblue",margin:"10px",borderRadius:"4px"}}>
              {order}
            </button>
          ))}
        </div>
        
        <div>
          {data &&
            data
              ?.filter(this.filterLogic)
              .sort((a, b) => {
                if (sortMethod === null) {
                  return 0;
                }
                if (sortMethod === "Low - High") {
                  return a.costForTwo - b.costForTwo;
                }
                if (sortMethod === "High - Low") {
                  return b.costForTwo - a.costForTwo;
                }
              })
              .map((item) => <RestaurantCard data={item} key={item.id} />)}
        </div>
        {new Array(totalPages).fill(0).map((a, i) => (
          <button key={i} onClick={() => this.handlePageChange(i + 1)} style={{backgroundColor:"black",color:"white",border:"none",margin:"10px"}}>
            {i + 1}
          </button>
        ))}
      </>
    );
  }
}




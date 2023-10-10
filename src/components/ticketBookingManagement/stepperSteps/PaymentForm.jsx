import React from "react";
import Form from "../../common/form";
import Joi from "joi-browser";

export default class PaymentForm extends Form {
  state = {
    data: {
      name: "",
      cardNumber: null,
      cvc: "",
      exp: "",
    },
    errors: {},
  };
  schema = {
    name: Joi.string().required().min(5).label("Name"),
    cardNumber: Joi.number().label("Card Number"),
    cvc: Joi.string().required().min(3).max(3).label("CVC"),
    exp: Joi.string().required().label("Expiration"),
  };

  render() {
    const { reservation } = this.props;

    return (
      <div>
        <div>
          <h4>{reservation.from + " To " + reservation.to}</h4>

          <div
            className="row"
            style={{ width: "50%", marginBottom: "2rem", marginTop: "2rem" }}
          >
            <div className="col">
              <h6 style={{ fontWeight: "bold" }}>Passengers</h6>
              <h6 style={{ fontWeight: "bold" }}>Selected Train Class</h6>
              <h6 style={{ fontWeight: "bold" }}>Price per Ticket</h6>
              <h6 style={{ fontWeight: "bold" }}>
                Total Price{reservation.totalPrice}.00
              </h6>
            </div>
            <div className="col">
              <h6>{reservation.passengers.length + 1} Passengers</h6>
              <h6>{reservation.trainClass}</h6>
              <h6> LKR {reservation.classPrice}.00</h6>
              <h6> LKR {reservation.totalPrice}.00</h6>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form onSubmit={this.handleSubmit}>
            {this.renderInputField(
              "Card Name",
              "name",
              "text",
              { marginRight: "1rem" },
              true
            )}
            <br />
            <br />
            {this.renderInputField(
              "Card Number",
              "cardNumber",
              "number",
              { marginRight: "1rem" },
              true
            )}
            {this.renderInputField(
              "CVC",
              "cvc",
              "text",
              { marginRight: "1rem" },
              true
            )}
            {this.renderInputField(
              "Expiration",
              "exp",
              "text",
              { },
              true
            )}
            <br />
            <br />
            <div style={{ display:"flex", justifyContent:"end"}} >
              {this.renderButton("pay", "contained", "submit", false, false)}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

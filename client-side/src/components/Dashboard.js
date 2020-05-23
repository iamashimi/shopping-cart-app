import React, { Component } from "react";
// import { addProduct } from "./adminDashboad";

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
            price: "",
            quantity: "",
            imagePath: "",
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const product = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            quantity: this.state.quantity,
            imagePath: this.state.imagePath,
        };

    }
    render() {
        return (
            <div className="container">
                <h1>Shopping App Dashboard</h1>

                <div className="row">
                    <div className="col">
                        <h2>Products list</h2>

                    </div>
                </div>
            </div>
        );
    }
}

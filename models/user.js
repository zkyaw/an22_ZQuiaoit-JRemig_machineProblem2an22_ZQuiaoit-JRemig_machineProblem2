// BSCS Source Code Template for 3T AY 2022-2023
/*
	Program:    E-commerce API
	Programmer: Zildjian Amos G. Quiaoit & Emmanuel Jazon C. Remig
	Section:    AN22
	Start Date: July 16, 2023 
	End Date:   July 16, 2023 
*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email : {
		type : String,
		required : [true, "Email is required"]
	},
	password : {
		type : String,
		required : [true, "Password is required"]
	},
	isAdmin : {
		type : Boolean,
		default : false
	},
	totalAmount : {
		type : Number
	},
	purchasedOn : {
		type : Date
	},
	orderedProducts: [
    {
      products: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Product Id is required"],
          },
          productName: {
            type: String,
            required: [true, "Product Name is required"],
          },
          productDescription: {
            type: String,
            required: [true, "Description is required"],
          },
          quantity: {
            type: Number,
            required: [true, "Quantity is required"],
          },
          price: {
            type: Number,
            required: [true, "Price is required"],
          },
          totalAmount: {
            type: Number,
            required: [true, "Total amount is required"],
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
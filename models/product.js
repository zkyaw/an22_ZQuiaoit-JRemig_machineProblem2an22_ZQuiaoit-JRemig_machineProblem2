// BSCS Source Code Template for 3T AY 2022-2023
/*
	Program:    E-commerce API
	Programmer: Zildjian Amos G. Quiaoit & Emmanuel Jazon C. Remig
	Section:    AN22
	Start Date: July 16, 2023 
	End Date:   July 16, 2023 
*/

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	pName : {
		type : String,
		required : [true, "Name of the product is required"]
	},
	pDescription : {
		type : String,
		required : [true, "Description is required"]
	},
	pPrice : {
		type : Number,
		required : [true, "Price is required"]
	},
	isActive : {
		type : Boolean,
		default : true
	},
	pCreatedOn : {
		type : Date,
		default : Date.now()
	},
	userOrders : [
		{
			userId : {
				type : Object,
				required : [true, "Product User ID is required"]
			},
			orderId : {
				type : String
			}
		}	
	]
});

module.exports = mongoose.model("Product", productSchema);
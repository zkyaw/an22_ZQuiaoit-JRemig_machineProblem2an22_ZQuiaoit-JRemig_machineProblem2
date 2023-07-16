// BSCS Source Code Template for 3T AY 2022-2023
/*
	Program:    E-commerce API
	Programmer: Zildjian Amos G. Quiaoit & Emmanuel Jazon C. Remig
	Section:    AN22
	Start Date: July 16, 2023 
	End Date:   July 16, 2023 
*/

const User = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../auth')

// Registration
module.exports.registerUser = (reqBody) => {
	let newUser = new User ({
		email: reqBody.email,
		password: bcrypt.hashSync(reqBody.password, 10)
	});

	return newUser.save().then((user, error) => {
		if(error){
			return false;
		} else {
			return true;
		}
	});
};
// Authentication
module.exports.loginUser = (reqBody) => {
	return User.findOne({email : reqBody.email}).then(result => {
		if(result == null){
			return false;
		} else {
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
			if(isPasswordCorrect){
				return { access : auth.createAccessToken(result)}
			} else {
				return false;
			}
		}
	})
}

module.exports.getProfile = async (userData) => {
  const userId = userData.userId;
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.createOrder = (token, orderData) => {
  const userData = auth.decode(token);
  if (!userData) {
    return Promise.resolve(false);
  }
  if (userData.isAdmin) {
    return Promise.resolve(false);
  }
  const newOrder = {
    products: orderData.products.map((product) => ({
      productId: product.productId,
      productName: product.productName,
      productDescription: product.productDescription,
      price: product.price,
      quantity: product.quantity,
      totalAmount: product.price * product.quantity,
    })),
  };

  // Add a missing closing curly brace for the createOrder function
  return User.findByIdAndUpdate(
    userData.id,
    {
      $push: { orderedProducts: newOrder },
    },
    { new: true }
  );
};

module.exports.setUserAsAdmin = (userId) => {
  return User.findByIdAndUpdate(userId, { isAdmin: true }, { new: true }).then((user) => {
    return user;
  });
};
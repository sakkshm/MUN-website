const { Router } = require("express");
const Rayzorpay = require("razorpay");
const userMiddleware = require("../middleware/userMiddleware");
const crypto = require("crypto");

const routes = Router();

const rzp = new Rayzorpay({
    key_id: process.env.RZP_KEY_ID,
    key_secret: process.env.RZP_KEY_SECRET
});


routes.post("/create-order", userMiddleware, async (req, res) => {
    try{
        const { amount, notes } = req.body;

        const options = {
            amount: amount * 100,
            currency: "INR",
            notes: notes
        }

        const order = await rzp.orders.create(options);

        res.json(order);
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            msg: "Error creating order"
        })
    }
})

routes.post('/verify-payment', userMiddleware, async function(req, res) {
    
	const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
	
    let expectedSignature = crypto.createHmac('sha256', process.env.RZP_KEY_SECRET)
							.update(body.toString())
							.digest('hex');

	// Compare the signatures
	if(expectedSignature == req.body.razorpay_signature) {
				res.json({
					title: "Payment verification successful",
                });
	} else {
		res.json({
			title: "Payment verification failed",
		})
	}
});


module.exports = routes;
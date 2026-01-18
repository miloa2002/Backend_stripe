import Stripe from "stripe";
import { config } from "dotenv";

config();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

const createPayment = async (req, res) => {
    try {
        const {cart} = req.body;

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: cart.map(item => ({
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: item.name,
                    },
                   unit_amount: Math.round(item.price * 100)

                },
                quantity: item.quantity
            })),
            //success_url: "http://localhost:5173/success",
            //cancel_url: "http://localhost:5173/cancel",
        });

         res.json({ url: session.url });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error creando sesión"});
    }
}

/*const succesPayment = (req, res) => {

}

const cancelPayment = (req, res) => {

}*/

export {
    createPayment,
    succesPayment,
    cancelPayment
}
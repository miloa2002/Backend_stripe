import Stripe from "stripe";
import { config } from "dotenv";

config();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

const createPayment = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    product_data: {
                        name: "Laptop",
                        description: "Gaming laptop"
                    },
                    currency: "usd",
                    unit_amount: 20000,
                },
                quantity: 1
            },
            {
                price_data: {
                    product_data: {
                        name: "TV",
                        description: "Smart TV",
                    },
                    currency: "usd",
                    unit_amount: 10000,
                },
                quantity: 2
            }
        ],
        mode: 'payment',
        success_url: "http://localhost:4000/success",
        cancel_url: "http://localhost:4000/cancel"
    })

    return res.json({url: session.url});
}

const succesPayment = (req, res) => {

}

const cancelPayment = (req, res) => {

}

export {
    createPayment,
    succesPayment,
    cancelPayment
}
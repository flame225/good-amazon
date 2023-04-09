const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req,res)=>{
    const {items, email}= req.body;

    const transformItems = items.map((item) => ({
        description : item.description,
        qaunity :1,
        price_data: {
            Currency : 'USD',
            unit_amount: item.price * 100,
            product_data : {
                name: item.title,
                images: [item.image]
            },
        }
    }))

    const session = await stripe.checkout.sessions.create({
        payment_intent_data: ['card'],
        shipping_rates:['shr_1MuhEPHyydedm5cZBjgx5fnm'],
        shipping_address_collection:{
            allowed_countries:['US'],
        },
        line_items: transformItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        client_reference_id:{
            email,
            images: JSON.stringify(items.map((item) => item.image))
        },
    });

    res.status(200).json({id: session.id})
};
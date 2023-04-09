import { buffer } from "micro"
import * as admin from 'firebase-admin'

const serviceAccount = require('../../../permission.json')
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();



const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;


const fulfillOrder= async (session)=>{
    return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
        amount: session.amoount_total/100,
        amount_shipping: session.total_details.amount_shipping/100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
};

export default async (req,res) =>{
    if(req.method === 'POST'){
        const requestBUffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers["stripe-signature"];
        let event;

        try {
            event = stripe.webhook.constructEvent(payload,sig, endpointSecret)
        } catch (error) {
            console.log('ERROR', err.message)
            return res.status(400).send(`Webhook eorror: ${err.message}`)
            
        }

        if(event.type === 'checkout.session.completed'){
            const session = event.data.object;
            return fulfillOrder(session).then(()=>res.status(200))
            .catch((err)=>res.status(400).send(`webhook Effor: ${err.message}`));
        }

    }
};
 

export const config={
    api:{
        bodyParser: false,
        externalResolver:true, 
    }
}
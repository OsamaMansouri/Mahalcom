import mongoose from "mongoose";
import Product from './productModel.js';


const invoiceSchema = new mongoose.Schema({
    orderID: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    invoiceDate: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'Pending'
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});


export default mongoose.model('Invoice', invoiceSchema);

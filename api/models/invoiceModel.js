import mongoose from "mongoose";
import user from './userModel.js';


const invoiceSchema = new mongoose.Schema({
    orderID: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    date: { type: Date, required: true },
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'Pending'
    },
    userId :{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});


export default mongoose.model('Invoice', invoiceSchema);

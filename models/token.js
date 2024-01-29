import mongoose from "mongoose";

const TokenSchema = mongoose.Schema({
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

let TokenModel = mongoose.model('Token', TokenSchema);

export default TokenModel;
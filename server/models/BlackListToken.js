import mongoose from "mongoose";

const now = new Date();

// TTL is set. Token will expires in db in 7 days

const BlackListTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: [true, "Please provide a token"],
    unique: true,
  },
  expireAt: {
    type: Date,
    default: now.setDate(now.getDate() + 7),
  },
});

const BlackListToken = mongoose.model("BlackListToken", BlackListTokenSchema);

export default BlackListToken;

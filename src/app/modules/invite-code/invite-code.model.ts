import mongoose from 'mongoose';

const inviteCodeSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    brief: { type: String, required: true },
    interested: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    used: { type: Boolean, default: false },
    paymentVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const InviteCode = mongoose.model('InviteCode', inviteCodeSchema);
export default InviteCode;

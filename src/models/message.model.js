import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true, // optional: trims whitespace
    },
    image: {
      type: String, // cloudinary image URL
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;

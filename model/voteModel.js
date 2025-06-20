import mongoose, { Schema } from "mongoose";

const votingScheme = new Schema({
  userId: {
    type: Schema.Types.ObjectId, 
    validate: {
      validator: function(v) {
        return !v || mongoose.Types.ObjectId.isValid(v);
      },
      message: 'Invalid User ID'
    }
  },
  roomId: {
    type: Schema.Types.ObjectId, 
    validate: {
      validator: function(v) {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: 'Invalid Room ID'
    }, 
    required: [true, "Room ID is required"]

  },
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  fullName: {
    type: String,
    required: [true, "FullName is required"]
    },
      candidateName: {
    type: String,
    required: [true, "FullName is required"],
    unique: [true, "You already Vote"]
    },
 
}, { timestamps: true });

votingScheme.statics.SelectCandidate = async function (data) {
  try {
    return await this.create(data);
  } catch (error) {
    throw error; // Rethrow the error
  }
}
votingScheme.statics.getVoters = async function (roomId) {
  if (!roomId) {
    throw new Error("RoomID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(roomId)) {
    throw new Error("Invalid Room Id");
  }

  try {
    const find = await this.find({ roomId });
 return find;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default mongoose.model('VotingDecision', votingScheme);
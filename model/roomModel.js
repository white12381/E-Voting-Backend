import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "User ID is required"],
    validate: {
      validator: function(v) {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: 'Invalid User ID'
    }
  },
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  contestantName: {
    type: [String],
    required: [true, "Contestant names are required"],
    validate: {
      validator: function(v) {
        return v.length >= 2 && v.length <= 5; // Changed to <= 5
      },
      message: 'Contestants must be between 2 and 5 people'
    }
  },
  deadline: {
    type: Date,
    required: [true, "Deadline is required"],
    validate: {
      validator: function(v) {
        return v > Date.now();
      },
      message: 'Deadline date must be in the future'
    }
  }
}, { timestamps: true });

roomSchema.statics.createDecision = async function (data) {
  try {
    return await this.create(data);
  } catch (error) {
    throw error; // Rethrow the error
  }
}
roomSchema.statics.myRooms = async function (userId) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid User ID");
  }

  try {
    const find = await this.find({ userId });
    console.log('find', find); return find;
  } catch (err) {
    throw new Error(err.message);
  }
}; 

roomSchema.statics.getRoomById = async function (id) {
    const room = await this.findById(id);
    if (!room) {
        throw Error('Invalid Id')
    }
    return room;
}

export default mongoose.model('RoomDecision', roomSchema);
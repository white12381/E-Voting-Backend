import roomModel from "../model/roomModel.js";
import userModel from "../model/userModel.js";
import voteModel from "../model/voteModel.js";

export const createDecisionRoom = async (req, res) => {
    const data = {...req.body, userId: req.user};
    
    
    try { 
        const user = await roomModel.createDecision(data)
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error.message)
    }
}

export const getMyRooms = async (req, res) => {
  const userId = req.user;

  try {
    const rooms = await roomModel.myRooms(userId);
    
    const user = await userModel.getUser(userId);
    if(!user){
return    res.status(400).json({ error: "User does not Exist" });
    }
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

export const getRoomById = async(req, res) => {
  const roomId = req.params.roomId
  try{
const room = await roomModel.getRoomById(roomId);
if (!room) {
  return res.status(400).json({
    error: "Room does not Exist" 
 });
};
const getVoters = await voteModel.getVoters(roomId)
res.status(200).json({room: room, voters:getVoters})
  }catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
}

export const SelectCandidate = async (req, res) => {
    const data = req.body;
    
    try { 
      if(data.userId){
            const user = await userModel.getUser(data.userId);
    if(!user){
return    res.status(400).json({ error: "User does not Exist" });
    }
      }

const room = await roomModel.getRoomById(data.roomId);
if (!room || new Date(room.deadline) < new Date()) {
  return res.status(400).json({
    error: !room ? "Room does not Exist" : "Room deadline has expired",
 });
}
        const user = await voteModel.SelectCandidate(data)
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error.message)
    }
}



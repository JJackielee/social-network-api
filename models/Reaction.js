const { Schema, Types } = require('mongoose');
// Construct a new instance of the schema class
const reactionSchema = new Schema({
  // Configure individual properties using Schema Types
  reactionId: {  
    type: Schema.Types.ObjectId,
    default: new Types.ObjectId},
  reactionBody: { type: String, required: true, maxLength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


module.exports = reactionSchema;
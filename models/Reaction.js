const mongoose = require('mongoose');
// Construct a new instance of the schema class
const reactionSchema = new mongoose.Schema({
  // Configure individual properties using Schema Types
  reactionBody: { type: String, required: true, maxLength:280 },
  username: {type: String, required:true},
  reactions: [{}],
  createdAt: { type: Date, default: Date.now },
});


const Reaction = mongoose.model('reaction', reactionSchema);


module.exports = Reaction;
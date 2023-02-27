const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
//thoughts schema to define the thoughts Model
//using reactionschema to define the structure for the array of objects for reactions
const thoughtSchema = new Schema({
  
  thoughtText: { type: String, required: true, maxLength: 280, minLength: 1 },
  username: { type: String, require: true },
  reactions: [reactionSchema],
  createdAt: { type: Date, default: Date.now },
},
  {
    toJSON: {
      virtuals: true,
    }
  });
// using a virtual we create a count for the amount of objects in our reaction array
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);



module.exports = Thought;
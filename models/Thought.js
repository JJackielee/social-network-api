const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
// Construct a new instance of the schema class
const thoughtSchema = new Schema({
  // Configure individual properties using Schema Types
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

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);



module.exports = Thought;
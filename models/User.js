const mongoose = require('mongoose');
// Construct a new instance of the schema class
const userSchema = new mongoose.Schema({
  // Configure individual properties using Schema Types
  username: { type: String, required: true,unique:true,trim:true },
  email: { type: String, required: false,unique:true, match: "/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/" },
  thoughts: {},
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'thought',
  },],
  lastAccessed: { type: Date, default: Date.now },
},
{
  toJSON: {
    virtuals: true,
  }
});

postSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = mongoose.model('user', userSchema);




module.exports = User;
const { Schema, model } = require('mongoose');
// Construct a new instance of the schema class
//, match: "/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/"
const userSchema = new Schema({
  // Configure individual properties using Schema Types
  username: { type: String, required: true,unique:true,trim:true },
  email: { type: String, required: false,unique:true },
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

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);




module.exports = User;
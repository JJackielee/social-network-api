const { Schema, model } = require('mongoose');
//userschema to define the user model
const userSchema = new Schema({
  // we're referencing our thoughts model and using objectID to connect thoughts with users
  // we are also referencing the user model and using objectID to connect users with friends
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: false, unique: true, match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email address'] },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'thought',
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
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
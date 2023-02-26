const connection = require('../config/connection');
const { User } = require('../models');


connection.on('error', (err) => err);


connection.once('open', async () => {
    console.log('connected');
  
    
    await User.deleteMany({});
    
    const users = [ 
        {username:"jackielee",email: "jackie@jackie.com"},
        {username:"howardlee",email: "howard@howard.com"}]
 
    // Add users to the collection and await the results
    await User.collection.insertMany(users);
  

    console.info('Seeding complete! 🌱');
    process.exit(0);
  });
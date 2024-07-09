
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const app = express();
const port = 3000; 


const JWT_SECRET = 'your_jwt_secret';


app.use(bodyParser.json());


let users = [
  { id: 1, username: 'user1', passwordHash: '$2b$10$J1Tm.TW73CfAGu7B6okKM.YD/20C5r2mO3Xu7I5vNwplA7BexFbiq' } 
];


app.post('/update-password', authenticateToken, async (req, res) => {
  const { userId, newPassword } = req.body;


   
    const hashedPassword = await bcrypt.hash(newPassword, 10); 

  
    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.passwordHash = hashedPassword;

    res.json({ message: 'Password updated successfully' });

  
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

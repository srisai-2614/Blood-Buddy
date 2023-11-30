const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const axios = require('axios'); // Global axios instance
const app = express();
const port = 4000;
app.use(cors());
app.use(bodyParser.json());

const createDummyUsers = async () => {
  const apiUrl = 'http://localhost:4000/';
  const indianNames = [
    'Aarav', 'Aanya', 'Advait', 'Aisha', 'Arjun', 'Avni', 'Dev', 'Dia', 'Eshaan', 'Ishita',
    'Kabir', 'Kiara', 'Neel', 'Neha', 'Rahul', 'Riya', 'Shaurya', 'Sia', 'Varun', 'Vanya'
  ];
  const bloodGroups = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'];
  const regions = ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune', 'Jaipur'];
  const dummyUsers = [];
  for (let i = 0; i < 20; i++) {
    let na = indianNames[Math.floor(Math.random() * indianNames.length)]
    const dummyUser = {
      name: na,
      phoneNo:9898989898,
      email: `${na}@gmail.com`,
      password: 'password123',
      bloodGroup: bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
    };
    dummyUsers.push(dummyUser);
  }
  return dummyUsers
};

(async () => {
  let dummyUsers = await createDummyUsers();
  const users = [];
  users.push(...dummyUsers);
  app.get('/', (req, res) => {
    res.json(users);
  });
})();

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      res.json({ message: 'Login successful!', user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});
app.post('/', async (req, res) => {
  const { name, phoneNo, email, bloodGroup, region, password, confirmPassword } = req.body;
  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    res.status(400).json({ message: 'Email already exists' });
  } else {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuid.v4(),
      name,
      phoneNo,
      email,
      bloodGroup,
      region,
      password: hashedPassword,
    };
    users.push(newUser);
    res.json({ message: 'User registered successfully!' });
  }
});

app.get('/search', (req, res) => {
  const { bloodGroup, region } = req.query;
  if (!bloodGroup && !region) {
    return res.status(400).json({ message: 'Please provide either bloodGroup or region for the search.' });
  }
  let matchingUsers;
  if (bloodGroup) {
    matchingUsers = users.filter((user) => user.bloodGroup === bloodGroup);
  }
  if (region) {
    const usersInRegion = users.filter((user) => user.region.toLowerCase() === region.toLowerCase());
    if (!matchingUsers) {
      matchingUsers = usersInRegion;
    } else {
      matchingUsers = matchingUsers.filter((user) => usersInRegion.some((u) => u.id === user.id));
    }
  }
  res.json(matchingUsers || []);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

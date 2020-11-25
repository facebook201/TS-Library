const express = require('express');

const app = express();
const apiRouter = express.Router();

apiRouter.get('/newuser', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');
  if (!username || !password) {
    return res.sendStatus(400);
  }
  
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = ctypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

  users[name] = { salt, hash };

  res.sendStatus(200);
});

app.use('/api', apiRoutes);


import axios from 'axios';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

const genCSRF = () => Math.random().toString(36).substring(2, 15);

export const githubLogin = (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user`;
  res.redirect(githubAuthUrl);
};

export const githubCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('No code provided');

  const tokenRes = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      code,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET
    },
    {
      headers: { Accept: 'application/json' }
    }
  );

  const accessToken = tokenRes.data.access_token;

  const userRes = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `token ${accessToken}`,
      Accept: 'application/json'
    }
  });

  const { id, login, email, avatar_url } = userRes.data;

  const user = await prisma.user.upsert({
    where: { githubId: id.toString() },
    update: {
      githubToken: accessToken
    },
    create: {
      githubId: id.toString(),
      username: login,
      email: email || null,
      avatar: avatar_url,
      githubToken: accessToken
    }
  });

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const csrfToken = genCSRF();

  const cookieOptions = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  };

  res.cookie('token', token, {
    ...cookieOptions,
    httpOnly: true
  });

  res.cookie('csrfToken', csrfToken, {
    ...cookieOptions,
    httpOnly: false
  });

  res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
};
// export const logout = (req, res) => {
//   res.clearCookie('token');
//   res.clearCookie('csrf-token');
//   res.redirect('http://localhost:3000/');
// };
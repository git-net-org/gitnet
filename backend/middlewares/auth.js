import jwt from 'jsonwebtoken'

export const authenticatedUser = (req, res, next)=>{

    const token = req.cookies?.token;
    const csrf_token = req.headers['x-csrf-token'];
    const csrfTokenFromCookie = req.cookies?.csrfToken;
    
    if(!token)
    {
        return res.status(401).json({error:"JWT Token missing!"});
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
    } catch (error) {
        return res.status(403).json({error:"Invalid Token!"});
    }

    if(csrfTokenFromCookie!= csrf_token)
    {
        return res.status(403).json({error:"Invalid CSRF token!"});
    }

    next();
}
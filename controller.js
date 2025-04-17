const jwt = require('jsonwebtoken');
const user = require('../User')

exports.login = async(req, res) => {
    const { email, password} = req.body
    try{
        const user = await user.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );

        res.json({token})
    }catch (err){
        res.status(500).json({ error: err.message });
    }
}
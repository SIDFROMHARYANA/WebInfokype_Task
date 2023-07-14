const jwt = require("jsonwebtoken")
const validator = require('validator');

function isEmail(emailAdress) {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // w use for char * use for breakpoint $ for end
    if (regex.test(emailAdress))
        return true;
    else
        return false;
}

const adminLogin = (req, res) => {
    
        let body = req.body
          
         // Check if body is there
        
            if (Object.keys(body).length == 0) {
            return res.status(400).json({message:' Body should be not empty'})
            }
            
            const { email, password } = body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
              }

              db.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
                if (err) {
                  throw err;
                }
            
                if (results.length === 0) {
                  return res.status(401).json({ message: 'Invalid email or password' });
                }
                      
                // Generate JWT token
                
                const token = jwt.sign({ id: results[0].id }, 'secret_key', { expiresIn: '1h' });
                
                res.setHeader('authorisation', token)

                return res.status(200).json({ token });
              });
            }
          
            

           const adminRegister = (req,res) => {
            
            const { email, password } = req.body;

            if (Object.keys(body).length == 0) {
                return res.status(400).json({message:' Body should be not empty'})
                }

            if (!email || !password) {
                    return res.status(400).json({ message: 'Email and password are required' });
             }
         
            let emailvalid = isEmail(body.email)
        
             if (emailvalid == false) {
                return res.status(400).json({ message: 'Invalid email ! please enter valid email address !'})
               }
                 // Validate the password
       
            if (!validator.isStrongPassword(body.password)) {
            return res.status(400).json({ message: 'Password must be contain 1 uppercase 1 lowercase special char and min 8 length '})
            }
            
            
            db.query('INSERT INTO admin (email, password) VALUES (?, ?)', [email, password], (err, results) => {
                if (err) {
                  throw err;
                }
                res.status(201).json({ message: 'admin created successfully' });
           })          
        }

          
          module.exports.adminLogin = adminLogin
          module.exports.adminRegister = adminRegister

const jwt = require("jsonwebtoken")
const validator = require('validator');

const createblog = (req, res) => {
    // Retrieve all posts from the database
    const { title, image , description } = req.body;
  
    // Check if title and content are provided
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
  

    // Insert new post into the database
    db.query('INSERT INTO blog (title, description , image) VALUES (?, ? , ?)', [title, description , image], (err, results) => {
      if (err) {
        throw err;
      }

      res.status(201).json({ message: 'Post created successfully' });
    });
  }
    
    const getblogs =  (req, res) => {
      
      // Retrieve all posts from the database
      db.query('SELECT * FROM blog', (err, results) => {
        if (err) {
          throw err;
        }
        res.status(200).json(results);
      });
    }

    
  
    const updateBlog =  (req, res) => {
   
      const title = req.params.title;
   
    const { description , image } = req.body;
  
    // Check if title and content are provided
    if (!description || !image) {
      return res.status(400).json({ message: 'description , image  are required' });
    }
  
    // Update the post in the database
    db.query('UPDATE blog SET description = ?, image = ? WHERE title = ?', [title, description , image], (err, results) => {
      if (err) {
        throw err;
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'blog not found' });
      }
  
      res.status(200).json({ message: 'blog updated successfully' });
    });
  };
  

   const deleteblog = (req, res) => {
    const title = req.params.title;
  
    // Delete the post from the database
    db.query('DELETE FROM blogs WHERE title = ?', title, (err, results) => {
      if (err) {
        throw err;
      }
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json({ message: 'Post deleted successfully' });
    });
  }

  module.exports.createblog = createblog
  module.exports.getblogs = getblogs
  module.exports.updateBlog = updateBlog
  module.exports.deleteblog = deleteblog




  

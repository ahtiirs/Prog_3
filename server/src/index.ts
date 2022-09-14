import app from './app';

//pordi nr mida api kuulab 
const port = 3000; 

// Start listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
# CS 411 Project :memo:

![FlixFinder](./FlixFinder.png)

## FlixFinder: Twitter Based Movie/Show Recommendation :tv:
Is Netflix getting boring for you? Is it getting difficult finding interesting shows or movies that will actually get you hooked on the edge of your seats? Grab your snacks and let this web application do the searching for you. 

Data about users is pulled from their social media (mainly from their Twitter feed although more social medias may be added later) which users initially connect with using OAuth. This data along with the user profile is stored within a non-relational database and ran through the Watson sentiment analysis to determine what genre to recommend to the user. Based on this genre, a list of movies and/or shows will be returned to the user which will contain a rating and a short synopsis. This list will be garnered from a data set of movies and tv shows. Additional features such as a random recommendations, integration with public streaming services like Netflix, Hulu, and Amazon Prime for easier access to recommedations, and cinema showings around Boston may be implemented.

### Tools
- **MERN Stack**: The MERN Stack is a popular web development stack that consists of MongoDB (as the database), Express.js (as the backend), React.js (as the frontend), and Node.js (as the server-side runtime environment). 
  * The reason we chose the MERN stack is because of how widely utilized it is in the web development industry so we believe it would be an essential learning experience for all of us. The entire framework is also fullstack Javascript which will polish our skills in the language. 
  * The reason we chose MongoDB over a relational database such as MySQL is because of performance. The information stored in our database will not require any complex queries so it would be more efficient to use a non-relational database. 
- **TypeScript**: TypeScript is a typed superset of JavaScript that allows for easier code maintenance and scalability. 
  * The reason we chose TypeScript is because we can catch bugs early in the development process and enjoy the benefits of better code organization and readability.


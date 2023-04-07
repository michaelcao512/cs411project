# CS 411 Project Proposal :memo:

## 1. Social Media Based Movie/Show Recommendation :tv:
Is Netflix getting boring for you? Is it getting difficult finding interesting shows or movies that will actually get you hooked on the edge of your seats? Grab your snacks and let this web application do the searching for you. 

Data about users is pulled from their social media (such as their Twitter feed, Instagram explore page, Reddit posts, etc) which users initially connect with using OAuth. This data along with the user profile is stored within the database and ran through the Watson sentiment analysis to determine what genre to recommend to the user. Based on this genre, a list of movies and/or shows will be returned to the user which will contain a rating and a short synopsis. This list will be garnered from a data set of movies and tv shows. Additional features such as a random recommendations, integration with public streaming services like Netflix, Hulu, and Amazon Prime for easier access to recommedations, and cinema showings around Boston may be implemented.

## 2. Boston University Class Visualizer :school:
Using BU's public APIs, this web application would streamline the process of getting to class by making it easier for BU students to visualize their location on the map. Information about a student's classes would be automatically pulled from the BU Course Search API when they log in with their BU email and its details such as the classroom location would be placed on a map of the campus. The locations would be cross-referenced with the BU Maps API and then the BU Shuttle Tracker API could be used in conjuction to allow for easier maneuvering between classes. Other forms of travelling (like the T, walking, biking, etc) can also be included so that students can estimate which mode of transportation would be optimal depending on the situation. Additional features such as adding a student's home address and the time scheduling may also be implemented. 
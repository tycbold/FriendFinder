
var friendsData = require("../data/friends.js");

// ================================================================

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

// ===============================================================

  app.post("/api/friends", function(req, res) {


    // Below code pushes the users info from the form into the friendsData JSON array
    friendsData.push(req.body);


    // This is an empty array to store all of the friend compatibility scores
    // after the for loops go through each of the friends in the array
    var allFriendScores = [];

    // This for loop goes through each of the friends listed in the friendsData array
    // so that we can figure out the score differences
    for (var i = 0; i < friendsData.length; i++) {

      var friendScore;

      // This for loop focuses on on friend in the array and compares each score from
      // the questions so that we can see if there is any difference. If there is a 
      // difference, the absolute value is taken and it is added to the friend score
      // for this particular friend.
        for (var j = 0; j < friendsData[i].scores.length; j++) {
          var difference = friendsData[i].scores[j] - req.body.scores[j];
          friendScore += Math.abs(difference);
        }
        // The friend score is pushed into the array with all of the friend scores
        allFriendScores.push(friendScore);
    }

    // Once we have all of the friend scores in the allFriendScores array, we figure
    // out which one is the lowest with Math.min. When we find the lowest one, we take 
    // the index of that score and match it with the index of that friend, and then send
    // that friend back to the user so that it can pop up in the modal.
   var friendIndex = allFriendScores.indexOf(Math.min(allFriendScores));

   res.json(friendsData[friendIndex]);
  });
}




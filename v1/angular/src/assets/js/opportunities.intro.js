function startIntro(){
    var intro = introJs();
      intro.setOptions({
        steps: [
          {
            element: ".title_0",
            intro: "<p>This is the title of the published article.</p> <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/Article_Title.mp3' type='audio/mpeg'></audio>",
            position: 'top'
          },
          {
            element: ".author_0",
            intro: "<p>Here is the name of the analyst for the published article.</p> <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/Authors_Name.mp3' type='audio/mpeg'></audio>",
            position: 'top'
          },
          {
            element: ".cate_0",
            intro: "<p>These are the categories under which you can search this article.</p> <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/Article_Category.mp3' type='audio/mpeg'></audio>",
            position: 'top'
          },
          {
            element: ".pub_0",
            intro: "<p>The name of the original publisher of the article.</p> <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/Article_Publication.mp3' type='audio/mpeg'></audio>",
            position: 'top'
          },
          {
            element: ".desc_0",
            intro: "A snippet of the article as printed by the publisher.</p> <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/Article_Description.mp3' type='audio/mpeg'></audio>",
            position: 'top'
          },
          {
            element: ".author",
            intro: "<p>Clicking on TB (short for Trade Board) will take you to the Trade Board where all trades built using different financial instruments for the strategy based on this article are displayed.</p> <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/Article_TB.mp3' type='audio/mpeg'></audio>",
            position: 'top'
          },
          {
            element: ".share_0",
            intro: "<p>This is an option to share the article on popular social media platforms.</p> <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/Article_Share.mp3' type='audio/mpeg'></audio>",
            position: 'top'
          }
        ]
    });
    intro.start();        

}
var elementExists = document.getElementById("starOpporTour");
if(elementExists) {
  elementExists.addEventListener("click", function() {
    startIntro();  
  });  
}


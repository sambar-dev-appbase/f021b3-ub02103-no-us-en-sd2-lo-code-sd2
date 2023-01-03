function startIntro(){
    var intro = introJs();
      intro.setOptions({
        steps: [
          {
            element: "#td-AAPL",
            intro: "This shows the amount of credits user will get upon converting each LeBar. <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/Credits_tour.mp3' type='audio/mpeg'></audio>",
            position: 'right'
          },
          {
            element: "#td-AMZN",
            intro: "Each LeBar can be purchased for $1.</br> <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/Dogen.mp3' type='audio/mpeg'></audio>",
            position: 'right'
          },
          {
            element: "#basicPlan",
            intro: "Basic subscription plan gives the User limited access to the platform and the ability to view sample strategies only. This plan costs $1 and is created to let the User access and explore the platform for 15 days. No access to real-time dashboard and purchase of LeBar are allowed under this plan. <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/Basic.mp3' type='audio/mpeg'></audio>",
            position: 'top'
          },
          {
            element: "#silverPlan",
            intro: "Silver subscription plan provides the user with access to all equities strategies for $99/month and an option to purchase 20 LeBar while subscribing to the plan in a single transaction. The plan also qualifies for SMS notifications, 20 free credits, and ability to purchase up to 150 LeBar per month. <audio controls controlsList='nodownload'><source src='.https://ver2-tour-files.s3.us-east-2.amazonaws.com/Silvers_tour.mp3' type='audio/mpeg'></audio>",
            position: 'top'
          },
          {
            element: "#goldPlan",
            intro: "Gold subscription plan provides the User with access to all equities and futures strategies except currencies for $149/month and an option to purchase 30 LeBar while subscribing to the plan in a single transaction. The plan also qualifies for SMS notification, 30 free credits, and ability to purchase up to 250 LeBar per month. <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/Goldsub_tour.mp3' type='audio/mpeg'></audio>",
            position: 'top'
          },
          {
            element: "#platinumPlan",
            intro: "Platinum subscription plan provides the User with access to all equities and futures strategies including currencies for $199/month and an option to purchase 50 LeBar while subscribing to the plan in a single transaction. The plan also qualifies for SMS notification, 40 free credits, upon registration, and ability to purchase up to 500 LeBar per month. <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/Platinum_tour.mp3' type='audio/mpeg'></audio>",
            position: 'top'
          },
          {
            element: "#yearlyPlan",
            intro: "Yearly subscription plan provides the User with access to all strategies published on the platform and 40 free credits for $1999 a year. The user may purchase up to 750 LeBar per month. <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/Yearlys_tour.mp3' type='audio/mpeg'></audio>",
            position: 'top'
          },
          {
            element: "#addTokens",
            intro: "LeBar can be purchased for $1 after subscribing to any plan except Basic. The monthly LeBar limit depends on the plan subscribed by the user. <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/AddDogens_tour.mp3' type='audio/mpeg'></audio>",
            position: 'top'
          },
          {
            element: "#sbBtn",
            intro: 'Strategy Board can be accessed by clicking on "SB" button.<audio controls controlsList="nodownload"><source src="https://ver2-tour-files.s3.us-east-2.amazonaws.com/SB.mp3" type="audio/mpeg"></audio>',
            position: 'top'
          } 
        ]
    });
    intro.start();        

}
document.getElementById("starTour").addEventListener("click", function() {
    startIntro();  
});


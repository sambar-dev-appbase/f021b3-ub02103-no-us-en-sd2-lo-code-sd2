function startIntro(){
    var intro = introJs();
      intro.setOptions({
        steps: [
          // { 
          //   intro: "<b><center>Welcome to Sambar!</center></b>We’ll be walking you through the Sambar My Profile Menu. In this menu, you can view your profile, upgrade your plan and see the analyst and articles you are following.",
          // },
          // {
          //   element: "#strategies-list",
          //   intro: "Go to Strategy Board.",
          //   position: 'right'
          // },
          {
            element: "#profile",
            intro: "The user's personal information, an option to submit articles, reports, white-papers, ability to edit their profile and change password.. <p><audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/MyProfile.mp3' type='audio/mpeg'></audio></p>",
            position: window.screen.width <= 1199 ? 'bottom' : 'right'
          },{
            element: "#change_cover_btn",
            intro: 'Click on CHANGE COVER button to change the cover photo.',
            position: 'left'
          },{
            element: ".url_input",
            intro: 'Submit an article by entering the URL.',
            position: 'bottom'
          },{
            element: ".comment_input",
            intro: 'Add comments and other description relevant to the article.',
            position: 'bottom'
          },{
            element: ".pdf_input",
            intro: 'Click on CHOOSE FILE button to upload a PDF article.',
            position: 'bottom'
          },{
            element: ".email_txt",
            intro: 'The user can email articles to submissions@sambar.one.',
            position: 'bottom'
          },{
            element: ".sub_btn",
            intro: 'Click on Submit button to submit an article.',
            position: 'left'
          },
          {
            element: '#my-strategies',
            intro: 'The User can find recommended and following strategies. <audio controls controlsList="nodownload"><source src="https://ver2-tour-files.s3.us-east-2.amazonaws.com/Strategiessection.mp3" type="audio/mpeg"></audio>',
            // position: window.screen.width <= 1199 ? 'bottom' : 'right'
          },
          {
            element: '#my-trades',
            intro: "Trade section consists of Active, Favorite, Expired and Past Trades tabs. <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/Tradesection.mp3' type='audio/mpeg'></audio>",
            position: 'right'
          },
          {
            element: '#my-orders',
            intro: "Orders section consists of Active and Past orders. <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/Orderssection.mp3' type='audio/mpeg'></audio>",
            position: 'right'
          },{
            element: '#following',
            intro: 'This section consists of Publications, Analysts and Articles followed by the user. <audio controls controlsList="nodownload"><source src="https://ver2-tour-files.s3.us-east-2.amazonaws.com/Followingsection.mp3" type="audio/mpeg"></audio>',
            position: 'right'
          },{
            element: '#program-1000',
            intro: "This section shows all trades recommended for our first 1000 subscribers of Yearly plan. <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/Program1000.mp3' type='audio/mpeg'></audio>",
            position: 'right'
          },
          {
            element: '#broker-information',
            intro: 'This section lists all the brokers the user can establish connection through Sambar platform. <audio controls controlsList="nodownload"><source src="https://ver2-tour-files.s3.us-east-2.amazonaws.com/Brokersection.mp3" type="audio/mpeg"></audio>',
            position: 'right'
          },
          // {
          //   element: '#following-analysts',
          //   intro: 'This section lists the analysts the user following.',
          //   position: 'right'
          // },
          // {
          //   element: '#following-articles',
          //   intro: 'This section lists the articles the user following.',
          //   position: 'right'
          // },
          // {
          //   element: '#following-publications',
          //   intro: 'This section list the publications the user following.',
          //   position: 'right'
          // },
          {
            element: '#analysts-list',
            intro: 'Analysts section consists of all the registered analysts who have contributed financial articles, reports and trade recommendations. <audio controls controlsList="nodownload"><source src="https://ver2-tour-files.s3.us-east-2.amazonaws.com/Analystsection.mp3" type="audio/mpeg"></audio>',
            position: 'right'
          },
          {
            element: '#notifications',
            intro: 'This section shows the user activities performed on this platform and all relevant notifications. <audio controls controlsList="nodownload"><source src="https://ver2-tour-files.s3.us-east-2.amazonaws.com/Notification.mp3" type="audio/mpeg"></audio>',
            position: 'right'
          },
          {
            element: '#payments',
            intro: 'This section shows the plan a user subscribed to, available LeBar and credits. It also details user payment activities and billing. <audio controls controlsList="nodownload"><source src="https://ver2-tour-files.s3.us-east-2.amazonaws.com/Payment_and_credits_myprofile.mp3" type="audio/mpeg"></audio>',
            position: 'right'
          },
          {
            element: '#sbboard_menu',
            intro: 'Click on SB button to access Strategy Board. <audio controls controlsList="nodownload"><source src="https://ver2-tour-files.s3.us-east-2.amazonaws.com/SBButton.mp3" type="audio/mpeg"></audio>',
            position: 'top'
          }
        ],
        highlightClass: "cus-intro",
        tooltipClass: "cus-intro-tool",
        disableInteraction : false,
        overlayOpacity: 0.4,
        showStepNumbers: false
    });
  
    setTimeout(function() {
      intro.start();      
    },500);

    $("#al-sidebar-list").scrollTop(0)  

    intro.onafterchange(function(targetElement) {
      if(window.screen.width <= 1199) {
        if(this._currentStep == 0 || this._currentStep == 7) {        
          $(".introjs-helperLayer, .introjs-tooltipReferenceLayer").width("218");
        }
      }
    });

    intro.onbeforechange(function(targetElement) {
       // console.log("this._currentStep", this._currentStep)
      if(window.screen.width <= 1199) {
        if(this._currentStep == 0 ) {
          window.scrollTo(0, 0);
          if($(".ng2.menu-collapsed").length) {
            $('.showHide-sidebar').trigger('click');         
          }
        }
        if(this._currentStep >= 7) {          
          if($(".ng2.menu-collapsed").length) {
            $('.showHide-sidebar').trigger('click');
          }
        }
      }

      if(this._currentStep == 0 && this._currentStep < 2 ) {
        $("#al-sidebar-list").scrollTop(0)  
        window.scrollTo(0, 0);  
      }
      if(this._currentStep > 6 && this._currentStep <= 15 ) {
        window.scrollTo(0, 0);
      }
      if(this._currentStep > 0 && this._currentStep < 7) {
        intro.setOption("highlightClass", "cus-intro2");
        if(window.screen.width <= 1199) {
          if(!$(".ng2.menu-collapsed").length) {
            $('.showHide-sidebar').trigger('click');           
          }
        }
      }else{
        intro.setOption("highlightClass", "cus-intro");
      }


      if(this._currentStep > 10) {
       $("#al-sidebar-list").scrollTop(400)
      }

      intro.oncomplete(function() {
        if(!$(".ng2.menu-collapsed").length) {
          $('.showHide-sidebar').trigger('click');           
        } 
      });

    });
}
document.getElementById("startProfileTour").addEventListener("click", function() {
    startIntro();

    // var divsToHide = document.getElementsByClassName("al-sidebar-sublist"); //divsToHide is an array
    // for(var i = 0; i < divsToHide.length; i++){
    //     divsToHide[i].style.display = "none"; 
    // }
    // var divsToHide = document.getElementsByClassName("al-sidebar-list-item"); //divsToHide is an array
    // for(var i = 0; i < divsToHide.length; i++){
    //     divsToHide[i].className = "al-sidebar-list-item with-sub-menu";
    //     if(divsToHide[i].firstElementChild.lastElementChild.classList.contains("fa-angle-down")) {
    //       divsToHide[i].firstElementChild.lastElementChild.className = "fa fa-angle-down";
    //     }
        
    // }
    // var myList = document.getElementById('profile');
    //     divsToHide[i].lastElementChild.className = "fa fa-angle-down";

    
    
});


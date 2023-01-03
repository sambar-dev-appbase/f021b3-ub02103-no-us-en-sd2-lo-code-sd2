function startIntro(){
    var intro = introJs();
      intro.setOptions({
        steps: [
          {
            element: "#profile",
            intro: "This shows the analyst's personal information, an option to submit articles, reports, whitepapers, ability to edit their profile and change password. <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/analyst/Myprofie.mp3' type='audio/mpeg'></audio>",
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
            intro: 'The analyst can email articles to contact@sambar.website.',
            position: 'bottom'
          },{
            element: ".sub_btn",
            intro: 'Click on Submit button to submit an article.',
            position: 'left'
          },
          {
            element: '#qualifications',
            intro: 'This shows the qualifications of the analyst. <audio controls controlsList="nodownload"><source src="https://ver2-tour-files.s3.us-east-2.amazonaws.com/analyst/Analyst_Qualifications.mp3" type="audio/mpeg"></audio>',
            position: window.screen.width <= 1199 ? 'bottom' : 'right'
          },
          {
            element: '#customers',
            intro: "This shows the list of users who have accessed the strategies based on the analyst's publications. The analyst can access the user's profile from this section. <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/analyst/MyCustomers.mp3' type='audio/mpeg'></audio>",
            position: 'right'
          },{
            element: '#followers',
            intro: "This shows the list of followers. The analyst can access the user's profile from this section. <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/analyst/MyFollowers.mp3' type='audio/mpeg'></audio>",
            position: 'right'
          },{
            element: '#following',
            intro: 'This shows all the Publications, Analysts and Articles followed by the user. You can view the profile of an analyst and/or read complete articles followed by the analyst. <audio controls controlsList="nodownload"><source src="https://ver2-tour-files.s3.us-east-2.amazonaws.com/analyst/MyFollowing.mp3" type="audio/mpeg"></audio>',
            position: 'right'
          },{
            element: '#writings',
            intro: "This shows the list all the writings of the analyst. <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/analyst/MyWritings.mp3' type='audio/mpeg'></audio>",
            position: 'right'
          },
          {
            element: '#trades',
            intro: "Lists all the trades based on the analyst's publications. Click on View button to view the trade. <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/analyst/MyTrades.mp3' type='audio/mpeg'></audio>",
            position: 'right'
          },{
            element: '#notifications',
            intro: 'List of all the activities performed on Sambar platform. <audio controls controlsList="nodownload"><source src="https://ver2-tour-files.s3.us-east-2.amazonaws.com/analyst/Notifications.mp3" type="audio/mpeg"></audio>',
            position: 'right'
          },{
            element: '#performance',
            intro: "This shows the performance of the trade based on the analyst's publications. Active tab shows the performance of the active trades, Rollover tab shows the performance of the trade that has been rolled over for the next year, and Past tab shows the performance of the past trades. <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/analyst/MyPerformance.mp3' type='audio/mpeg'></audio>", 
            position: 'right'
          },{
            element: '#earnings',
            intro: "This shows the earnings per strategy accessed by the user. The earnings are based on the analyst's contract with the company. <audio controls controlsList='nodownload'><source src='https://ver2-tour-files.s3.us-east-2.amazonaws.com/analyst/MyEarnings.mp3' type='audio/mpeg'></audio>",
            position: 'right'
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
      if(window.screen.width <= 1199) {
        if(this._currentStep == 0 ) {
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
    });

    intro.oncomplete(function() {
      if(!$(".ng2.menu-collapsed").length) {
        if(window.screen.width <= 1199) {
          $('.showHide-sidebar').trigger('click');           
        }
      } 
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


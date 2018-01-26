(function(){
  function LandingCtrl(){
    this.heroTitle = "Turn the Music Up!";
  }
  angular
    .module('blocJams')
    .module('LandingCtrl', LandingCtrl);

})();

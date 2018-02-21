(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};
    /**
    * @desc current album information
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();

    /**
     * @desc Buzz object audio file
     * @type {Object}
     */


    var currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */


var setSong = function(song){
  if(currentBuzzObject){
    currentBuzzObject.stop();
    SongPlayer.currentSong.playing = null;
  }

  currentBuzzObject = new buzz.sound(song.audioUrl, {
    formats: ['mp3'],
    preload: true
  });

  SongPlayer.currentSong = song;
};

  /**
  * @function playSong
  * @desc Plays a song
  * @param {Object} song
  */

var playSong = function(song) {
  currentBuzzObject.play();
  song.playing = true;
};

/**
* @function stopSong
* @desc Stops a song from playing
* @param {Object} song
*/

var stopSong = function(song) {
  currentBuzzObject.stop();
  song.playing = null;
};

        /**
        * @function getSongIndex
        * @desc Gets index of song in the songs array
        * @param {Object} song
        * @returns {Number}
        */

var getSongIndex = function(song){
  return currentAlbum.songs.indexof(song);
};


/**
* @desc Active song object from list of songs
* @type {Object}
*/

SongPlayer.currentSong = null;


/**
* @function play
* @desc plays current or new song
* @param {Object} song
*/


SongPlayer.play = function(song) {
    song = song || SongPlayer.currentSong;
    if(SongPlayer.currentSong !== song){
      setSong(song);
      playSong(song);
    //currentBuzzObject.play();
  //  song.playing = true;

  }else if(SongPlayer.currentSong === song){
    if (currentBuzzObject.isPaused()) {
      playSong(song);

      //currentBuzzObject.play();
    }
  }
};

/**
* @function pause
* @desc pauses current song
* @param {Object} song
*/


SongPlayer.pause = function(song) {
  song = song || SongPlayer.currentSong;
  currentBuzzObject.pause();
  song.playing = false;
};

        /**
        * @function previous
        * @desc Set song to previous song in album
        */

SongPlayer.previous = function() {
  var currentSongIndex = getSongIndex(SongPlayer.currentSong);
  currentSongIndex--;

  if(currentSongIndex < 0){
    stopSong(SongPlayer.currentSong);
  }else{
    var song = currentAlbum.songs[currentSongIndex];
    setSong(song);
    playSong(song);
  }
};
  /**
  * @function next
  * @desc sets the next song in the album
  */

SongPlayer.next = function (){
  var currentSongIndex = getSongIndex(SongPlayer.currentSong);
  currentSongIndex++;

  var lastSongIndex = currentAlbum.songs.length - 1;

  if (currentSongIndex > lastSongIndex){
    stopSong(SongPlayer.currentSong);
  }else{
    var song = currentAlbum.songs[currentSongIndex];
    setSong(song);
    playSong(song);
  }
};



    return SongPlayer;

  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);

})();

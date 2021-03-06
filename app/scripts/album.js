
// Another Example Album
var albumMarconi = {
    name: 'The Telephone',
    artist: 'Gugliemo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: '/images/album-placeholder.png',
    songs: [
        { name: 'Hello, Operator?', length: '1:01' },
        { name: 'Ring, ring, ring', length: '5:01' },
        { name: 'Fits in yo8ur pocket', length: '3:21' },
        { name: 'Can you hear me now', length: '3:14' },
        { name: 'wrong phone number', length: '2:15' },
    ]
};

var currentlyPlayingSong = null;

var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr>'
      + '  <td class="song-number col-md-1">' + songNumber + '</td>'
      + '  <td class="col-md-9">' + songName + '</td>'
      + '  <td class="col-md-2">' + songLength + '</td>'
      + '</tr>'
      ;

    // Instead of returning the row immediately, we'll attach hover
   // functionality to it first.
    var $row = $(template);

    var onHover = function(event) {
      var songNumberCell = $(this).find('.song-number');
      var songNumber = songNumberCell.data('song-number');
      if (songNumberCell !== currentlyPlayingSong) {
        songNumberCell.html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
      }
    };

    var offHover = function(event) {
      var songNumberCell = $(this).find('.song-number');
      var songNumber = songNumberCell.data('song-number');
      if (songNumberCell !== currentlyPlayingSong) {
        songNumberCell.html(songNumber);
      }
    };

    var clickHandler = function(event) {
        var songNumber = $(this).data('song-number')

        if ( currentlyPlayingSong !== null ) {
              // Revert to song number for currently playing song because user started playing new song.
              var currentlyPlayingCell = $('.song-number[data-song-number="' + currentlyPlayingSong + '"]');
              currentlyPlayingCell.html(currentlyPlayingSong);
        }

        if ( currentlyPlayingSong !== songNumber ) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html('<a class="album-song-button"><i class="fa fa-pause></i></a>');
            currentlyPlayingSong = songNumber;
        }
        else if ( currentlyPlayingSong == songNumber ) {
         // Switch from Pause -> Play button to pause current playing song
         $(this).html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
         currentlyPlayingSong = null;

        }
    };

    $row.find('.song-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;

};

var changeAlbumView = function(album) {
    // Update the album title
    var $albumTitle = $('.album-title');
    $albumTitle.text(album.name);

    // Upate artist
    var $albumArtist = $('.album-artist');
    $albumArtist.text(album.artist);


    // Update the meta information
    var $albumMeta = $('.album-meta-info');
    $albumMeta.text(album.year + " on " + album.label);


    // Update image
    var $albumImage = $('.album-meta-info');
    $albumImage.attr('src', album.albumArtUrl);

    // Update the Song List
    var $songList = $(".album-song-listing");
    $songList.empty();
    var songs = album.songs;
    for (var i = 0; i < songs.length; i++) {
        var songData = songs[i];
        var $newRow = createSongRow(i + 1, songData.name, songData.length);
        $songList.append($newRow);
    }

};

var setupSeekBars = function() {

  $seekBars = $('.player-bar .seek-bar');
  $seekBars.click(function(event) {
    updateSeekPercentage($(this), event);
  });

  $seekBars.find('.thumb').mousedown(function(event){
    var $seekBar = $(this).parent();

    $seekBar.addClass('no-animate');

    $(document).bind('mousemove.thumb', function(event){
      updateSeekPercentage($seekBar, event);
    });

    //cleanup
    $(document).bind('mouseup.thumb', function(){
      $seekBar.removeClass('no-animate');

      $(document).unbind('mousemove.thumb');
      $(document).unbind('mouseup.thumb');
    });

  });

};
// This 'if' condition is used to prevent the jQuery modifications
// from happening on non-Album view pages.
//  - Use a regex to validate that the url has "/album" in its path.
if (document.URL.match(/\/album.html/)) {

 $(document).ready(function() {

    changeAlbumView(albumPicasso);
    setupSeekBars();

  });

}

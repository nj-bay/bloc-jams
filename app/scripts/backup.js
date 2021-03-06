// Example Album
var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: '/images/album-placeholder.png',
    songs: [
        { name: 'Blue', length: '4:26' },
        { name: 'Green', length: '3:14' },
        { name: 'Red', length: '5:01' },
        { name: 'Pink', length: '3:21' },
        { name: 'Magenta', length: '2:15' },
    ]
};

blocJams = angular.module('BlocJams', ['ui.router']);

blocJams.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
     $locationProvider.html5Mode(true);

   $stateProvider.state('landing', {
     url: '/',
     controller: 'Landing.controller',
     templateUrl: '/templates/landing.html'
   });

   $stateProvider.state('collection', {
     url: '/collection',
     controller: 'Collection.controller',
     templateUrl: '/templates/collection.html'
   });

   $stateProvider.state('album', {
     url: '/album',
     controller: 'Album.controller',
     templateUrl: '/templates/album.html'

   });

}]);


 blocJams.controller('Landing.controller', ['$scope', function($scope) {
   $scope.subText = "Turn the music up!";

   $scope.subTextClicked = function() {
     $scope.subText += '!';
    };

    $scope.albumURLs = [
      '/images/album-placeholders/album-1.jpg',
      '/images/album-placeholders/album-2.jpg',
      '/images/album-placeholders/album-3.jpg',
      '/images/album-placeholders/album-4.jpg',
      '/images/album-placeholders/album-5.jpg',
      '/images/album-placeholders/album-6.jpg',
      '/images/album-placeholders/album-7.jpg',
      '/images/album-placeholders/album-8.jpg',
      '/images/album-placeholders/album-9.jpg',
    ];

}]);

blocJams.controller('Collection.controller', ['$scope', 'ConsoleLogger', function($scope, ConsoleLogger) {
  $scope.albums = [];
    for (var i = 0; i < 33; i++) {
        $scope.albums.push(angular.copy(albumPicasso));
    }
}]);

blocJams.controller('Album.controller', ['$scope', 'SongPlayer', 'ConsoleLogger',
                    function($scope, SongPlayer, ConsoleLogger) {
  $scope.album = angular.copy(albumPicasso);

  ConsoleLogger.log();

  var hoveredSong = null;

  $scope.onHoverSong = function(song) {
    hoveredSong = song;
  };

  $scope.offHoverSong = function(song) {
    hoveredSong = null;
  };

  $scope.getSongState = function(song) {
    if (song === SongPlayer.currentSong && SongPlayer.playing) {
      return 'playing';
    }

    else if (song === hoveredSong) {
      return 'hovered';
    }

    return 'default';
  };

  $scope.playSong = function(song) {
    SongPlayer.setSong($scope.album, song);
    SongPlayer.play();
  };

  $scope.pauseSong = function(song) {
    SongPlayer.pause();
  };

}]);

blocJams.controller('PlayerBar.controller', ['$scope', 'SongPlayer', 'ConsoleLogger', function($scope, SongPlayer, ConsoleLogger) {
  $scope.songPlayer = SongPlayer;
  ConsoleLogger.log();

}]);

blocJams.service('SongPlayer', function() {
  var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
  };

  return {
    currentSong: null,
    currentAlbum: null,
    playing: false,

    play: function() {
      this.playing = true;
    },
    pause: function() {
      this.playing = false;
    },
    next: function() {
      var currenttrackIndex = trackIndex(this.currentAlbum, this.currentSong);
      currenttrackIndex++;
      if (currenttrackIndex >= this.currentAlbum.songs.length) {
        currenttrackIndex = 0;
      }
      this.currentSong = this.currentAlbum.songs[currenttrackIndex];
    },
      previous: function() {
        var currenttrackIndex = trackIndex(this.currentAlbum, this.currentSong);
        currenttrackIndex--;
        if (currenttrackIndex < 0) {
          currenttrackIndex = this.currentAlbum.songs.length - 1;
        }

        this.currentSong = this.currentAlbum.songs[currenttrackIndex];
      },

    setSong: function(album, song) {
      this.currentAlbum = album;
      this.currentSong = song;
    }
  };
});

blocJams.service('ConsoleLogger', function() {
  console.log('calling ConsoleLogger constructor');
  return {
    log: function() {
      console.log("ErMahgerd!");
    }
  }
});

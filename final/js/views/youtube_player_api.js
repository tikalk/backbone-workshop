Echoes.Views.YoutubePlayerApi = Backbone.View.extend({
	el: '#youtube-player-container',

	events: {
		'click .hide-player': 'hide',
		'click .show-player': 'show'
		// 'click .pause': 'pause',
		// 'click .play': 'playVideo',
		// 'click .volume-down': 'decreaseVolume',
		// 'click .volume-up': 'increaseVolume'
	},

	initialize: function() {
		this.listenTo(this.model, 'change:mediaId', this.play);
		window.onYouTubeIframeAPIReady = _.bind(this.createPlayer, this);
		$.getScript('http://www.youtube.com/iframe_api?&ghost=Nan');
	},

	createPlayer: function(){
		this.player = new YT.Player('player', {
			height: '270',
			width: '350',
			playlist: '',
			playerVars: { 'autoplay': 1, 'enablejsapi': 1 },
			events: {
				'onReady': _.bind(this.onPlayerReady, this),
				'onStateChange': _.bind(this.onPlayerStateChange, this)
			}
		});
	},
	
	onPlayerReady: function(){
		if (this.queue) {
			this.play(this.model, this.queue);
		}
	},

	onPlayerStateChange: function(ev){
		// should creat a player model
		if (ev.data === YT.PlayerState.PAUSED) {
			this.toggleNowPlaying(false);
		}

		if (ev.data === YT.PlayerState.ENDED) {
			this.playNextInPlaylist();
		}

		if (ev.data === YT.PlayerState.PLAYING) {
			// this.model.fetchCurrentMediaInfo();
			this.toggleNowPlaying(true);
		}
	},

	play: function(model, mediaId) {
		if (!this.player || !this.player.loadVideoById) {
			this.show();
			this.queue = mediaId;
			return;
		}
		this.player.stopVideo();
		if (this.player.clearVideo) { this.player.clearVideo(); }
		this.playMedia(mediaId);
		this.toggleNowPlaying(true);
		this.show();
	},

	/**
	 * plays a single video or a playlist
	 * @param {json} mediaData - youtube api item result
	 * @param {json} options - key-value properties of media - type: video/playlist
	 */
	playMedia: function(mediaData) {
		var mediaId = _.isObject(mediaData) ? mediaData.id : mediaData;
		// updating the mediaId incase it is loaded by next method
		this.model.set('mediaId', mediaId);
		this.player.loadVideoById(mediaId);
	},

	pause: function(ev) {
		ev.preventDefault();
		this.player.pauseVideo();
	},

	playVideo: function(ev) {
		if (ev) { ev.preventDefault(); }
		this.player.playVideo();
	},

	decreaseVolume: function(ev) {
		if (ev) { ev.preventDefault(); }
		this.player.setVolume(this.player.getVolume() - 5);
	},

	increaseVolume: function(ev) {
		if (ev) { ev.preventDefault(); }
		this.player.setVolume(this.player.getVolume() + 5);
	},

	toggleNowPlaying: function(show){
		this.$el.toggleClass('yt-playing', show);
	},

	show: function(ev) {
		if (ev) { ev.preventDefault(); }
		this.$el.addClass('show-youtube-player');
	},

	hide: function(ev) {
		ev.preventDefault();
		this.$el.removeClass('show-youtube-player');
	},

	playNextInPlaylist: function () {
		var currentMediaId = this.model.get('mediaId'),
			index = 0;
		this.collection.find(function(media, i){
			if (media.id === currentMediaId) {
				index = i;
			}
			return media.id === currentMediaId;
		});
		index += 1;
		if (index === this.collection.length) {
			index = 0;
		}
		this.playMedia(this.collection.at(index));
	}
});
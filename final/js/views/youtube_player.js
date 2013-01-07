Echoes.Views.YoutubePlayer = Backbone.View.extend({
	el: '#youtube-player-container',

	events: {
		'click .hide-player': 'hide',
		'click .show-player': 'show'
	},

	initialize: function() {
		this.$player = this.$el.find('iframe');
		this.listenTo(this.model, 'change:mediaId', this.playMedia);
	},

	playMedia: function(model, media) {
		this.play(media);
	},
	
	play: function(mediaId) {
		var mediaSource = "http://www.youtube.com/embed/" + mediaId + "?autoplay=1";
		this.$player.attr('src', mediaSource);
		this.toggle(true);
	},

	show: function(ev) {
		ev.preventDefault();
		this.toggle(true);
	},

	hide: function(ev){
		ev.preventDefault();
		this.toggle(false);
	},

	toggle: function(show) {
		this.$el.toggleClass('show-youtube-player', show);
	}
});
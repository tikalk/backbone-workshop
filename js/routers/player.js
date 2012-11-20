Echoes.Player = Backbone.Router.extend({

	routes: {
		'': 'explore',
		'explore': 'explore',

		'searches/:query': 'search',
		'play/:mediaId': 'playMedia'
	},

	initialize: function() {
		this.appView = new Echoes.Views.App();
		Backbone.history.start();
	},

	explore: function() {
		this.appView.query();
	},

	search: function(query) {
		this.appView.query(query);
	},

	playMedia: function(mediaId) {
		this.appView.query(false, {ignore: true});
		this.appView.play(mediaId);
	}
});
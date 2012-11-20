Echoes.Views.App = Backbone.View.extend({
	initialize: function() {
		this.model = new Echoes.Models.YoutubeMediaProvider();

		//- defining modules
		this.modules = {};
		this.modules.searchBar = new Echoes.Views.MediaSearch({ model: this.model.get('search') });

		this.modules.youtubePlayer = new Echoes.Views.YoutubePlayer({ model: this.model });
		this.modules.resultsView = new Echoes.Views.YoutubeSearchResults({ 
			collection: this.model.get('results'),
			model: this.model
		});
		this.modules.resultsView.on('search-result-selected', this.onMediaAddedToQueue, this);
		this.modules.resultsNav = new Echoes.Views.ResultsNavigation({
			model: this.model.get('resultsNav')
		});

		this.modules.recentSearches = new Echoes.Views.RecentSearches({ model: this.model.get('search') });
		this.modules.nowPlaylist = new Echoes.Views.Playlist({ model: this.model });
	},

	query: function(query) {
		this.model.query({ query: query });
	},

	play: function(mediaId) {
		this.modules.youtubePlayer.play({ id: mediaId });
	}
});
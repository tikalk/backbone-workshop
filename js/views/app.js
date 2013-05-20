Echoes.Views.App = Backbone.View.extend({
	initialize: function() {
		this.views = {};
		this.views.searchBar = new Echoes.Views.MediaSearch({ model: this.model.get('search') });

		// this.views.youtubePlayer = new Echoes.Views.YoutubePlayer({ model: this.model });
		this.views.youtubePlayer = new Echoes.Views.YoutubePlayerApi({ 
			model: this.model,
			collection: this.model.get('nowPlaylist')
		});
		
		this.views.resultsView = new Echoes.Views.YoutubeSearchResults({
			collection: this.model.get('results'),
			model: this.model
		});
		
		this.views.resultsNav = new Echoes.Views.ResultsNavigation({
			model: this.model.get('resultsNav')
		});

		this.views.recentSearches = new Echoes.Views.RecentSearches({ model: this.model.get('search') });
		this.views.nowPlaylist = new Echoes.Views.Playlist({ model: this.model });
	}
});
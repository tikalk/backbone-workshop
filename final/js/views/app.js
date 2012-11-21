Echoes.Views.App = Backbone.View.extend({
	initialize: function() {
		this.modules = {};
		this.modules.searchBar = new Echoes.Views.MediaSearch({ model: this.model.get('search') });

		this.modules.youtubePlayer = new Echoes.Views.YoutubePlayer({ model: this.model });
		this.modules.resultsView = new Echoes.Views.YoutubeSearchResults({ 
			collection: this.model.get('results'),
			model: this.model
		});
		
		this.modules.resultsNav = new Echoes.Views.ResultsNavigation({
			model: this.model.get('resultsNav')
		});

		this.modules.recentSearches = new Echoes.Views.RecentSearches({ model: this.model.get('search') });
		this.modules.nowPlaylist = new Echoes.Views.Playlist({ model: this.model });
	}
});
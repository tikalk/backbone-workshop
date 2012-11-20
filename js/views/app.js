Echoes.Views.App = Backbone.View.extend({
	initialize: function() {
		this.modules = {};
		this.modules.searchBar = new Echoes.Views.MediaSearch();
		this.modules.searchBar.on('search-request', this.query, this);

		this.modules.mediaProvider = new Echoes.Models.YoutubeMediaProvider();
		this.modules.mediaProvider.on('new-media-response', this.onYoutubeSearchResponse, this);

		this.modules.youtubePlayer = new Echoes.Views.YoutubePlayer();
		this.modules.resultsView = new Echoes.Views.YoutubeSearchResults();
		this.modules.resultsView.on('search-result-selected', this.onMediaAddedToQueue, this);
		this.modules.resultsNav = new Echoes.Views.ResultsNavigation();
		this.modules.resultsNav.on('navigate-index-change', this.onSearchResultsIndexChange, this);

		this.modules.recentSearches = new Echoes.Views.RecentSearches();
		this.modules.nowPlaylist = new Echoes.Views.Playlist();
	},

	query: function(query, options) {
		//- in case the query is null - get it from the default query
		query = query || this.modules.searchBar.getQuery();
		this.modules.mediaProvider.query({ query: query});
		this.modules.searchBar.setQuery(query);
		if (options && options.ignore) {
			return;
		}
		this.modules.recentSearches.add(query);
	},

	onYoutubeSearchResponse: function(data) {
		this.modules.resultsView.update(data);
		this.modules.resultsNav.update(data);
	},

	onSearchResultsIndexChange: function(index) {
		this.modules.mediaProvider.set('startIndex', index);
	},

	onMediaAddedToQueue: function(mediaData) {
		this.modules.youtubePlayer.play(mediaData);
		this.modules.nowPlaylist.render(this.modules.mediaProvider.getResults().items, mediaData);
	},

	play: function(mediaId) {
		this.modules.youtubePlayer.play({ id: mediaId });
	}
});
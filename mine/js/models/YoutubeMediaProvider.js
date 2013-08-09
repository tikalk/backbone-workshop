Echoes.Models.YoutubeMediaProvider = Backbone.Model.extend({
	defaults: {
		search: '',
		mediaId: '',
		maxResults: 24,

		results: null,
		resultsNav: null,
		nowPlaylist: null,

		// to be upgraded
		query: '',
		startIndex: 1
	},

	urlRoot: function() {
		return 'https://gdata.youtube.com/feeds/api/videos?q=' + 
			this.get('query') + '&alt=jsonc&v=2&start-index=' + 
			this.get('startIndex') + 
			'&max-results=' + this.get('maxResults');
	}
});
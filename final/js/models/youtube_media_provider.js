Echoes.Models.YoutubeMediaProvider = Backbone.Model.extend({
	
	defaults: {
		search: '',
		mediaId: '',
		maxResults: 24,

		results: null,
		resultsNav: null,
		nowPlaylist: null
	},

	initialize: function() {
		//- Initiate Models and Collections
		this.set('search', new Echoes.Models.MediaSearch());		
		this.set('results', new Echoes.Collections.YoutubeSearchResults());
		this.set('resultsNav', new Echoes.Models.ResultsNavigation());
		this.set('nowPlaylist', new Echoes.Collections.YoutubePlaylist());

		//- Listen to events
		this.get('resultsNav').on('change:startIndex', this.search, this);
		this.get('search').on('change:query', this.search, this);
		this.get('results').on('change', this.onItemChange, this);
		this.on('change:data', this.publishResponse, this);
		this.search();
	},

	search: function() {
		this.fetch();
	},

	query: function(data) {
		this.get('resultsNav').set({ 'startIndex': 1}, { silent: true });
		this.get('search').set(data);
	},

	urlRoot: function() {
		return 'https://gdata.youtube.com/feeds/api/videos?q=' + 
			this.get('search').get('query') + '&alt=jsonc&v=2&start-index=' + 
			this.get('resultsNav').get('startIndex') + 
			'&max-results=' + this.get('maxResults');
	},

	publishResponse: function(model, data) {
		this.get('results').reset(data.items);
		this.get('resultsNav').set(data);
	},

	play: function(mediaId, options) {
		this.set({ mediaId: mediaId }, options);
	},

	// used to capture add to playlist action
	onItemChange: function(model, changes) {
		this.get('nowPlaylist').push(model);
	}
});
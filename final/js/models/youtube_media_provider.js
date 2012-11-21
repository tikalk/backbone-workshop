Echoes.Models.YoutubeMediaProvider = Backbone.Model.extend({
	
	defaults: {
		search: '',
		playedMedia: '',

		results: null,
		resultsNav: null
	},

	initialize: function() {
		//- Initiate Models and Collections
		this.set('search', new Echoes.Models.MediaSearch());		
		this.set('results', new Echoes.Collections.YoutubeSearchResults());
		this.set('resultsNav', new Echoes.Models.ResultsNavigation());

		//- Listen to events
		this.get('resultsNav').on('change:startIndex', this.search, this);
		this.get('search').on('change:query', this.search, this);
		this.on('change:data', this.publishResponse, this);
	},

	search: function() {
		this.fetch();
	},

	query: function(data) {
		this.get('resultsNav').set({ 'startIndex': 1}, { silent: true });
		if (_.isUndefined(data.query)) {
			this.get('search').triggerChange();
			return;
		}
		this.get('search').set(data);
	},

	urlRoot: function() {
		return 'https://gdata.youtube.com/feeds/api/videos?q=' + 
			this.get('search').get('query') + '&alt=jsonc&v=2&start-index=' + 
			this.get('resultsNav').get('startIndex');
	},

	publishResponse: function(model, data) {
		this.get('results').reset(data.items);
		this.get('resultsNav').set(data);
	}
});
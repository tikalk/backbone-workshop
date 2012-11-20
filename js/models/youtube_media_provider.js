Echoes.Models.YoutubeMediaProvider = Backbone.Model.extend({
	
	defaults: {
		query: '',
		startIndex: 1
	},

	initialize: function() {
		this.on('change:query change:startIndex', this.search, this);
		this.on('change:data', this.publishResponse, this);
	},

	search: function() {
		this.fetch();
	},

	query: function(data) {
		data.startIndex = data.startIndex || 1;
		this.set(data);
	},

	urlRoot: function() {
		return 'https://gdata.youtube.com/feeds/api/videos?q=' + this.get('query') + '&alt=jsonc&v=2&start-index=' + this.get('startIndex');
	},

	publishResponse: function() {
		this.trigger('new-media-response', this.get('data'));
	},

	getResults: function() {
		return this.get('data');
	}
});
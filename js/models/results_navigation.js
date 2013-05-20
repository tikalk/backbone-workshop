Echoes.Models.ResultsNavigation = Backbone.Model.extend({
	defaults: {
		startIndex: 1
	},

	initialize: function() {
		this.on('change:items', this.setDisplayHelpers, this);
	},

	setDisplayHelpers: function() {
		var itemsPerPage = this.get('itemsPerPage'),
			start = this.get('startIndex') - 1,
			end = start + itemsPerPage;
		start = start > 0 ? start : 1;
		this.set({
			totalItems: Echoes.Utils.formatNumberWithComma(this.get('totalItems')),
			start: start,
			end: end
		});
	},

	setNextIndex: function() {
		this.set('startIndex', this.get('startIndex') + this.get('itemsPerPage'));
	},

	setPrevIndex: function() {
		this.set('startIndex', this.get('startIndex') - this.get('itemsPerPage'));
	},

	isAtStart: function() {
		return this.get('startIndex') === 1;
	},

	validate: function(attrs) {
		if (attrs.startIndex < 1) {
			return 'startIndex must be greater than 1';
		}
	}
});

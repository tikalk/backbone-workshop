Echoes.Views.ResultsNavigation = Backbone.View.extend({
	el: '#results-navigator',

	events: {
		'click .next': 'onNextClick',
		'click .prev': 'onPrevClick'
	},

	initialize: function() {
		this.template = _.template($('#results-navigation').html());
		this.listenTo(this.model, 'change', this.render);
	},

	render: function(model) {
		this.$el.toggleClass( 'prev-disabled', model.isAtStart() );
		this.$el.html( this.template(model.toJSON()) );
		return this;
	},

	onNextClick: function(ev) {
		ev.preventDefault();
		this.model.setNextIndex();
	},

	onPrevClick: function(ev) {
		ev.preventDefault();
		this.model.setPrevIndex();
	}
});
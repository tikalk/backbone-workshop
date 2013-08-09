Echoes.Models.YoutubeMedia = Backbone.Model.extend({
	defaults: {
		//- custom properties not related to json response
		likeCountDisplay: 0,
		addToPlaylist: false
	},

	initialize: function() {
		var likeCount = this.get('likeCount') || 0;
		//- format the likeCount with comma each 3 numbers
		this.set("likeCountDisplay", Echoes.Utils.formatNumberWithComma(likeCount));
	}
});
Echoes.Models.YoutubeMedia = Backbone.Model.extend({
	defaults: {
		//- custom properties not related to json response
		likeCountDisplay: 0,
		addToPlaylist: false
	},

	initialize: function () {
		// use Echoes.Utils.formatNumberWithComma 
		// to convert 3456 to 3,456
	}
});
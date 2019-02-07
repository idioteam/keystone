const keystone = require('../../');
const Types = require('../fieldTypes');

module.exports = function seo () {

	const list = this;

	list.add(
		{heading: 'SEO'},
		{seo_page_title: { type: String, label: 'Page title', note: 'lunghezza consigliata: 50/60 caratteri' }},
		{seo_meta_description: { type: Types.Textarea, label: 'Meta description', note: 'lunghezza consigliata: 50/300 caratteri'}},
		{seo_page_thumbnail: { type: Types.CloudinaryImage, label: 'Page thumb', note: 'Utilizzata per social link'}}
	);

}

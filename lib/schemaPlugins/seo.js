const Types = require('../fieldTypes');
/**
 * Aggiunge una sezione per gestire i campi SEO
 * TODO internazionalizzare
 */
module.exports = function seo () {

	const list = this;

	list.add(
		{ heading: 'SEO' },
		{ seo_page_title: { type: String, label: 'Page title', note: 'lunghezza consigliata: 50/60 caratteri', i18n: true } },
		{ seo_meta_description: { type: Types.Textarea, label: 'Meta description', note: 'lunghezza consigliata: 50/300 caratteri', i18n: true } },
		{ seo_page_thumbnail: { type: Types.CloudinaryImage, label: 'Page thumb', note: 'Utilizzata per social link', i18n: true } }
	);

};

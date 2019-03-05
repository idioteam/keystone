/**
 * Analizza i campi e crea campi internazionalizzati
 * inoltre crea un header per i campi raggruppati
 */
let locales;

function parse (args) {
	// 	args rappresenta l'array di argomenti passati a List.add
	//	this è la lista che viene bindata all'esecuzione del metodo.

	//	Ciclo args e cerco all'interno di ciascun oggetto i campi con prop i18n = true
	//	sostituisco args con new_args e lo ritorno
	const new_args = [];
	const list = this;

	locales = list.keystone.get('locales');
	args.forEach((arg) => _parse_arg(arg) )

	/**
	 * Valuta un argomento
	 * @param arg
	 * @private
	 */
	function _parse_arg(arg, heading) {

		if (heading) {
			_add(list.keystone.utils.upcase(heading));
		}

		if (typeof arg === 'string') {
			_add(arg);
		} else {
			Object.keys(arg).forEach(a => _parse_obj(a, arg[a], heading))
		}

	}

	/**
	 * Determina se l'oggetto corrente è un campo o un gruppo di campi
	 * @param chiave
	 * @private
	 */
	function _parse_obj (chiave, obj, heading) {

		if (obj.type) {	//	todo cercare di rafforzare il riconoscimento del campo. type deve avere un costruttore? deve essere una funzione?
			//	l'oggetto è la definizione di un campo

			if (obj.i18n && obj.i18n === true && locales) {
				const generated = crea_campi.call(this, chiave, obj);
				_add(generated, heading);
			} else {
				_add({[chiave]: obj}, heading);
			}

		} else {
			// l'oggetto è un gruppo di campi
			if (obj.heading) {
				_add(obj);
			} else {
				_parse_arg(obj, chiave !== 'heading' ? chiave : null);
			}
		}

	}

	/**
	 * Crea il campo per ogni locale impostato
	 * @param field_key
	 * @param field_obj
	 * @returns {{}}
	 */
	function crea_campi (field_key, field_obj) {

		const new_obj = {};
		list.options.i18n = true;

		//	Assegno etichetta
		field_obj.label = list.keystone.utils.upcase(field_obj.label || field_key);

		locales.forEach(l => {
			new_obj[l.locale] = Object.assign({showOn: {'_ui_lang': l.locale}}, field_obj);
		});


		return {[field_key]: new_obj};
	}

	function _add (arg, heading) {
		if (heading) {
			new_args.push({[heading]: arg});
		} else
		{
			new_args.push(arg);
		}
	}

	//	Aggiungo campo nascosto per gestire cambio lingua sull'interfaccia
	if (list.options.i18n) {
		_add({_ui_lang: {type: String, hidden: true, default: get_default_locale() }})
	}

	function get_default_locale () {
		l = locales.filter(l => l.default);
		if (l) {
			l = locales;
		}
		return l[0].locale;
	}

	return new_args;
}



module.exports = {
	parse
}

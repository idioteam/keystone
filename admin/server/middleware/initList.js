module.exports = function initList (req, res, next) {
	var keystone = req.keystone;
	req.list = keystone.list(req.params.list);
	if (!req.list) {
		if (req.headers.accept === 'application/json') {
			return res.status(404).json({ error: 'invalid list path' });
		}
		req.flash('error', 'List ' + req.params.list + ' could not be found.');
		return res.redirect('/' + keystone.get('admin path'));
	}

	//	Verifico opzioni accesso
	const roles = req.list.options.ui_access;
	if (roles && roles[0] !== '*' && !roles.includes(req.user.role)) {
		return res.status(401).json({ error: 'unauthorized' });
	}

	next();
};

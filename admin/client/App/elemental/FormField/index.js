import { css } from 'glamor';
import React, { Component, PropTypes } from 'react';

import classes from './styles';
import FormLabel from '../FormLabel';

class FormField extends Component {
	constructor () {
		super();
		this.formFieldId = generateId();
	}
	getChildContext () {
		return {
			formFieldId: this.formFieldId,
		};
	}
	render () {
		const { formLayout = 'basic', labelWidth } = this.context;
		const {
			cssStyles,
			children,
			className,
			cropLabel,
			htmlFor,
			label,
			offsetAbsentLabel,
			...props
		} = this.props;

		props.className = css(
			classes.FormField,
			classes['FormField--form-layout-' + formLayout],
			offsetAbsentLabel ? classes['FormField--offset-absent-label'] : null,
			cssStyles
		);
		if (className) {
			props.className += (' ' + className);
		}
		if (offsetAbsentLabel && labelWidth) {
			props.style = {
				paddingLeft: labelWidth,
				...props.style,
			};
		}
		var locale = '';
		if (htmlFor && Keystone.locales) {
			locale = htmlFor.split('.');
			if (locale.length) {
				locale = locale[locale.length - 1]
				locale = Keystone.locales.filter(l => l.locale === locale)
				if (locale.length) {
					locale = <span className={'flag-icon flag-icon-' + (locale[0].locale === 'en' ? 'gb' : locale[0].locale)}></span>;
				}
			}
		}
		// elements
		const componentLabel = label ? (
			<FormLabel htmlFor={htmlFor} cropText={cropLabel}>
				{locale}
				{label}
			</FormLabel>
		) : null;

		return (
			<div {...props} htmlFor={htmlFor}>
				{componentLabel}
				{children}
			</div>
		);
	}
};

const stylesShape = {
	_definition: PropTypes.object,
	_name: PropTypes.string,
};

FormField.contextTypes = {
	formLayout: PropTypes.oneOf(['basic', 'horizontal', 'inline']),
	labelWidth: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
};
FormField.childContextTypes = {
	formFieldId: PropTypes.string,
};
FormField.propTypes = {
	children: PropTypes.node,
	cropLabel: PropTypes.bool,
	cssStyles: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.shape(stylesShape)),
		PropTypes.shape(stylesShape),
	]),
	htmlFor: React.PropTypes.string,
	label: React.PropTypes.string,
	offsetAbsentLabel: React.PropTypes.bool,
};

function generateId () {
	return Math.random().toString(36).substr(2, 9);
};

module.exports = FormField;

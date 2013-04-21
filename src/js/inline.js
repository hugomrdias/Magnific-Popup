
var INLINE_NS = 'inline',
	_hasPlaceholder;

$.magnificPopup.registerModule(INLINE_NS, {
	options: {
		hiddenClass: NS+'-hide',
		markup: ''
	},
	proto: {

		initInline: function() {
			mfp.types.push(INLINE_NS);
			_hasPlaceholder = false;

			_mfpOn(CLOSE_EVENT+'.'+INLINE_NS, function() {
				var item = mfp.currItem;
				if(item.type === INLINE_NS) {
					if(_hasPlaceholder) {
						for(var i = 0; i < mfp.items.length; i++) {
							item = mfp.items[i];
							if(item && item.inlinePlaceholder){
								item.inlinePlaceholder.after( item.inlineElement.addClass(mfp.st.inline.hiddenClass) ).detach();
							}
						}
					}
					item.inlinePlaceholder = item.inlineElement = null;
				}
			});
		},

		getInline: function(item, template) {
			mfp.updateStatus('ready');

			if(item.src) {
				// items.src can be String-CSS-selector or jQuery element
				if(typeof item.src !== 'string') {
					item.isElement = true;
				}

				if(!item.isElement && !item.inlinePlaceholder) {
					_hasPlaceholder = true;
					item.inlinePlaceholder = _getEl(mfp.st.inline.hiddenClass + ' mfp-placeholder-'+mfp.st.key + '-'+ item.index);
				}
				
				if(item.isElement) {
					item.inlineElement = item.src;
				} else {
					if(!item.inlineElement) {
						item.inlineElement = $(item.src);
					}
				}
				
				item.inlineElement.after(item.inlinePlaceholder).detach().removeClass(mfp.st.inline.hiddenClass);
				return item.inlineElement;
			} else {
				mfp._parseMarkup(template, {}, item);
				return template;
			}
		}
	}
});
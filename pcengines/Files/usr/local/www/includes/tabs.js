// ACTIVATE A TAB
function activatetab(index) {
	var container = jQuery('#navt_tabs');
	if(container.length === 0)
	{
		container = jQuery('#page_tabs');
	}
	container.find('div:eq(' + index + ')').mousedown();
}

// JQUERY WRAPPER FOR BACKWARDS COMPATIBILITY
function togglecollapse(cid) {
	jQuery('#' + cid).toggle();
}

jQuery(document).ready(function($) {

	// INIT NAV TABS
	var tabs = $('#navt_tabs, #page_tabs').find('div');
	tabs.mousedown(function(){
		tabs.each(function(){
			$(this).removeClass('active');
			$('#' + $(this).attr('id') + '_c').hide();
		});
		$(this).addClass('active');
		$('#' + $(this).attr('id') + '_c').show();
		return true;
	});
	if(tabs.filter('.active').mousedown().length === 0){
		activatetab(0);
	}

	// Load preference
	if(($.cookie('sidebar-pref') == 'sidebar-off') && ($(window).width() > 768)) {
		objMain.addClass('sidebar-off');
		objMain.removeClass('sidebar-on');
		$('.toggle-button').addClass('open-sidebar');
	}

	// BUTTONS
	$(function() {
		$('body').off('cms_ajax_apply');
		$('input[type="submit"], input[type="button"]').each(function() {
			if($(this).attr('name') == 'apply' || $(this).attr('name') == 'm1_apply') {
				var icon = 'ui-icon-disk';
			} else if($(this).attr('name') == 'cancel' || $(this).attr('name') == 'm1_cancel') {
				var icon = 'ui-icon-circle-close';
			} else if($(this).attr('resettodefault') || $(this).attr('name') == 'm1_resettodefault' || $(this).attr('id') == 'refresh') {
				var icon = 'ui-icon-refresh';
			} else {
				var icon = 'ui-icon-circle-check';
			}
			var btn = $('<button />');
			// ADOPT ALL ATTRIBUTES
			$(this.attributes).each(function(index, attribute){
				btn.attr(attribute.name, attribute.value);
			})
			btn.button({
				icons : {
					primary : icon
				},
				label : $(this).val()
			});
			$(this).replaceWith(btn);
		});
		$('a.pageback').addClass('ui-state-default ui-corner-all')
			.prepend('<span class="ui-icon ui-icon-arrowreturnthick-1-w">')
			.hover(function() {
				$(this).addClass('ui-state-hover');
			}, function() {
				$(this).removeClass('ui-state-hover');
			});
		// Handle ajax apply
		$('body').on('cms_ajax_apply', function(e) {
			// gotta get langified string here.
			$('button[name=cancel], button[name=m1_cancel]').fadeOut();
			$('button[name=cancel], button[name=m1_cancel]').button('option', 'label', e.close);
			$('button[name=cancel], button[name=m1_cancel]').fadeIn();

			var htmlShow = '';
			if(e.response == 'Success') {
				htmlShow = '<aside class="message pagemcontainer" role="status"><span class="close-warning">Close</span><p class="pagemessage">' + e.details + '<\/p><\/aside>';
			} else {
				htmlShow = '<aside class="message pageerrorcontainer" role="alert"><span class="close-warning">Close</span><ul class="pageerror">';
				htmlShow += e.details;
				htmlShow += '<\/ul><\/aside>';
			}

			$('#oe_mainarea').append(htmlShow).slideDown(1000, function() {
				window.setTimeout(function() {
					$('.message').slideUp();
				}, 10000);
			});
			$('.message').click(function() {
				$('.message').slideUp();
			});
		});
	});
});
jQuery(document).ready(function ($) {
    var $chooser = jQuery("#stylechooser");
    var $container = jQuery("#slideContainer");
    var $body = jQuery('body');

    var isLoaded = false;


    if (getCookie('ct_pluto.switcher') == 'hide') {
        hideStyleswitcher();
    }

    /** style chooser show/hide **/
    jQuery("#stylechooser  #styleToggle").click(function () {
        setCookie('ct_pluto.switcher', $chooser.css('left') == '0px' || $chooser.css('left') == '-1px' ? 'hide' : 'show');

        hideStyleswitcher();
        return false;

    });

    jQuery('#demoReset').click(function () {
        setCookie('ct_pluto', false);
        location.reload(true);
        return false;
    });

    jQuery('#stylechooser a[data-value]').click(function (event) {
        var a = jQuery(this);

        if (a.attr('data-dependent')) {
            if (a.attr('data-action')) {
                if (jQuery(a.attr('data-dependent')).length) {
                    jQuery(a.attr('data-action')).click();
                }
            } else {
                jQuery(a.attr('data-dependent')).click();
            }
        }
        var c = a.attr('data-value');
        var off = $body.hasClass(c) && !a.hasClass('btn');

        if (a.attr('data-remove')) {
            $body.removeClass(a.attr('data-remove'));
        }

        jQuery('a[data-value]', a.parents('div.mkSpace')).each(function () {
            var t = jQuery(this).removeClass('demoActive btn-primary');
            $body.removeClass(t.attr('data-value'));
        });

        if (off) {
            $body.removeClass(c);
            a.removeClass('demoActive');
            store();
            return false;
        }

        $body.addClass(c);

        if (a.hasClass('btn')) {
            a.addClass('btn-primary');
        } else {
            a.toggleClass('demoActive');
        }

        store();

        if (isLoaded && a.attr('data-refresh')) {
            location.reload(true);
        }

        return false;
    });

    /**
     * Store data
     */

    function store() {
        var r = '';
        jQuery('a[data-value].btn-primary, a[data-value].demoActive', $chooser).each(function () {
            var a = jQuery(this);
            r = r + a.attr('data-value') + '.';
        });
        setCookie('ct_pluto', r);
    }

    function load() {
        d = getCookie('ct_pluto');
        if (d) {
            var data = jQuery(d.split('.'));
            jQuery.each(data, function (e, val) {
                jQuery('a[data-value="' + val + '"]', $chooser).click();
            });
        }
        isLoaded = true;
    }


    function hideStyleswitcher() {
        var $switcher = jQuery("#stylechooser");

        var left = -243;
        if (parseInt($switcher.css("left")) == left) {
            left = 0;
        }

        if (!isLoaded) {
            $switcher.css('left', left);
        } else {
            $switcher.animate({
                left: left
            });
        }

    }


    load();

});


/**
 * Cookie handler - setter
 */
var setCookie = function (name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
};


/**
 * Cookie handler -getter
 */
var getCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};

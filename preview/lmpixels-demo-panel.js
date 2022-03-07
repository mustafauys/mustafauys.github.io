/*
* LMPixels templates demo panel
* Author: LMPixels (Linar Miftakhov)
* Author URL: http://themeforest.net/user/lmpixels
* Version: 1.0
*/

(function($) {
"use strict";

    $(document).ready(function(){
        var demoPanel = $("#lm_demo_panel"),
            demoPanelSwitcher = $("#lm_demo_panel_switcher");

        $(window).click(function() {
            $("#lm_demo_panel.active").removeClass("active");
        });

        demoPanelSwitcher.on("click", function (event) {
            event.stopPropagation();
            demoPanel.toggleClass("active");
        });

        demoPanel.on("click", function (event) {
            event.stopPropagation();
        });
    });

})(jQuery);

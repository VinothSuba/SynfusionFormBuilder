var isShowMenu = false;

var module = angular.module("FormBuilderApp", ["ejangular"]);

angular.element(document).on("click", "body", function () {
    if (angular.element(".notification-container").hasClass("show") && isShowMenu == false) angular.element(".notification-container").removeClass("show");
    isShowMenu = false;
});

angular.element(document).on("click", ".show-list", function () {
    angular.element(".notification-container").addClass("show");
    isShowMenu = true;
});

angular.element(document).on("click", ".header-menu .header-menu-icon", function () {
    angular.element(".full-page-menu").addClass("show");
});

angular.element(document).on("click", ".full-page-menu-icon .icon-Icon_Close", function () {
    angular.element(".full-page-menu").removeClass("show");
});

var GlobalFunctions = (function () {

    var isNullOrEmpty = function (str) {
        if (str == null || str == "undefined" || str == "" || str == undefined
            || (typeof (str) == "string" && str.trim() == ""))
            return true;
        return false;
    };

    var showTextAlert = function (type, message) {
        toastr.options = {
            closeButton: true,
            newestOnTop: true,
            preventDuplicates: true,
        }

        alertText(type, message);
    };

    var showMobileTextAlert = function (type, message) {
        toastr.options = {
            closeButton: true,
            preventDuplicates: true,
            positionClass: "toast-top-full-width",
        }

        alertText(type, message);
    };

    var toastrAlert = function (type, message) {
        if (/ipad|iphone|ipod|android|blackberry|windows phone/i.test(navigator.userAgent.toLowerCase()))
            showMobileTextAlert(type, message);
        else
            showTextAlert(type, message);
    }

    var alertText = function (type, message) {

        switch (type) {
            case "success":
                toastr.success(message);
                break;
            case "info":
                toastr.info(message);
                break;
            case "warning":
                toastr.warning(message);
                break;
            case "danger":
                toastr.error(message);
                break;
            default:
                toastr.info(message);
                break;
        }
    }

    var showWaitingPopup = function (elmt) {
        angular.element(elmt).prepend('<div class="spinner-popup"><i class="fa fa-refresh fa-spin"></i></div>')
        angular.element(elmt).addClass("spinner-background");
    }

    var hideWaitingPopup = function (elmt) {
        angular.element(elmt + ' .spinner-popup').remove()
        angular.element(elmt).removeClass("spinner-background");
    }

    //var showWaitingPopup = function (elmt) {
    //    var waitingPopup = angular.element(elmt).data("ejWaitingPopup");

    //    if (ej.isNullOrUndefined(waitingPopup) == false) {
    //        waitingPopup.show();
    //    }

    //    else if (elmt == "body") {
    //        $(elmt).ejWaitingPopup({
    //            showOnInit: true,
    //            template: $('<div id="waiting-spinner" class="text-center spinner-fixed">'
    //                         + '<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>'
    //                         + '</div>')
    //        });
    //    }
    //    else {
    //        $(elmt).ejWaitingPopup({
    //            showOnInit: true,
    //            template: $('<div id="waiting-spinner" class="text-center left0">'
    //                         + '<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>'
    //                         + '</div>')
    //        });
    //    }
    //}

    //var hideWaitingPopup = function (args) {
    //    var waitingPopup = angular.element(args).data("ejWaitingPopup");

    //    if (ej.isNullOrUndefined(waitingPopup) == false)
    //        waitingPopup.hide();
    //}

    return {
        IsNullOrEmpty: isNullOrEmpty,
        ToastrAlert: toastrAlert,
        ShowWaitingPopup: showWaitingPopup,
        HideWaitingPopup: hideWaitingPopup
    }
}());

module.controller('LeftMenuCtrl', ["$scope", "$http", "$rootScope", function ($scope, $http, $rootScope) { }]);
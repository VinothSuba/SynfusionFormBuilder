
module.controller('FormCtrl', ["$scope", "$http", "$rootScope", "controlsPropertiesService", "commonService", "$compile", function ($scope, $http, $rootScope, controlsPropertiesService, commonService, $compile) {

    $scope.IsShowLeftSection = false;
    $scope.CurrentBasicObject = "";

    $scope.ListSectionActive = function (args) {

        $('.grid-column').each(function () {
            $(this).removeClass('active');
        });
        if ($(args.currentTarget).hasClass("grid-column")) {
            $(args.currentTarget).addClass("active");
        }
        else {
            $(args.currentTarget).parent().addClass("active");
        }

    }
    $scope.downloadDocument=function(isDownload)
    {
        var dElement = document.createElement("div");
        var headerString = "var module = angular.module('FormBuilderApp', ['ejangular']); module.controller('FormCtrl', ['$scope', function ($scope) {";
        var scopeBuilder = "";
        for (var i = 0; i < $scope.ejControls.length; i++)
        {
            $(dElement).append($scope.ejControls[i].Element);
            scopeBuilder=scopeBuilder+ $scope.ScriptStringBuilder($scope.ejControls[i]);
        }
        headerString = headerString + scopeBuilder + "}]);"
        var Inhtml = $(dElement).html();

        $http({
            url: '/FormBuilder/saveHtml',
            method: 'POST',
            data: { html: Inhtml, script: headerString }
        }).success(function (data, status, headers, config) {
            if ($scope.ejControls.length > 0 && data && isDownload)
                location.href = "/FormBuilder/Download";
            else if(data)
                window.open('/HtmlTemplate/Demo.html', '_blank');

        });

    }


    $scope.ScriptStringBuilder=function(ejControls)
    {
        var propertyBuild = "$scope." + ejControls.key.toString() + "_" + ejControls.id.toString() + "=";
        var keyval = "";
        var keys = Object.keys(ejControls.properties.properties != null ? ejControls.properties.properties : ejControls.properties);
        if (keys.length == 0)
            return "";
            for (var j = 0; j < keys.length; j++)
            {
                if (ejControls.key.toString() == "chart") 
                    $(ejControls.Element).find("#" + ejControls.id + "").attr("e-" + keys[j] == "xTitle" ? "e-primaryxaxis-title-text" : keys[j] == "yTitle" ? "e-primaryyaxis-title-text" : keys[j], ejControls.key.toString() + "_" + ejControls.id.toString() + "." + keys[j]);
                if (keys[j] != "name" && keys[j] != "Element")
                    $(ejControls.Element).find("#" + ejControls.id + "").attr("e-" + keys[j], ejControls.key.toString() + "_" + ejControls.id.toString() + "." + keys[j]);
                if (keys[j] == "label")
                    $(ejControls.Element).find("#" + ejControls.id + "propertlabel" + "").text(ejControls.properties.properties != null ? ejControls.properties.properties["label"] : ejControls.properties["label"])
                
            }
            var keyvalEnd = JSON.stringify(ejControls.properties.properties != null ? ejControls.properties.properties : ejControls.properties);
            propertyBuild = propertyBuild  + keyvalEnd+";";
            return propertyBuild;
    }


    $scope.LeftMenuOpen = function (args) {
        $scope.IsShowLeftSection = true;

        if ($scope.ShowProperty) $scope.ShowProperty = false;
    }

    $scope.LeftMenuClose = function (args) {
        $scope.IsShowLeftSection = false;
    }

    $scope.ElementHeader = "DatePicker";
    $scope.Property = "DatePicker";
    $("#format").ejDropDownList({ width: "200px", change: "onChange", selectedItemIndex: 0, popupWidth: "180px" });
    var ddobject = $("#format").data("ejDropDownList");


    $scope.ejControls = [];
    $scope.dyanamicElement = [];
    $scope.columns = [
        { headerText: "A", field: "A" },
        { headerText: "B", field: "B" },
        { headerText: "C", field: "c" },
        { headerText: "D", field: "d" }];
    $scope.dataSource = [];

    $scope.UpdateComponent = function (action, key) {
        var control = controlsPropertiesService.getComponent(key);
        control.id = commonService.getGUID().replace(/-/g, "");

        return control;
    }
    $scope.UpdateControl = function (control) {
        if (control) {
            $scope.ejControls.push(control);
        }
    }

    $scope.refreshComponents = function (id, panelElementId) {
        var template = document.getElementById(id);
        var el = angular.element(template);
        $scope = el.scope();
        $injector = el.injector();
        $injector.invoke(function ($compile) {
            $compile(el)($scope);
            $scope.$apply();
        });

        var panelElement = document.getElementById(panelElementId);
        var controlPanelElement = angular.element(panelElement);
        $scope = controlPanelElement.scope();
        $injector = controlPanelElement.injector();
        //$injector = controlPanelElement.injector();
        $injector.invoke(function ($compile) {
            $compile(controlPanelElement)($scope);
            $scope.$apply();
        });

    }

    /************************ common property****************/

    $scope.ElementHeader = "Chart";
    $scope.Property = "Chart";

    /************************ Date Picker****************/
    $scope.IsControlActive = true;
    $scope.watermarkText = "Select date";
    $scope.datepickerFormat = [
        { "text": "Default - MM/dd/yyyy", "value": "MM/dd/yyyy" },
        { "text": "Short - d M, y", "value": "d M, y" },
        { "text": "Medium - d MM, y", "value": "d MM, y" },
        { "text": "Full-dddd,d MMMM,yy", "value": "dddd,d MMMM,yy" },
        { "text": "UTC - yyyy-MM-dd", "value": "yyyy-MM-dd" }];
    $scope.datepickerFormatFields = { "value": "value", "text": "text" };
    $scope.updateDatePickerFormate = function (args) {
        var datebject = $("#" + $scope.controlproperties.id).data("ejDatePicker");
        datebject.setModel({ dateFormat: args.value });
        $scope.controlproperties.properties.dateFormat = args.value;
        $scope.updateEjControls();
    }

    $scope.cultureList = [{ text: 'en-US', value: 'en-US' }, { text: 'fr-FR', value: 'fr-FR' }, { text: 'vi-VN', value: 'vi-VN' }];
    $scope.datepickerCultureFields = { "value": "value", "text": "text" };
    $scope.updateDatepickerCulture = function (args) {
        var datebject = $("#" + $scope.controlproperties.id).data("ejDatePicker");
        datebject.setModel({ locale: args.value });
        $scope.controlproperties.properties.locale = args.value;
        $scope.updateEjControls();
    }
    ej.DatePicker.Locale['fr-FR'] = {
        watermarkText: "Sélectionner une date",
        buttonText: "Aujourd'hui"
    };
    ej.DatePicker.Locale['vi-VN'] = {
        watermarkText: "Chọn ngày",
        buttonText: 'Hôm nay'
    };
    $scope.datePickerEnable = function () {
        var datebject = $("#" + $scope.controlproperties.id).data("ejDatePicker");
        datebject.setModel({ enabled: $scope.IsControlActive });
        $scope.controlproperties.properties.enabled = $scope.IsControlActive;
        $scope.updateEjControls();
    }
    $scope.datePickerWatermarkTextChange = function (args) {
        var datebject = $("#" + $scope.controlproperties.id).data("ejDatePicker");
        datebject.setModel({ watermarkText: args });
        $scope.controlproperties.properties.watermarkText = args;
        $scope.updateEjControls();
    }
    $scope.setMaxDate = function (args) {
        var datebject = $("#" + $scope.controlproperties.id).data("ejDatePicker");
        datebject.setModel({ maxDate: new Date(args.value) });
        $scope.controlproperties.properties.maxDate = new Date(args.value);
        $scope.updateEjControls();
    }
    $scope.setMinDate = function (args) {
        var datebject = $("#" + $scope.controlproperties.id).data("ejDatePicker");
        datebject.setModel({ minDate: new Date(args.value) });
        $scope.controlproperties.properties.minDate = new Date(args.value);
        $scope.updateEjControls();
    }

    $scope.updateDatePickerLabel = function () {
        $("#" + $scope.controlproperties.id + "propertlabel").html($scope.controlproperties.title);
        $scope.updateEjControls();
    }

    $scope.updateTextTitleLabel = function (args) {
        $("#" + $scope.controlproperties.id + "propertlabel").html(args);
        $scope.updateEjControls();
    }

    $scope.updateTextPlaceHolderLabel = function (args) {
        $("#" + $scope.controlproperties.id).attr("placeholder", args);
        $scope.updateEjControls();
    }

    $scope.updateNumberTitleLabel = function (args) {
        $("#" + $scope.controlproperties.id + "propertlabel").html(args);
        $scope.updateEjControls();
    }

    $scope.updateNumberPlaceHolderLabel = function (args) {
        $("#" + $scope.controlproperties.id).attr("placeholder", args);
        $scope.updateEjControls();
    }

    $scope.updateEmailTitleLabel = function (args) {
        $("#" + $scope.controlproperties.id + "propertlabel").html(args);
        $scope.updateEjControls();
    }

    $scope.updateEmailPlaceHolderLabel = function (args) {
        $("#" + $scope.controlproperties.id).attr("placeholder", args);
        $scope.updateEjControls();
    }

    $scope.updateTextAreaTitleLabel = function (args) {
        $("#" + $scope.controlproperties.id + "propertlabel").html(args);
        $scope.updateEjControls();
    }

    $scope.updateTextAreaPlaceHolderLabel = function (args) {
        $("#" + $scope.controlproperties.id).attr("placeholder", args);
        $scope.updateEjControls();
    }

    /************************ Grid ****************/

    $("#columnindex").ejDropDownList({ "select": "onValueChange", width: "100%" });
    $("#columnalignment").ejDropDownList({ "select": "onValueChange", width: "100%" });

    $scope.columnList = [];
    $scope.columnFields = [];

    $scope.BindInitialGridProperties = function() {
        $scope.columnList = $scope.controlproperties.properties.columns;
        $scope.columnFields = { "value": "headerText", "text": "headerText" };
    }


    $scope.EditColumnDetail = function () {

        var selectedcolumn = $scope.Editcolumn.selectedIndex();
        var gridobj = $("#" + $scope.controlproperties.id).data("ejGrid");
        gridobj.model.columns[selectedcolumn]['headerText'] = $scope.EditedColumnName;
        gridobj.columns(gridobj.model.columns);
        $scope.columnList = gridobj.model.columns;
        $scope.controlproperties.properties.columns = gridobj.model.columns;
        $scope.updateEjControls();
    
    }

    $scope.Addcolumn = function() {
          var gridobj = $("#" + $scope.controlproperties.id).data("ejGrid");        
          gridobj.columns($scope.AddColumnName, "add");
          gridobj.columns(gridobj.model.columns);
          $scope.columnList = JSON.parse(JSON.stringify(gridobj.model.columns));
          $scope.controlproperties.properties.columns = JSON.parse(JSON.stringify(gridobj.model.columns));
          $scope.updateEjControls();
       
    }

    $scope.DeleteColumn = function () {

        var gridobj = $("#" + $scope.controlproperties.id).data("ejGrid");
        gridobj.columns($scope.DeleteColumnName, "remove");
        gridobj.columns(gridobj.model.columns);
        $scope.columnList = JSON.parse(JSON.stringify(gridobj.model.columns));
        $scope.controlproperties.properties.columns = JSON.parse(JSON.stringify(gridobj.model.columns));
        $scope.updateEjControls();
    }

    $scope.allowPagingChange = function (args) {
        var datebject = $("#" + $scope.controlproperties.id).data("ejGrid");
        datebject.setModel({ allowPaging: args });
        $scope.controlproperties.properties.allowPaging = args;
        $scope.updateEjControls();
    }
    $scope.allowSortingChange = function (args) {
        var datebject = $("#" + $scope.controlproperties.id).data("ejGrid");
        datebject.setModel({ allowSorting: args });
        $scope.controlproperties.properties.allowSorting = args;
        $scope.updateEjControls();
    }

   

    /***********************************************/
    $scope.FloatImageClick = function () {
        $scope.ShowProperty = true;
    }

    $scope.FloatImageCloseClick = function (arg) {
        $scope.ShowProperty = false;
        if (arg == 'grid') {
            $scope.EditedColumnName = "";
            $scope.AddColumnName = "";
            $scope.DeleteColumnName = "";
            $scope.allowPaging = false;
            $scope.allowsorting = false;
        }
    }

    $scope.controlproperties = {};

    $scope.openPropertyPanel = function (args) {
        $scope.IsShowLeftSection = false;

        if (args.target.parentNode) {
            var controlId = args.target.parentNode.id.split("_")[0];
            var control = ej.DataManager($scope.ejControls).executeLocal(ej.Query().where("id", "equal", controlId));
            if (control && control.length > 0) {
                $scope.ShowProperty = true;
                $scope.controlproperties = JSON.parse(JSON.stringify(control[0]));
            }

            if ($scope.controlproperties.name == "Grid") {
               $scope.BindInitialGridProperties();
            }
        }
    }

    $scope.removeElement = function (args) {
        if (args.target.parentNode) {
            var controlId = args.target.parentNode.id.split("_")[0];
            var parentNode = $("#" + controlId + "propertypanel").parent();
            $("#" + controlId + "propertypanel").remove();
            $(parentNode).remove();
            for (var k = 0; k < $scope.ejControls.length; k++) {
                if ($scope.ejControls[k].id == controlId) {
                    $scope.ejControls.splice(k, 1);
                }
            }
            if ($scope.ejControls.length == 0) {
                $(".form-container").removeClass("hide");
            }
        }
    }

    $scope.updateEjControls = function () {
        for (var k = 0; k < $scope.ejControls.length; k++) {
            if ($scope.ejControls[k].id == $scope.controlproperties.id) {
                delete $scope.ejControls[k]['properties'];
                $scope.ejControls[k].properties = JSON.parse(JSON.stringify($scope.controlproperties));
            }
        }
    };

}]).service("controlsPropertiesService", function () {

    var ejComponents = [
        {
            "title": "Title",
            "key": "dropdown",
            "properties": {
                label: ""
            }, "name": "Drop Down",
            "Element": null
        },
        {
            "title": "Title",
            "key": "datepicker",
            "properties": {
                label: "Date",
                value: new Date(),
                dateFormat: "",
                watermarkText: "Select date",
                enabled: true,
                locale: "en-US"
            },
            "name": "Date Picker",
            "Element": null
        },
        {
            "title": "Title",
            "key": "ejcheckbox",
            "properties": {
                label: "CheckBox"
            },
            "name": "CheckBox",
            "Element": null

        },
        {
            "title": "Title",
            "key": "grid", "properties": {
                columns: [
                    { headerText: "A", field: "A" },
                    { headerText: "B", field: "B" },
                    { headerText: "C", field: "c" },
                    { headerText: "D", field: "d" }], dataSource: [],
                allowPaging: false,
                allowSorting: false,
                toolbarSettings: {
                    showToolbar: true,
                    toolbarItems: [ej.Grid.ToolBarItems.Add, ej.Grid.ToolBarItems.Edit, ej.Grid.ToolBarItems.Delete, ej.Grid.ToolBarItems.Update, ej.Grid.ToolBarItems.Cancel]
                }
            },
            "name": "Grid",
            "Element": null

        },
        {
            "title": "Title",
            "key": "chart", "properties": { title: "Chart", xTitle: "X-axis", yTitle: "y-axis" },
            "name": "Chart",
            "Element": null
        },
        {
            "title": "Title",
            "key": "HtmlText", "properties": { title: "Text", label: "Text", placeholder: "Text" },
            "name": "Text",
            "Element": null
        },
        {
            "title": "Title",
            "key": "HtmlNumeric", "properties": { title: "Numeric", label: "Numeric", placeholder: "Numeric" },
            "name": "Numeric",
            "Element": null
        },
        {
            "title": "Title",
            "key": "HtmlEmail", "properties": { title: "Email", label: "Email", placeholder: "Email" },
            "name": "Email",
            "Element": null
        },
        {
            "title": "Title",
            "key": "HtmlAddress", "properties": { title: "Address", label: "Address", placeholder: "Address" },
            "name": "Address",
            "Element": null
        },
        {
            "title": "Title",
            "key": "HtmlPhone", "properties": { title: "Phone", label: "Phone", placeholder: "Phone" },
            "name": "Phone",
            "Element": null
        },
        {
            "title": "Title",
            "key": "HtmlCheckBox", "properties": { title: "Check Box", label: "Check Box", placeholder: "Check Box" },
            "name": "Check Box",
            "Element": null
        },
        {
            "title": "Title",
            "key": "HtmlRadio", "properties": { title: "Radio", label: "Radio", placeholder: "Radio" },
            "name": "Radio",
            "Element": null
        }
    ]

    this.getComponent = function (key) {
        var control = ej.DataManager(ejComponents).executeLocal(ej.Query().where("key", "equal", key));
        if (control && control.length > 0) {
            return JSON.parse(JSON.stringify(control[0]));
        } else {
            return null;
        }
    }

}).service("commonService", function () {

    this.getGUID = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
});


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("element", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("element");
    var newNode = document.getElementById(data);
    var child = newNode.cloneNode(true);

    if (child.className.indexOf("grid-column-pane") != -1) {
        child.id = getGUID();
        if (child.hasChildNodes()) {
            for (var k = 0; k < child.children.length; k++) {
                child.children[k].id = getGUID();
                $(child.children[k]).attr("draggable", true);
                $(child.children[k]).attr("ng-click", "ListSectionActive($event)");
                child.children[k].addEventListener("ondragstart", drag);
                child.children[k].addEventListener("ondrop", drop);
                child.children[k].addEventListener("ondragover", allowDrop);
            }
        }
        $(child).attr("draggable", false);
        $(".form-container").addClass("hide");
        $(".grid-column").removeClass("hide active");
        $("#parent").append(child);
    }
    //else if (child.className.indexOf("basic-field-item") != -1) {
    //    if ($.trim(ev.target.id) != "") {
    //        var type = $(child).attr("datatype");
    //        var name = $(child).attr("dataname");
    //        child.id = getGUID();

    //        var container = "";

    //        if (type == "text") {
    //            container = '<div class="align-left"><label>{{text.Name}}</label></div><input type="text" class="form-control" ng-init="text = CurrentBasicObject" name="{{text.Id}}" placeholder="{{text.Name}}" />';
    //        }
    //        else if (type == "textarea") {
    //            container = '<div class="align-left"><label>{{text.Name}}</label><textarea type="text" class="form-control" ng-init="text = CurrentBasicObject" name="{{text.Id}}" placeholder="{{text.Name}}" rows="4"></textarea>';
    //        }
    //        else if (type == "email") {
    //            container = '<div class="align-left"><label>{{text.Name}}</label><input type="email" class="form-control" ng-init="text = CurrentBasicObject" name="{{text.Id}}" placeholder="{{text.Name}}" />';
    //        }
    //        else if (type == "dropdown") {
    //            container = '';
    //        }
    //        else if (type == "radio") {
    //            container = '<div class="align-left"><label>{{text.Name}}</label><div><label class="radio-inline"><input type="radio" ng-init="text = CurrentBasicObject" name="{{text.Id}}" /><span class="">{{ text.Name }}</span></label></div >';
    //        }
    //        else if (type == "checkbox") {
    //            container = '<div class="align-left"><label>{{text.Name}}</label><div><label class="checkbox-inline"><input type="checkbox" ng-init="text = CurrentBasicObject" name="{{text.Id}}" /><span class="">{{text.Name }}</span></label></div >';
    //        }

    //        $(".grid-column").removeClass("hide active");
    //        $("#" + ev.target.id).html("");
    //        $("#" + ev.target.id).append($(container));

    //        angular.element(document.getElementById('mainconatiner')).scope().UpdateBasicComponents(type, child.id, ev.target.id, name);
    //    }
    //}
    else {
        if ($.trim(ev.target.id) != "") {
            var control = angular.element(document.getElementById('mainconatiner')).scope().UpdateComponent("add", child.id);
            var element = getControlElement(control);

            var container = '<div ' + 'id="' + control.id + "propertypanel" + '"' + '  class="list-section" ng-click=ListSectionActive($event)><div class="row marginZero form-group"><div class="dynamic-property">'
                            + '<label' + ' id="' + control.id + "propertlabel" + '"' + '>' + control.title +'</label>'
                            +'<div id="' + control.id + "_control" + '"' + ' class="control"></div>' +
                            '</div><div class="properties"><button id="' + control.id + '_settings"'+ ' class="list-section-btn btn" ng-click="openPropertyPanel($event)"><i class="fa fa-cog" aria-hidden="true"></i><span>Properties</span>' +
                            '</button><button id="' + control.id + '_remove"' + ' class="list-section-btn btn remove" ng-click="removeElement($event)"><i class="fa fa-trash-o" aria-hidden="true"></i><span>Remove</span></button></div></div></div>';

            $(".grid-column").removeClass("hide active");
            $("#" + ev.target.id).html("");
            var childParenteEL = $("#" + ev.target.id).clone();
            $("#" + ev.target.id).append($(container));
            $("#" + control.id + "_control").append(element);
            $("#" + ev.target.id).addClass("active");
            //Create copy dyanamic generated control
            var parentNodeEl = $(childParenteEL).append($("#" + control.id + "_control").clone());
            parentNodeEl = $("<div />").append(parentNodeEl);
            $(parentNodeEl).find(".grid-column").removeAttr("draggable ng-click");
            if (control) {
                control.Element = parentNodeEl;
            }
            angular.element(document.getElementById('mainconatiner')).scope().UpdateControl(control);
            angular.element(document.getElementById('mainconatiner')).scope().refreshComponents(control.id, control.id + "propertypanel");

        }
    }

}


function getControlElement(control) {
    var element;
    switch (control.key) {
        case "datepicker":
            element = document.createElement("input");
            element.id = control.id;
            $(element).attr('ej-datepicker', '');
            element.setAttribute('e-width', "100%");
            return element;
            break;
        case "dropdown":
            element = document.createElement("input");
            element.id = control.id;
            $(element).attr('ej-dropdownlist', '');
            element.setAttribute('e-width', "100%");
            return element;
            break;
        case "ejcheckbox":
            element = document.createElement("input");
            element.id = control.id;
            $(element).attr('type', 'checkbox');
            $(element).attr('ej-checkbox', '');
            element.setAttribute('e-width', "100%");
            return element;
            break;
        case "grid":
            element = document.createElement("div");
            element.id = control.id.replace(/-/g, "");
            columns = control.properties.columns;
            $(element).attr('ej-grid', '');
            $(element).attr('e-columns', 'columns');
            $(element).attr("e-datasource", "dataSource")
            element.setAttribute('e-width', "100%");
            return element;
            break;
        case "chart":
            element = document.createElement("div");
            element.id = control.id.replace(/-/g, "");
            columns = control.properties.columns;
            $(element).attr('ej-chart', '');
            $(element).attr('e-title-text', control.properties.title);
            $(element).attr('e-primaryxaxis-title-text', control.properties.xTitle);
            $(element).attr('e-primaryyaxis-title-text', control.properties.yTitle);
            element.setAttribute('e-width', "100%");
            return element;
            break;
        case "HtmlText":
            element = document.createElement("input");
            element.id = control.id;
            $(element).attr('type', 'text');
            $(element).attr('placeholder', control.properties.placeholder);
            $(element).css("width", "100%");
            return element;
            break;
        case "HtmlNumeric":
            element = document.createElement("input");
            element.id = control.id;
            $(element).attr('type', 'number');
            $(element).attr('placeholder', control.properties.placeholder);
            element.setAttribute('e-width', "100%");
            $(element).css("width", "100%");
            return element;
            break;
        case "HtmlEmail":
            element = document.createElement("input");
            element.id = control.id;
            $(element).attr('type', 'email');
            $(element).attr('placeholder', control.properties.placeholder);
            $(element).css("width", "100%");
            return element;
            break;
        case "HtmlAddress":
            element = document.createElement("textarea");
            element.id = control.id;
            $(element).attr('type', 'text');
            $(element).attr('placeholder', control.properties.placeholder);
            $(element).css("width", "100%");
            return element;
            break;
        case "HtmlPhone":
            element = document.createElement("input");
            element.id = control.id;
            $(element).attr('type', 'number');
            $(element).attr('placeholder', control.properties.placeholder);
            $(element).css("width", "100%");
            return element;
            break;
        case "HtmlCheckBox":
            element = document.createElement("input");
            element.id = control.id;
            $(element).attr('type', 'checkbox');
            $(element).attr('name', name);
            $(element).attr('value', name);
            $(element).css("width", "100%");
            return element;
            break;
        case "HtmlRadio":
            element = document.createElement("input");
            element.id = control.id;
            $(element).attr('type', 'radio');
            $(element).attr('name', name);
            $(element).attr('value', name);
            $(element).css("width", "100%");
            return element;
            break;

    }
}

function getGUID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '' + s4() + '' + s4() + '' +
        s4() + '' + s4() + s4() + s4();
}
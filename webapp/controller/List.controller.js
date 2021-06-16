sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    function (Controller, Filter, FilterOperator, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("sapui5.controller.List", {
            handleSearch: function (evt) {
                // create model filter
                var filters = [];
                var query = evt.getParameter("query");
                if (query && query.length > 0) {
                    filters.push(new Filter({
                        path: "firstName",
                            operator: FilterOperator.Contains,
                        value1: query
                    }));
                }
    
                // update list binding
                var list = this.getView().byId("list");
                var binding = list.getBinding("items");
                binding.filter(filters);
            },
            handleListItemPress: function (oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var selectedId = oEvent.getSource().getBindingContext().getProperty("ID");
                oRouter.navTo("detail", {
                    Id: selectedId
                });
            },
            onPress: function (evt) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("create");
                MessageToast.show(evt.getSource().getId() + " Pressed");
            },
            formatAddr: function(city, street, building, country) {
                var s = city + " ; " + street + " ; " + building + " ; " + country;
                return s;
            },    
            onReset: function () {
                var that = this;
                MessageBox.confirm("Are you sure to reset changes?", {
                    onClose: function () {
                        var oModel = that.getView().getModel();
                        oModel.resetChanges();
                    }
                });             
            },
            onUpdate: function () {
                //this.byId("list").setBusy(true);
                var oModel = this.getView().getModel();
                oModel.submitChanges({
                    success: function (oRes) {
                        var mm = sap.ui.getCore().getMessageManager();
                        var dd = mm.getMessageModel().getData();
                        if(!oModel.hasPendingChanges()){
                            if(oRes.__batchResponses == undefined) {
                                MessageToast.show("no reqest");
                            } else {
                                var statusCode = oRes.__batchResponses[0].__changeResponses[0].statusCode;
                                var statusText = oRes.__batchResponses[0].__changeResponses[0].statusText;
                                MessageBox.show("statusCode="+statusCode + " statusText="+statusText);
                            }
                        }else{
                            MessageBox.show(oRes.__batchResponses[0].response.body);
                        }
                    },
                    error: function (oErr){ 
                        MessageBox.error(oErr);
                    }
                });
            }
        });
    });

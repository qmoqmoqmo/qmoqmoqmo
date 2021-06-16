sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
    ],
    function (Controller, MessageBox, MessageToast) {
        "use strict";
  
        return Controller.extend("sapui5.controller.Create", {
            onInit: function () {
                //MessageBox.information("aaa");
                //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                //oRouter.getRoute("create").attachMatched(this._onRouteMatched, this);
            },
            onSet: function () {
                var oModel = this.getView().getModel();
                this.byId("input-ID").setValue("7000000001");
                this.byId("input-firstName").setValue("Name Name");
                this.byId("input-city").setValue("TestName001");
                this.byId("input-postalCode").setValue("123456");
                this.byId("input-street").setValue("aaa street");
                this.byId("input-building").setValue("6402-6403a");
                this.byId("input-country").setValue("DE");
                this.byId("input-addressType").setValue("01");
                this.byId("input-currency").setValue("USD");
                this.byId("input-businessPartnerRole").setValue("01");
                this.byId("input-eMailAddress").setValue("TestName701@test.com");
                this.byId("input-webAddress").setValue("http://www.test.com");
                this.byId("input-phoneNumber").setValue("+81 1234 5678");
                this.byId("input-faxNumber").setValue("+81 1234 5679");
                this.byId("input-legalForm").setValue("WFOE");
            },
            onPress: function (oEvent) {
                //MessageBox.information("bbb");
                var oModel = this.getView().getModel();
                var oContext = oModel.createEntry("/CapBusinessPartner", {
                    properties: {
                        ID: this.byId("input-ID").getValue(),
                        firstName: this.byId("input-firstName").getValue(),
                        city: this.byId("input-city").getValue(),
                        postalCode: this.byId("input-postalCode").getValue(),
                        street: this.byId("input-street").getValue(),
                        building: this.byId("input-building").getValue(),
                        country: this.byId("input-country").getValue(),
                        addressType: this.byId("input-addressType").getValue(),
                        currency: this.byId("input-currency").getValue(),
                        businessPartnerRole: this.byId("input-businessPartnerRole").getValue(),
                        eMailAddress: this.byId("input-eMailAddress").getValue(),
                        phoneNumber: this.byId("input-phoneNumber").getValue(),
                        faxNumber: this.byId("input-faxNumber").getValue(),
                        legalForm: this.byId("input-legalForm").getValue(),
                        SourceDestination: "MyErpSystem"
                    }
                });
                
                oModel.submitChanges({
                    success: function(oRes) {
                        var mm = sap.ui.getCore().getMessageManager();
                        var dd = mm.getMessageModel().getData();
                        if(!oModel.hasPendingChanges()){
                            MessageBox.show(oRes.__batchResponses[0].response.body);
                        }else{
                            MessageBox.show(oRes.__batchResponses[0].response.body);
                        }
                    },
                    error: function(oErr) {
                        MessageBox.error(oErr);
                    }
                });
                oModel.deleteCreatedEntry(oContext);
            },
            onGetName: function () {
                MessageBox.information("ccc");
                //パスを取得
                var sPath = this.getView().byId("ID").getBindingContext().getPath();
                //パスを指定してプロパティを取得
                var sProduct = this.getView().getModel().getProperty(sPath + "/ID");
    
                MessageBox.information("Product ID: " + sProduct);
            },
            handleNavButtonPress: function (evt) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("home");
            }
        });
    });
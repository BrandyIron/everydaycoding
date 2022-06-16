sap.ui.define([
    "sap/ui/core/util/MockServer"
], function (MockServer) {
    "use strict";
    var oMockServer,
    _sAppModulePath = "SAPGatewayES5FioriListReportAppSupplierData/",
    _sJsonFilesModulePath = _sAppModulePath + "LocalService/mockdata";
    return {
        /**
         * Initializes the mock server.
         * You can configure the delay with the URL parameter "serverDelay".
         * The local mock data in this folder is returned instead of the real data for testing.
         * @public
         */

        init: function () {
            var oUriParameters = jQuery.sap.getUriParameters(),
            sJsonFilesUrl = jQuery.sap.getModulePath(_sJsonFilesModulePath),
            sManifestUrl = jQuery.sap.getModulePath(_sAppModulePath + "manifest", ".json"),
            sEntity = "Suppliers",
            sErrorParam = oUriParameters.get("errorType"),
            iErrorCode = sErrorParam === "badRequest" ? 400 : 500,
            oManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,
            oDataSource = oManifest["sap.app"].dataSources,
            oMainDataSource = oDataSource.mainService,
            sMetadataUrl = jQuery.sap.getModulePath(_sAppModulePath + oMainDataSource.settings.localUrl.replace(".xml", ""), ".xml"),
            // ensure there is a training slash
            sMockServerUrl = /.*\/$/.test(oMainDataSource.uri) ? oMainDataSource.uri : oMainDataSource.uri + "/",
            aAnnotations = oMainDataSource.settings.annotations;
        }
    }
}
])
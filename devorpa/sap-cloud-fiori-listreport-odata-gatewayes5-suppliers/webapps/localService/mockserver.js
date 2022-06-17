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

            oMockServer = new MockServer({
                rootUri: sMockServerUrl 
            });

            // configure mock server with a delay of 1s
            MockServer.config({
                autoRespond: true,
                autoRespondAfter: (oUriParameters.get("serverDelay") || 1000)
            });

            // load local mock data
            oMockServer.simulate(sMetadataUrl, {
                sMockdataBaseUrl: sJsonFilesUrl,
                bGenerateMissingMockData: true
            });

            var aRequests = oMockServer.getRequests(),
            fnResponse = function(iErrCode, sMessage, aRequest) {
                aRequest.response = function(oXhr) {
                    oXhr.respond(iErrCode, {
                        "Content-Type": "text/plain;charset=utf-8"
                    }, sMessage);
                };
            };

            // handling the metadata error test
            if (oUriParameters.get("metadataError")) {
                aRequests.forEach(function(aEntry) {
                    if (aEntry.path.toString().indexOf("$metadata") > -1) {
                        fnResponse(500, "metadata Error", aEntry);
                    }
                });
            }

            // handling request errors
            if (sErrorParam) {
                aRequests.forEach(function(aEntry) {
                    if (aEntry.path.toString().indexOf(sEntry) > -1) {
                        fnResponse(iErrorCode, sErrorParam, aEntry);
                    }
                });
            }
            oMockServer.start();

            jQuery.sap.log.info("Running the app with mock data");
        }
    }
}
])
$(document).ready(function () {
    $(window).load(function () {

        $("#txtRazonSocial").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            change: function () {
                var cmb = this;
                // selectedIndex of -1 indicates custom value
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
            },
        });
        /*
        $("#txtRazonSocial").kendoDropDownList({
            //placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            optionLabel: {
                text: "[SELECCIONE]",
                value: ""
            },
            change: function () {
                var cmb = this;
                // selectedIndex of -1 indicates custom value
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
            },
        });
        $("#txtRazonSocial").data("kendoDropDownList").value("");
        */
        cargarGridConsultaCambioAeronave();


        
        
        $("#btnBuscarCambiosAeronave").click(function () {
            cargarGridConsultaCambioAeronave();
            
        });
        
        $("#btnLimpiarConsulCambioAero").click(function () {

            $("#txtRazonSocial").data("kendoComboBox").value('');
            $("#txtMatricula").val('');

            cargarGridConsultaCambioAeronave();

        });
       
        $("#addListaCambioPropietario").click(function () {
            
                
                var dataDetalle = $("#gridConsultaCambioAeronave").data("kendoGrid");
                var itemData = dataDetalle.dataItem(dataDetalle.select());
                if (itemData != undefined) {
                    window.location = $(this).attr("data-url") + "?Index=" + itemData.XAERONAVE_PA;
                }
                else {
                    bootbox.alert("Seleccione un registro de la tabla");
                }
                
            
        });

        $("#addListaCambioHelice").click(function () {


            var dataDetalle = $("#gridConsultaCambioAeronave").data("kendoGrid");
            var itemData = dataDetalle.dataItem(dataDetalle.select());
            if (itemData != undefined) {
                window.location = $(this).attr("data-url") + "?Index=" + itemData.XAERONAVE_PA;
            }
            else {
                bootbox.alert("Seleccione un registro de la tabla");
            }


        });

        $("#addListaCambioMatricula").click(function () {
            var dataDetalle = $("#gridConsultaCambioAeronave").data("kendoGrid");
            var itemData = dataDetalle.dataItem(dataDetalle.select());
            if (itemData) {
                var url = $(this).attr("data-url") + "?Index=" + itemData.XAERONAVE_PA;
                $(location).attr("href", url);
            } else {
                bootbox.alert("Seleccione un registro de la tabla");
            }
        });

        $("#addListaCambioMotor").click(function () {
            var dataDetalle = $("#gridConsultaCambioAeronave").data("kendoGrid");
            var itemData = dataDetalle.dataItem(dataDetalle.select());

            if (itemData) {
                window.location = $(this).attr("data-url") + "?Index=" + itemData.XAERONAVE_PA;
            } else {
                bootbox.alert("Seleccione un registro de la tabla");
            }
            
        });

    });
});





function cargarGridConsultaCambioAeronave() {

    $("#gridConsultaCambioAeronave").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/ConsultaCambioAeronavePA/ListarConsultaCambioAeronavePA",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                //string txtMatricula, string txtSerie, string XESTADO, int page = 0, int pageSize = 10
                return JSON.stringify({ objMatricula: $('#txtMatricula').val(), objRazonSocial: $('#txtRazonSocial').val(), page: options.page, pageSize: options.pageSize });
                
            }
        },
        schema: {
            data: "l_GENM_CAMBIO_AERONAVE",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XAERONAVE_PA: { type: "string" },
                    XCONTREGISTRO: { type: "string" },
                    MATRICULA: { type: "string" },
                    XRAZONSOCIAL: { type: "string" },
                    NUMERO_SERIE: { type: "string" },
                    XDESMODELO: { type: "string" },
                    XFECHAFABRICACION: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridConsultaCambioAeronave").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        //height: 400,
        columns: [
            {
                field: "XAERONAVE_PA",
                title: "ID_AERONAVE_PA",
                hidden: true
            }, {
                field: "XCONTREGISTRO",
                title: "ID_CONTREGISTRO",
                hidden: true
            }, {
                field: "MATRICULA",
                width: 150,
                title: "MATRÍCULA"
            }, {
                field: "XRAZONSOCIAL",
                title: "RAZÓN SOCIAL",
                flex: 1
            }, {
                field: "NUMERO_SERIE",
                title: "SERIE",
                width: 150
            }, {
                field: "XDESMODELO",
                title: "MODELO",
                width: 150
            }, {
                field: "XFECHAFABRICACION",
                title: "FECHA FABRICACIÓN",
                width: 200
        }]
    }).data("kendoGrid");

}

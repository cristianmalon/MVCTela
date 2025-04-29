$(document).ready(function () {
 
    $("#filtro_Tipo_Aeronave").kendoComboBox({
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

    $("#filtro_Tipo_Servicio").kendoComboBox({
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

    $("#filtro_Estado_Aeronave").kendoComboBox({
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
    $("#filtro_Tipo_Servicio").kendoDropDownList({
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
    
    $("#filtro_Tipo_Servicio").data("kendoDropDownList").value("");
    */
    cargarGridConsultaBandejaEmpresa();
    

    $("#btnBuscarBandejaEmpresa").click(function () {
        cargarGridConsultaBandejaEmpresa();
    });

    $("#btnLimpiarConsulEmpresa").click(function () {        
        $("#txtMatricula").val('');
        $("#txtSerie").val('');
        $("#filtro_Tipo_Aeronave").data("kendoComboBox").value('');
        $("#filtro_Estado_Aeronave").data("kendoComboBox").value('');
        $("#filtro_Tipo_Servicio").data("kendoComboBox").value('');
        
        cargarGridConsultaBandejaEmpresa();
    });

    $("#addEditarAeronave").click(function () {
        var grid = $("#gridConsultaBandejaEmpresa").data("kendoGrid");

        var itemData = grid.dataItem(grid.select());
        if (itemData != null) {
            var urlRegistrar = "/Aeronave/RegistroAeronave";
            var urlVer = "/Aeronave/VerRegistroAeronave";

            if (itemData.XESTADO_AERONAVE == '3') {
                var url = urlVer + '?Index=' + itemData.XAERONAVE_PA;
            } else {
                var url = urlRegistrar + '?Index=' + itemData.XAERONAVE_PA;
            }
            //var url = $(this).attr('data-url') + '?Index=' + itemData.XAERONAVE_PA;
            window.location = url;
        }
        else {
            bootbox.alert("Seleccione un registro de la tabla");
        }
    });

    

});



function cargarGridConsultaBandejaEmpresa() {

    $("#gridConsultaBandejaEmpresa").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/ConsultaBandejaEmpresaPA/ListarConsultaBandejaEmpresa",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                //string txtMatricula, string txtSerie, string XESTADO, int page = 0, int pageSize = 10
                return JSON.stringify({ objtxtMatricula: $('#txtMatricula').val(), objtxtSerie: $('#txtSerie').val(), objfiltro_Tipo_Aeronave: $('#filtro_Tipo_Aeronave').val(), objfiltro_Tipo_Servicio: $('#filtro_Tipo_Servicio').val(), objfiltro_Estado_Aeronave: $('#filtro_Estado_Aeronave').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_GENM_CONSULBANDEJAEMPRESA",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XBANDEJA: { type: "string" },
                    XAERONAVE_PA: { type: "string" },
                    XRAZONSOCIAL: { type: "string" },
                    MATRICULA: { type: "string" },
                    NUMERO_SERIE: { type: "string" },
                    XCATEGORIAAERONAVE: { type: "string" },
                    XDESRAP: { type: "string" },
                    XESTADO_AERONAVE: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true

    });

    var grid = $("#gridConsultaBandejaEmpresa").kendoGrid({
                
        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        columns: [
            {
                field: "XBANDEJA",
                width: 90,
                title: "ID_BANDEJA",
                hidden: true
            }, {
                field: "XAERONAVE_PA",
                width: 90,
                title: "ID_AERONAVE_PA",
                hidden: true
            }, {
                field: "XRAZONSOCIAL",
                title: "RAZON SOCIAL",
                flex: 1,
                hidden: true
            }, {
                field: "",
                width: 150,
                title: "ESTADO",
                template: "# if (XESTADO_AERONAVE == 1) {# <div style='background-color:dodgerblue'>&nbsp;</div> # } else if (XESTADO_AERONAVE == 2) {# <div style='background-color:lime'>&nbsp;</div> # } else if (XESTADO_AERONAVE == 3) {# <div style='background-color:lightseagreen'>&nbsp;</div> # } else {# <div style='background-color:crimson'>&nbsp;</div> #} #"
            }, {
                field: "MATRICULA",
                title: "MATRÍCULA",
                flex: 1
            }, {
                field: "NUMERO_SERIE",
                title: "SERIE",
                flex: 1
            }, {
                field: "XCATEGORIAAERONAVE",
                title: "CATEGORÍA AERONAVE",
                flex: 1
            }, {
                field: "XDESRAP",
                flex: 1,
                title: "RAP"
            }, {
                field: "XESTADO_AERONAVE",
                flex: 1,
                title: "ESTADOAERONAVE",
                hidden: true
            }]
    }).data("kendoGrid");

}
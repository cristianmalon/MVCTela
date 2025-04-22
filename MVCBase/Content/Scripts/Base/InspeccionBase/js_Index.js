$(document).ready(function () {

    $("#XMES").css("width", "100%").kendoComboBox({
        dataTextField: "DESCRIPCION",
        dataValueField: "ID_MES"
    });

    $("#XANO").css("width", "100%").kendoComboBox({
        dataTextField: "DESCRIPCION",
        dataValueField: "XANO"
    });

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
            } else {

            }
        },
    });

    $("#btnBuscarInspeccionBase").click(function () {

        //$('#GridInspeccionBase').data('kendoGrid').dataSource._destroyed = [];
        $('#GridInspeccionBase').data('kendoGrid').dataSource.read();
        $('#GridInspeccionBase').data('kendoGrid').refresh();

    });

    $("#btnLimpiarInspeccionBase").click(function () {
        $("#XMES").data("kendoComboBox").value('');
        $("#XANO").data("kendoComboBox").value('');
        $("#txtRazonSocial").data("kendoComboBox").value('');

        $('#GridInspeccionBase').data('kendoGrid').dataSource.read();
        $('#GridInspeccionBase').data('kendoGrid').refresh();

    });

    cargarGridInspeccionBase();

    $("#GridInspeccionBase").on("click", ".k-grid-GenerarOficio", function (e) {
        e.preventDefault();
        var grid = $("#GridInspeccionBase").data("kendoGrid");
        var dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
        console.log(dataItem);
        //alert(dataItem.XID_INSPECCION_BASE);


        var url = '/OficioInspeccion/OficioInspeccionBase?InspeccionBase=' + dataItem.XID_INSPECCION_BASE;
        var divModal = $(this).attr('data-div');
        var divContenedor = $(this).attr('data-contenedor');

        var seccionModal = ".seccionModal";
        var seccionContenedor = ".contenedor";

        if (divModal) {
            seccionModal = "#" + divModal;
        }

        if (divContenedor) {
            seccionContenedor = "#" + divContenedor;
        }

        $.ajax({
            url: url,
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                if (data.rpta == "1") {
                    bootbox.alert("No se han registrado todos los datos");
                    desbloqObject();
                } else {
                    desbloqObject();
                    $(seccionModal).html(data);
                    $(seccionContenedor).modal('show');
                }
            }
        });
    });

    $("#GridInspeccionBase").on("click", ".k-grid-GenerarReiterativo", function (e) {
        e.preventDefault();
        var grid = $("#GridInspeccionBase").data("kendoGrid");
        var dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
        console.log(dataItem);
        //alert(dataItem.XID_INSPECCION_BASE);


        var url = '/Reiterativo/ReiterativoInspeccionBase?InspeccionBase=' + dataItem.XID_INSPECCION_BASE;
        var divModal = $(this).attr('data-div');
        var divContenedor = $(this).attr('data-contenedor');

        var seccionModal = ".seccionModal";
        var seccionContenedor = ".contenedor";

        if (divModal) {
            seccionModal = "#" + divModal;
        }

        if (divContenedor) {
            seccionContenedor = "#" + divContenedor;
        }

        $.ajax({
            url: url,
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                if (data.rpta == "1") {
                    bootbox.alert("No se han registrado todos los datos");
                    desbloqObject();
                } else {
                    desbloqObject();
                    $(seccionModal).html(data);
                    $(seccionContenedor).modal('show');
                }
            }
        });
    });

    $("#GridInspeccionBase").on("click", ".k-grid-VerOficio", function (e) {
        e.preventDefault();
        var grid = $("#GridInspeccionBase").data("kendoGrid");
        var dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
        console.log(dataItem);
        //alert(dataItem.XID_INSPECCION_BASE);


        var url = '/OficioInspeccion/VerOficiosInspeccionBase?InspeccionBase=' + dataItem.XID_INSPECCION_BASE;
        var divModal = $(this).attr('data-div');
        var divContenedor = $(this).attr('data-contenedor');

        var seccionModal = ".seccionModal";
        var seccionContenedor = ".contenedor";

        if (divModal) {
            seccionModal = "#" + divModal;
        }

        if (divContenedor) {
            seccionContenedor = "#" + divContenedor;
        }

        $.ajax({
            url: url,
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                if (data.rpta == "1") {
                    bootbox.alert("No se han registrado todos los datos");
                    desbloqObject();
                } else {
                    desbloqObject();
                    $(seccionModal).html(data);
                    $(seccionContenedor).modal('show');
                }
            }
        });
    });


});





function cargarGridInspeccionBase() {
    $("#GridInspeccionBase").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/InspeccionBase/ListarInspeccionBase",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objMes: $("#XMES").val(), objAno: $("#XANO").val(), objPersonaJuridica: $("#txtRazonSocial").val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_GENM_INSPECCION_BASE",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_INSPECCION_BASE: { type: "string" },
                    TIPO_INSPECCION: { type: "string" },
                    MES: { type: "string" },
                    TIPO_ACTIVIDAD: { type: "string" },
                    XID_MES: { type: "string" },
                    XID_ANO: { type: "string" },
                    RAZON_SOCIAL: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#GridInspeccionBase").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        detailTemplate: kendo.template($("#template").html()),
        height: 550,
        detailInit: detailInit,
        dataBound: function () {
            this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        //height: 400,
        columns: [
            {
                field: "XID_INSPECCION_BASE",
                title: "XID_INSPECCION_BASE",
                hidden: true
            }, {
                field: "RAZON_SOCIAL",
                title: "RAZON SOCIAL",
                width: 180
            },{
                field: "TIPO_INSPECCION",
                title: "TIPO INSPECCION",
                width: 60
            }, {
                field: "MES",
                title: "MES",
                width: 80
            }, {
                field: "TIPO_ACTIVIDAD",
                title: "TIPO_ACTIVIDAD",
                width: 120
            }, {
                field: "XID_MES",
                title: "XID_MES",
                hidden: true
            }, {
                field: "XID_MES",
                title: "XID_MES",
                hidden: true
            }, {
                field: "XID_OFICIO_INSPECCION",
                title: "XID_OFICIO_INSPECCION",
                hidden: true
            }, {
                field: "XLEVANTADO",
                title: "XLEVANTADO",
                hidden: true,
                width: 120
            }, {
                template: "# if( XLEVANTADO == 1 && XFLG_VALIDAR != 0){# <a class='k-button k-button-icontext k-grid-GenerarOficio' style='display:none; padding: 2px 30px' >Generar Oficio</a>  <a class='k-button k-button-icontext k-grid-GenerarReiterativo' style='display:none; padding: 2px 16px' >Generar Reiterativo</a> #} else {# #if( XID_OFICIO_INSPECCION == 0){# #if( XFLG_VALIDAR == 0){# <a class='k-button k-button-icontext k-grid-GenerarOficio' style='padding: 2px 30px' >Generar Oficio</a>  #}# #} else {# #if( XFLG_VALIDAR == 0 ){# <a class='k-button k-button-icontext k-grid-GenerarOficio' style='padding: 2px 30px' >Generar Oficio</a>  #}else{# <a class='k-button k-button-icontext k-grid-GenerarReiterativo' style='padding: 2px 16px' >Generar Reiterativo</a> #}# #} # #} #",
                width: 70
            }/*, {
                template: "#if (XID_OFICIO_INSPECCION == 0)" +
                          "{# #if (XFLG_VALIDAR == 0) {# <a class='k-button k-button-icontext k-grid-GenerarOficio' style='padding: 2px 30px' >Generar Oficio</a> #} # #}" +
                     "else {# #if (XFLG_VALIDAR == 0) {# <a class='k-button k-button-icontext k-grid-GenerarOficio' style='padding: 2px 30px' >Generar Oficio</a> #} else {# <a class='k-button k-button-icontext k-grid-GenerarReiterativo' style='padding: 2px 16px' >Generar Reiterativo</a> #} #  #} #",
                width: 70
            }*/,{                
                template: "#if (XID_OFICIO_INSPECCION != 0)  {# <a class='k-button k-button-icontext k-grid-VerOficio' style='padding: 2px 20px'>Ver Oficio</a> #} #",
                width: 60
            }
             //, { command: { text: "Generar Oficio", click: GenerarOficio }, title: " Accion ", width: 90 }

        ]
    }).data("kendoGrid");
}



function detailInit(e) {
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/InspeccionBase/ListarInspeccionBaseDetalle",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ txtinspeccionBase: e.data.XID_INSPECCION_BASE, page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_GEND_INSPECCION_BASE_DETALLE",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_INSPECCION_BASE_DETALLE: { type: "string" },
                    XID_COORDINACION_TECNICA: { type: "string" },
                    CORDINACION_TECNICA: { type: "string" },
                    PLAN_ANUAL: { type: "string" },
                    PLAN_MENSUAL: { type: "string" },
                    INSPECCION: { type: "string" },
                    XID_PLAN_VIGI_ANUAL_DS: { type: "string" },
                    XID_ACTIVIDAD: { type: "string" },
                    XID_INSPECCION: { type: "string" },
                    XID_INSPECCION_BASE: { type: "string" }
                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var detailRow = e.detailRow;
    detailRow.find(".tabstrip").kendoTabStrip({
        animation: {
            open: { effects: "fadeIn" }
        }
    });

    detailRow.find(".orders").kendoGrid({
     
        dataSource: dataSource,
        scrollable: false,
        sortable: true,
        pageable: true,
        columns: [
            {
                field: "XID_INSPECCION_BASE_DETALLE",
                title: "XID_INSPECCION_BASE_DETALLE",
                width: "70px",
                hidden: true
            }, {
                field: "XID_COORDINACION_TECNICA",
                title: "XID_COORDINACION_TECNICA",
                hidden: true
            }, {
                field: "CORDINACION_TECNICA",
                title: "CORDINACION TECNICA",
                width: 180
            }, {
                field: "PLAN_ANUAL",
                title: "PLAN ANUAL",
                width: 90
            }, {
                field: "PLAN_MENSUAL",
                title: "PLAN MENSUAL",
                width: 90
            }, {
                field: "INSPECCION",
                title: "INSPECCION",
                width: 90
            }, {
                field: "XID_PLAN_VIGI_ANUAL_DS",
                title: "CORDINACION XID_PLAN_VIGI_ANUAL_DS",
                hidden: true
            },{
                field: "XID_ACTIVIDAD",
                title: "XID_ACTIVIDAD",
                hidden: true
            }, {
                field: "XID_INSPECCION",
                title: "XID_INSPECCION",
                hidden: true
            }, {
                field: "XID_INSPECCION_BASE",
                title: "XID_INSPECCION_BASE",
                hidden: true
            }, { command: { text: "Ver Inspección", click: showInspeccion }, title: " Accion ", width: 90 }]
    });
}



function showInspeccion(e) {
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    console.log(dataItem);
    //alert(dataItem.XID_INSPECCION_BASE);

    if (dataItem.INSPECCION == "SI"){

    var url = '/Inspeccion/InspeccionBase?IDINSPECCION=' + dataItem.XID_INSPECCION + '&ID_ACTIVIDAD=' + dataItem.XID_ACTIVIDAD + '&ID_INSPECCION_BASE=' + dataItem.XID_INSPECCION_BASE;
    console.log(url);
    var divModal = $(this).attr('data-div');
    var divContenedor = $(this).attr('data-contenedor');

    var seccionModal = ".seccionModal";
    var seccionContenedor = ".contenedor";

    if (divModal) {
        seccionModal = "#" + divModal;
    }

    if (divContenedor) {
        seccionContenedor = "#" + divContenedor;
    }

    $.ajax({
        url: url,
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {

            if (data.rpta == "1") {
                bootbox.alert("No se han registrado todos los datos");
                desbloqObject();
            } else {
                desbloqObject();
                $(seccionModal).html(data);
                $(seccionContenedor).modal('show');
            }
        }
    });
    } else {
        bootbox.alert("No se ha registrado una Inspección");
    }
}
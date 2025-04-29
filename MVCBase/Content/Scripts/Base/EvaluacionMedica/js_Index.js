$(document).ready(function () {

    cargarGridEvaluacionMedica();
    
    if ($("#NUMERODOCUMENTO").val() == '0')
    {
        bootbox.alert("No hay coincidencias entre los números documentos!!!");
    }
    
    $("#btnRechazarEvaluacion").click(function () {


        var dataDetalleEvalMedSinAsociar = $("#gridEvalMedSinAsociar").data("kendoGrid");
        var itemDataEvalMedSinAsociar = dataDetalleEvalMedSinAsociar.dataItem(dataDetalleEvalMedSinAsociar.select());
        if (itemDataEvalMedSinAsociar != undefined) {

            var url = $(this).attr('data-url') + '?Index=' + itemDataEvalMedSinAsociar.XID_RES_EVAL_EXAMEN;
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
                    desbloqObject();
                    $(seccionModal).html(data);
                    $(seccionContenedor).modal('show');
                }
            });

        }
        else {
            bootbox.alert("Seleccione un registro de la tabla");
        }


    });

});

function cargarGridEvaluacionMedica() {
    /*EVAL MED SIN ASOCIAR*/
    $("#gridEvalMedSinAsociar").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                async: true,
                type: "POST",
                url: "/EvaluacionMedica/ListarEvalMedSinAsociar",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objNumeroDocumento: $('#NUMERODOCUMENTO').val() });
            }
        },
        schema: {
            data: "l_GENM_RES_EVAL_EXAMEN",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_RES_EVAL_EXAMEN: { type: "string" },
                    XID_NRO_EVAL_FICHA: { type: "string" },
                    XDES_TIP_LICENCIA: { type: "string" },
                    XDES_TIP_MOT_EVA_LIC: { type: "string" },
                    XDES_TIP_CLASE: { type: "string" },
                    XDES_RESUL_EVAL: { type: "string" },
                    XFECHA_CARGA: { type: "string" }
                }
            }
        },      
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridEvalMedSinAsociar").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        selectable: true,        
        //change: onChange,
        change: onChangeSinAsociar,
        columns: [
            {
                field: "XID_RES_EVAL_EXAMEN",
                title: "ID_RES_EVAL_EXAMEN",
                hidden: true
            },{
                field: "XID_NRO_EVAL_FICHA",
                title: "ID_NRO_EVAL_FICHA",
                hidden: true
            }, {
                field: "XDES_TIP_LICENCIA",
                title: "TIPO LICENCIA",
                flex: 1
            }, {
                field: "XDES_TIP_MOT_EVA_LIC",
                title: "TIPO EVALUACIÓN",
                flex: 1
            }, {
                field: "XDES_TIP_CLASE",
                title: "CLASE",
                flex: 1
            }, {
                field: "XDES_RESUL_EVAL",
                title: "RESULTADO",
                flex: 1
            }, {
                field: "XFECHA_CARGA",
                title: "FECHA CARGA",
                flex: 1
            }]
    }).data("kendoGrid");


    /*EVAL MED ASOCIADAS*/
    $("#gridAsociadas").html('');
    var dataSourceAsociadas = new kendo.data.DataSource({
        transport: {
            read: {
                async: true,
                type: "POST",
                url: "/EvaluacionMedica/ListarAsociadas",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objNumeroDocumento: $('#NUMERODOCUMENTO').val() });
            }
        },
        schema: {
            data: "l_GENM_RES_EVAL_EXAMEN_ASOCIADAS",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_LICENCIA: { type: "string" },
                    XNRO_LICENCIA: { type: "string" },
                    XDES_TIP_LICENCIA: { type: "string" },
                    XNRO_LEGAJO: { type: "string" }
                }
            }
        },
        serverFiltering: true,
        serverSorting: true
    });
    
    var grid = $("#gridAsociadas").kendoGrid({

        dataSource: dataSourceAsociadas,
        scrollable: true,      
        detailTemplate: '<div class="gridDetAsociadas"></div>',
        detailInit: detailInit,
        columns: [
            {
                field: "XID_LICENCIA",
                title: "ID_LICENCIA LICENCIA",
                hidden: true
            },{
                field: "XNRO_LICENCIA",
                title: "NRO LICENCIA",
                flex: 1
            }, {
                field: "XDES_TIP_LICENCIA",
                title: "DESC. LICENCIA",
                flex: 1
            }, {
                field: "XNRO_LEGAJO",
                title: "NRO LEGAJO",
                flex: 1
            }]
    }).data("kendoGrid");

    /*EVAL MED RECHAZADAS*/
    $("#gridEvalMedRechazadas").html('');
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                async: true,
                type: "POST",
                url: "/EvaluacionMedica/ListarEvalMedRechazada",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objNumeroDocumento: $('#NUMERODOCUMENTO').val() });
            }
        },
        schema: {
            data: "l_GENM_RES_EVAL_EXAMEN_RECHAZA",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_RES_EVAL_EXAMEN: { type: "string" },
                    XID_NRO_EVAL_FICHA: { type: "string" },
                    XDES_TIP_LICENCIA: { type: "string" },
                    XDES_TIP_MOT_EVA_LIC: { type: "string" },
                    XDES_TIP_CLASE: { type: "string" },
                    XDES_RESUL_EVAL: { type: "string" },
                    XDESCRIPCION_SITUACION_ESTADO: { type: "string" }
                }
            }
        },
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridEvalMedRechazadas").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        selectable: true,
        change: onChangeRechazadas,
        //height: 400,
        columns: [
            {
                field: "XID_RES_EVAL_EXAMEN",
                title: "ID_RES_EVAL_EXAMEN",
                hidden: true
            },{
                field: "XID_NRO_EVAL_FICHA",
                title: "ID_NRO_EVAL_FICHA",
                hidden: true
            }, {
                field: "XDES_TIP_LICENCIA",
                title: "TIPO LICENCIA",
                flex: 1
            }, {
                field: "XDES_TIP_MOT_EVA_LIC",
                title: "TIPO EVALUACIÓN",
                flex: 1
            }, {
                field: "XDES_TIP_CLASE",
                title: "TIPO LICENCIA",
                flex: 1
            }, {
                field: "XDES_TIP_CLASE",
                title: "CLASE",
                flex: 1
            }, {
                field: "XDES_RESUL_EVAL",
                title: "RESULTADO",
                flex: 1
            }, {
                field: "XDESCRIPCION_SITUACION_ESTADO",
                title: "RAZÓN DEL RECHAZO",
                flex: 1
            }]
    }).data("kendoGrid");

}

function detailInit(e) {
    var dataSourceAsociadaDet = new kendo.data.DataSource({
        transport: {
            read: {
                async: true,
                type: "POST",
                url: "/EvaluacionMedica/ListarAsociadasDetalle",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objNroLicencia: e.data.XNRO_LICENCIA });
            }
        },
        schema: {
            data: "l_GENM_RES_EVAL_EXAMEN_ASOCIADAS_DETALLE",
            total: "pageSize",
            type: 'json',
            model: {
                fields: {
                    XID_NRO_EVAL_FICHA: { type: "string" },
                    XDES_TIP_LICENCIA: { type: "string" },
                    XDES_TIP_MOT_EVA_LIC: { type: "string" },
                    XDES_TIP_CLASE: { type: "string" },
                    XDES_RESUL_EVAL: { type: "string" },
                    XESTADO_EVAL: { type: "string" }
                }
            }
        },        
        serverFiltering: true,
        serverSorting: true
    });

    var detailRow = e.detailRow;
    /*
    detailRow.find(".tabstrip").kendoTabStrip({
        animation: {
            open: { effects: "fadeIn" }
        }
    });
    */
    detailRow.find(".gridDetAsociadas").kendoGrid({

        dataSource: dataSourceAsociadaDet,
        scrollable: false,
        sortable: true,
        selectable: true,
        change: onChangeAsociadas,
        columns: [
            {
                field: "XID_NRO_EVAL_FICHA",
                title: "ID_NRO_EVAL_FICHA",
                hidden: true
            }, {
                field: "XDES_TIP_LICENCIA",
                title: "TIPO LICENCIA",
                flex: 1
            }, {
                field: "XDES_TIP_MOT_EVA_LIC",
                title: "TIPO EVALUACIÓN",
                flex: 1
            }, {
                field: "XDES_TIP_CLASE",
                title: "TIPO CLASE",
                flex: 1
            }, {
                field: "XDES_RESUL_EVAL",
                title: "RESULTADO",
                flex: 1
            }, {
                field: "XESTADO_EVAL",
                title: "ESTADO",
                flex: 1
            }]
    });
}

function onChange(arg) {
    var entityGrid = $("#gridEvalMedSinAsociar").data("kendoGrid");
    var selectedItem = entityGrid.dataItem(entityGrid.select());

    console.log(selectedItem.XID_NRO_EVAL_FICHA);
    modalAjaxReporte("/EvaluacionMedica/VerEvaluacionMedica", { XID_NRO_EVAL_FICHA: selectedItem.XID_NRO_EVAL_FICHA });
    
}

function onChangeSinAsociar(arg) {
    var entityGrid = $("#gridEvalMedSinAsociar").data("kendoGrid");
    var selectedItem = entityGrid.dataItem(entityGrid.select());

    $.ajax({
        datatype: 'json',
        url: '/EvaluacionMedica/VerEvaluacionMedicaRpt',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            XID_NRO_EVAL_FICHA: selectedItem.XID_NRO_EVAL_FICHA,
            XOPCIONEVALMED: $("#txtSinAsociar").val()
        }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            console.log(data);

            if (!data.rpta) {                
                //errorAddModelo("divError", "ulListaError", data.errores);
                
            } else {                
                $("#reporteSinAsociar").html('<object data="data:application/pdf;base64,' + data.beReporte + '" style=" width: 100%; min-height: 500px;" type="application/pdf"></object>');                
            }
            
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });


}

function onChangeAsociadas(arg) {
    var entityGrid = $("#gridAsociadas").find("div.gridDetAsociadas").data('kendoGrid');
    var selectedItem = entityGrid.dataItem(entityGrid.select());
        
    
    $.ajax({
        datatype: 'json',
        url: '/EvaluacionMedica/VerEvaluacionMedicaRpt',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            XID_NRO_EVAL_FICHA: selectedItem.XID_NRO_EVAL_FICHA,
            XOPCIONEVALMED: $("#txtAsociado").val()
        }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            console.log(data);

            if (!data.rpta) {
                //errorAddModelo("divError", "ulListaError", data.errores);

            } else {
                $("#reporteAsociado").html('<object data="data:application/pdf;base64,' + data.beReporte + '" style=" width: 100%; min-height: 500px;" type="application/pdf"></object>');
            }

            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });
    
}

function onChangeRechazadas(arg) {
    var entityGrid = $("#gridEvalMedRechazadas").data("kendoGrid");
    var selectedItem = entityGrid.dataItem(entityGrid.select());

    $.ajax({
        datatype: 'json',
        url: '/EvaluacionMedica/VerEvaluacionMedicaRpt',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            XID_NRO_EVAL_FICHA: selectedItem.XID_NRO_EVAL_FICHA,
            XOPCIONEVALMED: $("#txtRechazado").val()
        }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            console.log(data);

            if (!data.rpta) {
                //errorAddModelo("divError", "ulListaError", data.errores);

            } else {
                $("#reporteRechazado").html('<object data="data:application/pdf;base64,' + data.beReporte + '" style=" width: 100%; min-height: 500px;" type="application/pdf"></object>');
            }

            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });

}
$(document).ready(function () {
    
      cargarGridAsociaEvalMedica();
   

});

function cargarGridAsociaEvalMedica() {

    $("#gridAsociaEvalMedica").html('');


    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/AsociarEvalMedica/ListarEvalMedAsociarLic",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ objNumeroDoc: $('#XNUMERO_DOCUMENTO').val(), objTipoLicencia: $('#XID_TIPO_LICENCIA').val(), page: options.page, pageSize: options.pageSize });
            }
        },
        schema: {
            data: "l_GENM_RES_EVAL_MED_LIC",
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
                    XFECHA_CARGA: { type: "string" },
                    XFECHA_VENCIMIENTO: { type: "string" }


                }
            }
        },
        pageSize: 10,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    });

    var grid = $("#gridAsociaEvalMedica").kendoGrid({

        dataSource: dataSource,
        scrollable: true,
        pageable: true,
        selectable: "multiple",
        change: onChangeAsociarEvaluacion,
        //height: 400,
        columns: [
            {
                field: "XID_RES_EVAL_EXAMEN",
                title: "ID_RES_EVAL_EXAMEN",
                hidden: true
            }, {
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
            }, {
                field: "XFECHA_VENCIMIENTO",
                title: "FECHA VENCIMIENTO",
                flex: 1,
                hidden: true
            }]
    }).data("kendoGrid");

}

$("#btnRegistrarAsociarEvalMed").bind("click", function () {

    var dataEvaluacionMedica = $("#gridAsociaEvalMedica").data("kendoGrid");
    var itemDataEvaluacionMedica = dataEvaluacionMedica.dataItem(dataEvaluacionMedica.select());

    
    if (itemDataEvaluacionMedica != undefined) {
        bootbox.confirm("¿Esta seguro de asociar la Evaluación seleccionada a la Licencia ?", function (res) {
            if (res) {

                var T_GEND_LICENCIA_EVA_MED = {
                    ID_LICENCIA_EVA_MED: 0,
                    ID_LICENCIA: 0,
                    ID_PERSONAL_AERONAUTICO: 0,
                    ID_RES_EVAL_EXAMEN: 0,
                    ID_TRAMITE_EVALUACION: 0,
                    NUMERO_CERTIFICADO: 0,                    
                    ID_USUARIO_REG: null,
                    FEC_REG: null,
                    ID_USUARIO_ACT: null,
                    FEC_ACT: null,
                    XID_RES_EVAL_EXAMEN: itemDataEvaluacionMedica.XID_RES_EVAL_EXAMEN,
                    XID_LICENCIA: $("#XID_LICENCIA").val().trim(),
                    XID_PERSONAL_AERONAUTICO: $("#XID_PERSONAL_AERONAUTICO").val().trim(),

                }

                var T_GENM_EVALUACION_LIC = {
                    ID_EVALUACION_LIC: 0,
                    ID_LICENCIA: 0,
                    ID_PERSONAL_AERONAUTICO: 0,
                    ID_RES_EVAL_EXAMEN: 0,
                    ID_TIPO_EVALUACION_LIC: 0,
                    FECHA_EXPEDICION: null,
                    FECHA_VENCIMIENTO: itemDataEvaluacionMedica.XFECHA_VENCIMIENTO,
                    FECHA_PROX_EVALUACION: itemDataEvaluacionMedica.XFECHA_CARGA,
                    ID_USUARIO_REG: null,
                    FEC_REG: null,
                    ID_USUARIO_ACT: null,
                    FEC_ACT: null,                    
                    XID_LICENCIA: $("#XID_LICENCIA").val().trim(),
                    XID_PERSONAL_AERONAUTICO: $("#XID_PERSONAL_AERONAUTICO").val().trim(),

                }
              
                console.log(T_GEND_LICENCIA_EVA_MED);
                console.log(T_GENM_EVALUACION_LIC);
                
                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/AsociarEvalMedica/SaveAsociarEvalMedica',
                    type: 'POST',
                    data: JSON.stringify({ objAsociaLincenciaEvalMed: T_GEND_LICENCIA_EVA_MED, objEvaluacionLic: T_GENM_EVALUACION_LIC }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {

                        console.log(data);
                        if (!data.rpta) {
                            errorAddModelo("divErrorAsociarEvalMed", "ulListaErrorAsociarEvalMed", data.errores);
                        } else {
                            $("#contenedor").modal('hide');
                            cargarGridLicencia();
                            
                            modalAjaxRequestGet2("/EvaluacionLic/EvaluacionLic", "", "", 'XEVALUALIC=' + data.Id_Evaluacion_Lic);
                           

                        }

                        desbloqObject();

                    }
                }).fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Request Failed: " + err);
                    desbloqObject();
                });
                
            }
        });
    }
    else {        
        bootbox.alert("Seleccione un registro de la tabla");
    }

});


function onChangeAsociarEvaluacion(arg) {
    var entityGrid = $("#gridAsociaEvalMedica").data("kendoGrid");
    var selectedItem = entityGrid.dataItem(entityGrid.select());

    $.ajax({
        datatype: 'json',
        url: '/AsociarEvalMedica/VerEvaluacionMedicaRpt',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            XID_NRO_EVAL_FICHA: selectedItem.XID_NRO_EVAL_FICHA
        }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            console.log(data);

            if (!data.rpta) {
                //errorAddModelo("divError", "ulListaError", data.errores);

            } else {
                $("#reporteAsociaEvalMedica").html('<object data="data:application/pdf;base64,' + data.beReporte + '" style=" width: 100%; min-height: 300px;" type="application/pdf"></object>');
            }

            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });

}

$("#btnActualizarAsociarEvalMed").click(function () {

    modalAjaxRequestGet2("/EvaluacionLic/EvaluacionLic", "", "", "");

});
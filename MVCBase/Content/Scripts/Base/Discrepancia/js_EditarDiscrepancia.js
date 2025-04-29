$(document).ready(function () {
    //$("#FECHA_VENCIMIENTO").kendoDatePicker();
    var flg_vencimiento = $("#XFLG_VENCIMIENTO").val();
    var fech_vencimiento = $("#XFECHA_VENCIMIENTO").val();
    var xdiscrepancia = $("#XDISCREPANCIA").val().trim().length;


    $("#FECHA_VENCIMIENTO").kendoDatePicker({
        change: function (e) {

            if ($("#FECHA_VENCIMIENTO").val() == "") {
                $("#divFlgFechaVenc").hide();
                $("#FLG_FECHA_VENCIMIENTO").prop("checked", false);

            } else {
                $("#divFlgFechaVenc").show();
            }

        }
    });

    if ($("#FECHA_VENCIMIENTO").val() == '01/01/0001') {
        $("#FECHA_VENCIMIENTO").val("");
    }

    $("#XDISCREP_CRI_COORDI_DS").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            } else {

            }
        }
    });

    $('[data-toggle="tooltip"]').tooltip();

    $("#btnRegistroDiscrepancia").bind("click", function () {
        GuardarDiscrepancia(true);
    });

    $("#btnCancelarModalDiscrepancia").bind("click", function () {
        $("#ContenedormodalDiscrepancia").modal('hide');
    });

    $("#btnAgregarFileD").bind("click", function () {
        GuardarDiscrepancia(false);
    });
    $("#btnDescargarFileD").bind("click", function () {
        var url = $(this).attr("data-url");
        var gridData = $("#gridFilesDiscrepancia").data("kendoGrid");
        var itemData = gridData.dataItem(gridData.select());
        if (itemData != null) {

            downloadURL('/Discrepancia/DownloadDocumento?file=' + itemData.ARCHIVO);

        }
        else {
            bootbox.alert("Seleccione un registro!");
        }
    });


    $("#btnEliminarFileD").bind("click", function () {
        var url = $(this).attr("data-url");
        var gridData = $("#gridFilesDiscrepancia").data("kendoGrid");
        var itemData = gridData.dataItem(gridData.select());
        if (itemData != null) {
            $.ajax({
                type: "POST",
                datatype: 'json',
                url: url,
                data: JSON.stringify({ fileName: itemData.XID_ARCHIVO_DISCREPANCIA_DS }),
                contentType: "application/json",
                beforeSend: function () {
                    bloquoteObject();
                    bloquoteModal();
                },
                success: function (data) {
                    desbloqModal();
                    if (!data.rpta) {
                        errorAddModelo("divErrorDiscrepa", "ulListaDiscrepa", data.errores);
                        desbloqObject();
                    } else {
                        $('#gridFilesDiscrepancia').data('kendoGrid').dataSource.read();
                        $('#gridFilesDiscrepancia').data('kendoGrid').refresh();
                    }
                    desbloqObject();
                }
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                desbloqObject();
            });
        }
        else {
            bootbox.alert("Seleccione un registro!");
        }
    });
    gridFileDiscrepancia();

    if ($("#XFLG_VALIDAR").val() == "1") {
        $("#btnRegistroDiscrepancia").hide();
        $("#FECHA_VENCIMIENTO").data("kendoDatePicker").enable(false);
        $("#XDISCREP_CRI_COORDI_DS").data("kendoComboBox").enable(false);
        $("#DOCUMENTO_SUSTENTO").removeAttr("readonly").attr("readonly", "readonly");
        $("#OBSERVACION_DISC").removeAttr("readonly").attr("readonly", "readonly");
        $("#btnAgregarFileD").hide();
        $("#btnEliminarFileD").hide();
    }

    if (xdiscrepancia > 0) {
        if (flg_vencimiento == "true") {
            $("#FLG_FECHA_VENCIMIENTO").prop("checked", true);
            $("#divFlgFechaVenc").show();
        }
    }
    else {
        if (flg_vencimiento == "true") {
            $("#FECHA_VENCIMIENTO").data("kendoDatePicker").value(fech_vencimiento);
            $("#FLG_FECHA_VENCIMIENTO").prop("checked", true);
            $("#divFlgFechaVenc").show();
        }
    }


});
var downloadURL = function downloadURL(url) {
    var hiddenIFrameID = 'hiddenDownloader',
        iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
    iframe.src = url;
};

function GuardarDiscrepancia(flgCerrarModal) {

    if (validaDiscrepancia()) {
        //Valida si la inspeccion ya esta registrada

  
        if ($("#XINSPECCION").val() && $("#XINSPECCION").val().trim().length == 0) {

            if ($("#XTIPOACTIVIDADDS").val() == 901) {
                saveInspeccionNoProgramadaDiscrepancia(flgCerrarModal);
            } else if ($("#XTIPOACTIVIDADDS").val() == 902) {
                saveInspeccionComplementariaDiscrepancia(flgCerrarModal);
            } else {
                saveInspeccionProgramadaDiscrepancia(flgCerrarModal);
            }

        }
        else {
            console.log('1');
            saveDiscrepancia(flgCerrarModal);
        }
    }
}
function saveInspeccionProgramadaDiscrepancia(flgCerrarModal) {

    if (validaInspeccion()) {

        var KDPFECHA_INICIO = $("#CT_GENM_ACTIVIDAD_DS_FECHA_INICIO").data("kendoDatePicker");
        var KDPFECHA_FIN = $("#CT_GENM_ACTIVIDAD_DS_FECHA_FIN").data("kendoDatePicker");
        var KDPFECHA_INSPECCION = $("#FECHA_INSPECCION").data("kendoDatePicker");

        var FECHA_INICIO = new Date(1999, 1, 1);
        var FECHA_FIN = new Date(1999, 1, 1);
        var FECHA_INSPECCION = new Date(1999, 1, 1);

        FECHA_INICIO = KDPFECHA_INICIO.value();
        FECHA_FIN = KDPFECHA_FIN.value();
        FECHA_INSPECCION = KDPFECHA_INSPECCION.value();

        console.log('c');

        if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_HELIPUERTO").val()) {
            var LUGAR_INICIO = $("#CT_GENM_HELIPUERTO_XHELIPUERTO").val();
            var LUGAR_FIN = $("#XHELIPUERTO_FIN").val();

        } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_AERODROMO").val()) {
            var LUGAR_INICIO = $("#CT_MAE_AERODROMO_XAERODROMO").val();
            var LUGAR_FIN = $("#XAERODROMO_FIN").val();
        }

        var oInspeccion = {
            XINSPECCION: $("#XINSPECCION").val(),
            XACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_ACTIVIDAD_DS").val(),
            XTIPO_ACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_ACTIVIDAD_DS").val(),
            XPERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_XID_PERSONA_JURIDICA").val(),
            XDIRECCION_COORDINACION: $("#CT_GENM_ACTIVIDAD_DS_XID_DIRECCION_COORDINACION").val(),
            XGIRO: $("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").val(),
            XHABILITACION: $("#CT_GENM_ACTIVIDAD_DS_XID_HABILITACION").val(),
            XTIPO_INSPECCION: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").val(),
            XTIPO_LUGAR_DS: $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val(),
            ID_AERODROMO: $("#CT_GENM_ACTIVIDAD_DS_ID_AERODROMO").val(),
            ID_HELIPUERTO: $("#CT_GENM_ACTIVIDAD_DS_ID_HELIPUERTO").val(),
            XLUGAR_INICIO: LUGAR_INICIO,
            XLUGAR_FIN: LUGAR_FIN,
            FECHA_INICIO: FECHA_INICIO,
            FECHA_FIN: FECHA_FIN,
            FECHA_INSPECCION: FECHA_INSPECCION,
            XDEPARTAMENTO: $("#XDEPARTAMENTO").val(),
            XPROVINCIA: $("#CT_GENM_PROVINCIA_XPROVINCIA").val(),
            XDISTRITO: $("#CT_GENM_DISTRITO_XDISTRITO").val(),
            XPAIS: $("#CT_GENM_PAIS_XPAIS").val(),
            XCIUDAD: $("#CT_GENM_CIUDAD_XCIUDAD").val(),
            OBSERVACION: $("#OBSERVACION").val(),
            FLG_SATISFACTORIA: $('input[name=FLG_SATISFACTORIA]:checked').val(),
            XMATRICULA: $("#XMATRICULA").val(),
            XTIPO_LUGAR: $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val(),
            XID_PLAN_VIGILANCIA_DS: $("#XID_PLAN_VIGILANCIA_DS").val(),
            DNI: $("#DNI").val(),
        };
        console.log(oInspeccion);
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Inspeccion/SaveInspeccion',
            type: 'POST',
            data: JSON.stringify({ oInspeccion: oInspeccion }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {
                if (!data.rpta) {
                    errorAddModelo("divErrorInspeccion", "ulListaErrorInspeccion", data.errores);
                    desbloqObject();
                } else {
                    $("#XINSPECCION").val(data.inspeccion);
                    saveDiscrepancia(flgCerrarModal);
                }
                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
            desbloqObject();
        });
    }
}

function saveInspeccionNoProgramadaDiscrepancia(flgCerrarModal) {
    ruta = '/Inspeccion/SaveInspeccionNoProgramada';

    if (validaInspeccion()) {

        //var KDPFECHA_INICIO = $("#CT_GENM_ACTIVIDAD_DS_FECHA_INICIO").data("kendoDatePicker");
        //var KDPFECHA_FIN = $("#CT_GENM_ACTIVIDAD_DS_FECHA_FIN").data("kendoDatePicker");
        var KDPFECHA_INSPECCION = $("#FECHA_INSPECCION").data("kendoDatePicker");

        var FECHA_INICIO = new Date(1999, 1, 1);
        var FECHA_FIN = new Date(1999, 1, 1);
        var FECHA_INSPECCION = new Date(1999, 1, 1);

        //FECHA_INICIO = KDPFECHA_INICIO.value();
        //FECHA_FIN = KDPFECHA_FIN.value();
        FECHA_INSPECCION = KDPFECHA_INSPECCION.value();

        if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_HELIPUERTO").val()) {
            var LUGAR_INICIO = $("#CT_GENM_HELIPUERTO_XHELIPUERTO").val();
            var LUGAR_FIN = $("#XHELIPUERTO_FIN").val();

        } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_AERODROMO").val()) {
            var LUGAR_INICIO = $("#CT_MAE_AERODROMO_XAERODROMO").val();
            var LUGAR_FIN = $("#XAERODROMO_FIN").val();

        }

        if ($("#XCOORDINACIONTECNICA").val() == 48) {
            var oInspeccion = {
                XINSPECCION: $("#XINSPECCION").val(),
                XACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_ACTIVIDAD_DS").val(),
                XTIPO_ACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_ACTIVIDAD_DS").val(),
                XPERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val(),
                XDIRECCION_COORDINACION: $("#CT_GENM_ACTIVIDAD_DS_XID_DIRECCION_COORDINACION").val(),
                XGIRO: $("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").val(),
                XHABILITACION: $("#CT_GENM_ACTIVIDAD_DS_XID_HABILITACION").val(),
                XTIPO_INSPECCION: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").val(),
                XTIPO_LUGAR_DS: $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val(),
                XID_AERODROMO: $("#CT_GENM_ACTIVIDAD_DS_XID_AERODROMO").val(),
                XID_HELIPUERTO: $("#CT_GENM_ACTIVIDAD_DS_XID_HELIPUERTO").val(),
                XLUGAR_INICIO: LUGAR_INICIO,
                XLUGAR_FIN: LUGAR_FIN,
                FECHA_INICIO: FECHA_INSPECCION,
                FECHA_FIN: FECHA_INSPECCION,
                FECHA_INSPECCION: FECHA_INSPECCION,
                XDEPARTAMENTO: $("#XDEPARTAMENTO").val(),
                XPROVINCIA: $("#CT_GENM_PROVINCIA_XPROVINCIA").val(),
                XDISTRITO: $("#CT_GENM_DISTRITO_XDISTRITO").val(),
                XPAIS: $("#CT_GENM_PAIS_XPAIS").val(),
                XCIUDAD: $("#CT_GENM_CIUDAD_XCIUDAD").val(),
                OBSERVACION: $("#OBSERVACION").val(),
                FLG_SATISFACTORIA: $('input[name=FLG_SATISFACTORIA]:checked').val(),
                XMATRICULA: $("#XMATRICULA").val(),
                XTIPO_LUGAR: $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val(),
                XID_PLAN_VIGILANCIA_DS: $("#XID_PLAN_VIGILANCIA_DS").val()
            };
        }
        else {
            var oInspeccion = {
                XINSPECCION: $("#XINSPECCION").val(),
                XACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_ACTIVIDAD_DS").val(),
                XTIPO_ACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_ACTIVIDAD_DS").val(),
                XPERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split("^")[0],
                XDIRECCION_COORDINACION: $("#CT_GENM_ACTIVIDAD_DS_XID_DIRECCION_COORDINACION").val(),
                XGIRO: $("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").val(),
                XHABILITACION: $("#CT_GENM_ACTIVIDAD_DS_XID_HABILITACION").val(),
                XTIPO_INSPECCION: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").val(),
                XTIPO_LUGAR_DS: $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val(),
                XID_AERODROMO: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split("^")[1],
                XID_HELIPUERTO: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split("^")[2],
                XLUGAR_INICIO: LUGAR_INICIO,
                XLUGAR_FIN: LUGAR_FIN,
                FECHA_INICIO: FECHA_INSPECCION,
                FECHA_FIN: FECHA_INSPECCION,
                FECHA_INSPECCION: FECHA_INSPECCION,
                XDEPARTAMENTO: $("#XDEPARTAMENTO").val(),
                XPROVINCIA: $("#CT_GENM_PROVINCIA_XPROVINCIA").val(),
                XDISTRITO: $("#CT_GENM_DISTRITO_XDISTRITO").val(),
                XPAIS: $("#CT_GENM_PAIS_XPAIS").val(),
                XCIUDAD: $("#CT_GENM_CIUDAD_XCIUDAD").val(),
                OBSERVACION: $("#OBSERVACION").val(),
                FLG_SATISFACTORIA: $('input[name=FLG_SATISFACTORIA]:checked').val(),
                XMATRICULA: $("#XMATRICULA").val(),
                XTIPO_LUGAR: $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val(),
                XID_PLAN_VIGILANCIA_DS: $("#XID_PLAN_VIGILANCIA_DS").val()
            };
        }


        if ($("#XCOORDINACIONTECNICA").val() == 49 || $("#XCOORDINACIONTECNICA").val() == 51) {
            var oActividad = {
                XID_PLAN_VIGILANCIA_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_PLAN_VIGILANCIA_DS").val(),
                ID_GIRO: $("#CT_GENM_ACTIVIDAD_DS_ID_GIRO").val(),
                XID_GIRO: $("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").val(),
                XID_DIRECCION_COORDINACION: $("#CT_GENM_ACTIVIDAD_DS_XID_DIRECCION_COORDINACION").val(),
                ID_HABILITACION: $("#CT_GENM_ACTIVIDAD_DS_ID_HABILITACION").val(),
                ID_MES: $("#CT_GENM_ACTIVIDAD_DS_ID_MES").val(),
                XID_ANO: $("#CT_GENM_ACTIVIDAD_DS_XID_ANO").val(),
                XID_PERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split("^")[0],
                XID_ESTADO_ACTIVIDAD: $("#CT_GENM_ACTIVIDAD_DS_XID_ESTADO_ACTIVIDAD").val(),
                FECHA_INICIO: FECHA_INSPECCION,
                FECHA_FIN: FECHA_INSPECCION,
                XID_TIPO_INSPECCION: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").val(),
                ID_INSPECTOR_OTRO: $("#ID_INSPECTOR_OTRO").val(),
                XID_INSPECTOR_OTRO: $("#XID_INSPECTOR_OTRO").data("kendoMultiSelect").value(),
                XID_AERODROMO: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split("^")[1],
                XID_HELIPUERTO: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split("^")[2]
            };
        } else if ($("#XCOORDINACIONTECNICA").val() == 48) {
            var oActividad = {
                XID_PLAN_VIGILANCIA_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_PLAN_VIGILANCIA_DS").val(),
                ID_GIRO: $("#CT_GENM_ACTIVIDAD_DS_ID_GIRO").val(),
                XID_GIRO: $("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").val(),
                XID_DIRECCION_COORDINACION: $("#CT_GENM_ACTIVIDAD_DS_XID_DIRECCION_COORDINACION").val(),
                ID_HABILITACION: $("#CT_GENM_ACTIVIDAD_DS_ID_HABILITACION").val(),
                ID_MES: $("#CT_GENM_ACTIVIDAD_DS_ID_MES").val(),
                XID_ANO: $("#CT_GENM_ACTIVIDAD_DS_XID_ANO").val(),
                XID_PERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val(),
                XID_ESTADO_ACTIVIDAD: $("#CT_GENM_ACTIVIDAD_DS_XID_ESTADO_ACTIVIDAD").val(),
                FECHA_INICIO: FECHA_INSPECCION,
                FECHA_FIN: FECHA_INSPECCION,
                XID_TIPO_INSPECCION: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").val(),
                ID_INSPECTOR_OTRO: $("#ID_INSPECTOR_OTRO").val(),
                XID_INSPECTOR_OTRO: $("#XID_INSPECTOR_OTRO").data("kendoMultiSelect").value(),
                XID_AERODROMO: $("#CT_GENM_ACTIVIDAD_DS_XID_AERODROMO").val(),
                XID_HELIPUERTO: $("#CT_GENM_ACTIVIDAD_DS_XID_HELIPUERTO").val()
            };
        }
        else {
            var oActividad = {
                XID_PLAN_VIGILANCIA_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_PLAN_VIGILANCIA_DS").val(),
                ID_GIRO: $("#CT_GENM_ACTIVIDAD_DS_ID_GIRO").val(),
                XID_GIRO: $("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").val(),
                XID_DIRECCION_COORDINACION: $("#CT_GENM_ACTIVIDAD_DS_XID_DIRECCION_COORDINACION").val(),
                ID_HABILITACION: $("#CT_GENM_ACTIVIDAD_DS_ID_HABILITACION").val(),
                ID_MES: $("#CT_GENM_ACTIVIDAD_DS_ID_MES").val(),
                XID_ANO: $("#CT_GENM_ACTIVIDAD_DS_XID_ANO").val(),
                XID_PERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split("^")[0],
                XID_ESTADO_ACTIVIDAD: $("#CT_GENM_ACTIVIDAD_DS_XID_ESTADO_ACTIVIDAD").val(),
                FECHA_INICIO: FECHA_INSPECCION,
                FECHA_FIN: FECHA_INSPECCION,
                XID_TIPO_INSPECCION: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").val(),
                XID_AERODROMO: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split("^")[1],
                XID_HELIPUERTO: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split("^")[2]
            };
        }

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: ruta,
            type: 'POST',
            data: JSON.stringify({ oActividad: oActividad, oInspeccion: oInspeccion }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {
                if (!data.rpta) {
                    errorAddModelo("divErrorInspeccion", "ulListaErrorInspeccion", data.errores);
                    desbloqObject();
                } else {

                    $("#XINSPECCION").val(data.inspeccion);
                    $("#CT_GENM_ACTIVIDAD_DS_XID_ACTIVIDAD_DS").val(data.actividad);
                    $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_ACTIVIDAD_DS").val(data.tipo_inspeccion);
                    $("#CT_GENM_ACTIVIDAD_DS_XID_PERSONA_JURIDICA").val(data.persona_juridica);
                    saveDiscrepancia(flgCerrarModal);
                }
                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
            desbloqObject();
        });

    }

}

function saveInspeccionComplementariaDiscrepancia(flgCerrarModal) {
    if (validaInspeccion()) {

        //var KDPFECHA_INICIO = $("#CT_GENM_ACTIVIDAD_DS_FECHA_INICIO").data("kendoDatePicker");
        //var KDPFECHA_FIN = $("#CT_GENM_ACTIVIDAD_DS_FECHA_FIN").data("kendoDatePicker");
        var KDPFECHA_INSPECCION = $("#FECHA_INSPECCION").data("kendoDatePicker");

        var FECHA_INICIO = new Date(1999, 1, 1);
        var FECHA_FIN = new Date(1999, 1, 1);
        var FECHA_INSPECCION = new Date(1999, 1, 1);

        //FECHA_INICIO = KDPFECHA_INICIO.value();
        //FECHA_FIN = KDPFECHA_FIN.value();
        FECHA_INSPECCION = KDPFECHA_INSPECCION.value();

        if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_HELIPUERTO").val()) {
            var LUGAR_INICIO = $("#CT_GENM_HELIPUERTO_XHELIPUERTO").val();
            var LUGAR_FIN = $("#XHELIPUERTO_FIN").val();

        } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_AERODROMO").val()) {
            var LUGAR_INICIO = $("#CT_MAE_AERODROMO_XAERODROMO").val();
            var LUGAR_FIN = $("#XAERODROMO_FIN").val();

        }

        var oInspeccion = {
            XINSPECCION: $("#XINSPECCION").val(),
            XACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_ACTIVIDAD_DS").val(),
            XTIPO_ACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_ACTIVIDAD_DS").val(),
            XPERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split("^")[0],
            XDIRECCION_COORDINACION: $("#CT_GENM_ACTIVIDAD_DS_XID_DIRECCION_COORDINACION").val(),
            XGIRO: $("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").val(),
            XHABILITACION: $("#CT_GENM_ACTIVIDAD_DS_XID_HABILITACION").val(),
            XTIPO_INSPECCION: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").val(),
            XTIPO_LUGAR_DS: $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val(),
            XID_AERODROMO: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split("^")[1],
            XID_HELIPUERTO: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split('^')[2],
            XLUGAR_INICIO: LUGAR_INICIO,
            XLUGAR_FIN: LUGAR_FIN,
            FECHA_INICIO: FECHA_INSPECCION,
            FECHA_FIN: FECHA_INSPECCION,
            FECHA_INSPECCION: FECHA_INSPECCION,
            XDEPARTAMENTO: $("#XDEPARTAMENTO").val(),
            XPROVINCIA: $("#CT_GENM_PROVINCIA_XPROVINCIA").val(),
            XDISTRITO: $("#CT_GENM_DISTRITO_XDISTRITO").val(),
            XPAIS: $("#CT_GENM_PAIS_XPAIS").val(),
            XCIUDAD: $("#CT_GENM_CIUDAD_XCIUDAD").val(),
            OBSERVACION: $("#OBSERVACION").val(),
            FLG_SATISFACTORIA: $('input[name=FLG_SATISFACTORIA]:checked').val(),
            XMATRICULA: $("#XMATRICULA").val(),
            XTIPO_LUGAR: $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val(),
            XID_PLAN_VIGILANCIA_DS: $("#XID_PLAN_VIGILANCIA_DS").val(),
            DNI: $("#DNI").val()
        };


        var oActividad = {
            XID_PLAN_VIGILANCIA_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_PLAN_VIGILANCIA_DS").val(),
            ID_GIRO: $("#CT_GENM_ACTIVIDAD_DS_ID_GIRO").val(),
            XID_GIRO: $("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").val(),
            XID_DIRECCION_COORDINACION: $("#CT_GENM_ACTIVIDAD_DS_XID_DIRECCION_COORDINACION").val(),
            ID_HABILITACION: $("#CT_GENM_ACTIVIDAD_DS_ID_HABILITACION").val(),
            ID_MES: $("#CT_GENM_ACTIVIDAD_DS_ID_MES").val(),
            XID_ANO: $("#CT_GENM_ACTIVIDAD_DS_XID_ANO").val(),
            XID_PERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split("^")[0],
            XID_ESTADO_ACTIVIDAD: $("#CT_GENM_ACTIVIDAD_DS_XID_ESTADO_ACTIVIDAD").val(),
            FECHA_INICIO: FECHA_INSPECCION,
            FECHA_FIN: FECHA_INSPECCION,
            XID_TIPO_INSPECCION: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").val(),
            XID_AERODROMO: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split("^")[1],
            XID_HELIPUERTO: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split('^')[2]
        };

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Inspeccion/SaveInspeccionComplementaria',
            type: 'POST',
            data: JSON.stringify({ oActividad: oActividad, oInspeccion: oInspeccion }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {
                if (!data.rpta) {
                    errorAddModelo("divErrorInspeccion", "ulListaErrorInspeccion", data.errores);
                    desbloqObject();
                } else {

                    $("#XINSPECCION").val(data.inspeccion);
                    $("#CT_GENM_ACTIVIDAD_DS_XID_ACTIVIDAD_DS").val(data.actividad);
                    $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_ACTIVIDAD_DS").val(data.tipo_inspeccion);
                    $("#CT_GENM_ACTIVIDAD_DS_XID_PERSONA_JURIDICA").val(data.persona_juridica);
                    saveDiscrepancia(flgCerrarModal);
                }
                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
            desbloqObject();
        });

    }
}

function saveDiscrepancia(flgCerrarModal) {
    var dataDiscrepancias = {
        XINSPECCION: $("#XINSPECCION").val(),
        XDISCREPANCIA: $("#XDISCREPANCIA").val(),
        XACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_ACTIVIDAD_DS").val(),
        XPERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_XID_PERSONA_JURIDICA").val(),
        XESTADO_DISCREPANCIA_DS: $("#XESTADO_DISCREPANCIA_DS").val(),
        FECHA_VENCIMIENTO: $("#FECHA_VENCIMIENTO").val(),
        XTIPO_SUSTENTO: $("#XTIPO_SUSTENTO").val(),
        DOCUMENTO_SUSTENTO: $("#DOCUMENTO_SUSTENTO").val(),
        XDISCREP_CRI_COORDI_DS: $("#XDISCREP_CRI_COORDI_DS option:selected").val(),
        OBSERVACION_DISC: $("#OBSERVACION_DISC").val(),
        XTIPO_ACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_ACTIVIDAD_DS").val(),
        ORDEN: $("#ORDEN").val()
    }

    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/Discrepancia/SaveDiscrepancia',
        type: 'POST',
        data: JSON.stringify({ Discrepancia: dataDiscrepancias }),
        beforeSend: function () {
            bloquoteObject();
            bloquoteModal();
        },
        success: function (data) {
            desbloqModal();
            if (!data.rpta) {
                errorAddModelo("divErrorDiscrepa", "ulListaDiscrepa", data.errores);
                desbloqObject();
            } else {
                ConsultaDiscrepanciaDiscre();
                if (flgCerrarModal) {

                    if ($('#FLG_FECHA_VENCIMIENTO').is(':checked') == true) {
                        $("#XFLG_VENCIMIENTO").val("true");
                        $("#XFECHA_VENCIMIENTO").val($("#FECHA_VENCIMIENTO").val());
                    }
                    else {
                        $("#XFLG_VENCIMIENTO").val("");
                        $("#XFECHA_VENCIMIENTO").val("");
                    }
                    $("#contenedor2").modal('hide');
                }
                else {
                    $("#XDISCREPANCIA").val(data.discrepancia)
                    modalAjaxRequestGet3('/Discrepancia/FileDiscrepancia', '', '', '')
                }
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
        desbloqObject();
    });
}
function validaDiscrepancia() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;
    //var FechaVencimiento = isDate($("#FECHA_VENCIMIENTO").val());
    var fechainspeccion = $("#FECHA_INSPECCION").val();

    if ($("#XESTADO_DISCREPANCIA_DS").val().trim() == "") {
        flg = false;
        objData.push({ "XESTADO_DISCREPANCIA_DS": [{ ErrorMessage: "Debe seleccionar un Estado" }] })
    }

    if ($("#XDISCREP_CRI_COORDI_DS").val().trim() == "") {
        flg = false;
        $('[aria-owns="XDISCREP_CRI_COORDI_DS_listbox"]').parents("span").addClass("valError");
        objData.push({ "XDISCREP_CRI_COORDI_DS": [{ ErrorMessage: "Debe seleccionar una Cripticidad" }] })
    }

    if ($("#DOCUMENTO_SUSTENTO").val().trim() == "") {
        flg = false;
        objData.push({ "DOCUMENTO_SUSTENTO": [{ ErrorMessage: "Debe ingresar Documento Sustento" }] })
    }

    if ($("#OBSERVACION_DISC").val().trim() == "") {
        flg = false;
        objData.push({ "OBSERVACION_DISC": [{ ErrorMessage: "Debe ingresar un Detalle" }] })
    }
    /*if (FechaVencimiento == false) {
        flg = false;
        objData.push({ "FECHA_VENCIMIENTO": [{ ErrorMessage: "Debe ingresar una Fecha Vencimiento Valida" }] })
    }*/
    if ($("#FECHA_VENCIMIENTO").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_VENCIMIENTO").parents("span").addClass("valError");
        objData.push({ "FECHA_VENCIMIENTO": [{ ErrorMessage: "Debe ingresar una Fecha Vencimiento Valida" }] })
    }
    else {
        if ($("#FECHA_INSPECCION").data("kendoDatePicker").value() > $("#FECHA_VENCIMIENTO").data("kendoDatePicker").value()) {
            flg = false;
            $("#FECHA_VENCIMIENTO").parents("span").addClass("valError");
            objData.push({ "FECHA_VENCIMIENTO": [{ ErrorMessage: "La Fecha de Vencimiento no puede ser menor a la fecha de inspección (" + fechainspeccion + ") " }] })
        }
    }

    if (flg) {
        $("#divErrorDiscrepa").hide();
    }
    else {
        $("#divErrorDiscrepa").html('<strong>No se puede grabar</strong><ul id="ulListaDiscrepa"></ul>');
        errorAddJS("divErrorDiscrepa", "ulListaDiscrepa", objData)
    }

    return flg;
}

function saveInspeccionDicre() {

    var KDPFECHA_INICIO = $("#CT_GENM_ACTIVIDAD_DS_FECHA_INICIO").data("kendoDatePicker");
    var KDPFECHA_FIN = $("#CT_GENM_ACTIVIDAD_DS_FECHA_FIN").data("kendoDatePicker");
    var KDPFECHA_INSPECCION = $("#FECHA_INSPECCION").data("kendoDatePicker");

    var FECHA_INICIO = new Date(1999, 1, 1);
    var FECHA_FIN = new Date(1999, 1, 1);
    var FECHA_INSPECCION = new Date(1999, 1, 1);

    FECHA_INICIO = KDPFECHA_INICIO.value();
    FECHA_FIN = KDPFECHA_FIN.value();
    FECHA_INSPECCION = KDPFECHA_INSPECCION.value();

    if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_HELIPUERTO").val()) {
        var LUGAR_INICIO = $("#CT_GENM_HELIPUERTO_XHELIPUERTO").val();
        var LUGAR_FIN = $("#XHELIPUERTO_FIN").val();

    } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_AERODROMO").val()) {
        var LUGAR_INICIO = $("#CT_MAE_AERODROMO_XAERODROMO").val();
        var LUGAR_FIN = $("#XAERODROMO_FIN").val();

    }

    var oInspeccion = {
        XINSPECCION: $("#XINSPECCION").val(),
        XACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_ACTIVIDAD_DS").val(),
        XTIPO_ACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_ACTIVIDAD_DS").val(),
        XPERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_XID_PERSONA_JURIDICA").val(),
        XDIRECCION_COORDINACION: $("#CT_GENM_ACTIVIDAD_DS_XID_DIRECCION_COORDINACION").val(),
        XGIRO: $("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").val(),
        XHABILITACION: $("#CT_GENM_ACTIVIDAD_DS_XID_HABILITACION").val(),
        XTIPO_INSPECCION: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").val(),
        XTIPO_LUGAR_DS: $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val(),
        XLUGAR_INICIO: LUGAR_INICIO,
        XLUGAR_FIN: LUGAR_FIN,
        FECHA_INICIO: FECHA_INICIO,
        FECHA_FIN: FECHA_FIN,
        FECHA_INSPECCION: FECHA_INSPECCION,
        XDEPARTAMENTO: $("#XDEPARTAMENTO").val(),
        XPROVINCIA: $("#CT_GENM_PROVINCIA_XPROVINCIA").val(),
        XDISTRITO: $("#CT_GENM_DISTRITO_XDISTRITO").val(),
        XPAIS: $("#CT_GENM_PAIS_XPAIS").val(),
        XCIUDAD: $("#CT_GENM_CIUDAD_XCIUDAD").val(),
        OBSERVACION: $("#OBSERVACION").val(),
        FLG_SATISFACTORIA: $('input[name=FLG_SATISFACTORIA]:checked').val(),
        XMATRICULA: $("#XMATRICULA").val(),
        XTIPO_LUGAR: $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val(),
        XID_PLAN_VIGILANCIA_DS: $("#XID_PLAN_VIGILANCIA_DS").val()
    };

    var objDiscrepanciaAjax = [];
    var gridDiscrepancias = $("#gridDiscrepancia").data("kendoGrid").dataSource.data();


    $.each(gridDiscrepancias, function (index, item) {

        var dataDiscrepancias = {
            XDISCREPANCIA: item.XDISCREPANCIA,
            XESTADO_DISCREPANCIA_DS: item.XESTADO_DISCREPANCIA_DS,
            XDISCREP_CRI_COORDI_DS: item.XDISCREP_CRI_COORDI_DS,
            DESCRIPCION_ESTADO_DISC: item.DESCRIPCION_ESTADO_DISC,
            ORDEN: item.ORDEN,
            FECHA_VENCIMIENTO: item.XFECHA_VENCIMIENTO,
            DESCRIPCION_CRIPTICIDAD: item.DESCRIPCION_CRIPTICIDAD,
            DOCUMENTO_SUSTENTO: item.DOCUMENTO_SUSTENTO,
            OBSERVACION_DISC: item.OBSERVACION_DISC
        }
        objDiscrepanciaAjax.push(dataDiscrepancias);
    });

    $.ajax({
        datatype: 'json',
        contentType: "application/json",
        url: '/Inspeccion/SaveInspeccion',
        type: 'POST',
        data: JSON.stringify({ oInspeccion: oInspeccion, objDiscrepancia: objDiscrepanciaAjax }),
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            console.log(data);
            if (!data.rpta) {
                errorAddModelo("divErrorInspeccion", "ulListaErrorInspeccion", data.errores);
                desbloqObject();
            } else {
                ConsultaDiscrepanciaDiscre();
                $("#contenedor2").modal('hide');
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        console.log("Request Failed: " + err);
        desbloqObject();
    });
}
function ConsultaDiscrepanciaDiscre() {
    if ($("#XINSPECCION").val().trim().length > 0) {
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Inspeccion/ListarDiscrepancias',
            type: 'POST',
            data: JSON.stringify({ inspeccion: $("#XINSPECCION").val().trim() }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {
                console.log(data);

                gridDiscrepancias(data.l_Discrepancias);
                //$("#btnGenerarOficio").show();

                console.log($("#CT_GENM_ACTIVIDAD_DS_ID_TIPO_INSPECCION").val().trim())
                console.log($("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").val().trim());
                console.log($("#XCOORDINACIONTECNICA").val().trim());

                var valtipoinspeccion = $("#CT_GENM_ACTIVIDAD_DS_ID_TIPO_INSPECCION").val().trim();
                var tipoinspeccion = $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").val().trim();
                var coordinaciontecnica = $("#XCOORDINACIONTECNICA").val().trim();

                if (coordinaciontecnica == 49 || coordinaciontecnica == 51 || coordinaciontecnica == 61) {
                    if (valtipoinspeccion == 0) {
                        if (tipoinspeccion == 61) {
                            $("#btnGenerarOficio").hide();
                        } else {
                            $("#btnGenerarOficio").show();
                        }
                    } else if (valtipoinspeccion == 61) {
                        $("#btnGenerarOficio").hide();
                    }
                    else {
                        $("#btnGenerarOficio").show();
                    }
                } else {
                    $("#btnGenerarOficio").show();
                }

                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
            desbloqObject();
        });
    }
}
function gridFileDiscrepancia() {
    $("#gridFilesDiscrepancia").html('');

    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                type: "POST",
                url: "/Discrepancia/ConsultaArchivos",
                contentType: "application/json",
                dataType: 'json'
            },
            parameterMap: function (options, operation) {
                return JSON.stringify({ Discrepancia: $('#XDISCREPANCIA').val() });
            }
        },
        schema: {
            data: "lista",
            type: 'json',
            model: {
                fields: {
                    XID_ARCHIVO_DISCREPANCIA_DS: { type: "string" },
                    ARCHIVO: { type: "string" },
                    FLG_ESTADO: { type: "string" },
                    XID_DISCREPANCIA: { type: "string" },
                    XID_INSPECCION: { type: "string" },
                    XID_ACTIVIDAD_DS: { type: "string" },
                    XID_TIPO_ACTIVIDAD_DS: { type: "string" },
                    XID_PERSONA_JURIDICA: { type: "string" },
                    DESCRIPCION: { type: "string" }
                }
            }
        }
    });

    var grid = $("#gridFilesDiscrepancia").kendoGrid({
        dataSource: dataSource,
        scrollable: true,
        selectable: "row",
        columns: [
            {
                field: "XID_ARCHIVO_DISCREPANCIA_DS",
                width: 90,
                title: "XID_ARCHIVO_DISCREPANCIA_DS",
                hidden: true
            }, {
                field: "ARCHIVO",
                width: 90,
                title: "ARCHIVO",
                hidden: true
            }, {
                field: "DESCRIPCION",
                flex: 1,
                title: "DESCRIPCION"
            }]
    }).data("kendoGrid");
}
/*
$("#FLG_FECHA_VENCIMIENTO").bind("click", function () {
    
    if ($('#FLG_FECHA_VENCIMIENTO').is(':checked') == true)
    {
        $("#XFLG_VENCIMIENTO").val("true");
    }
    else {
        $("#XFLG_VENCIMIENTO").val("");
        $("#XFECHA_VENCIMIENTO").val("");
    }
    

})
*/
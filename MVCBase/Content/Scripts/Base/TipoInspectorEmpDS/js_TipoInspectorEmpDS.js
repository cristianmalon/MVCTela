$(document).ready(function () {


    $("#FECHA_INICIO").kendoDatePicker();
    $("#FECHA_FIN").kendoDatePicker();

   
    $("#XTIPO_INSPECTOR_DS").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        select: onSelectPersonaJuridica,
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
            else {
                if ($.trim($("#XTIPO_INSPECTOR_DS").data("kendoComboBox").value()) != "" && $("#XTIPO_INSPECTOR_DS").data("kendoComboBox").value() != null) {
                    $.ajax({
                        datatype: 'json',
                        url: '/TipoInspectorEmpDS/datoPersonaJuridica',
                        type: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify({
                            XTIPOINSPECTOR: $.trim($("#XTIPO_INSPECTOR_DS").data("kendoComboBox").value())
                        }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {

                            if (!data.rpta) {
                                errorAddModelo("divErrorTipoInspectorEmpDS", "ulListaErrorTipoInspectorEmpDS", data.errores);
                            } else {
                                var l_GENM_PERSONA_JURIDICA = data.l_GENM_PERSONA_JURIDICA;

                                

                                var lRazonSocial = [];
                                $.each(l_GENM_PERSONA_JURIDICA, function (index, value) {                                    
                                    var oRazonSocial = {
                                        value: value.XPERSONAJURIDICA,
                                        text: value.RAZON_SOCIAL
                                    }
                                    lRazonSocial.push(oRazonSocial);
                                });
                                $("#XPERSONA_JURIDICA").data("kendoComboBox").value('');
                                var multiselect = $("#XPERSONA_JURIDICA").data("kendoComboBox");
                                console.log(lRazonSocial);                                
                                multiselect.setDataSource(lRazonSocial);
                            }
                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        desbloqObject();
                    });
                    
                    $.ajax({
                        datatype: 'json',
                        url: '/TipoInspectorEmpDS/datoInspector',
                        type: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify({
                            XTIPOINSPECTOR: $.trim($("#XTIPO_INSPECTOR_DS").data("kendoComboBox").value())
                        }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {

                            if (!data.rpta) {
                                errorAddModelo("divErrorTipoInspectorEmpDS", "ulListaErrorTipoInspectorEmpDS", data.errores);
                            } else {
                                var l_TGENM_INSPECTOR = data.l_TGENM_INSPECTOR;

                                var lInspector = [];
                                $.each(l_TGENM_INSPECTOR, function (index, value) {
                                    var oInspector = {
                                        value: value.XIDINSPECTOR,
                                        text: value.XNOMBRECOMPLETO
                                    }
                                    lInspector.push(oInspector);
                                });
                                $("#XINSPECTOR").data("kendoComboBox").value('');
                                var multiselect = $("#XINSPECTOR").data("kendoComboBox");
                                console.log(lInspector);
                                multiselect.setDataSource(lInspector);
                            }
                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        desbloqObject();
                    });
                    
                }

                



            }
        },
    });

    $("#XPERSONA_JURIDICA").kendoComboBox({
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

    $("#XINSPECTOR").kendoComboBox({
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


});

function validDatosTipoInspectorEmpDS() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#FECHA_INICIO").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_INICIO").parents("span").addClass("valError");
        objData.push({ "FECHA_INICIO": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha inicio" }] })
    }
    if ($("#FECHA_FIN").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_FIN").parents("span").addClass("valError");
        objData.push({ "FECHA_FIN": [{ ErrorMessage: "Debe ingresar una fecha valida para la fecha fin" }] })
    }
    if ($("#XPERSONA_JURIDICA").data("kendoComboBox").value() == null || $("#XPERSONA_JURIDICA").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XPERSONA_JURIDICA_listbox"]').parents("span").addClass("valError");
        objData.push({ "XPERSONA_JURIDICA": [{ ErrorMessage: "Debe seleccionar la razón social" }] })
    }
    if ($("#XINSPECTOR").data("kendoComboBox").value() == null || $("#XINSPECTOR").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XINSPECTOR_listbox"]').parents("span").addClass("valError");
        objData.push({ "XINSPECTOR": [{ ErrorMessage: "Debe seleccionar al inspector" }] })
    }
    if ($("#XTIPO_INSPECTOR_DS").data("kendoComboBox").value() == null || $("#XTIPO_INSPECTOR_DS").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XTIPO_INSPECTOR_DS_listbox"]').parents("span").addClass("valError");
        objData.push({ "XTIPO_INSPECTOR_DS": [{ ErrorMessage: "Debe seleccionar el tipo de inspector" }] })
    }

    if (flg) {
        $("#divErrorTipoInspectorEmpDS").hide();
    }
    else {
        $("#divErrorTipoInspectorEmpDS").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTipoInspectorEmpDS"></ul>');
        errorAddJS("divErrorTipoInspectorEmpDS", "ulListaErrorTipoInspectorEmpDS", objData)
    }

    return flg;
}

$("#btnRegistrarTipoInspectorEmpDS").bind("click", function () {


    if (validDatosTipoInspectorEmpDS()) {


        var T_GENM_TIPO_INSPECTOR_EMP_DS = {
            ID_TIPO_INSPECTOR_EMP: 0,
            ID_PERSONA_JURIDICA: 0,
            ID_TIPO_INSPECTOR_DS: 0,
            ID_INSPECTOR: 0,
            FECHA_INICIO: $("#FECHA_INICIO").val(),
            FECHA_FIN: $("#FECHA_FIN").val(),            
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XTIPO_INSPECTOR_EMP_DS: $("#XTIPO_INSPECTOR_EMP_DS").val().trim(),
            XPERSONA_JURIDICA: $("#XPERSONA_JURIDICA").data("kendoComboBox").value(),
            XTIPO_INSPECTOR_DS: $("#XTIPO_INSPECTOR_DS").data("kendoComboBox").value(),
            XINSPECTOR: $("#XINSPECTOR").data("kendoComboBox").value()

        }

        console.log(T_GENM_TIPO_INSPECTOR_EMP_DS);
        
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoInspectorEmpDS/SaveRegistroTipoInspectorEmpDS',
            type: 'POST',
            data: JSON.stringify({ objTipoInspectorEmpDS: T_GENM_TIPO_INSPECTOR_EMP_DS }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoInspectorEmpDS", "ulListaErrorTipoInspectorEmpDS", data.errores);
                } else {
                    //console.log(data.newcontregistro);

                    $("#contenedor").modal('hide');
                    cargarGridTipoInspectorEmpDS();

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


function onSelectPersonaJuridica(e) {
    var dataItem = this.dataItem(e.item);
    //console.log(dataItem);

    if (dataItem.value != "" && dataItem.value != null) {
        $.ajax({
            datatype: 'json',
            url: '/TipoInspectorEmpDS/datoPersonaJuridica',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                XTIPOINSPECTOR: dataItem.value
            }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                if (!data.rpta) {
                    errorAddModelo("divErrorTipoInspectorEmpDS", "ulListaErrorTipoInspectorEmpDS", data.errores);
                } else {
                    var l_GENM_PERSONA_JURIDICA = data.l_GENM_PERSONA_JURIDICA;

                    var lRazonSocial = [];
                    $.each(l_GENM_PERSONA_JURIDICA, function (index, value) {
                        var oRazonSocial = {
                            value: value.XPERSONAJURIDICA,
                            text: value.RAZON_SOCIAL
                        }
                        lRazonSocial.push(oRazonSocial);
                    });
                    $("#XPERSONA_JURIDICA").data("kendoComboBox").value('');
                    var multiselect = $("#XPERSONA_JURIDICA").data("kendoComboBox");
                    console.log(lRazonSocial);
                    multiselect.setDataSource(lRazonSocial);
                }

                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            desbloqObject();
        });

        $.ajax({
            datatype: 'json',
            url: '/TipoInspectorEmpDS/datoInspector',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                XTIPOINSPECTOR: dataItem.value
            }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                if (!data.rpta) {
                    errorAddModelo("divErrorTipoInspectorEmpDS", "ulListaErrorTipoInspectorEmpDS", data.errores);
                } else {
                    var l_TGENM_INSPECTOR = data.l_TGENM_INSPECTOR;

                    var lInspector = [];
                    $.each(l_TGENM_INSPECTOR, function (index, value) {
                        var oInspector = {
                            value: value.XIDINSPECTOR,
                            text: value.XNOMBRECOMPLETO
                        }
                        lInspector.push(oInspector);
                    });
                    $("#XINSPECTOR").data("kendoComboBox").value('');
                    var multiselect = $("#XINSPECTOR").data("kendoComboBox");
                    console.log(lInspector);
                    multiselect.setDataSource(lInspector);
                }

                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            desbloqObject();
        });

    }

}

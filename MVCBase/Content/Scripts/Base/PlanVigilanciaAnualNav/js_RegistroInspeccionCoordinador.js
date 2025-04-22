var contDepartamento = 0;
var contProvincia = 0;

$(document).ready(function () {

    $("#XID_MES").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        }
    });

    $("#XID_ESTADO_PLAN_VIGI_ANUALDS").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        }
    });

    $("#XID_TIPO_INSPECCION").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        }
    });

    $("#btnGuardarInspeccionProgramada").click(function () {
        if (validRegistroInspección()) {
            var o_T_Genm_Plan_Vigi_Anual_DS = {
                XID_PLAN_VIGI_ANUAL_DS: $("#XID_PLAN_VIGI_ANUAL_DS").val(),
                XID_PLAN_VIGILANCIA_DS: $("#XID_PLAN_VIGILANCIA_DS").val(),
                XID_ANO: $("#XID_ANO").val(),
                XID_DIRECCION_COORDINACION: $("#XID_DIRECCION_COORDINACION").val(),
                XID_MES: $.trim($("#XID_MES").data("kendoComboBox").value()),
                FLG_NACIONAL: true,
                XID_TIPO_LUGAR_DS: "",
                XID_ESTADO_PLAN_VIGI_ANUALDS: "",
                FLG_PLANIFICADO: false,
                FLG_CUMPLIDO: false,
                XID_COORDITECGIRO_TIPINSPEC: $("#XID_COORDITECGIRO_TIPINSPEC").val(),
                XID_TIPO_INSPECCION: $.trim($("#XID_TIPO_INSPECCION").data("kendoComboBox").value()),
                XID_COORDINACIONTEC_GIRO: $("#XID_COORDINACIONTEC_GIRO").val(),
                XID_GIRO: $.trim($("#XID_GIRO").data("kendoComboBox").value()),
                XID_LUGAR: "",
                XID_DISTRITO: "",
                XID_TIPO_ACTIVIDAD_DS: "0",
                XID_HABILITACION: "0",
                XID_PERSONA_JURIDICA: $.trim($("#XID_PERSONA_JURIDICA").data("kendoComboBox").value()),
                XID_COORDINACION_TECNICA: "0",
                FLG_ESTADO: true
            }
            
            $.ajax({
                datatype: 'json',
                contentType: "application/json",
                url: '/PlanVigilanciaAnualNav/RegistroInspeccionCoordinador',
                type: 'POST',
                data: JSON.stringify({ o_T_Genm_Plan_Vigi_Anual_DS: o_T_Genm_Plan_Vigi_Anual_DS }),
                beforeSend: function () {
                    bloquoteModal();
                },
                success: function (data) {
                    desbloqModal();
                    if (!data.rpta) {
                        errorAddModelo("divError", "ulListaError", data.errores);
                    } else {
                        $("#btnFiltroPlanVigilanciaAnual").click();
                        try{
                            $('#gridConsultaBandejaEmpresa').data('kendoGrid').dataSource.read();
                            $('#gridConsultaBandejaEmpresa').data('kendoGrid').refresh();
                        } catch (e) { }
                        modalClose("");
                    }
                    
                }
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                console.log("Request Failed: " + err);
            });
        }
    });
});

function validRegistroInspección() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#XID_MES").data("kendoComboBox").value() == null || $("#XID_MES").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XID_MES_listbox"]').parents("span").addClass("valError");
        objData.push({ "XID_MES": [{ ErrorMessage: "Debe seleccionar el mes" }] })
    }
    if ($("#XID_TIPO_INSPECCION").data("kendoComboBox").value() == null || $("#XID_TIPO_INSPECCION").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XID_TIPO_INSPECCION_listbox"]').parents("span").addClass("valError");
        objData.push({ "XID_TIPO_INSPECCION": [{ ErrorMessage: "Debe seleccionar el tipo de inspección" }] })
    }

    if (flg) {
        $("#divError").hide();
    }
    else {
        errorAddJS("divError", "ulListaError", objData)
    }
    return flg;
}
function GetValorTipoLugar(valor) {
    var dato = "";
    if ($("#ValAerodromo").val() == valor) {
        dato = $("#XAERODROMO").data("kendoComboBox").value()
    }
    if ($("#ValHelipuerto").val() == valor) {
        dato = $("#XHELIPUERTO").data("kendoComboBox").value()
    }

    return dato;
}
function changeTipoLugar(valor) {
    $(".cbTipoLugar").hide();
    if ($("#ValAerodromo").val() == valor) {
        $("#DivAerodromo").show();
    }
    if ($("#ValHelipuerto").val() == valor) {
        $("#DivHelipuerto").show();
    }
    if ($("#ValUbigeo").val() == valor) {
        $("#DivUbigeo").show();
    }
}
function loadProvincia(valor) {
    $.ajax({
        datatype: 'json',
        url: '/PlanVigilanciaAnualNav/CargarProvincia?Index=' + valor,
        contentType: "application/json",
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            var l_Provincia = data.l_Provincia

            var lObjeto = [];
            lObjeto.push({
                value: "",
                text: "[SELECCIONE]"
            });
            $.each(l_Provincia, function (index, value) {
                var Objeto = {
                    value: value.XPROVINCIA,
                    text: value.DESCRIPCION
                }
                lObjeto.push(Objeto);
            });

            $("#XPROVINCIA").data("kendoComboBox").value("");
            $("#XPROVINCIA").data("kendoComboBox").text("");

            $("#XID_DISTRITO").data("kendoComboBox").value("");
            $("#XID_DISTRITO").data("kendoComboBox").text("");

            var combo = $("#XPROVINCIA").data("kendoComboBox");
            combo.setDataSource(lObjeto);

            var combo1 = $("#XID_DISTRITO").data("kendoComboBox");
            combo1.enable(false);

            contDepartamento = 0;
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });
}
function loadDistrito(valor) {
    $.ajax({
        datatype: 'json',
        url: '/PlanVigilanciaAnualNav/CargarDistrito?Index=' + valor,
        contentType: "application/json",
        beforeSend: function () {
            bloquoteObject();
        },
        success: function (data) {
            var l_Distrito = data.l_Distrito

            var lObjeto = [];
            lObjeto.push({
                value: "",
                text: "[SELECCIONE]"
            });
            $.each(l_Distrito, function (index, value) {
                var Objeto = {
                    value: value.XDISTRITO,
                    text: value.DESCRIPCION
                }
                lObjeto.push(Objeto);
            });
            var combo = $("#XID_DISTRITO").data("kendoComboBox");
            combo.setDataSource(lObjeto);
            combo.enable(true);
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });
}
function onSelectTipoLugar(e) {
    var dataItem = this.dataItem(e.item);
    if (dataItem.value != "" && dataItem.value != null) {
        changeTipoLugar(dataItem.value);
    }
}
function onSelectDepartamento(e) {
    if (contDepartamento == 0) {
        var dataItem = this.dataItem(e.item);
        if (dataItem.value != "" && dataItem.value != null) {
            contDepartamento++;
            loadProvincia(dataItem.value);
        }
    }
}
function onSelectProvincia(e) {
    var dataItem = this.dataItem(e.item);
    if (dataItem.value != "" && dataItem.value != null) {
        loadDistrito(dataItem.value);
    }
}

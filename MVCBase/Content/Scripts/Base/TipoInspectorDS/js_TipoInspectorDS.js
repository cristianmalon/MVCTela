$(document).ready(function () {

    $("#XCOORDINACION_TECNICA").kendoDropDownList({
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

function validDatosTipoInspectorDS() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }
    if ($("#DESCRIPCION_CORTA").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION_CORTA": [{ ErrorMessage: "Debe ingresar la abreviatura" }] })
    }
    if ($("#XCOORDINACION_TECNICA").data("kendoDropDownList").value() == "") {
        flg = false;
        $('[aria-owns="XCOORDINACION_TECNICA_listbox"]').addClass("valError");
        objData.push({ "XCOORDINACION_TECNICA": [{ ErrorMessage: "Debe seleccionar la coordinación técnica" }] })
    }
    if (flg) {
        $("#divErrorTipoInspectorDS").hide();
    }
    else {
        $("#divErrorTipoInspectorDS").html('<strong>No se puede grabar</strong><ul id="ulListaErrorTipoInspectorDS"></ul>');
        errorAddJS("divErrorTipoInspectorDS", "ulListaErrorTipoInspectorDS", objData)
    }

    return flg;
}


$("#btnRegistrarTipoInspectorDS").bind("click", function () {


    if (validDatosTipoInspectorDS()) {


        var T_MAE_TIPO_INSPECTOR_DS = {
            ID_TIPO_INSPECTOR_DS: 0,
            DESCRIPCION: $("#DESCRIPCION").val().trim(),
            DESCRIPCION_CORTA: $("#DESCRIPCION_CORTA").val().trim(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: null,
            FEC_REG: null,
            ID_USUARIO_ACT: null,
            FEC_ACT: null,
            XTIPO_INSPECTOR_DS: $("#XTIPO_INSPECTOR_DS").val().trim(),
            XCOORDINACION_TECNICA: $("#XCOORDINACION_TECNICA").data("kendoDropDownList").value()

        }

        console.log(T_MAE_TIPO_INSPECTOR_DS);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/TipoInspectorDS/SaveRegistroTipoInspectorDS',
            type: 'POST',
            data: JSON.stringify({ objTipoInspectorDS: T_MAE_TIPO_INSPECTOR_DS }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorTipoInspectorDS", "ulListaErrorTipoInspectorDS", data.errores);
                } else {
                    //console.log(data.newcontregistro);

                    $("#contenedor").modal('hide');
                    cargarGridTipoInspectorDS();

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
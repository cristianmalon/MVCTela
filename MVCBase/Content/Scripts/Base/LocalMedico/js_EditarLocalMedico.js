$(document).ready(function () {


    if ($("#FLG_EDITAR").val() != "False") { 
        $("#XID_TIPO_CENTRO_MEDICO").css({ "width": "100%", "height": "auto" }).kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            change: function () {
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
            },
        });
    }

    

});

function validDatosLocalMedico() {
    $(".valError").removeClass("valError");
    ExprEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION": [{ ErrorMessage: "Debe ingresar la descripción" }] })
    }

    if ($("#FLG_EDITAR").val() == "True") {
        if ($("#XID_TIPO_CENTRO_MEDICO").data("kendoComboBox").value() == null || $("#XID_TIPO_CENTRO_MEDICO").data("kendoComboBox").value() == "") {
            flg = false;
            $('[aria-owns="XID_TIPO_CENTRO_MEDICO_listbox"]').parents("span").addClass("valError");
            objData.push({ "XID_TIPO_CENTRO_MEDICO": [{ ErrorMessage: "Debe seleccionar un centro médico" }] })
        }
    }

    
    if (!ExprEmail.test($("#EMAIL_RESPONSABLE").val())) {
        flg = false;
        objData.push({ "EMAIL_RESPONSABLE": [{ ErrorMessage: "La direccion de correo es incorrecta" }] })
    }

    if (flg) {
        $("#divErrorLocalMedico").hide();
    }
    else {
        $("#divErrorLocalMedico").html('<strong>No se puede grabar</strong><ul id="ulListaErrorLocalMedico"></ul>');
        errorAddJS("divErrorLocalMedico", "ulListaErrorLocalMedico", objData)
    }

    return flg;
}


$("#btnRegistrarLocalMedico").bind("click", function () {


    if (validDatosLocalMedico()) {

        var cbCentroMedico = $("#XID_TIPO_CENTRO_MEDICO").data("kendoComboBox");

        if ($("#FLG_EDITAR").val() == "True") {
            var T_MAE_LOCAL_MEDICO = {
                ID_LOCAL_MEDICO: 0,
                DESCRIPCION: $("#DESCRIPCION").val().trim(),
                XID_TIPO_CENTRO_MEDICO: cbCentroMedico.value(),
                EMAIL_RESPONSABLE: $("#EMAIL_RESPONSABLE").val().trim(),
                FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
                ID_USUARIO_REG: null,
                FEC_REG: null,
                ID_USUARIO_ACT: null,
                FEC_ACT: null,
                XID_LOCAL_MEDICO: $("#XID_LOCAL_MEDICO").val().trim()

            }
        } else {

            var T_MAE_LOCAL_MEDICO = {
                ID_LOCAL_MEDICO: 0,
                DESCRIPCION: $("#DESCRIPCION").val().trim(),
                XID_TIPO_CENTRO_MEDICO: $("#XID_TIPO_CENTRO_MEDICO").val().trim(),
                EMAIL_RESPONSABLE: $("#EMAIL_RESPONSABLE").val().trim(),
                FLG_ESTADO: $("#FLG_ESTADO").val().trim(),
                //FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
                ID_USUARIO_REG: null,
                FEC_REG: null,
                ID_USUARIO_ACT: null,
                FEC_ACT: null,
                XID_LOCAL_MEDICO: $("#XID_LOCAL_MEDICO").val().trim()

            }
        }
        

        console.log(T_MAE_LOCAL_MEDICO);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/LocalMedico/SaveLocalMedico',
            type: 'POST',
            data: JSON.stringify({ objLocalMedico: T_MAE_LOCAL_MEDICO }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorLocalMedico", "ulListaErrorLocalMedico", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridLocalMedico();

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
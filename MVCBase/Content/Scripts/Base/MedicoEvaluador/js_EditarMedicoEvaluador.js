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

function validDatosMedicoEvaluador() {
    $(".valError").removeClass("valError");

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

 


    if (flg) {
        $("#divErrorMedicoEvaluador").hide();
    }
    else {
        $("#divErrorMedicoEvaluador").html('<strong>No se puede grabar</strong><ul id="ulListaErrorMedicoEvaluador"></ul>');
        errorAddJS("divErrorMedicoEvaluador", "ulListaErrorMedicoEvaluador", objData)
    }

    return flg;
}


$("#btnRegistrarMedicoEvaluador").bind("click", function () {


    if (validDatosMedicoEvaluador()) {

        //var formData = new FormData();

        //var totalFiles = document.getElementById("Pic").files.length;

        //for (var i = 0; i < totalFiles; i++) {
        //    var file = document.getElementById("Pic").files[i];
        //    formData.append("Documento_Adjunto", file);
        //}
        //console.log("archivo:" + formData);



        //alert(1);

        var cbCentroMedico = $("#XID_TIPO_CENTRO_MEDICO").data("kendoComboBox");

        if ($("#FLG_EDITAR").val() == "True") {
            var T_MAE_MEDICO_EVALUADOR = {
                ID_MEDICO_EVALUADOR: 0,
                DESCRIPCION: $("#DESCRIPCION").val().trim(),
                XID_TIPO_CENTRO_MEDICO: cbCentroMedico.value(),
                CARGO: $("#CARGO").val().trim(),
                RANGO: $("#RANGO").val().trim(),
                FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
                ID_USUARIO_REG: null,
                FEC_REG: null,
                ID_USUARIO_ACT: null,
                FEC_ACT: null,
                XID_MEDICO_EVALUADOR: $("#XID_MEDICO_EVALUADOR").val().trim()

            }
        } else {

            var T_MAE_MEDICO_EVALUADOR = {
                ID_MEDICO_EVALUADOR: 0,
                DESCRIPCION: $("#DESCRIPCION").val().trim(),
                XID_TIPO_CENTRO_MEDICO: $("#XID_TIPO_CENTRO_MEDICO").val().trim(),
                CARGO: $("#CARGO").val().trim(),
                RANGO: $("#RANGO").val().trim(),
                FLG_ESTADO: $("#FLG_ESTADO").val().trim(),
                //FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
                ID_USUARIO_REG: null,
                FEC_REG: null,
                ID_USUARIO_ACT: null,
                FEC_ACT: null,
                XID_MEDICO_EVALUADOR: $("#XID_MEDICO_EVALUADOR").val().trim()

            }
        }


        console.log(T_MAE_MEDICO_EVALUADOR);

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/MedicoEvaluador/SaveMedicoEvaluador',
            type: 'POST',
            data: JSON.stringify({ objMedicoEvaluador: T_MAE_MEDICO_EVALUADOR }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                console.log(data);
                if (!data.rpta) {
                    errorAddModelo("divErrorMedicoEvaluador", "ulListaErrorMedicoEvaluador", data.errores);
                } else {

                    $("#contenedor").modal('hide');
                    cargarGridMedicoEvaluador();

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
$(document).ready(function () {

    $("#btnRegistrarRechazarEvalMedica").bind("click", function () {


        if (validRechazoEvaluacion()) {


            var T_GENM_RES_EVAL_EXAMEN = {
                ID_RES_EVAL_EXAMEN: 0,
                DESCRIPCION_SITUACION_ESTADO: $("#DESCRIPCION_SITUACION_ESTADO").val().trim(),
                ID_USUARIO_REG: null,
                FEC_REG: null,
                ID_USUARIO_ACT: null,
                FEC_ACT: null,
                XID_RES_EVAL_EXAMEN: $("#XID_RES_EVAL_EXAMEN").val().trim()

            }

            console.log(T_GENM_RES_EVAL_EXAMEN);

            $.ajax({
                datatype: 'json',
                contentType: "application/json",
                url: '/EvaluacionMedica/SaveRechazarEvaluacionMedica',
                type: 'POST',
                data: JSON.stringify({ objRechazarEvaluacion: T_GENM_RES_EVAL_EXAMEN }),
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {

                    console.log(data);
                    if (!data.rpta) {
                        errorAddModelo("divErrorRechazarEvalMedica", "ulListaErrorRechazarEvalMedica", data.errores);
                    } else {
                        //console.log(data.newcontregistro);

                        $("#contenedor").modal('hide');
                        $("#reporteSinAsociar").html('');
                        $("#reporteAsociado").html('');
                        $("#reporteRechazado").html('');
                        cargarGridEvaluacionMedica();

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
});


function validRechazoEvaluacion() {
    $(".valError").removeClass("valError");
    var objData = [];
    var flg = true;

    if ($("#DESCRIPCION_SITUACION_ESTADO").val().trim() == "") {
        flg = false;
        objData.push({ "DESCRIPCION_SITUACION_ESTADO": [{ ErrorMessage: "Debe ingresar la observación" }] })
    }
    if (flg) {
        $("#divErrorRechazarEvalMedica").hide();
    }
    else {
        $("#divErrorRechazarEvalMedica").html('<strong>No se puede grabar</strong><ul id="ulListaErrorRechazarEvalMedica"></ul>');
        errorAddJS("divErrorRechazarEvalMedica", "ulListaErrorRechazarEvalMedica", objData)
    }

    return flg;
}


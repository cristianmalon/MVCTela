$(document).ready(function () {
    $("#XFECHA_LIMITE_MODIFICACION").kendoDatePicker();
    $("#btnGuardarPlanVigilancia").click(function () {
        var o_T_Genm_Plan_Vigilancia_DS = {
            XID_PLAN_VIGILANCIA_DS: $("#XID_PLAN_VIGILANCIA_DS").val(),
            XID_ESTADO_PLANVIGILANCIA_DS: $("#XID_ESTADO_PLANVIGILANCIA_DS option:selected").val(),
            XID_ANO: $("#XID_ANO option:selected").val(),
            FLG_ESTADO: $('#FLG_ESTADO').is(':checked') == true ? true : false,
            ID_USUARIO_REG: $("#ID_USUARIO_REG").val(),
            FEC_REG: $("#FEC_REG").val(),
            ID_USUARIO_ACT: $("#ID_USUARIO_ACT").val(),
            FEC_ACT: $("#FEC_ACT").val(),
            XFECHA_LIMITE_MODIFICACION: $("#XFECHA_LIMITE_MODIFICACION").val()
        };

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/PlanVigilanciaAnualOps/Save',
            type: 'POST',
            data: JSON.stringify({ o_T_Genm_Plan_Vigilancia_DS: o_T_Genm_Plan_Vigilancia_DS }),
            beforeSend: function () {

            },
            success: function (data) {
                if (!data.rpta) {
                    errorAddModelo("divError", "ulListaError", data.errores);
                } else {
                    window.location = window.location;
                }
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
        });
    });

});

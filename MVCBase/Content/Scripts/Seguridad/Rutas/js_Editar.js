
$(document).ready(function () {
    debugger;
    CargarCombos();

    $("#frmRegistrarRutas").find("select[id='SISTEMAKey']").on("change", function (e) {
        debugger;
        var cboTipoPedido = this;

        var cboRUTAS_PADREKey = $("#frmRegistrarRutas").find("select[id='RUTAS_PADREKey']");


        var idRUTAS_PADREKey = $("#frmRegistrarRutas").find("input[id='idRUTAS_PADREKey']").val();

        cboRUTAS_PADREKey.empty();

        var param = JSON.stringify({
            SISTEMAKey: $(cboTipoPedido).val()
        });
        MethodPost("/Rutas/ListRutaPadre", param, "application/json")
            .done(function (response) {
                debugger;
                $(cboRUTAS_PADREKey).append('<option value = "">-- SELECCIONAR --</option>');
                if (!response.Success) {
                    
                    $.each(response.response, function (i, item) {
                        if (idRUTAS_PADREKey == item.IdTipoEmpaque) {
                            $(cboRUTAS_PADREKey).append('<option value="' + item.SerialKey + '" selected>' + item.DESCRIPCION + '</option>');
                        } else {
                            $(cboRUTAS_PADREKey).append('<option value="' + item.SerialKey + '">' + item.DESCRIPCION + '</option>');
                        }

                    });
                    $("#frmRegistrarRutas").find("input[id='IdTipoEmpaque']").val(0);
                    $(cboRUTAS_PADREKey).kendoDropDownList();
                } else {
                    $(cboRUTAS_PADREKey).kendoDropDownList();
                }
                desbloqObject();
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                if (jqxhr.status != 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'SISTEMA',
                        text: `${err}`,
                    });
                }

                desbloqObject();
                return false;
            });
    }).change();
});


function CargarCombos() {
    $("#SISTEMAKey").kendoDropDownList({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

    $("#RUTAS_TIPOKey").kendoDropDownList({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

    $("#RUTAS_PADREKey").kendoDropDownList({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

    $("#ESTADO").kendoDropDownList({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

   
}
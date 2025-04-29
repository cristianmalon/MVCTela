function reset() {
    $("#NUMERO_DOCUMENTO").val("");
    $("#APELLIDO_PATERNO").val("");
    $("#APELLIDO_MATERNO").val("");
    $("#NOMBRES").val("");
    $("#CORREO").val("");
    $("#TELEFONO").val("");
    $("#DIRECCION").val("");
    $("#OCUPACION").val("");
    $("#OBSERVACION").val("");
    $("#XFECHA_NACIMIENTO").data("kendoDatePicker").value("");
    $("#XDEPARTAMENTO").data("kendoComboBox").enable(false);
    $("#XPROVINCIA").data("kendoComboBox").enable(false);
    $("#XDISTRITO").data("kendoComboBox").enable(false);
}

$(function () {
    $(".kComboBox").css("width", "100%").kendoComboBox();

    $("#XFECHA_NACIMIENTO").css("width", "100%").kendoDatePicker();

    $("#PESO").css("width", "100%").kendoNumericTextBox({
        format: "#.0 kg",
        min: 0
    });

    $("#ESTATURA").css("width", "100%").kendoNumericTextBox({
        format: "#.00 m",
        min: 0
    });

    $("#XDEPARTAMENTO").css("width", "100%").kendoComboBox({
        dataTextField: "DESCRIPCION",
        dataValueField: "XDEPARTAMENTO",
        change: function () {
            var options = [{
                XDISTRITO: "",
                DESCRIPCION: "[SELECCIONE]"
            }];
            var select = $("#XDISTRITO").data("kendoComboBox");
            select.setDataSource(options);
            select.value([]);
        },
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            $.ajax({
                dataType: "json",
                url: "/PersonalAeronautico/ListarProvincia",
                data: {
                    XDEPARTAMENTO: dataItem.XDEPARTAMENTO
                },
                success: function (data) {
                    var options = [{
                        XPROVINCIA: "",
                        DESCRIPCION: "[SELECCIONE]"
                    }];
                    $.each(data, function (i, item) {
                        var option = {
                            XPROVINCIA: item.XPROVINCIA,
                            DESCRIPCION: item.DESCRIPCION
                        }
                        options.push(option)
                    });
                    var select = $("#XPROVINCIA").data("kendoComboBox");
                    select.setDataSource(options);
                    select.value([]);
                }
            });
        }
    });

    $("#XPROVINCIA").css("width", "100%").kendoComboBox({
        dataTextField: "DESCRIPCION",
        dataValueField: "XPROVINCIA",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            $.ajax({
                dataType: "json",
                url: "/PersonalAeronautico/ListarDistrito",
                data: {
                    XPROVINCIA: dataItem.XPROVINCIA
                },
                success: function (data) {
                    var options = [{
                        XDISTRITO: "",
                        DESCRIPCION: "[SELECCIONE]"
                    }];
                    $.each(data, function (i, item) {
                        var option = {
                            XDISTRITO: item.XDISTRITO,
                            DESCRIPCION: item.DESCRIPCION
                        }
                        options.push(option)
                    });

                    var select = $("#XDISTRITO").data("kendoComboBox");
                    select.setDataSource(options);
                    select.value([]);
                }
            });
        }
    });

    $("#XDISTRITO").css("width", "100%").kendoComboBox({
        dataTextField: "DESCRIPCION",
        dataValueField: "XDISTRITO"
    });

    //$("#RENIEC").click(function () {
    //    $.ajax({
    //        dataType: "json",
    //        url: "/PersonalAeronautico/ServicioReniec",
    //        data: {
    //            NUMERO_DOCUMENTO: $("#NUMERO_DOCUMENTO").val()
    //        },
    //        success: function (data) {
    //            if (!data.rpta) {
    //                bootbox.alert("EL SERVICIO CON LA RENIEC NO ESTA LEVANTADO<br> POR FAVOR CONTINUE RELLENANDO LO CAMPOS MANUALMENTE.");
    //                $("#APELLIDO_PATERNO").prop("disabled", false);
    //                $("#APELLIDO_MATERNO").prop("disabled", false);
    //                $("#NOMBRES").prop("disabled", false);
    //                $("#ID_TIPO_GENERO").data("kendoComboBox").enable(true);
    //                $("#ID_TIPO_ESTADO_CIVIL").data("kendoComboBox").enable(true);
    //                $("#XFECHA_NACIMIENTO").data("kendoDatePicker").enable(true);
    //                $("#ID_PAIS").data("kendoComboBox").enable(true);
    //                $("#ID_NACIONALIDAD").data("kendoComboBox").enable(true);
    //                $("#XDEPARTAMENTO").data("kendoComboBox").enable(true);
    //                $("#XPROVINCIA").data("kendoComboBox").enable(true);
    //                $("#XDISTRITO").data("kendoComboBox").enable(true);
    //            } else {
    //                // SI NO HAY ERRO CARGAMOS LA APLICACION
    //            }
    //        }
    //    });
    //});

    
    $("#EDITAR_PERSONAL").submit(function (e) {
        e.preventDefault();
        $.ajax({
            dataType: "json",
            url: "/PersonalAeronautico/GuadarPersonal",
            data: $(this).serialize(),
            success: function (data) {
                if (!data.rpta) {
                    errorAddModelo("divError", "ulListaError", data.errores);
                } else {
                    location.reload();
                }
            }
        });
    });
});
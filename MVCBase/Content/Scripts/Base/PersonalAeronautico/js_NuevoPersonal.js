function reset() {
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
    $("#XFECHA_NACIMIENTO").data("kendoDatePicker").value("");

    $("#PESO").css("width", "100%").kendoNumericTextBox({
        format: "#.0 kg",
        min: 0
    });

    $("#ESTATURA").css("width", "100%").kendoNumericTextBox({
        format: "#.00 m",
        min: 0
    });

    $("#ID_PAIS").css("width", "100%").kendoComboBox({
        dataTextField: "DESCRIPCION",
        dataValueField: "ID_PAIS",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            if (dataItem.ID_PAIS == 1) {
                $("#XDEPARTAMENTO").data("kendoComboBox").enable();
                $("#XPROVINCIA").data("kendoComboBox").enable();
                $("#XDISTRITO").data("kendoComboBox").enable();
            } else {
                $("#XDEPARTAMENTO").data("kendoComboBox").enable(false);
                $("#XPROVINCIA").data("kendoComboBox").enable(false);
                $("#XDISTRITO").data("kendoComboBox").enable(false);
            }
        }
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

    $("#RENIEC").click(function () {
        var DNI = $.trim($("#NUMERO_DOCUMENTO").val());
        if (DNI == "") {
            bootbox.alert("<b>Numero de documento no valido.</b>");
        } else {
            $.ajax({
                dataType: "json",
                url: "/PersonalAeronautico/ServicioReniec",
                data: {
                    NUMERO_DOCUMENTO: DNI
                },
                success: function (data) {
                    if (true/*!data.rpta*/) {
                        reset();
                        bootbox.alert("EL SERVICIO CON LA RENIEC NO ESTA LEVANTADO<br> POR FAVOR CONTINUE RELLENANDO LO CAMPOS MANUALMENTE.");
                        $("#APELLIDO_PATERNO").prop("readonly", false);
                        $("#APELLIDO_MATERNO").prop("readonly", false);
                        $("#NOMBRES").prop("readonly", false);
                        $("#ID_TIPO_GENERO").data("kendoComboBox").enable();
                        $("#ID_TIPO_ESTADO_CIVIL").data("kendoComboBox").enable();
                        $("#ID_PAIS").data("kendoComboBox").enable();
                        $("#ID_NACIONALIDAD").data("kendoComboBox").enable();
                        $("#XDEPARTAMENTO").data("kendoComboBox").enable();
                        $("#XPROVINCIA").data("kendoComboBox").enable();
                        $("#XDISTRITO").data("kendoComboBox").enable();
                    } else {
                        var PERSONA_NATURAL = data.data;
                        $("#APELLIDO_PATERNO").val(PERSONA_NATURAL.APELLIDO_PATERNO);
                        $("#APELLIDO_MATERNO").val(PERSONA_NATURAL.APELLIDO_MATERNO);
                        $("#NOMBRES").val(PERSONA_NATURAL.NOMBRE);
                        $("#CORREO").val(PERSONA_NATURAL.CORREO);
                        $("#TELEFONO").val(PERSONA_NATURAL.TELEFONO);
                        $("#ID_TIPO_GENERO").data("kendoComboBox").value(PERSONA_NATURAL.ID_TIPO_GENERO);
                        $("#ID_TIPO_ESTADO_CIVIL").data("kendoComboBox").value(PERSONA_NATURAL.ID_TIPO_ESTADO_CIVIL);
                        $("#ID_PAIS").data("kendoComboBox").value(PERSONA_NATURAL.ID_PAIS);
                        $("#ID_NACIONALIDAD").data("kendoComboBox").value(PERSONA_NATURAL.ID_NACIONALIDAD);
                        $("#XFECHA_NACIMIENTO").data("kendoDatePicker").value(PERSONA_NATURAL.XFECHA_NACIMIENTO);
                        $("#XDEPARTAMENTO").data("kendoComboBox").value(PERSONA_NATURAL.XDEPARTAMENTO);
                        $("#XPROVINCIA").data("kendoComboBox").value(PERSONA_NATURAL.XPROVINCIA);
                        $("#XDISTRITO").data("kendoComboBox").value(PERSONA_NATURAL.XDISTRITO);
                    }
                }
            });
        }
    });

    $("#ID_TIPO_DOCUMENTO").css("width", "100%").kendoComboBox({
        dataTextField: "DESCRIPCION",
        dataValueField: "ID_TIPO_DOCUMENTO",
        select: function (e) {
            reset();
            $("#NUMERO_DOCUMENTO").val("");
            var dataItem = this.dataItem(e.item.index());
            if (dataItem.ID_TIPO_DOCUMENTO == 1) {
                $("#RENIEC").prop("disabled", false);
                $("#APELLIDO_PATERNO").prop("readonly", true);
                $("#APELLIDO_MATERNO").prop("readonly", true);
                $("#NOMBRES").prop("readonly", true);
                $("#ID_TIPO_GENERO").data("kendoComboBox").enable();
                $("#ID_TIPO_ESTADO_CIVIL").data("kendoComboBox").enable();
                $("#ID_PAIS").data("kendoComboBox").enable();
                $("#ID_NACIONALIDAD").data("kendoComboBox").enable();
            } else {
                $("#RENIEC").prop("disabled", true);
                $("#APELLIDO_PATERNO").prop("readonly", false);
                $("#APELLIDO_MATERNO").prop("readonly", false);
                $("#NOMBRES").prop("readonly", false);
                $("#ID_TIPO_GENERO").data("kendoComboBox").enable();
                $("#ID_TIPO_ESTADO_CIVIL").data("kendoComboBox").enable();
                $("#ID_PAIS").data("kendoComboBox").enable();
                $("#ID_NACIONALIDAD").data("kendoComboBox").enable();
            }
        }
    });

    $("#NUEVO_PERSONAL").submit(function (e) {
        e.preventDefault();
        $.ajax({
            dataType: "json",
            url: "/PersonalAeronautico/GuadarPersonal",
            data: $(this).serialize(),
            success: function (data) {
                if (!data.rpta) {
                    errorAddModelo("divError", "ulListaError", data.errores);
                } else {
                    $(location).attr("href", "/PersonalAeronautico/Index");
                }
            }
        });
    });
});
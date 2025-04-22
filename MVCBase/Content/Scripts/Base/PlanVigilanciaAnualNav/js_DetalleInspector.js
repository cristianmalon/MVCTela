$(document).ready(function () {
    $(window).load(function () {
        $("#XID_PERSONA_JURIDICA").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            select: onSelectEmpresa,
            filter: "contains",
            change: function () {
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
                else {
                    if ($.trim($("#XID_PERSONA_JURIDICA").data("kendoComboBox").value()) != "" && $("#XID_PERSONA_JURIDICA").data("kendoComboBox").value() != null) {
                        $.ajax({
                            datatype: 'json',
                            url: '/PlanVigilanciaAnualNav/DetalleCertificacion',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                Index: $.trim($("#XID_PERSONA_JURIDICA").data("kendoComboBox").value())
                            }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {

                                if (!data.rpta) {
                                    errorAddModelo("divErrorPlanAnual", "ulListaErrorPlanAnual", data.errores);
                                } else {
                                    $("#divDataEmpresa").show();
                                    $("#NumeroCertificado").html(data.NumeroCertificacion);
                                    $("#FechaCertificado").html(data.FechaCertificacion);

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

        $("#XID_GIRO").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            select: onSelectGiro,
            change: function () {
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
                else {
                    if ($.trim($("#XID_GIRO").data("kendoComboBox").value()) != "" && $("#XID_GIRO").data("kendoComboBox").value() != null) {
                        $.ajax({
                            datatype: 'json',
                            url: '/PlanVigilanciaAnualNav/GiroPersonaJuridicaInspector',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                Index: $.trim($("#XID_GIRO").data("kendoComboBox").value()),
                                Ano: $("#DESCRIPCION_ANO").val()
                            }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {

                                if (!data.rpta) {
                                    errorAddModelo("divErrorPlanAnual", "ulListaErrorPlanAnual", data.errores);
                                } else {
                                    var l_T_Genm_Persona_Juridica = data.data;
                                    $("#XID_PERSONA_JURIDICA").data("kendoComboBox").value("");
                                    $("#XID_PERSONA_JURIDICA").data("kendoComboBox").text("");
                                    $("#XID_PERSONA_JURIDICA").data("kendoComboBox").setDataSource();

                                    $("#divDataEmpresa").hide();
                                    var lObjeto = [];
                                    lObjeto.push({
                                        value: "",
                                        text: "[SELECCIONE]"
                                    });
                                    $.each(l_T_Genm_Persona_Juridica, function (index, value) {
                                        var Objeto = {
                                            value: value.XPERSONAJURIDICA,
                                            text: value.RAZON_SOCIAL
                                        }
                                        lObjeto.push(Objeto);
                                    });
                                    var multiselect = $("#XID_PERSONA_JURIDICA").data("kendoComboBox");
                                    multiselect.setDataSource(lObjeto);
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
        $("#FrmPlanVigilanciaAnual").on("click", ".InspeccionesProgramadasMes", function () {
            var array = $(this).attr("data-inspeccion").split('^');

            var Index = $(this).attr('data-month') + '^' + array[0] + '^' + $("#XID_ESTADO_FILTRO_DS").data("kendoComboBox").value();

            $.ajax({
                url: '/PlanVigilanciaAnualNav/DetalleMesInspector?Index=' + Index,
                type: "GET",
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {
                    desbloqObject();
                    $("#seccionListaInspecciones").html(data);
                    $("#modalListaInspeccionesContenedor").modal('show');
                }
            });

        });

        $("#FrmPlanVigilanciaAnual").on("click", ".objectDataProgramado", function () {
            $(".inputNumber").hide();
            $(".divDetail").show();
            $($(this).find("div")).each(function (index) {
                if ($(this).hasClass('inputNumber')) {
                    $(this).show();
                }
                else if ($(this).hasClass('divDetail')) {
                    $(this).hide();
                }
            });
        });
        var contBlur = 0;
        $("#FrmPlanVigilanciaAnual").on("blur", ".inputInspecciones", function () {
            var valObject = $(this).val();
            var InspObject = $(this).attr('data-inspeccion');
            var MonthObject = $(this).attr('data-month');

            contBlur++;
            if (contBlur == 1) {
                try {
                    if ($(this).val() >= 0) {

                        var o_T_Genm_Plan_Vigi_Anual_DS = {
                            XID_PLAN_VIGI_ANUAL_DS: "",
                            XID_PLAN_VIGILANCIA_DS: $("#XID_PLAN_VIGILANCIA_DS").val(),
                            XID_ANO: $("#XID_ANO").val(),
                            XID_DIRECCION_COORDINACION: "",
                            XID_MES: MonthObject,
                            FLG_NACIONAL: true,
                            XID_TIPO_LUGAR_DS: "",
                            XID_ESTADO_PLAN_VIGI_ANUALDS: "",
                            FLG_PLANIFICADO: false,
                            FLG_CUMPLIDO: false,
                            XID_COORDITECGIRO_TIPINSPEC: "0",
                            XID_TIPO_INSPECCION: InspObject,
                            XID_COORDINACIONTEC_GIRO: "0",
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
                            url: '/PlanVigilanciaAnualNav/RegistroInspeccionInspectorCantidad',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                Cantidad: valObject, o_T_Genm_Plan_Vigi_Anual_DS: o_T_Genm_Plan_Vigi_Anual_DS
                            }),
                            beforeSend: function () {
                                bloquoteModal();
                            },
                            success: function (data) {
                                if (!data.rpta) {
                                    bootbox.alert(data.errores);
                                } else {
                                    $("#btnFiltroPlanVigilanciaAnual").click();
                                }

                                desbloqModal();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            desbloqObject();
                        });

                        contBlur = 0;
                    }
                    else {
                        bootbox.alert('No puede ingresar un valor menor a cero o no numerico');
                        $("#btnFiltroPlanVigilanciaAnual").click();
                        contBlur = 0;
                    }
                }
                catch (err) {
                    bootbox.alert('No puede ingresar un valor menor a cero o no numerico');
                    $("#btnFiltroPlanVigilanciaAnual").click();
                    contBlur = 0;
                }

            }
        });

        $("#btnNotificarAprobacion").click(function () {
            $.ajax({
                datatype: 'json',
                url: '/PlanVigilanciaAnualNav/NotificacionCoordinador',
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify({
                    Giro: $.trim($("#XID_GIRO").data("kendoComboBox").value()),
                    PersonaJuridica: $.trim($("#XID_PERSONA_JURIDICA").data("kendoComboBox").value())
                }),
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {

                    if (!data.rpta) {
                        bootbox.alert(data.errores);
                    } else {
                        bootbox.alert(data.errores);
                    }
                    desbloqObject();
                }
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                desbloqObject();
            });
        });
        $("#XID_ESTADO_FILTRO_DS").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            select: onSelectEstado,
            change: function () {
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                } else {
                    $("#btnFiltroPlanVigilanciaAnual").click();
                }
            }
        });

        $("#XID_ESTADO_FILTRO_DS").data("kendoComboBox").value($("#XID_ESTADO_PLAN_ACTIVO").val());

        $("#btnFiltroPlanVigilanciaAnual").click(function () {
            if ($("#XID_GIRO").data("kendoComboBox").value() == null || $("#XID_GIRO").data("kendoComboBox").value() == "") {
                bootbox.alert("Debe seleccionar el giro");
            }
            else {
                if ($("#XID_PERSONA_JURIDICA").data("kendoComboBox").value() == null || $("#XID_PERSONA_JURIDICA").data("kendoComboBox").value() == "") {
                    bootbox.alert("Debe seleccionar la empresa");
                }
                else {
                    $.ajax({
                        datatype: 'json',
                        url: '/PlanVigilanciaAnualNav/FiltroPlanAnualInsp',
                        type: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify({
                            Giro: $.trim($("#XID_GIRO").data("kendoComboBox").value()),
                            PersonaJuridica: $.trim($("#XID_PERSONA_JURIDICA").data("kendoComboBox").value()),
                            Estado: $.trim($("#XID_ESTADO_FILTRO_DS").data("kendoComboBox").value()),
                            Plan: $.trim($("#XID_PLAN_VIGILANCIA_DS").val())
                        }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {

                            if (!data.rpta) {
                                bootbox.alert(data.message);
                            } else {
                                $("#HtmlWrap").html('');
                                $("#HtmlWrap").html(data.Str);
                                $("#FrmPlanVigilanciaAnual").show();
                            }
                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        desbloqObject();
                    });
                }
            }
        });

    });
});
function onSelectEstado(e) {
    $("#btnFiltroPlanVigilanciaAnual").click();
}
function onSelectEmpresa(e) {
    var dataItem = this.dataItem(e.item);
    if ($("#XID_PERSONA_JURIDICA option:selected").val().trim().length != 0 && $("#XID_PERSONA_JURIDICA option:selected").val() != null) {
        if (dataItem.value != "" && dataItem.value != null) {
            $.ajax({
                datatype: 'json',
                url: '/PlanVigilanciaAnualNav/DetalleCertificacion',
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify({
                    Index: $("#XID_PERSONA_JURIDICA option:selected").val()
                }),
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {

                    if (!data.rpta) {
                        errorAddModelo("divErrorPlanAnual", "ulListaErrorPlanAnual", data.errores);
                    } else {
                        $("#divDataEmpresa").show();
                        $("#NumeroCertificado").html(data.NumeroCertificacion);
                        $("#FechaCertificado").html(data.FechaCertificacion);
                    }
                    desbloqObject();
                }
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                desbloqObject();
            });
        }
    }
}
function onSelectGiro(e) {
    var dataItem = this.dataItem(e.item);
    if ($("#XID_GIRO option:selected").val().trim().length != 0 && $("#XID_GIRO option:selected").val() != null) {
        if (dataItem.value != "" && dataItem.value != null) {
            $.ajax({
                datatype: 'json',
                url: '/PlanVigilanciaAnualNav/GiroPersonaJuridicaInspector',
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify({
                    Index: $("#XID_GIRO option:selected").val(),
                    Ano: $("#DESCRIPCION_ANO").val()
                }),
                beforeSend: function () {
                    bloquoteObject();
                },
                success: function (data) {

                    if (!data.rpta) {
                        errorAddModelo("divErrorPlanAnual", "ulListaErrorPlanAnual", data.errores);
                    } else {
                        $("#XID_PERSONA_JURIDICA").data("kendoComboBox").value("");
                        $("#XID_PERSONA_JURIDICA").data("kendoComboBox").text("");
                        $("#XID_PERSONA_JURIDICA").data("kendoComboBox").setDataSource();

                        var l_T_Genm_Persona_Juridica = data.data;
                        $("#divDataEmpresa").hide();
                        var lObjeto = [];
                        lObjeto.push({
                            value: "",
                            text: "[SELECCIONE]"
                        });
                        $.each(l_T_Genm_Persona_Juridica, function (index, value) {
                            var Objeto = {
                                value: value.XPERSONAJURIDICA,
                                text: value.RAZON_SOCIAL
                            }
                            lObjeto.push(Objeto);
                        });
                        var multiselect = $("#XID_PERSONA_JURIDICA").data("kendoComboBox");
                        console.log(lObjeto);
                        multiselect.setDataSource(lObjeto);
                    }
                    desbloqObject();
                }
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ', ' + error;
                desbloqObject();
            });
        }
    }
}

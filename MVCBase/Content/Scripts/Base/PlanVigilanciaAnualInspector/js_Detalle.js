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
                            url: '/PlanVigilanciaAnualInspector/DetalleCertificacion',
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
                            url: '/PlanVigilanciaAnualInspector/GiroPersonaJuridica',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                Index: $.trim($("#XID_GIRO").data("kendoComboBox").value())
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
            var Index = $(this).attr('data-month') + '^' + $(this).attr("data-inspeccion");
            //modalAjaxRequestGet('/PlanVigilanciaAnual/DetalleMes', "modalListaInspecciones", "seccionListaInspecciones", 'Index=' + Index);
            $.ajax({
                url: '/PlanVigilanciaAnualInspector/DetalleMes?Index=' + Index,
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
                        url: '/PlanVigilanciaAnualInspector/FiltroPlanAnual',
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
function onSelectEmpresa(e) {
    var dataItem = this.dataItem(e.item);
    if ($("#XID_PERSONA_JURIDICA option:selected").val().trim().length != 0 && $("#XID_PERSONA_JURIDICA option:selected").val() != null) {
        if (dataItem.value != "" && dataItem.value != null) {
            $.ajax({
                datatype: 'json',
                url: '/PlanVigilanciaAnualInspector/DetalleCertificacion',
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
                url: '/PlanVigilanciaAnualInspector/GiroPersonaJuridica',
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify({
                    Index: $("#XID_GIRO option:selected").val()
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

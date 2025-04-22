$(document).ready(function () {
    $(window).load(function () {

        $("#ckAerodromo").click(function () {
            valCheckAerodromo($("#ckAerodromo").is(':checked'));
        });
        $("#XID_PERSONA_JURIDICA").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
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
                            url: '/PlanVigilanciaAnualAerodro/DetalleCertificacionCoordinador',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                Index: $.trim($("#XID_PERSONA_JURIDICA").data("kendoComboBox").value()),
                                Giro: $.trim($("#XID_GIRO").data("kendoComboBox").value())
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
                                    
                                    if (data.l_T_Mae_Aerodromo.length > 0) {
                                        $('#ckAerodromo').removeAttr('checked');
                                        $("#divAerodromo").show();
                                        var lObjeto = [];
                                        lObjeto.push({
                                            value: "",
                                            text: "[SELECCIONE]"
                                        });
                                        $.each(data.l_T_Mae_Aerodromo, function (index, value) {
                                            var Objeto = {
                                                value: value.XAERODROMO,
                                                text: value.DESCRIPCION
                                            }
                                            lObjeto.push(Objeto);
                                        });
                                        var multiselect = $("#XAERODROMO").data("kendoComboBox");
                                        multiselect.setDataSource(lObjeto);
                                    }
                                    else {
                                        $('#ckAerodromo').attr('checked', true);
                                        $("#divAerodromo").hide();
                                        var multiselect = $("#XAERODROMO").data("kendoComboBox");
                                        multiselect.setDataSource([]);
                                    }
                                    valCheckAerodromo($("#ckAerodromo").is(':checked'));
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
            //select: onSelectGiro,
            change: function () {
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
                else {
                    console.log("repetido");
                    if ($.trim($("#XID_GIRO").data("kendoComboBox").value()) != "" && $("#XID_GIRO").data("kendoComboBox").value() != null) {
                        $.ajax({
                            datatype: 'json',
                            url: '/PlanVigilanciaAnualAerodro/GiroPersonaJuridica',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                Index: $.trim($("#XID_GIRO").data("kendoComboBox").value())
                            }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                $("#FrmPlanVigilanciaAnual").hide();
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

        $("#XAERODROMO").kendoComboBox({
            placeholder: "[SELECCIONE]",
            dataTextField: "text",
            dataValueField: "value",
            filter: "contains",
            change: function () {
                var cmb = this;
                if (cmb.selectedIndex < 0) {
                    cmb.value('');
                }
            }
        });

        $("#btnAprobacionMasiva").click(function () {
            bootbox.confirm("¿Segúro de aprobar la inspección seleccionada?", function (result) {
                if (result) {
                    $.ajax({
                        datatype: 'json',
                        url: $("#btnAprobacionMasiva").attr('data-url'),
                        type: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify({
                            Giro: $.trim($("#XID_GIRO").data("kendoComboBox").value()),
                            PersonaJuridica: $.trim($("#XID_PERSONA_JURIDICA").data("kendoComboBox").value()),
                            Estado: $.trim($("#XID_ESTADO_FILTRO_DS").data("kendoComboBox").value())
                        }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {

                            if (!data.rpta) {
                                bootbox.alert(data.message);
                            } else {
                                $("#btnFiltroPlanVigilanciaAnual").click();
                                bootbox.alert('Se aprobaron las inspecciones ');
                            }
                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        desbloqObject();
                    });
                }
            });
        });

        $("#btnRegistrarNuevaInspeccionCo").click(function () {
            modalAjaxRequestGet2($(this).attr("data-url"), "", "", "Giro=" + $.trim($("#XID_GIRO").data("kendoComboBox").value()));
        });

        $("#FrmPlanVigilanciaAnual").on("click", ".InspeccionesProgramadasMes", function () {
            var array = $(this).attr("data-inspeccion").split('^');

            var Index = $(this).attr('data-month') + '^'
                            + array[0] + '^'
                            + $("#XID_ESTADO_FILTRO_DS").data("kendoComboBox").value() + '^'
                            + ($("#ckAerodromo").is(':checked') == false ? $.trim($("#XAERODROMO").data("kendoComboBox").value()) : '0^0^0') + '^'
                            + $.trim($("#XID_GIRO").data("kendoComboBox").value()) + '^'
                            ;

            $.ajax({
                url: '/PlanVigilanciaAnualAerodro/DetalleMesCoordinador?Index=' + Index,
                type: "GET",
                beforeSend: function () {
                    bloquoteModal();
                },
                success: function (data) {
                    desbloqModal();
                    $("#seccionListaInspecciones").html(data);
                    $("#modalListaInspeccionesContenedor").modal('show');
                }
            });

        });
        //
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

        $("#FrmPlanVigilanciaAnual").on("click", ".btnDesaprobacionMasivaInspeccion", function () {
            var valObject = $(this).val();
            var InspObject = $(this).attr('data-inspeccion');

            bootbox.confirm("¿Seguro de Desaprobar Todas las Inspecciones?", function (result) {
                if (result) {

                    bootbox.dialog({
                        title: "Desaprobar Inspecciones",
                        message: '<div class="row">  ' +
                            '<div class="col-md-12"> ' +
                            '<form class="form-horizontal"> ' +
                            '<div class="form-group"> ' +
                            '<label class="control-label asterisco" for="txtObservacion">Motivo de Desaprobación</label> ' +
                            '<div class="col-md-12"> ' +
                            ' <textarea class="form-control input-md" rows="5" id="txtObservacion"></textarea>' +
                            '</div> ' +
                            '</div>' +
                            '</form> </div>  </div>',
                        buttons: {
                            cancel: {
                                label: 'Cancelar',
                                className: 'btn-default btn-sm'
                            },
                            success: {
                                label: "Guardar",
                                className: "btn-primary btn-sm",
                                callback: function () {
                                    if ($.trim($("#txtObservacion").val()).length > 0) {

                                        var o_T_Genm_Plan_Vigi_Anual_DS = {
                                            XID_PLAN_VIGI_ANUAL_DS: "",
                                            XID_PLAN_VIGILANCIA_DS: $("#XID_PLAN_VIGILANCIA_DS").val(),
                                            XID_ANO: $("#XID_ANO").val(),
                                            XID_DIRECCION_COORDINACION: "",
                                            XID_MES: "",
                                            FLG_NACIONAL: true,
                                            XID_TIPO_LUGAR_DS: "",
                                            XID_ESTADO_PLAN_VIGI_ANUALDS: $.trim($("#XID_ESTADO_FILTRO_DS").data("kendoComboBox").value()),
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
                                            OBSERVACION_REPROGRAMADO: $.trim($("#txtObservacion").val()),
                                            FLG_ESTADO: true
                                        }

                                        $.ajax({
                                            datatype: 'json',
                                            url: '/PlanVigilanciaAnualAir/DesaprobarMasivoCoordinador',
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

                                    }
                                    else {
                                        bootbox.alert("Debe ingresar una observación");
                                        return false;
                                    }
                                }
                            }
                        }
                    });
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
                            FLG_ESTADO: true,
                            XID_AERODROMO: $.trim($("#XAERODROMO").data("kendoComboBox").value())
                        }


                        $.ajax({
                            datatype: 'json',
                            url: '/PlanVigilanciaAnualAerodro/RegistroInspeccionCoordinadorCantidad',
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
                                    $("#btnFiltroPlanVigilanciaAnual").click();
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
                    if ($("#ckAerodromo").is(':checked') == false && ($("#XAERODROMO").data("kendoComboBox").value() == null || $("#XAERODROMO").data("kendoComboBox").value() == "")) {
                        bootbox.alert("Debe seleccionar la empresa");
                    }
                    else {
                        loadGrilla();
                    }
                }
            }
        });

    });
});
function loadGrilla() {
    $.ajax({
        datatype: 'json',
        url: '/PlanVigilanciaAnualAerodro/FiltroPlanAnualCoord',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify({
            Giro: $.trim($("#XID_GIRO").data("kendoComboBox").value()),
            PersonaJuridica: $.trim($("#XID_PERSONA_JURIDICA").data("kendoComboBox").value()),
            Aerodromo: $.trim($("#XAERODROMO").data("kendoComboBox").value()),
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
                $("#badgeInspeccionesNoAprobadas").html($("#hdCantidadPorAprobar").val());
            }
            desbloqObject();
        }
    }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ', ' + error;
        desbloqObject();
    });
}
function valCheckAerodromo(flag) {
    console.log(flag);
    if (flag){
        $("#XAERODROMO").data("kendoComboBox").value("");
        $("#XAERODROMO").data("kendoComboBox").text("");
        $("#XAERODROMO").data("kendoComboBox").enable(false);
    }
    else {
        $("#XAERODROMO").data("kendoComboBox").enable(true);
    }
}
function onSelectEstado(e) {
    $("#btnFiltroPlanVigilanciaAnual").click();
}
function onSelectEmpresa(e) {
    var dataItem = this.dataItem(e.item);
    if ($("#XID_PERSONA_JURIDICA option:selected").val().trim().length != 0 && $("#XID_PERSONA_JURIDICA option:selected").val() != null) {
        if (dataItem.value != "" && dataItem.value != null) {
            $.ajax({
                datatype: 'json',
                url: '/PlanVigilanciaAnualAir/DetalleCertificacion',
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
                url: '/PlanVigilanciaAnualAir/GiroPersonaJuridica',
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

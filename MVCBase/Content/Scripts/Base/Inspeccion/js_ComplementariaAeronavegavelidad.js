$(document).ready(function () {
    $("#DivHelipuertoInicio").hide();
    $("#DivAerodromoInicio").hide();
    $("#DivHelipuertoFin").hide();
    $("#DivAerodromoFin").hide();
    $("#DivDepartamento").hide();
    $("#DivProvincia").hide();
    $("#DivDistrito").hide();
    $("#DivPais").hide();
    $("#DivCiudad").hide();
    $("#DivMatricula").hide();
    $("#DivTipoLugar").hide();
    $("#btnReiterativo").hide();
    $("#btnVerOficios").hide();

    inspecion = $("#XINSPECCION").val().trim();
    if (inspecion == "") {
        $("#FECHA_INSPECCION").val('');
        $("#btnGenerarOficio").hide();
    } else {
        ComboboxTipoLugar();
        $("#btnGenerarOficio").show();
        if ($('input[name=FLG_SATISFACTORIA]:checked').val() == "true") {
            $("#SeccionDiscrepancias").hide();
            $("#divobservacion").show()
        } else {
            $("#divobservacion").hide()
            $("#SeccionDiscrepancias").show();
            ConsultaDiscrepancia();
        }

    }

    $("#DivMatricula").show();
    $("#DivTipoLugar").show();
    
    if ($("#XVALIDADISCREP").val() == 0) {
        $("#btnLevantar").hide();
        $("#btnExtension").hide();
        $("#btnVerDocumentos").hide();
    }
    else {
        $("#btnLevantar").show();
        $("#btnExtension").show();
        $("#btnVerDocumentos").show();
    }


    gridDiscrepancias('');


    //var tipo_inspeccion = $("#CT_GENM_ACTIVIDAD_DS_ID_TIPO_INSPECCION").val();
    ////Ubigeo Nacional
    //if (tipo_inspeccion == 95 || tipo_inspeccion == 96 || tipo_inspeccion == 97 || tipo_inspeccion == 102 ||
    //    tipo_inspeccion == 107 || tipo_inspeccion == 114 || tipo_inspeccion == 116 || tipo_inspeccion == 99) {
    //    $("#DivDepartamento").show();
    //    $("#DivProvincia").show();
    //    $("#DivDistrito").show();

    //}
    //    //Ubigeo Internacional
    //else if (tipo_inspeccion == 94 || tipo_inspeccion == 101) {
    //    $("#DivPais").show();
    //    $("#DivCiudad").show();
    //}
    //    //Matricula, Helipuerto o Aerodromo
    //else if (tipo_inspeccion == 83 || tipo_inspeccion == 98) {
    //    $("#DivMatricula").show();
    //    $("#DivTipoLugar").show();
    //    var op = $("#XCB_ID_UBIGEO").val();
    //    $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").find("option[value='" + op + "']").remove();
    //} else if (tipo_inspeccion == 108 || tipo_inspeccion == 113) {
    //    $("#DivMatricula").show();
    //    $("#DivTipoLugar").show();
    //    var op = $("#XCB_ID_HELIPUERTO").val();
    //    $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").find("option[value='" + op + "']").remove();
    //} else if (tipo_inspeccion == 112) {
    //    $("#DivMatricula").hide();
    //    $("#DivTipoLugar").show();
    //    var op = $("#XCB_ID_AERODROMO").val();
    //    $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").find("option[value='" + op + "']").remove();
    //} else if (tipo_inspeccion == 115) {
    //    $("#DivMatricula").show();
    //    $("#DivTipoLugar").show();

    //}



    $("#CT_GENM_ACTIVIDAD_DS_FECHA_INICIO").kendoDatePicker();
    $("#CT_GENM_ACTIVIDAD_DS_FECHA_FIN").kendoDatePicker();
    //$("#FECHA_INSPECCION").kendoDatePicker();

    var aaaa = $("#CT_GENM_ACTIVIDAD_DS_DESC_ANO").val();
    var mm = $("#CT_GENM_ACTIVIDAD_DS_ID_MES").val();

    $("#FECHA_INSPECCION").css("width", "100%").kendoDatePicker({
        min: new Date(aaaa, parseInt(mm) - 1, 1),
        max: new Date(aaaa, mm, 0),
        change: function (e) {
            var dt = e.sender;
            var value = dt.value();
            console.log(value);
            if (value === null) {
                value = kendo.parseDate(dt.element.val(), dt.options.parseFormats);
            }

            if (value < dt.min()) {
                dt.value(dt.min());
            } else if (value > dt.max()) {
                dt.value(dt.max());
            }
        }
    });

    $("#modalDiscrepancia").modal('hide');

    $("#btnAddDiscrepancia").click(function () {
        //saveInspeccion(false)
        //Abrir modal de la discrepancia sin registrar la inspeccion
        if (validaInspeccion()) {
            modalAjaxRequestGet2("/Discrepancia/Discrepancia", "", "", "");
        }
        
    });

    $("#btnModifyDiscrepancia").click(function () {

        var grid = $("#gridDiscrepancia").data("kendoGrid");
        var selectedRows = $(".k-state-selected", "#gridDiscrepancia");

        if (selectedRows.length == 0 || selectedRows.length > 1) {
            bootbox.alert("Seleccione solo una discrepancia");
        }
        else {

            var itemDataDiscrepancia;
            $.each(checkedIds, function (index, item) {

                itemDataDiscrepancia = {
                    XDISCREPANCIA: item.XDISCREPANCIA
                }
            });

            var url = $(this).attr('data-url');

            modalAjaxRequestGet2(url, "", "", 'Discrepancia=' + itemDataDiscrepancia.XDISCREPANCIA);
        }
    });

    $("#btnGenerarOficio").click(function () {

        var url = $(this).attr('data-url');
        var seccionModal = ".seccionModal2";
        var seccionContenedor = ".contenedor2";

        console.log(url + '?XINPECCION=' + $("#XINSPECCION").val());

        $.ajax({
            url: url + '?XINPECCION=' + $("#XINSPECCION").val(),
            beforeSend: function () {
                bloquoteModal();
            },
            success: function (data) {
                desbloqModal();
                $(seccionModal).html(data);
                $(seccionContenedor).modal('show');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(xhr.responseText);
                console.log(thrownError);
            }
        });
    });

    $("#btnReiterativo").click(function () {

        var url = $(this).attr('data-url');
        var seccionModal = ".seccionModal2";
        var seccionContenedor = ".contenedor2";

        console.log(url + '?XINPECCION=' + $("#XINSPECCION").val());

        $.ajax({
            url: url + '?XINPECCION=' + $("#XINSPECCION").val(),
            beforeSend: function () {
                bloquoteModal();
            },
            success: function (data) {
                desbloqModal();
                $(seccionModal).html(data);
                $(seccionContenedor).modal('show');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(xhr.responseText);
                console.log(thrownError);
            }
        });
    });

    $("#btnVerOficios").click(function () {
        var url = $(this).attr('data-url');
        modalAjaxRequestGet2(url, "", "", "");
    });


    $("#btnLevantar").click(function () {

        var txtLenvantamiento = $("#XLEVATAMIENTO").val();
        var grid = $("#gridDiscrepancia").data("kendoGrid");
        var selectedRows = $(".k-state-selected", "#gridDiscrepancia");

        var LEVANTADO = 1;
        var flag = 0;



        $.each(checkedIds, function (index, item) {

            if (LEVANTADO == item.XVALIDA_LEVANTAMIENTO) {
                flag = 1;
            }
            //console.log(LEVANTADO);
            //console.log(item.XVALIDA_LEVANTAMIENTO);

        });
        //console.log(flag);


        if (!selectedRows.length > 0) {
            bootbox.alert("Seleccione al menos una discrepancia!!!");
        }
        else {

            if (flag == 0) {
                var ListDiscrepancia = [];

                $.each(checkedIds, function (index, item) {

                    var itemDataDiscrepancia = {
                        XDISCREPANCIA: item.XDISCREPANCIA

                    }
                    ListDiscrepancia.push(itemDataDiscrepancia);
                });
                //console.log(ListDiscrepancia);

                var url = $(this).attr('data-url');

                var seccionModal = ".seccionModal2";
                var seccionContenedor = ".contenedor2";
                var divModal = "";
                var divContenedor = "";

                seccionModal = ($.trim(divModal).length > 0) ? "#" + divModal : seccionModal;
                seccionContenedor = ($.trim(divContenedor).length > 0) ? "#" + divContenedor : seccionContenedor;

                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: url,
                    type: 'POST',
                    data: JSON.stringify({ objDiscrepancia: ListDiscrepancia, Opcion: txtLenvantamiento }),
                    beforeSend: function () {
                        bloquoteModal();
                    },
                    success: function (data) {
                        desbloqModal();
                        $(seccionModal).html(data);
                        $(seccionContenedor).modal('show');
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status);
                        console.log(xhr.responseText);
                        console.log(thrownError);
                    }
                });

            }
            else {
                bootbox.alert("Seleccione solo lo discrepancias que no esten levantadas!!!");
            }

        }

    });

    $("#btnExtension").click(function () {
        var txtExtension = $("#XEXTENSION").val();
        var grid = $("#gridDiscrepancia").data("kendoGrid");
        var selectedRows = $(".k-state-selected", "#gridDiscrepancia");

        var LEVANTADO = 1;
        var VENCIMIENTO = 1;
        var flag = 0;
        var flagFecha = 0;

        $.each(checkedIds, function (index, item) {

            if (LEVANTADO == item.XVALIDA_LEVANTAMIENTO) {
                flag = 1;
            }
            // console.log(LEVANTADO);
            // console.log(item.XVALIDA_LEVANTAMIENTO);
        });
        //console.log(flag);



        $.each(checkedIds, function (index, item) {

            if (VENCIMIENTO == item.XVALIDA_VENCIMIENTO) {
                flagFecha = 1;
            }
            //console.log(VENCIMIENTO);
            //console.log(item.XVALIDA_VENCIMIENTO);
        });
        //console.log(flagFecha);


        if (!selectedRows.length > 0) {
            bootbox.alert("Seleccione al menos una discrepancia!!!");
        }
        else {
            if (flag == 0) {
                //console.log('A');
                if (flagFecha == 0) {
                    //console.log('A1');
                    var ListDiscrepancia = [];
                    $.each(checkedIds, function (index, item) {
                        var itemDataDiscrepancia = {
                            XDISCREPANCIA: item.XDISCREPANCIA
                        }
                        ListDiscrepancia.push(itemDataDiscrepancia);
                    });
                    //console.log(ListDiscrepancia);

                    var url = $(this).attr('data-url');

                    var seccionModal = ".seccionModal2";
                    var seccionContenedor = ".contenedor2";
                    var divModal = "";
                    var divContenedor = "";

                    seccionModal = ($.trim(divModal).length > 0) ? "#" + divModal : seccionModal;
                    seccionContenedor = ($.trim(divContenedor).length > 0) ? "#" + divContenedor : seccionContenedor;

                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: url,
                        type: 'POST',
                        data: JSON.stringify({ objDiscrepancia: ListDiscrepancia, Opcion: txtExtension }),
                        beforeSend: function () {
                            bloquoteModal();
                        },
                        success: function (data) {
                            desbloqModal();
                            $(seccionModal).html(data);
                            $(seccionContenedor).modal('show');
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            console.log(xhr.status);
                            console.log(xhr.responseText);
                            console.log(thrownError);
                        }
                    });
                }
                else {
                    //console.log('A2');
                    bootbox.alert("Seleccione solo las discrepancias que están vencidas!!!");
                }
            }
            else {
                //console.log('B');
                bootbox.alert("Seleccione solo las discrepancias que no esten levantadas!!!");
            }
        }
    });

    $("#btnVerDocumentos").click(function () {

        var url = $(this).attr('data-url');
        modalAjaxRequestGet2(url, "", "", "");

    });






    $('input:radio[name=FLG_SATISFACTORIA]').click(function () {
        if ($(this).val() == "true") {
            $("#SeccionDiscrepancias").hide();
            $("#divobservacion").show()
        }
        else {
            $("#divobservacion").hide()
            $("#SeccionDiscrepancias").show();
        }
    });

    /*$(".btnAddDiscrepancia").click(function () {
        $("#modalDiscrepancia").modal('show');
    });

    $(".btnCancelarModalDiscrepancia").click(function () {
        $("#modalDiscrepancia").modal('hide');
    });*/

    $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        select: onSelectTipoLugar,
        filter: "contains",
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
            else {
                if ($.trim($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").data("kendoComboBox").value()) != "" && $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").data("kendoComboBox").value() != null) {
                    changeTipoLugar($.trim($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").data("kendoComboBox").value()));
                }
            }
        },
    });


    $("#XMATRICULA").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            } else {

            }
        },
    });

    //$("#CT_GENM_PAIS_XPAIS").kendoComboBox({
    //    placeholder: "[SELECCIONE]",
    //    dataTextField: "text",
    //    dataValueField: "value",
    //    filter: "contains",
    //    change: function () {
    //        var cmb = this;
    //        // selectedIndex of -1 indicates custom value
    //        if (cmb.selectedIndex < 0) {
    //            cmb.value('');
    //        } else {



    //        }
    //    },
    //});


    $("#CT_GENM_PAIS_XPAIS").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        select: onSelectCiudad,
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
            else {
                if ($.trim($("#CT_GENM_PAIS_XPAIS").data("kendoComboBox").value()) != "" && $("#CT_GENM_PAIS_XPAIS").data("kendoComboBox").value() != null) {
                    $.ajax({
                        datatype: 'json',
                        url: '/Ciudad/CargarCiudad',
                        type: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify({
                            XPAIS: $.trim($("#CT_GENM_PAIS_XPAIS").data("kendoComboBox").value())
                        }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {

                            if (!data.rpta) {
                                errorAddModelo("divErrorInspeccion", "ulListaErrorInspeccion", data.errores);
                            } else {
                                var l_GENM_CIUDAD = data.l_GENM_CIUDAD;



                                var lCiudad = [];
                                $.each(l_GENM_CIUDAD, function (index, value) {
                                    var oCiudad = {
                                        value: value.XCIUDAD,
                                        text: value.DESCRIPCION
                                    }
                                    lCiudad.push(oCiudad);
                                });
                                $("#CT_GENM_CIUDAD_XCIUDAD").data("kendoComboBox").value('');


                                var multiselect = $("#CT_GENM_CIUDAD_XCIUDAD").data("kendoComboBox");
                                console.log(lCiudad);
                                multiselect.setDataSource(lCiudad);
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






    $("#XDEPARTAMENTO").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        select: onSelectProvincia,
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
            else {
                if ($.trim($("#XDEPARTAMENTO").data("kendoComboBox").value()) != "" && $("#XDEPARTAMENTO").data("kendoComboBox").value() != null) {
                    $.ajax({
                        datatype: 'json',
                        url: '/Helipuerto/CargarProvincia',
                        type: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify({
                            XDEPARTAMENTO: $.trim($("#XDEPARTAMENTO").data("kendoComboBox").value())
                        }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {

                            if (!data.rpta) {
                                errorAddModelo("divErrorInspeccion", "ulListaErrorInspeccion", data.errores);
                            } else {
                                var l_GENM_PROVINCIA = data.l_GENM_PROVINCIA;



                                var lProvincia = [];
                                $.each(l_GENM_PROVINCIA, function (index, value) {
                                    var oProvincia = {
                                        value: value.XPROVINCIA,
                                        text: value.DESCRIPCION
                                    }
                                    lProvincia.push(oProvincia);
                                });
                                $("#CT_GENM_PROVINCIA_XPROVINCIA").data("kendoComboBox").value('');
                                $("#CT_GENM_DISTRITO_XDISTRITO").data("kendoComboBox").value('');


                                var multiselect = $("#CT_GENM_PROVINCIA_XPROVINCIA").data("kendoComboBox");
                                console.log(lProvincia);
                                multiselect.setDataSource(lProvincia);
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

    $("#CT_GENM_PROVINCIA_XPROVINCIA").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        select: onSelectDistrito,
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
            else {
                if ($.trim($("#CT_GENM_PROVINCIA_XPROVINCIA").data("kendoComboBox").value()) != "" && $("#CT_GENM_PROVINCIA_XPROVINCIA").data("kendoComboBox").value() != null) {
                    $.ajax({
                        datatype: 'json',
                        url: '/Helipuerto/CargarDistrito',
                        type: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify({
                            XPROVINCIA: $.trim($("#CT_GENM_PROVINCIA_XPROVINCIA").data("kendoComboBox").value())
                        }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {

                            if (!data.rpta) {
                                errorAddModelo("divErrorInspeccion", "ulListaErrorInspeccion", data.errores);
                            } else {
                                var l_GENM_DISTRITO = data.l_GENM_DISTRITO;



                                var lDistrito = [];
                                $.each(l_GENM_DISTRITO, function (index, value) {
                                    var oDistrito = {
                                        value: value.XDISTRITO,
                                        text: value.DESCRIPCION
                                    }
                                    lDistrito.push(oDistrito);
                                });
                                $("#CT_GENM_DISTRITO_XDISTRITO").data("kendoComboBox").value('');
                                var multiselect = $("#CT_GENM_DISTRITO_XDISTRITO").data("kendoComboBox");
                                console.log(lDistrito);
                                multiselect.setDataSource(lDistrito);
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

    $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        //select: onSelectDistrito,
        change: function () {
            var cmb = this;
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
            else {
                ComboboxTipoLugar();
            }
        }
    });

    $("#CT_GENM_DISTRITO_XDISTRITO").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });


    $("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            } else {
                if ($.trim($("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").data("kendoComboBox").value()) != "" && $("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").data("kendoComboBox").value() != null) {
                    $.ajax({
                        datatype: 'json',
                        url: '/Inspeccion/ComboPersonaJuridicaXGiroSE',
                        type: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify({
                            XID_GIRO: $.trim($("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").data("kendoComboBox").value()),
                            XID_PERSONA_JURIDICA: $("#XCOMBO_PERSONA_JUR").val(),
                            XID_AERODROMO: $("#XID_AERODROMO_JUR").val(),
                            XID_HELIPUERTO: $("#XID_HELIPUERTO_JUR").val()
                        }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {

                            if (!data.rpta) {
                                errorAddModelo("divErrorInspeccion", "ulListaErrorInspeccion", data.errores);
                            } else {
                                var l_GENM_PERSONA_JURIDICA = data.l_GENM_PERSONA_JURIDICA;

                                var lPersona_Juridica = [];
                                var oPersona_Juridica = {
                                    value: "",
                                    text: "[SELECCIONE]"
                                }
                                lPersona_Juridica.push(oPersona_Juridica);
                                $.each(l_GENM_PERSONA_JURIDICA, function (index, value) {
                                    var oMatricula = {
                                        value: value.XPERSONAJURIDICA,
                                        text: value.RAZON_SOCIAL
                                    }
                                    lPersona_Juridica.push(oMatricula);
                                });
                                $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").data("kendoComboBox").value('');
                                var multiselect = $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").data("kendoComboBox");
                                console.log(lPersona_Juridica);
                                multiselect.setDataSource(lPersona_Juridica);
                            }
                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        desbloqObject();
                    });

                    /*
                    $.ajax({
                        datatype: 'json',
                        url: '/Inspeccion/CargarTipoInspeccionComplementaria',
                        type: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify({
                            XID_GIRO: $.trim($("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").data("kendoComboBox").value())
                        }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {

                            if (!data.rpta) {
                                errorAddModelo("divErrorInspeccion", "ulListaErrorInspeccion", data.errores);
                            } else {
                                var l_MAE_TIPO_INSPECCION = data.l_MAE_TIPO_INSPECCION;

                                var lTipoInspeccion = [];
                                var oPersona_Juridica = {
                                    value: "",
                                    text: "[SELECCIONE]"
                                }
                                lTipoInspeccion.push(oPersona_Juridica);
                                $.each(l_MAE_TIPO_INSPECCION, function (index, value) {
                                    var oMatricula = {
                                        value: value.ID_TIPO_INSPECCION,
                                        text: value.DESCRIPCION
                                    }
                                    lTipoInspeccion.push(oMatricula);
                                });
                                $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").data("kendoComboBox").value('');
                                var multiselect = $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").data("kendoComboBox");
                                console.log(lTipoInspeccion);
                                multiselect.setDataSource(lTipoInspeccion);
                            }
                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        desbloqObject();
                    });
                    */
                } else {
                    $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").data("kendoComboBox").value('');
                    $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").data("kendoComboBox").value('');

                }
            }
        },
    });

    $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            } else {
                if ($.trim($("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").data("kendoComboBox").value()) != "" && $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").data("kendoComboBox").value() != null) {
                    
                    if ($.trim($("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").data("kendoComboBox").value().split("^")[0]) != $("#XSIM_EMPRESA").val())
                    {
                        $.ajax({
                            datatype: 'json',
                            url: '/Inspeccion/CargarTipoInspeccionComplementaria',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                XID_GIRO: $.trim($("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").data("kendoComboBox").value())
                            }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {

                                if (!data.rpta) {
                                    errorAddModelo("divErrorInspeccion", "ulListaErrorInspeccion", data.errores);
                                } else {
                                    var l_MAE_TIPO_INSPECCION = data.l_MAE_TIPO_INSPECCION;

                                    var lTipoInspeccion = [];
                                    var oPersona_Juridica = {
                                        value: "",
                                        text: "[SELECCIONE]"
                                    }
                                    lTipoInspeccion.push(oPersona_Juridica);
                                    $.each(l_MAE_TIPO_INSPECCION, function (index, value) {
                                        var oMatricula = {
                                            value: value.ID_TIPO_INSPECCION,
                                            text: value.DESCRIPCION
                                        }
                                        lTipoInspeccion.push(oMatricula);
                                    });
                                    $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").data("kendoComboBox").value('');
                                    var multiselect = $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").data("kendoComboBox");
                                    console.log(lTipoInspeccion);
                                    multiselect.setDataSource(lTipoInspeccion);
                                    $("#DivMatricula").show();
                                    $("#DivDNI").hide();
                                    $("#DNI").val('');
                                }
                                desbloqObject();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            desbloqObject();
                        });

                        $.ajax({
                            datatype: 'json',
                            url: '/Inspeccion/CargarMatricula',
                            type: 'POST',
                            contentType: "application/json",
                            data: JSON.stringify({
                                XPERSONA_JURIDICA: $.trim($("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").data("kendoComboBox").value().split("^")[0])
                            }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {

                                if (!data.rpta) {
                                    errorAddModelo("divErrorInspeccion", "ulListaErrorInspeccion", data.errores);
                                } else {
                                    var l_GENM_MATRICULA = data.l_GENM_MATRICULA;

                                    var lMatricula = [];
                                    var oMatricula = {
                                        value: "",
                                        text: "[SELECCIONE]"
                                    }
                                    lMatricula.push(oMatricula);
                                    $.each(l_GENM_MATRICULA, function (index, value) {
                                        var oMatricula = {
                                            value: value.XAERONAVE_PA_BANDEJA,
                                            text: value.MATRICULA
                                        }
                                        lMatricula.push(oMatricula);
                                    });
                                    $("#XMATRICULA").data("kendoComboBox").value('');
                                    var multiselect = $("#XMATRICULA").data("kendoComboBox");                                    
                                    multiselect.setDataSource(lMatricula);
                                }
                                desbloqObject();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            desbloqObject();
                        });
                    }
                    else {
                        
                        var XID_EX_TEC_MANT = $("#XID_EX_TEC_MANT").val();
                        var XDES_EX_TEC_MANT = $("#XDES_EX_TEC_MANT").val();
                       
                        var lTipoInspeccion =
                                    [
                                        { text: "[SELECCIONE]", value: "" },
                                        { text: XDES_EX_TEC_MANT, value: XID_EX_TEC_MANT }
                                    ];
                       
                        $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").data("kendoComboBox").value('');
                        var multiselect = $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").data("kendoComboBox");                        
                        multiselect.setDataSource(lTipoInspeccion);
                        $("#XMATRICULA").data("kendoComboBox").value('');
                        $("#DivMatricula").hide();
                        $("#DivDNI").show();
                    }


                }
            }
        },
    });

    $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            } else {
                //if ($.trim($("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").data("kendoComboBox").value()) != "" && $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").data("kendoComboBox").value() != null) {
                //    changeTipoInspeccion($.trim($("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").data("kendoComboBox").value()));
                //}
            }
        },
    });

    $("#CT_GENM_CIUDAD_XCIUDAD").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });


    $("#CT_MAE_AERODROMO_XAERODROMO").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

    $("#CT_GENM_HELIPUERTO_XHELIPUERTO").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

    $("#XAERODROMO_FIN").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

    $("#XHELIPUERTO_FIN").kendoComboBox({
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

    ConsultaDiscrepancia();

    $("#btnRegistrarInspeccion").click(function () {
        saveInspeccion(true);
    });

    $("#gridDiscrepancia").on("click", ".k-grid-cancel", function (e) {
        e.preventDefault();
        var grid = $("#gridDiscrepancia").data("kendoGrid");
        var dataItem = grid.dataItem($(this).closest("tr"));
        //console.log(dataItem);

        bootbox.confirm("¿Desea eliminar la discrepancia Nº " + dataItem.ORDEN + " ?", function (res) {
            if (res) {
                //console.log(dataItem.XDISCREPANCIA);

                var T_GENM_DISCREPANCIA = {
                    ID_USUARIO_ACT: null,
                    FEC_ACT: null,
                    XDISCREPANCIA: dataItem.XDISCREPANCIA,
                    ORDEN: dataItem.ORDEN,
                    XINSPECCION: $("#XINSPECCION").val().trim()

                }

                //console.log(T_GENM_DISCREPANCIA);

                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/Discrepancia/SaveEstadoDiscrepancia',
                    type: 'POST',
                    data: JSON.stringify({ objDiscrepancia: T_GENM_DISCREPANCIA }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {

                        //console.log(data);
                        if (!data.rpta) {
                            errorAddModelo("divErrorInspeccion", "ulListaErrorInspeccion", data.errores);
                        } else {
                            ConsultaDiscrepancia();
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

});
function saveInspeccion(flgCloseModal) {
    if (flgCloseModal) {
        bootbox.confirm("¿Desea grabar un nueva Inspección?", function (res) {
            if (res) {
                if ($('input[name=FLG_SATISFACTORIA]:checked').val() == 'false' && $("#gridDiscrepancia").data("kendoGrid").dataSource.total() == 0) {
                    bootbox.alert("Debe registrar minimo una discrepancia!");
                }
                else {
                    saveInspeccionTrans(flgCloseModal);
                }
            }
        });
    }
    else {
        saveInspeccionTrans(flgCloseModal);
    }
}
function saveInspeccionTrans(flgCloseModal) {
    if (validaInspeccion()) {

        //var KDPFECHA_INICIO = $("#CT_GENM_ACTIVIDAD_DS_FECHA_INICIO").data("kendoDatePicker");
        //var KDPFECHA_FIN = $("#CT_GENM_ACTIVIDAD_DS_FECHA_FIN").data("kendoDatePicker");
        var KDPFECHA_INSPECCION = $("#FECHA_INSPECCION").data("kendoDatePicker");

        var FECHA_INICIO = new Date(1999, 1, 1);
        var FECHA_FIN = new Date(1999, 1, 1);
        var FECHA_INSPECCION = new Date(1999, 1, 1);

        //FECHA_INICIO = KDPFECHA_INICIO.value();
        //FECHA_FIN = KDPFECHA_FIN.value();
        FECHA_INSPECCION = KDPFECHA_INSPECCION.value();

        if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_HELIPUERTO").val()) {
            var LUGAR_INICIO = $("#CT_GENM_HELIPUERTO_XHELIPUERTO").val();
            var LUGAR_FIN = $("#XHELIPUERTO_FIN").val();

        } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_AERODROMO").val()) {
            var LUGAR_INICIO = $("#CT_MAE_AERODROMO_XAERODROMO").val();
            var LUGAR_FIN = $("#XAERODROMO_FIN").val();

        }

        var oInspeccion = {
            XINSPECCION: $("#XINSPECCION").val(),
            XACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_ACTIVIDAD_DS").val(),
            XTIPO_ACTIVIDAD_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_ACTIVIDAD_DS").val(),
            XPERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split('^')[0],
            XDIRECCION_COORDINACION: $("#CT_GENM_ACTIVIDAD_DS_XID_DIRECCION_COORDINACION").val(),
            XGIRO: $("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").val(),
            XHABILITACION: $("#CT_GENM_ACTIVIDAD_DS_XID_HABILITACION").val(),
            XTIPO_INSPECCION: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").val(),
            XTIPO_LUGAR_DS: $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val(),
            XID_AERODROMO: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split('^')[1],
            XID_HELIPUERTO: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split('^')[2],
            XLUGAR_INICIO: LUGAR_INICIO,
            XLUGAR_FIN: LUGAR_FIN,
            FECHA_INICIO: FECHA_INSPECCION,
            FECHA_FIN: FECHA_INSPECCION,
            FECHA_INSPECCION: FECHA_INSPECCION,
            XDEPARTAMENTO: $("#XDEPARTAMENTO").val(),
            XPROVINCIA: $("#CT_GENM_PROVINCIA_XPROVINCIA").val(),
            XDISTRITO: $("#CT_GENM_DISTRITO_XDISTRITO").val(),
            XPAIS: $("#CT_GENM_PAIS_XPAIS").val(),
            XCIUDAD: $("#CT_GENM_CIUDAD_XCIUDAD").val(),
            OBSERVACION: $("#OBSERVACION").val(),
            FLG_SATISFACTORIA: $('input[name=FLG_SATISFACTORIA]:checked').val(),
            XMATRICULA: $("#XMATRICULA").val(),
            XTIPO_LUGAR: $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val(),
            XID_PLAN_VIGILANCIA_DS: $("#XID_PLAN_VIGILANCIA_DS").val(),
            DNI: $("#DNI").val()
        };


        var oActividad = {
            XID_PLAN_VIGILANCIA_DS: $("#CT_GENM_ACTIVIDAD_DS_XID_PLAN_VIGILANCIA_DS").val(),
            ID_GIRO: $("#CT_GENM_ACTIVIDAD_DS_ID_GIRO").val(),
            XID_GIRO: $("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").val(),
            XID_DIRECCION_COORDINACION: $("#CT_GENM_ACTIVIDAD_DS_XID_DIRECCION_COORDINACION").val(),
            ID_HABILITACION: $("#CT_GENM_ACTIVIDAD_DS_ID_HABILITACION").val(),
            ID_MES: $("#CT_GENM_ACTIVIDAD_DS_ID_MES").val(),        
            XID_ANO: $("#CT_GENM_ACTIVIDAD_DS_XID_ANO").val(),
            XID_PERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split('^')[0],
            XID_ESTADO_ACTIVIDAD: $("#CT_GENM_ACTIVIDAD_DS_XID_ESTADO_ACTIVIDAD").val(),
            FECHA_INICIO: FECHA_INSPECCION,
            FECHA_FIN: FECHA_INSPECCION,
            XID_TIPO_INSPECCION: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").val(),
            XID_AERODROMO: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split('^')[1],
            XID_HELIPUERTO: $("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().split('^')[2]
        };

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Inspeccion/SaveInspeccionComplementaria',
            type: 'POST',
            data: JSON.stringify({ oActividad: oActividad, oInspeccion: oInspeccion }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {
                if (!data.rpta) {
                    errorAddModelo("divErrorInspeccion", "ulListaErrorInspeccion", data.errores);
                    desbloqObject();
                } else {
                    ConsultaDiscrepancia();
                    $("#XINSPECCION").val(data.inspeccion);
                    $("#CT_GENM_ACTIVIDAD_DS_XID_ACTIVIDAD_DS").val(data.actividad);
                    $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_ACTIVIDAD_DS").val(data.tipo_inspeccion);
                    $("#CT_GENM_ACTIVIDAD_DS_XID_PERSONA_JURIDICA").val(data.persona_juridica);

                    if (flgCloseModal) {
                        $("#form0").submit();
                        bootbox.alert("Se registro la inspección!");
                        $("[data-dismiss=modal]").trigger({ type: "click" });
                    }
                    else {
                        modalAjaxRequestGet2("/Discrepancia/Discrepancia", "", "", "");
                    }
                }
                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
            desbloqObject();
        });

    }
}


function validaInspeccion() {
    var objData = [];
    var flg = true;
    $(".valError").removeClass("valError");
    var FechaInspeccion = isDate($("#FECHA_INSPECCION").val());
    var tipo_inspeccion = $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").val();


    if ($("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").val().trim() == "") {
        flg = false;
        $('[aria-owns="CT_GENM_ACTIVIDAD_DS_XID_GIRO_listbox"]').parents("span").addClass("valError");
        objData.push({ "CT_GENM_ACTIVIDAD_DS_XID_GIRO": [{ ErrorMessage: "Debe seleccionar un Giro" }] })
    }

    if ($("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().trim() == "") {
        flg = false;
        $('[aria-owns="CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA_listbox"]').parents("span").addClass("valError");
        objData.push({ "CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA": [{ ErrorMessage: "Debe seleccionar una Empresa" }] })
    }

    if ($("#CT_GENM_ACTIVIDAD_DS_ID_PERSONA_JURIDICA").val().trim().split("^")[0] == $("#XSIM_EMPRESA").val()) {
        
        if ($("#DNI").val().trim() == "") {
            flg = false;
            objData.push({ "DNI": [{ ErrorMessage: "Debe ingresar el DNI" }] })
        }else if ($("#DNI").val().trim().length != 8 ){
            flg = false;
            objData.push({ "DNI": [{ ErrorMessage: "El DNI debe ser de 8 dígitos" }] })
        }
    }

    if ($("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").val().trim() == "") {
        flg = false;
        $('[aria-owns="CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION_listbox"]').parents("span").addClass("valError");
        objData.push({ "CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION": [{ ErrorMessage: "Debe seleccionar un Tipo Inspección" }] })
    }

        

    if (FechaInspeccion == false) {
        flg = false;
        $("#FECHA_INSPECCION").parents("span").addClass("valError");
        objData.push({ "FECHA_INSPECCION": [{ ErrorMessage: "Debe ingresar una Fecha Inspección Valida" }] })
    }


    if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val().trim() == "") {
        flg = false;
        $('[aria-owns="CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS_listbox"]').parents("span").addClass("valError");
        objData.push({ "CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS": [{ ErrorMessage: "Debe seleccionar un Tipo Lugar" }] })
    }

    if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_HELIPUERTO").val()) {

        if ($("#CT_GENM_HELIPUERTO_XHELIPUERTO").val().trim() == "") {
            flg = false;
            $('[aria-owns="CT_GENM_HELIPUERTO_XHELIPUERTO_listbox"]').parents("span").addClass("valError");
            objData.push({ "CT_GENM_HELIPUERTO_XHELIPUERTO": [{ ErrorMessage: "Debe seleccionar un Helipuerto de Ida" }] })
        }

        if ($("#XHELIPUERTO_FIN").val().trim() == "") {
            flg = false;
            $('[aria-owns="XHELIPUERTO_FIN_listbox"]').parents("span").addClass("valError");
            objData.push({ "XHELIPUERTO_FIN": [{ ErrorMessage: "Debe seleccionar un Helipuerto de Destino" }] })
        }

        if ($("#CT_GENM_HELIPUERTO_XHELIPUERTO").val().trim() == $("#XHELIPUERTO_FIN").val().trim()) {
            flg = false;
            $('[aria-owns="CT_GENM_HELIPUERTO_XHELIPUERTO_listbox"]').parents("span").addClass("valError");
            $('[aria-owns="XHELIPUERTO_FIN_listbox"]').parents("span").addClass("valError");
            objData.push({ "CT_GENM_HELIPUERTO_XHELIPUERTO": [{ ErrorMessage: "Debe seleccionar Helipuertos distintos tanto de ida como destino" }] })
        }

    } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_AERODROMO").val()) {

        if ($("#CT_MAE_AERODROMO_XAERODROMO").val().trim() == "") {
            flg = false;
            $('[aria-owns="CT_MAE_AERODROMO_XAERODROMO_listbox"]').parents("span").addClass("valError");
            objData.push({ "CT_MAE_AERODROMO_XAERODROMO": [{ ErrorMessage: "Debe seleccionar un Aerodromo de Ida" }] })
        }

        if ($("#XAERODROMO_FIN").val().trim() == "") {
            flg = false;
            $('[aria-owns="XAERODROMO_FIN_listbox"]').parents("span").addClass("valError");
            objData.push({ "XAERODROMO_FIN": [{ ErrorMessage: "Debe seleccionar un Aerodromo de Destino" }] })
        }

        if ($("#CT_MAE_AERODROMO_XAERODROMO").val().trim() == $("#XAERODROMO_FIN").val().trim()) {
            flg = false;
            $('[aria-owns="CT_MAE_AERODROMO_XAERODROMO_listbox"]').parents("span").addClass("valError");
            $('[aria-owns="XAERODROMO_FIN_listbox"]').parents("span").addClass("valError");
            objData.push({ "CT_MAE_AERODROMO_XAERODROMO": [{ ErrorMessage: "Debe seleccionar Aerodromos distintos tanto de ida como destino" }] })
        }
    } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_UBIGEO").val()) {

        if ($("#XDEPARTAMENTO").val().trim() == "") {
            flg = false;
            $('[aria-owns="XDEPARTAMENTO_listbox"]').parents("span").addClass("valError");
            objData.push({ "XDEPARTAMENTO": [{ ErrorMessage: "Debe seleccionar un Departamento" }] })
        }

        if ($("#CT_GENM_PROVINCIA_XPROVINCIA").val().trim() == "") {
            flg = false;
            $('[aria-owns="CT_GENM_PROVINCIA_XPROVINCIA_listbox"]').parents("span").addClass("valError");
            objData.push({ "CT_GENM_PROVINCIA_XPROVINCIA": [{ ErrorMessage: "Debe seleccionar una Provincia" }] })
        }

        if ($("#CT_GENM_DISTRITO_XDISTRITO").val().trim() == "") {
            flg = false;
            $('[aria-owns="CT_GENM_DISTRITO_XDISTRITO_listbox"]').parents("span").addClass("valError");
            objData.push({ "CT_GENM_DISTRITO_XDISTRITO": [{ ErrorMessage: "Debe seleccionar un Distrito" }] })
        }

    }



    if ($("#OBSERVACION").val().trim() == "") {
        flg = false;
        objData.push({ "OBSERVACION": [{ ErrorMessage: "Debe ingresar una observacion" }] })
    }



    if (flg) {
        $("#divErrorInspeccion").hide();
    }
    else {
        $("#divErrorInspeccion").html('<strong>No se puede grabar</strong><ul id="ulListaErrorInspeccion"></ul>');
        errorAddJS("divErrorInspeccion", "ulListaErrorInspeccion", objData)
    }

    return flg;
}


function valRegInspeccion() {
    var objData = [];
    var flg = true;
    $(".valError").removeClass("valError");

    if ($("#FECHA_INSPECCION").val().trim() != "" && $("#FECHA_INSPECCION").data("kendoDatePicker").value() == null) {
        flg = false;
        $("#FECHA_INSPECCION").parents("span").addClass("valError");
        objData.push({ "FECHA_INSPECCION": [{ ErrorMessage: "Debe ingresar una fecha de inspecci&oacute;n" }] })
    }
    if ($("#XDEPARTAMENTO").data("kendoComboBox").value() == null || $("#XDEPARTAMENTO").data("kendoComboBox").value() == "") {
        flg = false;
        $('[aria-owns="XDEPARTAMENTO_listbox"]').parents("span").addClass("valError");
        objData.push({ "XDEPARTAMENTO": [{ ErrorMessage: "Debe seleccionar el Departamento" }] })
    }

    errorAddJS("divErrorHelice", "ulListaErrorHelice", objData)
    return flg;
}
function ComboboxTipoLugar() {
    if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_HELIPUERTO").val()) {
        $("#DivHelipuertoInicio").show();
        $("#DivAerodromoInicio").hide();
        $("#DivHelipuertoFin").show();
        $("#DivAerodromoFin").hide();
        $("#DivDepartamento").hide();
        $("#DivProvincia").hide();
        $("#DivDistrito").hide();

        $("#CT_GENM_HELIPUERTO_XHELIPUERTO").data("kendoComboBox").value('');
        $("#XHELIPUERTO_FIN").data("kendoComboBox").value('');
        $("#CT_MAE_AERODROMO_XAERODROMO").data("kendoComboBox").value('');
        $("#XAERODROMO_FIN").data("kendoComboBox").value('');
        $("#XDEPARTAMENTO").data("kendoComboBox").value('');
        $("#CT_GENM_PROVINCIA_XPROVINCIA").data("kendoComboBox").value('');
        $("#CT_GENM_DISTRITO_XDISTRITO").data("kendoComboBox").value('');

    } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_AERODROMO").val()) {
        $("#DivAerodromoInicio").show();
        $("#DivHelipuertoInicio").hide();
        $("#DivAerodromoFin").show();
        $("#DivHelipuertoFin").hide();
        $("#DivDepartamento").hide();
        $("#DivProvincia").hide();
        $("#DivDistrito").hide();

        $("#CT_GENM_HELIPUERTO_XHELIPUERTO").data("kendoComboBox").value('');
        $("#XHELIPUERTO_FIN").data("kendoComboBox").value('');
        $("#CT_MAE_AERODROMO_XAERODROMO").data("kendoComboBox").value('');
        $("#XAERODROMO_FIN").data("kendoComboBox").value('');
        $("#XDEPARTAMENTO").data("kendoComboBox").value('');
        $("#CT_GENM_PROVINCIA_XPROVINCIA").data("kendoComboBox").value('');
        $("#CT_GENM_DISTRITO_XDISTRITO").data("kendoComboBox").value('');

    } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_UBIGEO").val()) {
        $("#DivAerodromoInicio").hide();
        $("#DivHelipuertoInicio").hide();
        $("#DivAerodromoFin").hide();
        $("#DivHelipuertoFin").hide();
        $("#DivDepartamento").show();
        $("#DivProvincia").show();
        $("#DivDistrito").show();

        $("#CT_GENM_HELIPUERTO_XHELIPUERTO").data("kendoComboBox").value('');
        $("#XHELIPUERTO_FIN").data("kendoComboBox").value('');
        $("#CT_MAE_AERODROMO_XAERODROMO").data("kendoComboBox").value('');
        $("#XAERODROMO_FIN").data("kendoComboBox").value('');
        $("#XDEPARTAMENTO").data("kendoComboBox").value('');
        $("#CT_GENM_PROVINCIA_XPROVINCIA").data("kendoComboBox").value('');
        $("#CT_GENM_DISTRITO_XDISTRITO").data("kendoComboBox").value('');

    }
}



function onSelectProvincia(e) {
    var dataItem = this.dataItem(e.item);

    if (dataItem.value != "" && dataItem.value != null) {
        $.ajax({
            datatype: 'json',
            url: '/Helipuerto/CargarProvincia',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                XDEPARTAMENTO: dataItem.value
            }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                if (!data.rpta) {
                    errorAddModelo("divErrorInspeccion", "ulListaErrorInspeccion", data.errores);
                } else {
                    var l_GENM_PROVINCIA = data.l_GENM_PROVINCIA;

                    var lProvincia = [];
                    $.each(l_GENM_PROVINCIA, function (index, value) {
                        var oProvincia = {
                            value: value.XPROVINCIA,
                            text: value.DESCRIPCION
                        }
                        lProvincia.push(oProvincia);
                    });
                    $("#CT_GENM_PROVINCIA_XPROVINCIA").data("kendoComboBox").value('');

                    var multiselect = $("#CT_GENM_PROVINCIA_XPROVINCIA").data("kendoComboBox");
                    console.log(lProvincia);
                    multiselect.setDataSource(lProvincia);
                }

                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            desbloqObject();
        });


    }

}


function onSelectCiudad(e) {
    var dataItem = this.dataItem(e.item);
    //console.log(dataItem);

    if (dataItem.value != "" && dataItem.value != null) {
        $.ajax({
            datatype: 'json',
            url: '/Ciudad/CargarCiudad',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                XPAIS: dataItem.value
            }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                if (!data.rpta) {
                    errorAddModelo("divErrorInspeccion", "ulListaErrorInspeccion", data.errores);
                } else {
                    var l_GENM_CIUDAD = data.l_GENM_CIUDAD;

                    var lCiudad = [];
                    $.each(l_GENM_CIUDAD, function (index, value) {
                        var oCiudad = {
                            value: value.XCIUDAD,
                            text: value.DESCRIPCION
                        }
                        lCiudad.push(oCiudad);
                    });
                    $("#CT_GENM_CIUDAD_XCIUDAD").data("kendoComboBox").value('');

                    var multiselect = $("#CT_GENM_CIUDAD_XCIUDAD").data("kendoComboBox");
                    console.log(lCiudad);
                    multiselect.setDataSource(lCiudad);
                }

                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            desbloqObject();
        });

    }

}


function onSelectDistrito(e) {
    var dataItem = this.dataItem(e.item);
    //console.log(dataItem);

    if (dataItem.value != "" && dataItem.value != null) {
        $.ajax({
            datatype: 'json',
            url: '/Helipuerto/CargarDistrito',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                XPROVINCIA: dataItem.value
            }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {

                if (!data.rpta) {
                    errorAddModelo("divErrorInspeccion", "ulListaErrorInspeccion", data.errores);
                } else {
                    var l_GENM_DISTRITO = data.l_GENM_DISTRITO;

                    var lDistrito = [];
                    $.each(l_GENM_DISTRITO, function (index, value) {
                        var oDistrito = {
                            value: value.XDISTRITO,
                            text: value.DESCRIPCION
                        }
                        lDistrito.push(oDistrito);
                    });
                    $("#CT_GENM_DISTRITO_XDISTRITO").data("kendoComboBox").value('');

                    var multiselect = $("#CT_GENM_DISTRITO_XDISTRITO").data("kendoComboBox");
                    console.log(lDistrito);
                    multiselect.setDataSource(lDistrito);
                }

                desbloqObject();
            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            desbloqObject();
        });
    }

}

function onSelectTipoLugar(e) {
    var dataItem = this.dataItem(e.item);
    if (dataItem.value != "" && dataItem.value != null) {
        changeTipoLugar(dataItem.value);
    }
}

function changeTipoLugar(valor) {
    $(".cbTipoLugar").hide();
    if ($("#ValAerodromo").val() == valor) {
        $("#DivAerodromo").show();
    }
    if ($("#ValHelipuerto").val() == valor) {
        $("#DivHelipuerto").show();
    }
    if ($("#ValUbigeo").val() == valor) {
        $("#DivUbigeo").show();
    }
}

function changeTipoInspeccion(valor) {
    EliminarComboTipoLuegar();
    var multiselect = $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").data("kendoComboBox");
    

    $("#DivHelipuertoInicio").hide();
    $("#DivAerodromoInicio").hide();
    $("#DivHelipuertoFin").hide();
    $("#DivAerodromoFin").hide();
    $("#DivDepartamento").hide();
    $("#DivProvincia").hide();
    $("#DivDistrito").hide();
    $("#DivPais").hide();
    $("#DivCiudad").hide();
    $("#DivMatricula").hide();
    $("#DivTipoLugar").hide();

    var tipo_inspeccion = valor;
    //Ubigeo Nacional
    if (tipo_inspeccion == 95 || tipo_inspeccion == 96 || tipo_inspeccion == 97 || tipo_inspeccion == 102 ||
        tipo_inspeccion == 107 || tipo_inspeccion == 114 || tipo_inspeccion == 116 || tipo_inspeccion == 99) {
        $("#DivDepartamento").show();
        $("#DivProvincia").show();
        $("#DivDistrito").show();

    }
        //Ubigeo Internacional
    else if (tipo_inspeccion == 94 || tipo_inspeccion == 101) {
        $("#DivPais").show();
        $("#DivCiudad").show();
    }
        //Matricula, Helipuerto o Aerodromo
    else if (tipo_inspeccion == 83 || tipo_inspeccion == 98) {
        EliminarComboTipoLuegar();
        $("#DivMatricula").show();
        $("#DivTipoLugar").show();
        var itemToRemove = multiselect.dataSource.at(2);
        multiselect.dataSource.remove(itemToRemove);

        //var op = $("#XCB_ID_UBIGEO").val();
        //$("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").find("option[value='" + op + "']").remove();
    } else if (tipo_inspeccion == 108 || tipo_inspeccion == 113) {
        EliminarComboTipoLuegar();
        $("#DivMatricula").show();
        $("#DivTipoLugar").show();
        var itemToRemove = multiselect.dataSource.at(0);
        multiselect.dataSource.remove(itemToRemove);
        //var op = $("#XCB_ID_HELIPUERTO").val();
        //$("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").find("option[value='" + op + "']").remove();
    } else if (tipo_inspeccion == 112) {
        EliminarComboTipoLuegar();
        $("#DivMatricula").hide();
        $("#DivTipoLugar").show();
        var itemToRemove = multiselect.dataSource.at(1);
        multiselect.dataSource.remove(itemToRemove);
        //var op = $("#XCB_ID_AERODROMO").val();
        //$("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").find("option[value='" + op + "']").remove();
    } else if (tipo_inspeccion == 115) {
        $("#DivMatricula").show();
        $("#DivTipoLugar").show();

    }
}

function EliminarComboTipoLuegar() {

    var multiselect = $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").data("kendoComboBox");
    multiselect.setDataSource([]);

    var list = [
    { value: $("#XCB_ID_HELIPUERTO").val(), text: 'HELIPUERTO' },
    { value: $("#XCB_ID_AERODROMO").val(), text: 'AERODROMO' },
    { value: $("#XCB_ID_UBIGEO").val(), text: 'UBIGEO NACIONAL' }
    ];


    $("#CT_GENM_DISTRITO_XDISTRITO").data("kendoComboBox").value('');

    console.log(list);
    multiselect.setDataSource(list);



    //$("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").find("option[value='" + $("#XCB_ID_UBIGEO").val() + "']").remove();
    //$("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").find("option[value='" + $("#XCB_ID_HELIPUERTO").val() + "']").remove();
    //$("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").find("option[value='" + $("#XCB_ID_AERODROMO").val() + "']").remove();

    //var option = '<option value="' + $("#XCB_ID_HELIPUERTO").val() + '" selected="selected">HELIPUERTO</option>';
    //    $('#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS').append(option);
    //    option = '<option value="' + $("#XCB_ID_AERODROMO").val() + '" selected="selected">AERODROMO</option>';
    //    $('#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS').append(option);
    //    option = '<option value="' + $("#XCB_ID_UBIGEO").val() + '" selected="selected">UBIGEO NACIONAL</option>';
    //    $('#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS').append(option);
}

function gridDiscrepancias(data) {

    var grid = $("#gridDiscrepancia").kendoGrid({
        resizable: true,
        dataSource: {
            data: data,
            schema: {
                model: {
                    id: "XDISCREPANCIA",
                    fields: {
                        XDISCREPANCIA: { editable: false, nullable: true }
                    }
                }
            }
        },
        columns: [
            {
                title: "",
                width: 10,
                template: "<input type='checkbox' class='checkbox' />"
            }, {
                field: "XDISCREPANCIA",
                width: 90,
                title: "ID_DISCREPANCIA",
                hidden: true
            }, {
                field: "XESTADO_DISCREPANCIA_DS",
                width: 90,
                title: "ID_ESTADO_DISCREPANCIA_DS",
                hidden: true
            }, {
                field: "XDISCREP_CRI_COORDI_DS",
                width: 140,
                title: "XDISCREP_CRI_COORDI_DS",
                hidden: true
            }, {
                field: "DOCUMENTO_SUSTENTO",
                width: 140,
                title: "DOCUMENTO_SUSTENTO",
                hidden: true
            }, {
                field: "ORDEN",
                width: 30,
                title: "Nº",
                width: 30
                //dir: asc
            }, {
                field: "DESCRIPCION_ESTADO_DISC",
                width: 140,
                title: "ESTADO",
                width: 140
            }, {
                field: "XFECHA_VENCIMIENTO",
                title: "FECHA VENCIMIENTO",
                width: 90
            }, {
                field: "DESCRIPCION_CRIPTICIDAD",
                width: 80,
                title: "NIVEL DE GRAVEDAD",
                width: 80
            }, {
                field: "XVALIDA_LEVANTAMIENTO",
                width: 30,
                hidden: true
            }, {
                field: "XVALIDA_VENCIMIENTO",
                width: 30,
                hidden: true
            }, {
                field: "XVALIDA_ESTADO",
                width: 30,
                hidden: true
            }, {
                field: "XVALIDA_DISCREPANCIA",
                width: 30,
                hidden: true
            }, {
                template: "#if (XVALIDA_DISCREPANCIA == 0 && XVALIDA_ESTADO == 0) {# <a class='k-button k-button-icontext k-grid-cancel' ><span class='k-icon k-cancel'></span>Eliminar</a> #} # ",
                width: 50
            }
        ]

    }).data("kendoGrid");

    //bind click event to the checkbox
    grid.table.on("click", ".checkbox", selectRow);

}
var checkedIds = {};

//on click of the checkbox:
function selectRow() {
    var checked = this.checked,
    row = $(this).closest("tr"),
    grid = $("#gridDiscrepancia").data("kendoGrid"),
    dataItem = grid.dataItem(row);


    if (checked) {
        //-select the row
        row.addClass("k-state-selected");
        checkedIds[dataItem.id] = {
            "XDISCREPANCIA": dataItem.XDISCREPANCIA,
            "XESTADO_DISCREPANCIA_DS": dataItem.XESTADO_DISCREPANCIA_DS,
            "XDISCREP_CRI_COORDI_DS": dataItem.XDISCREP_CRI_COORDI_DS,
            "DESCRIPCION_ESTADO_DISC": dataItem.DESCRIPCION_ESTADO_DISC,
            "ORDEN": dataItem.ORDEN,
            "XFECHA_VENCIMIENTO": dataItem.XFECHA_VENCIMIENTO,
            "DESCRIPCION_CRIPTICIDAD": dataItem.DESCRIPCION_CRIPTICIDAD,
            "DOCUMENTO_SUSTENTO": dataItem.DOCUMENTO_SUSTENTO,
            "OBSERVACION_DISC": dataItem.OBSERVACION_DISC,
            "XVALIDA_LEVANTAMIENTO": dataItem.XVALIDA_LEVANTAMIENTO,
            "XVALIDA_VENCIMIENTO": dataItem.XVALIDA_VENCIMIENTO
        };

    } else {
        //-remove selection
        delete checkedIds[dataItem.id];
        row.removeClass("k-state-selected");
    }
}

function ConsultaDiscrepancia() {
    if ($("#XINSPECCION").val().trim().length > 0) {
        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Inspeccion/ListarDiscrepancias',
            type: 'POST',
            data: JSON.stringify({ inspeccion: $("#XINSPECCION").val().trim() }),
            beforeSend: function () {
                bloquoteObject();
            },
            success: function (data) {
                console.log(data);

                gridDiscrepancias(data.l_Discrepancias);
                LimpiarChecks();
                desbloqObject();

                var contalevant = 0;
                var gridDiscrep = $("#gridDiscrepancia").data("kendoGrid").dataSource.data();
                var total = $("#gridDiscrepancia").data("kendoGrid").dataSource.total();

                $.each(gridDiscrep, function (index, item) {
                    contalevant = contalevant + item.XVALIDA_LEVANTAMIENTO;
                });

                if (total == contalevant) {
                    $("#btnReiterativo").hide();
                }

            }
        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log("Request Failed: " + err);
            desbloqObject();
        });
    }
}

function LimpiarChecks() {
    checkedIds = {};
    $(".k-state-selected input[type=checkbox]").each(function () {
        if (typeof this.checked != "undefined") {
            if (this.checked) {
                this.checked = false;
            }
        }
    });

    $(".k-state-selected").removeClass("k-state-selected");

}
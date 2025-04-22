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
    $("#DivTipoLugar").show();
    $("#btnReiterativo").hide();
    $("#btnVerOficios").hide();

    

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
    /*
    if ($("#XVALIDADOCDISCREP").val() == 0) {
        $("#btnVerDocumentos").hide();
    }
    else {
        $("#btnVerDocumentos").show();
    }
    */



    gridDiscrepancias('');

    //$("#modalDiscrepancia").modal('hide');

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
        filter: "contains",
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        select: onSelectTipoLugar,
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
        filter: "contains",
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
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
        filter: "contains",
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
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

                } else {
                    $("#CT_GENM_CIUDAD_XCIUDAD").data("kendoComboBox").value('');
                }
            }
        },
    });






    $("#XDEPARTAMENTO").kendoComboBox({
        filter: "contains",
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
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

                } else {
                    $("#CT_GENM_PROVINCIA_XPROVINCIA").data("kendoComboBox").value('');
                    $("#CT_GENM_DISTRITO_XDISTRITO").data("kendoComboBox").value('');
                }
            }
        },
    });

    $("#CT_GENM_PROVINCIA_XPROVINCIA").kendoComboBox({
        filter: "contains",
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
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

                } else {
                    $("#CT_GENM_DISTRITO_XDISTRITO").data("kendoComboBox").value('');
                }

            }
        },
    });

    $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").kendoComboBox({
        filter: "contains",
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
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
        filter: "contains",
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
        change: function () {
            var cmb = this;
            // selectedIndex of -1 indicates custom value
            if (cmb.selectedIndex < 0) {
                cmb.value('');
            }
        },
    });

    $("#CT_GENM_CIUDAD_XCIUDAD").kendoComboBox({
        filter: "contains",
        placeholder: "[SELECCIONE]",
        dataTextField: "text",
        dataValueField: "value",
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


    inspecion = $("#XINSPECCION").val().trim();
    if (inspecion == "") {
        $("#FECHA_INSPECCION").val('');
        $("#btnGenerarOficio").hide();
    } else {
        ComboboxTipoLugar();
        $("#btnGenerarOficio").show();
        $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val($("#PRUEBA_TIPO_LUGAR").val());

        if ($('input[name=FLG_SATISFACTORIA]:checked').val() == "true") {
            $("#SeccionDiscrepancias").hide();
            $("#divobservacion").show()
        } else {
            $("#divobservacion").hide()
            $("#SeccionDiscrepancias").show();
            ConsultaDiscrepancia();
        }

        if ($("#XID_OFICIO_INSP").val().trim() == "") {
            $("#btnReiterativo").hide();
            $("#btnVerOficios").hide();
        } else {
            $("#btnReiterativo").hide();
            if ($("#XFLG_VALIDAR").val() == "1") {
                $("#btnReiterativo").show();
            }
            $("#btnVerOficios").show();
        }

        if ($("#XFLG_VALIDAR").val() == "1") {
            ValidarInspeccionControles();
        }

    }

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

    validaLugarInspeccionEmpresa();
});
function validaLugarInspeccionEmpresa() {
    if ($.trim($("#CT_GENM_ACTIVIDAD_DS_XID_ACTIVIDAD_DS").val()) != "") {
        if ($("#CT_GENM_ACTIVIDAD_DS_ID_AERODROMO").val() > 0) {
            $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").data("kendoComboBox").value($("#XCB_ID_AERODROMO").val());
            $("#CT_MAE_AERODROMO_XAERODROMO").data("kendoComboBox").value($("#CT_GENM_ACTIVIDAD_DS_XID_AERODROMO").val());
            $("#DivHelipuertoInicio").hide();
            $("#DivAerodromoInicio").hide();
            $("#DivTipoLugar").hide();
            $("#DivDepartamento").hide();
            $("#DivProvincia").hide();
            $("#DivDistrito").hide();
            $("#divLugarAerodromo").show();
        }
        else if ($("#CT_GENM_ACTIVIDAD_DS_ID_HELIPUERTO").val() > 0) {
            $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").data("kendoComboBox").value($("#XCB_ID_HELIPUERTO").val());
            $("#CT_GENM_HELIPUERTO_XHELIPUERTO").data("kendoComboBox").value($("#CT_GENM_ACTIVIDAD_DS_XID_HELIPUERTO").val());
            $("#DivHelipuertoInicio").hide();
            $("#DivAerodromoInicio").hide();
            $("#DivTipoLugar").hide();
            $("#DivDepartamento").hide();
            $("#DivProvincia").hide();
            $("#DivDistrito").hide();
            $("#divLugarAerodromo").show();
        }
        else {
            $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").data("kendoComboBox").value($("#XCB_ID_UBIGEO").val());
            $("#CT_MAE_AERODROMO_XAERODROMO").data("kendoComboBox").value('');
            $("#CT_GENM_HELIPUERTO_XHELIPUERTO").data("kendoComboBox").value('');
            $("#DivHelipuertoInicio").hide();
            $("#DivAerodromoInicio").hide();
            $("#DivTipoLugar").show();
            $("#DivDepartamento").show();
            $("#DivProvincia").show();
            $("#DivDistrito").show();
            $("#divLugarAerodromo").hide();
        }
    }
}
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
        var KDPFECHA_INICIO = $("#CT_GENM_ACTIVIDAD_DS_FECHA_INICIO").data("kendoDatePicker");
        var KDPFECHA_FIN = $("#CT_GENM_ACTIVIDAD_DS_FECHA_FIN").data("kendoDatePicker");
        var KDPFECHA_INSPECCION = $("#FECHA_INSPECCION").data("kendoDatePicker");

        var FECHA_INICIO = new Date(1999, 1, 1);
        var FECHA_FIN = new Date(1999, 1, 1);
        var FECHA_INSPECCION = new Date(1999, 1, 1);

        FECHA_INICIO = KDPFECHA_INICIO.value();
        FECHA_FIN = KDPFECHA_FIN.value();
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
            XPERSONA_JURIDICA: $("#CT_GENM_ACTIVIDAD_DS_XID_PERSONA_JURIDICA").val(),
            XDIRECCION_COORDINACION: $("#CT_GENM_ACTIVIDAD_DS_XID_DIRECCION_COORDINACION").val(),
            XGIRO: $("#CT_GENM_ACTIVIDAD_DS_XID_GIRO").val(),
            XHABILITACION: $("#CT_GENM_ACTIVIDAD_DS_XID_HABILITACION").val(),
            XTIPO_INSPECCION: $("#CT_GENM_ACTIVIDAD_DS_XID_TIPO_INSPECCION").val(),
            XTIPO_LUGAR_DS: $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val(),
            ID_AERODROMO: $("#CT_GENM_ACTIVIDAD_DS_ID_AERODROMO").val(),
            ID_HELIPUERTO: $("#CT_GENM_ACTIVIDAD_DS_ID_HELIPUERTO").val(),
            XLUGAR_INICIO: LUGAR_INICIO,
            XLUGAR_FIN: LUGAR_FIN,
            FECHA_INICIO: FECHA_INICIO,
            FECHA_FIN: FECHA_FIN,
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
            XID_PLAN_VIGILANCIA_DS: $("#XID_PLAN_VIGILANCIA_DS").val()
        };

        $.ajax({
            datatype: 'json',
            contentType: "application/json",
            url: '/Inspeccion/SaveInspeccion',
            type: 'POST',
            data: JSON.stringify({ oInspeccion: oInspeccion }),
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
    //var tipo_inspeccion = $("#CT_GENM_ACTIVIDAD_DS_ID_TIPO_INSPECCION").val();


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
        /*
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
        }*/

    } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_AERODROMO").val()) {

        if ($("#CT_MAE_AERODROMO_XAERODROMO").val().trim() == "") {
            flg = false;
            $('[aria-owns="CT_MAE_AERODROMO_XAERODROMO_listbox"]').parents("span").addClass("valError");
            objData.push({ "CT_MAE_AERODROMO_XAERODROMO": [{ ErrorMessage: "Debe seleccionar un Aerodromo de Ida" }] })
        }
        /*
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
        }*/
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

    ////Ubigeo Nacional
    //if (tipo_inspeccion == 95 || tipo_inspeccion == 96 || tipo_inspeccion == 97 || tipo_inspeccion == 102 ||
    //    tipo_inspeccion == 107 || tipo_inspeccion == 114 || tipo_inspeccion == 116 || tipo_inspeccion == 99) {

    //    if ($("#XDEPARTAMENTO").val().trim() == "") {
    //        flg = false;
    //        $('[aria-owns="XDEPARTAMENTO_listbox"]').parents("span").addClass("valError");
    //        objData.push({ "XDEPARTAMENTO": [{ ErrorMessage: "Debe seleccionar un Departamento" }] })
    //    }

    //    if ($("#CT_GENM_PROVINCIA_XPROVINCIA").val().trim() == "") {
    //        flg = false;
    //        $('[aria-owns="CT_GENM_PROVINCIA_XPROVINCIA_listbox"]').parents("span").addClass("valError");
    //        objData.push({ "CT_GENM_PROVINCIA_XPROVINCIA": [{ ErrorMessage: "Debe seleccionar una Provincia" }] })
    //    }

    //    if ($("#CT_GENM_DISTRITO_XDISTRITO").val().trim() == "") {
    //        flg = false;
    //        $('[aria-owns="CT_GENM_DISTRITO_XDISTRITO_listbox"]').parents("span").addClass("valError");
    //        objData.push({ "CT_GENM_DISTRITO_XDISTRITO": [{ ErrorMessage: "Debe seleccionar una Departamento" }] })
    //    }

    //    //$("#DivDepartamento").show();
    //    //$("#DivProvincia").show();
    //    //$("#DivDistrito").show();

    //}
    //    //Ubigeo Internacional
    //else if (tipo_inspeccion == 94 || tipo_inspeccion == 101) {

    //    if ($("#CT_GENM_PAIS_XPAIS").val().trim() == "") {
    //        flg = false;
    //        $('[aria-owns="CT_GENM_PAIS_XPAIS_listbox"]').parents("span").addClass("valError");
    //        objData.push({ "CT_GENM_PAIS_XPAIS": [{ ErrorMessage: "Debe seleccionar un País" }] })
    //    }

    //    if ($("#CT_GENM_CIUDAD_XCIUDAD").val().trim() == "") {
    //        flg = false;
    //        $('[aria-owns="CT_GENM_CIUDAD_XCIUDAD_listbox"]').parents("span").addClass("valError");
    //        objData.push({ "CT_GENM_CIUDAD_XCIUDAD": [{ ErrorMessage: "Debe seleccionar una Ciudad" }] })
    //    }
    //    //$("#DivPais").show();
    //    //$("#DivCiudad").show();
    //}
    //    //Matricula(opcional), Helipuerto o Aerodromo
    //else if (tipo_inspeccion == 83 || tipo_inspeccion == 98) {

    //    if ($("#XMATRICULA").val().trim() == "") {
    //        flg = false;
    //        $('[aria-owns="XMATRICULA_listbox"]').parents("span").addClass("valError");
    //        objData.push({ "XMATRICULA": [{ ErrorMessage: "Debe seleccionar una Matricula" }] })
    //    }

    //    if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val().trim() == "") {
    //        flg = false;
    //        $('[aria-owns="CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS_listbox"]').parents("span").addClass("valError");
    //        objData.push({ "CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS": [{ ErrorMessage: "Debe seleccionar un Tipo Lugar" }] })
    //    }

    //    if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_HELIPUERTO").val()) {

    //        if ($("#CT_GENM_HELIPUERTO_XHELIPUERTO").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="CT_GENM_HELIPUERTO_XHELIPUERTO_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_GENM_HELIPUERTO_XHELIPUERTO": [{ ErrorMessage: "Debe seleccionar un Helipuerto de Ida" }] })
    //        }

    //        if ($("#XHELIPUERTO_FIN").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="XHELIPUERTO_FIN_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "XHELIPUERTO_FIN": [{ ErrorMessage: "Debe seleccionar un Helipuerto de Destino" }] })
    //        }

    //        if ($("#CT_GENM_HELIPUERTO_XHELIPUERTO").val().trim() == $("#XHELIPUERTO_FIN").val().trim()) {
    //            flg = false;
    //            $('[aria-owns="CT_GENM_HELIPUERTO_XHELIPUERTO_listbox"]').parents("span").addClass("valError");
    //            $('[aria-owns="XHELIPUERTO_FIN_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_GENM_HELIPUERTO_XHELIPUERTO": [{ ErrorMessage: "Debe seleccionar Helipuertos distintos tanto de ida como destino" }] })
    //        }

    //    } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_AERODROMO").val()) {

    //        if ($("#CT_MAE_AERODROMO_XAERODROMO").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="CT_MAE_AERODROMO_XAERODROMO_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_MAE_AERODROMO_XAERODROMO": [{ ErrorMessage: "Debe seleccionar un Aerodromo de Ida" }] })
    //        }

    //        if ($("#XAERODROMO_FIN").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="XAERODROMO_FIN_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "XAERODROMO_FIN": [{ ErrorMessage: "Debe seleccionar un Aerodromo de Destino" }] })
    //        }

    //        if ($("#CT_MAE_AERODROMO_XAERODROMO").val().trim() == $("#XAERODROMO_FIN").val().trim()) {
    //            flg = false;
    //            $('[aria-owns="CT_MAE_AERODROMO_XAERODROMO_listbox"]').parents("span").addClass("valError");
    //            $('[aria-owns="XAERODROMO_FIN_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_MAE_AERODROMO_XAERODROMO": [{ ErrorMessage: "Debe seleccionar Aerodromos distintos tanto de ida como destino" }] })
    //        }
    //    }



    //    //$("#DivMatricula").show();
    //    //$("#DivTipoLugar").show();

    //} //Matricula y ubigeo o aerodromo
    //else if (tipo_inspeccion == 108 || tipo_inspeccion == 113) {

    //    //if ($("#XMATRICULA").val().trim() == "") {
    //    //    flg = false;
    //    //    objData.push({ "XMATRICULA": [{ ErrorMessage: "Debe seleccionar una Matricula" }] })
    //    //}

    //    if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val().trim() == "") {
    //        flg = false;
    //        $('[aria-owns="CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS_listbox"]').parents("span").addClass("valError");
    //        objData.push({ "CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS": [{ ErrorMessage: "Debe seleccionar un Tipo Lugar" }] })
    //    }


    //    if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_UBIGEO").val()) {

    //        if ($("#XDEPARTAMENTO").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="XDEPARTAMENTO_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "XDEPARTAMENTO": [{ ErrorMessage: "Debe seleccionar un Departamento" }] })
    //        }

    //        if ($("#CT_GENM_PROVINCIA_XPROVINCIA").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="CT_GENM_PROVINCIA_XPROVINCIA_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_GENM_PROVINCIA_XPROVINCIA": [{ ErrorMessage: "Debe seleccionar una Provincia" }] })
    //        }

    //        if ($("#CT_GENM_DISTRITO_XDISTRITO").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="CT_GENM_DISTRITO_XDISTRITO_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_GENM_DISTRITO_XDISTRITO": [{ ErrorMessage: "Debe seleccionar una Departamento" }] })
    //        }

    //    } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_AERODROMO").val()) {

    //        if ($("#CT_MAE_AERODROMO_XAERODROMO").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="CT_MAE_AERODROMO_XAERODROMO_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_MAE_AERODROMO_XAERODROMO": [{ ErrorMessage: "Debe seleccionar un Aerodromo de Ida" }] })
    //        }

    //        if ($("#XAERODROMO_FIN").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="XAERODROMO_FIN_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "XAERODROMO_FIN": [{ ErrorMessage: "Debe seleccionar un Aerodromo de Destino" }] })
    //        }

    //        if ($("#CT_MAE_AERODROMO_XAERODROMO").val().trim() == $("#XAERODROMO_FIN").val().trim()) {
    //            flg = false;
    //            $('[aria-owns="CT_MAE_AERODROMO_XAERODROMO_listbox"]').parents("span").addClass("valError");
    //            $('[aria-owns="XAERODROMO_FIN_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_MAE_AERODROMO_XAERODROMO": [{ ErrorMessage: "Debe seleccionar Aerodromos distintos tanto de ida como destino" }] })
    //        }
    //    }


    //    //$("#DivMatricula").show();
    //    //$("#DivTipoLugar").show();
    //} //Matricula
    //else if (tipo_inspeccion == 112) {

    //    if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val().trim() == "") {
    //        flg = false;
    //        $('[aria-owns="CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS_listbox"]').parents("span").addClass("valError");
    //        objData.push({ "CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS": [{ ErrorMessage: "Debe seleccionar un Tipo Lugar" }] })
    //    }


    //    if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_UBIGEO").val()) {

    //        if ($("#XDEPARTAMENTO").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="XDEPARTAMENTO_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "XDEPARTAMENTO": [{ ErrorMessage: "Debe seleccionar un Departamento" }] })
    //        }

    //        if ($("#CT_GENM_PROVINCIA_XPROVINCIA").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="CT_GENM_PROVINCIA_XPROVINCIA_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_GENM_PROVINCIA_XPROVINCIA": [{ ErrorMessage: "Debe seleccionar una Provincia" }] })
    //        }

    //        if ($("#CT_GENM_DISTRITO_XDISTRITO").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="CT_GENM_DISTRITO_XDISTRITO_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_GENM_DISTRITO_XDISTRITO": [{ ErrorMessage: "Debe seleccionar una Departamento" }] })
    //        }

    //    } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_HELIPUERTO").val()) {

    //        if ($("#CT_GENM_HELIPUERTO_XHELIPUERTO").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="CT_GENM_HELIPUERTO_XHELIPUERTO_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_GENM_HELIPUERTO_XHELIPUERTO": [{ ErrorMessage: "Debe seleccionar un Helipuerto de Ida" }] })
    //        }

    //        if ($("#XHELIPUERTO_FIN").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="XHELIPUERTO_FIN_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "XHELIPUERTO_FIN": [{ ErrorMessage: "Debe seleccionar un Helipuerto de Destino" }] })
    //        }

    //        if ($("#CT_GENM_HELIPUERTO_XHELIPUERTO").val().trim() == $("#XHELIPUERTO_FIN").val().trim()) {
    //            flg = false;
    //            $('[aria-owns="CT_GENM_HELIPUERTO_XHELIPUERTO_listbox"]').parents("span").addClass("valError");
    //            $('[aria-owns="XHELIPUERTO_FIN_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_GENM_HELIPUERTO_XHELIPUERTO": [{ ErrorMessage: "Debe seleccionar Helipuertos distintos tanto de ida como destino" }] })
    //        }
    //    }

    //    //$("#DivMatricula").hide();
    //    //$("#DivTipoLugar").show();


    //} //UbigeoNacional o aerodromo o helipuerto y matricula opcional
    //else if (tipo_inspeccion == 115) {

    //    if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val().trim() == "") {
    //        flg = false;
    //        $('[aria-owns="CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS_listbox"]').parents("span").addClass("valError");
    //        objData.push({ "CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS": [{ ErrorMessage: "Debe seleccionar un Tipo Lugar" }] })
    //    }

    //    if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_HELIPUERTO").val()) {

    //        if ($("#CT_GENM_HELIPUERTO_XHELIPUERTO").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="CT_GENM_HELIPUERTO_XHELIPUERTO_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_GENM_HELIPUERTO_XHELIPUERTO": [{ ErrorMessage: "Debe seleccionar un Helipuerto de Ida" }] })
    //        }

    //        if ($("#XHELIPUERTO_FIN").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="XHELIPUERTO_FIN_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "XHELIPUERTO_FIN": [{ ErrorMessage: "Debe seleccionar un Helipuerto de Destino" }] })
    //        }

    //        if ($("#CT_GENM_HELIPUERTO_XHELIPUERTO").val().trim() == $("#XHELIPUERTO_FIN").val().trim()) {
    //            flg = false;
    //            $('[aria-owns="CT_GENM_HELIPUERTO_XHELIPUERTO_listbox"]').parents("span").addClass("valError");
    //            $('[aria-owns="XHELIPUERTO_FIN_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_GENM_HELIPUERTO_XHELIPUERTO": [{ ErrorMessage: "Debe seleccionar Helipuertos distintos tanto de ida como destino" }] })
    //        }

    //    } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_AERODROMO").val()) {

    //        if ($("#CT_MAE_AERODROMO_XAERODROMO").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="CT_MAE_AERODROMO_XAERODROMO_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_MAE_AERODROMO_XAERODROMO": [{ ErrorMessage: "Debe seleccionar un Aerodromo de Ida" }] })
    //        }

    //        if ($("#XAERODROMO_FIN").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="XAERODROMO_FIN_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "XAERODROMO_FIN": [{ ErrorMessage: "Debe seleccionar un Aerodromo de Destino" }] })
    //        }

    //        if ($("#CT_MAE_AERODROMO_XAERODROMO").val().trim() == $("#XAERODROMO_FIN").val().trim()) {
    //            flg = false;
    //            $('[aria-owns="CT_MAE_AERODROMO_XAERODROMO_listbox"]').parents("span").addClass("valError");
    //            $('[aria-owns="XAERODROMO_FIN_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_MAE_AERODROMO_XAERODROMO": [{ ErrorMessage: "Debe seleccionar Aerodromos distintos tanto de ida como destino" }] })
    //        }
    //    } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_UBIGEO").val()) {

    //        if ($("#XDEPARTAMENTO").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="XDEPARTAMENTO_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "XDEPARTAMENTO": [{ ErrorMessage: "Debe seleccionar un Departamento" }] })
    //        }

    //        if ($("#CT_GENM_PROVINCIA_XPROVINCIA").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="CT_GENM_PROVINCIA_XPROVINCIA_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_GENM_PROVINCIA_XPROVINCIA": [{ ErrorMessage: "Debe seleccionar una Provincia" }] })
    //        }

    //        if ($("#CT_GENM_DISTRITO_XDISTRITO").val().trim() == "") {
    //            flg = false;
    //            $('[aria-owns="CT_GENM_DISTRITO_XDISTRITO_listbox"]').parents("span").addClass("valError");
    //            objData.push({ "CT_GENM_DISTRITO_XDISTRITO": [{ ErrorMessage: "Debe seleccionar una Departamento" }] })
    //        }

    //    }


    //    //$("#DivMatricula").show();
    //    //$("#DivTipoLugar").show();

    //}

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
        //$("#DivHelipuertoFin").show();
        $("#DivAerodromoFin").hide();
        $("#DivDepartamento").hide();
        $("#DivProvincia").hide();
        $("#DivDistrito").hide();

    } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_AERODROMO").val()) {
        $("#DivAerodromoInicio").show();
        $("#DivHelipuertoInicio").hide();
        //$("#DivAerodromoFin").show();
        $("#DivHelipuertoFin").hide();
        $("#DivDepartamento").hide();
        $("#DivProvincia").hide();
        $("#DivDistrito").hide();

    } else if ($("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").val() == $("#XCB_ID_UBIGEO").val()) {
        $("#DivAerodromoInicio").hide();
        $("#DivHelipuertoInicio").hide();
        $("#DivAerodromoFin").hide();
        $("#DivHelipuertoFin").hide();
        $("#DivDepartamento").show();
        $("#DivProvincia").show();
        $("#DivDistrito").show();

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


    } else {
        $("#CT_GENM_PROVINCIA_XPROVINCIA").data("kendoComboBox").value('');
        $("#CT_GENM_DISTRITO_XDISTRITO").data("kendoComboBox").value('');
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

    } else {
        $("#CT_GENM_CIUDAD_XCIUDAD").data("kendoComboBox").value('');
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
    } else {
        $("#CT_GENM_DISTRITO_XDISTRITO").data("kendoComboBox").value('');
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
                //template: "# if(XVALIDA_LEVANTAMIENTO == 0 ) {# <input type='checkbox' class='checkbox' /> #} else {# <div>&nbsp;</div> #} #"
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

                var grid = $("#gridDiscrepancia").data("kendoGrid");
                var dataSource = grid.dataSource;

                var total = dataSource.view().length;
                if (total == 0) {
                    $("#btnGenerarOficio").hide();
                } else {

                    var contalevant = 0;
                    var gridDiscrep = $("#gridDiscrepancia").data("kendoGrid").dataSource.data();

                    $.each(gridDiscrep, function (index, item) {
                        contalevant = contalevant + item.XVALIDA_LEVANTAMIENTO;
                    });

                    if (total == contalevant) {                        
                        $("#btnReiterativo").hide();
                    }
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


function ValidarInspeccionControles() {

    $("#btnAddDiscrepancia").hide();
    $("#btnModifyDiscrepancia").html('Ver Discrepancia');
    $("#FECHA_INSPECCION").data("kendoDatePicker").enable(false);
    $("#XDEPARTAMENTO").data("kendoComboBox").enable(false);
    $("#CT_GENM_PROVINCIA_XPROVINCIA").data("kendoComboBox").enable(false);
    $("#CT_GENM_DISTRITO_XDISTRITO").data("kendoComboBox").enable(false);
    $("#OBSERVACION").removeAttr("readonly").attr("readonly", "readonly");
    $("#CT_GENM_PAIS_XPAIS").data("kendoComboBox").enable(false);
    $("#CT_GENM_CIUDAD_XCIUDAD").data("kendoComboBox").enable(false);
    $("#XMATRICULA").data("kendoComboBox").enable(false);
    $("#CT_MAE_TIPO_LUEGAR_DS_XTIPO_LUGAR_DS").data("kendoComboBox").enable(false);
    $("#CT_MAE_AERODROMO_XAERODROMO").data("kendoComboBox").enable(false);
    $("#XAERODROMO_FIN").data("kendoComboBox").enable(false);
    $("#CT_GENM_HELIPUERTO_XHELIPUERTO").data("kendoComboBox").enable(false);
    $("#XHELIPUERTO_FIN").data("kendoComboBox").enable(false);
    $("#btnRegistrarInspeccion").hide();
    $("#btnCancelar").html('Cerrar');
    $("#btnGenerarOficio").hide();
    //Agregar para validar radio button!
    $('input:radio[name=FLG_SATISFACTORIA]').removeAttr("disabled").attr("disabled", "disabled");
}
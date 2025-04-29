var consultarAprobacion = false; // Sirve para poner la pagina en modo consulta (true== modo Editar)
$(document).ready(function () {
    loadGridPadre();
    CargarSwitch();
    $('.filtro').on('keypress', function (e) {
        if (e.which === 13) {

            ActualizarTablaSolicitud();

        }
    });
    $("#btnEditarSolicitudActualizacionPC").click(function () {
        //alert(123)
        consultarAprobacion = true;
        var data = $("#gridSolicitudActualizacion").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
            debugger;
            if (item.Sla_EstadoAprobracion != 'P') {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: 'Esta solicitud no puede ser modificada, su estado es: ' + item.Sla_EstadoAprobracionDescipcion,
                });
                return;
            }
            bloquoteObject();
            console.log(item.IdSolicitudActualizacion)
            BootstrapDialog.show({
                cssClass: 'size-wide-dialog-1200',
                title: 'EDITAR SOLICITUD ACTUALIZACIÓN',
                message: $('<div><img src="../../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'IdSolicitudKey=' + item.SerialKey)),
                closable: true,
                closeByBackdrop: false,
                closeByKeyboard: false,
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                    label: 'Registrar',
                    icon: 'glyphicon glyphicon-save',
                    action: function (dialog) {

                        if ($('#frnRegitrarSolicitudActualizacionPC').find('select[id="IdMotivo"]').val() == "") {
                            AlertMessage("Seleccione Motivo");
                            return;
                        }
                        var Detalle = [
                        ]

                        var o = {
                            IdSolicitudActualizacion: $("#frnRegitrarSolicitudActualizacionPC :input[id='IdSolicitudActualizacion']").val(),
                            Sla_Anio: $("#frnRegitrarSolicitudActualizacionPC :input[id='Sla_Anio']").val(),
                            Sla_Nro: $("#frnRegitrarSolicitudActualizacionPC :input[id='Sla_Nro']").val(),
                            IdMotivo: $('#frnRegitrarSolicitudActualizacionPC').find('select[id="IdMotivo"]').val(),
                            Sla_EstadoAprobracion: $("#frnRegitrarSolicitudActualizacionPC :input[id='Sla_EstadoAprobracion']").val(),
                            Sla_Observacion: $("#frnRegitrarSolicitudActualizacionPC :input[id='Sla_Observacion']").val()
                        }
                        var dataSave = $("#gridDCPO").data("kendoGrid").dataSource.data()

                        if (dataSave.length == 0) {
                            AlertMessage("Seleccione al menos una DCPO");
                            return;
                        }
                        var root = "<ROOT>";
                        $.each(dataSave, function (i, e) {

                            root += "<SOLICITUDDETALLE>";
                            root += "<EmpCCod>" + e.EmpCCod + "</EmpCCod>";
                            root += "<OPCCTipPC>" + e.OPCCTipPC + "</OPCCTipPC>";
                            root += "<OPCNAno>" + e.OPCNAno + "</OPCNAno>";
                            root += "<OPCNNro>" + e.OPCNNro + "</OPCNNro>";
                            root += "<OPCNItemDsp>" + e.OPCNItemDsp + "</OPCNItemDsp>";
                            root += "<DCPOPCNItemRC>" + e.OPCNItemRC + "</DCPOPCNItemRC>";
                            root += "<OPCNItemD>" + e.OPCNItemD + "</OPCNItemD>";

                            root += "<IdSolicitudActualizacionDetalle>" + (e.IdSolicitudActualizacionDetalle == null) ? "0" : e.IdSolicitudActualizacionDetalle + "</IdSolicitudActualizacionDetalle>";
                            
                            root += "<sld_Observacion></sld_Observacion>";
                            root += "</SOLICITUDDETALLE>";

                            Detalle.push(e)


                            o.EmpCCod = e.EmpCCod
                            o.OPCCTipPC = e.OPCCTipPC
                            o.OPCNAno = e.OPCNAno
                            o.OPCNNro = e.OPCNNro


                        })
                        root += "</ROOT>";

                        o.XML = root
                        console.log(o);
                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/SolicitudActualizacionPC/GuardarSolicitud',
                            type: 'POST',
                            data: JSON.stringify({ entidad: o, _entidad: null }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                debugger;
                                if (!data.rpta) {
                                    //errorAddModelo("divErrorEstilo", "ulListaErrorEstilo", data.errores);
                                    AlertMessage(data.errores);
                                } else {
                                    AlertMessage("Se edito la solicitud " + data.id);

                                    var grid = $('#gridSolicitudActualizacion').data("kendoGrid");
                                    grid.dataSource.read();
                                    grid.refresh();
                                    dialog.close();
                                }

                                desbloqObject();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            console.log("Request Failed: " + err);
                            desbloqObject();
                        });
                    }
                }]
            });

        }
        else {
            AlertMessage("DEBE SELECCIONAR LA SOLICITUD QUE DESEA EDITAR");
        }

    })

    $("#btnAprobarSolicitudActualizacionPC").click(function () {
        var data = $("#gridSolicitudActualizacion").data("kendoGrid");
        var item = data.dataItem(data.select());
        consultarAprobacion = false;
        if (item != undefined) {
            debugger;
            if (item.Sla_EstadoAprobracion != 'E') {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: 'Esta solicitud no puede ser procesada, su estado es: ' + item.Sla_EstadoAprobracionDescipcion,
                });
                return;
            }
            bloquoteObject();
            console.log(item.IdSolicitudActualizacion)
            BootstrapDialog.show({
                cssClass: 'size-wide-dialog-1200',
                title: 'APROBAR SOLICITUD ACTUALIZACIÓN',
                message: $('<div><img src="../../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'IdSolicitudKey=' + item.SerialKey)),
                closable: true,
                closeByBackdrop: false,
                closeByKeyboard: false,
                buttons: [{
                    label: 'Cerrar',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                    label: 'Rechazar',
                    icon: 'glyphicon glyphicon-remove',
                    action: function (dialog) {
                        if ($('#frnRegitrarSolicitudActualizacionPC').find('select[id="IdMotivo"]').val() == "") {
                            AlertMessage("Seleccione Motivo");
                            return;
                        }
                        var Detalle = [
                        ]

                        var o = {
                            IdSolicitudActualizacion: $("#frnRegitrarSolicitudActualizacionPC :input[id='IdSolicitudActualizacion']").val(),
                            Sla_Anio: $("#frnRegitrarSolicitudActualizacionPC :input[id='Sla_Anio']").val(),
                            Sla_Nro: $("#frnRegitrarSolicitudActualizacionPC :input[id='Sla_Nro']").val(),
                            IdMotivo: $('#frnRegitrarSolicitudActualizacionPC').find('select[id="IdMotivo"]').val(),
                            Sla_EstadoAprobracion: 'R',
                            Sla_Observacion: $("#frnRegitrarSolicitudActualizacionPC :input[id='Sla_Observacion']").val()
                        }


                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/SolicitudActualizacionPC/AprobarSolicitud',
                            type: 'POST',
                            data: JSON.stringify({ entidad: o, _entidad: null }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                if (!data.rpta) {
                                    errorAddModelo("divErrorEstilo", "ulListaErrorEstilo", data.errores);
                                } else {
                                    AlertMessage("Se rechazó la solicitud " + data.id);

                                    var grid = $('#gridSolicitudActualizacion').data("kendoGrid");
                                    grid.dataSource.read();
                                    grid.refresh();
                                    dialog.close();
                                }
                                desbloqObject();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            console.log("Request Failed: " + err);
                            desbloqObject();
                        });
                    }
                },
                {
                    label: 'Aprobar',
                    icon: 'glyphicon glyphicon glyphicon-ok',
                    action: function (dialog) {

                        if ($('#frnRegitrarSolicitudActualizacionPC').find('select[id="IdMotivo"]').val() == "") {
                            AlertMessage("Seleccione Motivo");
                            return;
                        }
                        var Detalle = [
                        ]

                        var o = {
                            IdSolicitudActualizacion: $("#frnRegitrarSolicitudActualizacionPC :input[id='IdSolicitudActualizacion']").val(),
                            Sla_Anio: $("#frnRegitrarSolicitudActualizacionPC :input[id='Sla_Anio']").val(),
                            Sla_Nro: $("#frnRegitrarSolicitudActualizacionPC :input[id='Sla_Nro']").val(),
                            IdMotivo: $('#frnRegitrarSolicitudActualizacionPC').find('select[id="IdMotivo"]').val(),
                            Sla_EstadoAprobracion: 'A',
                            Sla_Observacion: $("#frnRegitrarSolicitudActualizacionPC :input[id='Sla_Observacion']").val()
                        }
                        var dataSave = $("#gridDCPO").data("kendoGrid").dataSource.data()

                        if (dataSave.length == 0) {
                            AlertMessage("Seleccione al menos una DCPO");
                            return;
                        }
                        $.each(dataSave, function (i, e) {
                            Detalle.push(e)
                            o.EmpCCod = e.EmpCCod
                            o.OPCCTipPC = e.OPCCTipPC
                            o.OPCNAno = e.OPCNAno
                            o.OPCNNro = e.OPCNNro
                        })
                        o.Detalle = Detalle

                        $.ajax({
                            datatype: 'json',
                            contentType: "application/json",
                            url: '/SolicitudActualizacionPC/AprobarSolicitud',
                            type: 'POST',
                            data: JSON.stringify({ entidad: o, _entidad: null }),
                            beforeSend: function () {
                                bloquoteObject();
                            },
                            success: function (data) {
                                if (!data.rpta) {
                                    errorAddModelo("divErrorEstilo", "ulListaErrorEstilo", data.errores);
                                } else {
                                    AlertMessage("Se aprobó la solicitud " + data.id);

                                    var grid = $('#gridSolicitudActualizacion').data("kendoGrid");
                                    grid.dataSource.read();
                                    grid.refresh();
                                    dialog.close();
                                }
                                desbloqObject();
                            }
                        }).fail(function (jqxhr, textStatus, error) {
                            var err = textStatus + ', ' + error;
                            console.log("Request Failed: " + err);
                            desbloqObject();
                        });
                    }
                }]
            });

        }
        else {
            AlertMessage("DEBE SELECCIONAR EL PEDIDO COMERCIAL DE MUESTRA QUE DESEA EDITAR");
        }

    });

    $("#btnEnvioPcp").click(function () {
        var data = $("#gridSolicitudActualizacion").data("kendoGrid");
        var item = data.dataItem(data.select());
        if (item != undefined) {
            if (item.Sla_EstadoAprobracion != 'P') {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: 'Esta solicitud no puede ser enviada a PCP, su estado es: ' + item.Sla_EstadoAprobracionDescipcion,
                });
                return;
              
            }
            window.ConfirmMessage("Desea Enviar el Pedido Comercial a PCP?").then(function () {

                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/SolicitudActualizacionPC/ListarDatosPCP',
                    type: 'POST',
                    data: JSON.stringify({ entidad: item }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {

                        if (data.rpta == false || data.rpta == undefined) {
                            AlertMessage(data.result);

                        }
                        else {
                            var vrParametros = data.parametros;
                            console.log(vrParametros);
                            var mCotizacion = {
                                StrSubject: data.parametros[2],
                                StrBody: data.parametros[3]
                            };

                            vrRuta = Enrutamiento("../EmailPCP/EnviarPCP", 'strData=' + encodeURIComponent(JSON.stringify(mCotizacion)));
                            BootstrapDialog.show({
                                title: 'Envió Email',
                                cssClass: 'size-wide-dialog-1000',
                                closable: false,
                                message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(vrRuta),
                                buttons: [
                                    {
                                        label: 'Cerrar',
                                        action: function (dialog) {
                                            dialog.close();
                                        }
                                    },
                                    {
                                        label: 'Aceptar',
                                        action: function (dialog) {
                                            var vrcuerpo = $("#frmEnvioEmail").find("textarea[id='strStrBody']").val();
                                            var vrDestinatarios = $("#frmEnvioEmail").find("textarea[id='txtStrTo']").val();

                                            if ($.trim(vrDestinatarios).length == 0) {
                                                AlertMessage('Debe de ingresar al menos un destinatario');
                                                return;
                                            } else {

                                                var arr = vrDestinatarios.split(';');

                                                for (var i = 0; i < arr.length; i++) {
                                                    if ($.trim(arr[i]).length == 0) {
                                                        AlertMessage('Debe de ingresar al menos un destinatario');
                                                        break;
                                                        return;
                                                    }
                                                }
                                            }
                                            if ($.trim(vrcuerpo).length == 0) {
                                                AlertMessage('Debe de ingresar el Contenido del Mensaje');
                                                return;
                                            }
                                            var mCotizacion = {
                                                StrFrom: $("#frmEnvioEmail :input[id='txtStrFrom']").val(),
                                                StrTo: $("#frmEnvioEmail").find("textarea[id='txtStrTo']").val(),
                                                StrCopyTo: $("#frmEnvioEmail").find("textarea[id='strStrCopyTo']").val(),
                                                StrSubject: $("#frmEnvioEmail :input[id='txtStrSubject']").val(),
                                                StrBody: $("#frmEnvioEmail").find("textarea[id='strStrBody']").val(),
                                            };

                                            $.ajax({
                                                datatype: 'json',
                                                contentType: "application/json",
                                                url: '/EmailPCP/EnviarEmail',
                                                type: 'POST',
                                                data: JSON.stringify(mCotizacion),
                                                beforeSend: function () { },
                                                success: function (data) {
                                                    if (!data.rpta) {
                                                        AlertMessage(data.result);
                                                        console.log("error :" + data.result);
                                                        return;
                                                    }

                                                    //Actualizamos estado
                                                    $.ajax({
                                                        datatype: 'json',
                                                        contentType: "application/json",
                                                        url: '/SolicitudActualizacionPC/EnviarCorreo',
                                                        type: 'POST',
                                                        data: JSON.stringify({ entidad: item }),
                                                        beforeSend: function () { },
                                                        success: function (data) {
                                                            if (!data.rpta) {
                                                                AlertMessage(data.result);
                                                                console.log("error :" + data.result);
                                                                return;
                                                            }
                                                            AlertMessage("Se envio a PCP " + data.id);
                                                            //AlertMessage(data.result);
                                                            ActualizarTablaSolicitud();
                                                            dialog.close();
                                                        }
                                                    });

                                                    //AlertMessage(data.result);
                                                    //ActualizarTablaSolicitud();
                                                    //dialog.close();
                                                }
                                            }).fail(function (jqxhr, textStatus, error) {
                                                console.log("Request Failed: " + error);
                                                dialog.close();
                                                });


                                        },
                                        error: function (e) {
                                            console.log("Error eviar Mail: [ " + e + " ]")
                                        }
                                    }
                                ]
                            });
                        }
                        desbloqObject();
                    }
                }).fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Request Failed: " + err);
                    desbloqObject();
                });



            });
        } else {
            AlertMessage("DEBE SELECCIONAR LA SOLICITUD QUE DESEA ENVIAR A PCP");
        }



    });

    $('#frnRegitrarSolicitudActualizacionPC').on('DOMNodeInserted', '#abcid', function () {
        //$(this).combobox();
        console.log(123)
    });

    $("#btnRegistrarSolicitudActualizacionPC").click(function () {
        //alert(123)
        //var CLIENTEKey = $('#frmIdxSolicitudActualizacionPC').find('input[id="CLIENTEKey"]').val();
        consultarAprobacion = true;
        var IdSolicitudKey = "";
        BootstrapDialog.show({
            id: 'abcid',
            cssClass: 'size-wide-dialog-1200',
            title: 'REGISTRAR SOLICITUD ACTUALIZACIÓN',
            message: $('<div><img src="../../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'IdSolicitudKey=' + IdSolicitudKey)),
            closable: true,
            closeByBackdrop: false,
            closeByKeyboard: false,
            buttons: [{
                label: 'Cerrar',
                action: function (dialog) {
                    dialog.close();
                }
            }, {
                label: 'Registrar',
                icon: 'glyphicon glyphicon-save',
                action: function (dialog) {

                    if ($('#frnRegitrarSolicitudActualizacionPC').find('select[id="IdMotivo"]').val() == "") {
                        AlertMessage("Seleccione Motivo");
                        return;
                    }
                    var Detalle = [
                    ]

                    var o = {
                        IdSolicitudActualizacion: $("#frnRegitrarSolicitudActualizacionPC :input[id='IdSolicitudActualizacion']").val(),
                        Sla_Anio: $("#frnRegitrarSolicitudActualizacionPC :input[id='Sla_Anio']").val(),
                        Sla_Nro: $("#frnRegitrarSolicitudActualizacionPC :input[id='Sla_Nro']").val(),
                        IdMotivo: $('#frnRegitrarSolicitudActualizacionPC').find('select[id="IdMotivo"]').val(),
                        Sla_EstadoAprobracion: $("#frnRegitrarSolicitudActualizacionPC :input[id='Sla_EstadoAprobracion']").val(),
                        Sla_Observacion: $("#frnRegitrarSolicitudActualizacionPC :input[id='Sla_Observacion']").val()
                    }


                    var dataSave = $("#gridDCPO").data("kendoGrid").dataSource.data()

                    if (dataSave.length == 0) {
                        AlertMessage("Seleccione al menos una DCPO");
                        return;
                    }
                    var root = "<ROOT>";
                    $.each(dataSave, function (i, e) {

                        root += "<SOLICITUDDETALLE>";
                        root += "<EmpCCod>" + e.EmpCCod + "</EmpCCod>";
                        root += "<OPCCTipPC>" + e.OPCCTipPC + "</OPCCTipPC>";
                        root += "<OPCNAno>" + e.OPCNAno + "</OPCNAno>";
                        root += "<OPCNNro>" + e.OPCNNro + "</OPCNNro>";
                        root += "<OPCNItemDsp>" + e.OPCNItemDsp+ "</OPCNItemDsp>";
                        root += "<DCPOPCNItemRC>" + e.OPCNItemRC + "</DCPOPCNItemRC>";
                        root += "<OPCNItemD>" + e.OPCNItemD + "</OPCNItemD>";

                       
                        root += "<IdSolicitudActualizacionDetalle>0</IdSolicitudActualizacionDetalle>";
                        root += "<sld_Observacion></sld_Observacion>";
                        root += "</SOLICITUDDETALLE>";

                        Detalle.push(e)


                        o.EmpCCod = e.EmpCCod
                        o.OPCCTipPC = e.OPCCTipPC
                        o.OPCNAno = e.OPCNAno
                        o.OPCNNro = e.OPCNNro


                    })
                    root += "</ROOT>";
                    //o.Detalle = Detalle
                    o.XML= root

                    $.ajax({
                        datatype: 'json',
                        contentType: "application/json",
                        url: '/SolicitudActualizacionPC/GuardarSolicitud',
                        type: 'POST',
                        data: JSON.stringify({ entidad: o, _entidad: null }),
                        beforeSend: function () {
                            bloquoteObject();
                        },
                        success: function (data) {
                            //debugger;
                            if (!data.rpta) {
                                //errorAddModelo("divErrorEstilo", "ulListaErrorEstilo", data.errores);
                                AlertMessage(data.errores);
                            } else {
                                AlertMessage("Se generó la solicitud " + data.id);

                                var grid = $('#gridSolicitudActualizacion').data("kendoGrid");
                                grid.dataSource.read();
                                grid.refresh();
                                dialog.close();
                            }


                            desbloqObject();
                        }
                    }).fail(function (jqxhr, textStatus, error) {
                        var err = textStatus + ', ' + error;
                        console.log("Request Failed: " + err);
                        desbloqObject();
                    });
                }
            }]
        });
    });

    $("#btnAuditoria").click(function () {

        var data = $("#gridSolicitudActualizacion").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
            //var DATAGrupo = {
            //    IdAsociacionPedido: item.IdSolicitudActualizacion,
            //}

            vrRuta = Enrutamiento("../SolicitudActualizacionPC/Auditoria", 'IdSolicitudKey=' + item.SerialKey);
            BootstrapDialog.show({
                title: 'Auditoria ' + item.Sla_Anio + '-' + item.Sla_Nro,
                cssClass: 'size-wide-dialog-1000',
                closable: false,
                message: $('<div><img src="../Content/images/loading_modal.gif" class="image-center" /></div>').load(vrRuta),
                buttons: [
                    {
                        label: 'Aceptar',
                        action: function (dialog) {
                            dialog.close();
                        }
                    }
                ]
            });
        }
        else {
            AlertMessage("DEBE SELECCIONAR LA SOLICITUD QUE DESEA AUDITAR");
        }


    });

    $("#btnEliminarSolicitudActualizacion").click(function () {

        var data = $("#gridSolicitudActualizacion").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
            console.log(item);
            if (item.Sla_EstadoAprobracion != 'P') {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: 'Esta solicitud no puede ser eliminada, su estado es: ' + item.Sla_EstadoAprobracionDescipcion,
                });
                return;
            }
            window.ConfirmMessage("SEGURO QUE DESEA ELIMINAR LA SIGUIENTE SOLICITUD?").then(function () {

                var SOLICITUDPEDIDO = {
                    SerialKey: item.SerialKey,
                    ESTADO: "I"
                }

                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/SolicitudActualizacionPC/Eliminar',
                    type: 'POST',
                    data: JSON.stringify({ entidad: SOLICITUDPEDIDO }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {
                        if (!data.rpta) {
                            AlertMessage(data.errores);
                        } else {
                            
                            AlertMessage("Se Elimino la solicitud");
                            var grid = $('#gridSolicitudActualizacion').data("kendoGrid");
                            grid.dataSource.read();
                            grid.refresh();
                        }
                        
                        desbloqObject();
                    }
                }).fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Request Failed: " + err);
                    desbloqObject();
                });

            });
        }
        else {
            AlertMessage("DEBE SELECCIONAR LA SOLICITUD QUE DESEA ELIMINAR");
        }


    });

    $("#btnActualizacionPC").click(function () {

        var data = $("#gridSolicitudActualizacion").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
            bloquoteObject();
            var url_ = Enrutamiento($(this).attr('data-url'), 'key=' + item.SerialKey_PC);
            if (item.Sla_EstadoAprobracion == 'A') {
                var SOLICITUDPEDIDO = {
                    SerialKey: item.SerialKey
                }

                $.ajax({
                    datatype: 'json',
                    contentType: "application/json",
                    url: '/SolicitudActualizacionPC/ActualizarSolicitud_Historico',
                    type: 'POST',
                    data: JSON.stringify({ entidad: SOLICITUDPEDIDO }),
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    success: function (data) {
                        if (!data.rpta) {
                            AlertMessage(data.errores);
                        } else {

                            //desbloqObject();
                            window.location.href = url_;

                        }
                        desbloqObject();
                    }
                }).fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ', ' + error;
                    console.log("Request Failed: " + err);
                    desbloqObject();
                });
                
               
            }
            else if (item.Sla_EstadoAprobracion == 'U') {
                window.location.href = url_;
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: 'Esta solicitud no puede ser Actualizada, su estado es: ' + item.Sla_EstadoAprobracionDescipcion,
                });
                desbloqObject();
               
            }
            

           

        }
        else {
            AlertMessage("DEBE SELECCIONAR EL PEDIDO COMERCIAL QUE DESEA ACTUALIZAR");
        }


    });


    $("#btnConsultar").click(function () {
        var data = $("#gridSolicitudActualizacion").data("kendoGrid");
        var item = data.dataItem(data.select());
        consultarAprobacion = false;
        if (item != undefined) {
            debugger;
            bloquoteObject();
            console.log(item.IdSolicitudActualizacion)
            BootstrapDialog.show({
                cssClass: 'size-wide-dialog-1200',
                title: 'APROBAR SOLICITUD ACTUALIZACIÓN',
                message: $('<div><img src="../../Content/images/loading_modal.gif" class="image-center" /></div>').load(Enrutamiento($(this).attr('data-url'), 'IdSolicitudKey=' + item.SerialKey)),
                closable: true,
                closeByBackdrop: false,
                closeByKeyboard: false,
                buttons: [{
                    label: 'Aceptar',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });

        }
        else {
            AlertMessage("DEBE SELECCIONAR EL PEDIDO COMERCIAL DE MUESTRA QUE DESEA EDITAR");
        }

    });

    $("#btnConsultarConf").click(function () {

        var data = $("#gridSolicitudActualizacion").data("kendoGrid");
        var item = data.dataItem(data.select());

        if (item != undefined) {
            bloquoteObject();
            var url_ = Enrutamiento($(this).attr('data-url'), 'key=' + item.SerialKey_PC);
            if (item.Sla_EstadoAprobracion == 'F') {
                window.location.href = url_;
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'SISTEMA',
                    text: 'Esta solicitud no puede ser Actualizada, su estado es: ' + item.Sla_EstadoAprobracionDescipcion,
                });
                desbloqObject();

            }




        }
        else {
            AlertMessage("DEBE SELECCIONAR EL PEDIDO COMERCIAL QUE DESEA ACTUALIZAR");
        }


    });
})

function onDataBound(arg) {
    var myElem = document.getElementById('trParentHeader');
    if (myElem === null) {
        $("#gridSolicitudActualizacion").find("th.k-header").parent().before(`<tr id='trParentHeader'>
                                                <th colspan='3' class='k-header'><strong>Solicitud de Actualización </strong></th>
                                                <th colspan='3' class='k-header'><strong>Pedido Comercial</strong></th>
                                                <th colspan='1' class='k-header'><strong>Orden Manufactura</strong></th>
                                                <th colspan='6' class='k-header'><strong></strong></th>
                                                </tr>`);
    }
}

function loadGridPadre() {
    //alert(1234)
    var grid = $("#gridSolicitudActualizacion").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    type: "POST",
                    url: "/SolicitudActualizacionPC/ListarPaginado",
                    contentType: "application/json",
                    dataType: 'json',
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    complete: function () {
                        desbloqObject();
                    }
                },
                parameterMap: function (options, operation) {
                    return JSON.stringify({
                        PageNumber: options.page, //(options.page == 0) ? 0 : (options.page - 1),
                        pageSize: options.pageSize,
                        EmpCCod: $('#frmIdxSolicitudActualizacionPC').find('input[id="EmpCCod"]').val(),
                        Sla_Anio: $('#frmIdxSolicitudActualizacionPC').find('input[id="Sla_Anio"]').val(),
                        Sla_Nro: $('#frmIdxSolicitudActualizacionPC').find('input[id="Sla_Nro"]').val(),
                        OPCNAno: $('#frmIdxSolicitudActualizacionPC').find('input[id="OPCNAno"]').val(),
                        OPCNNro: $('#frmIdxSolicitudActualizacionPC').find('input[id="OPCNNro"]').val(),
                        OrdenManuAno: $('#frmIdxSolicitudActualizacionPC').find('input[id="OrdenManuAno"]').val(),
                        OrdenManuNro: $('#frmIdxSolicitudActualizacionPC').find('input[id="OrdenManuNro"]').val(),
                        MotivoDescripcion: $('#frmIdxSolicitudActualizacionPC').find('input[id="MotivoDescripcion"]').val(),
                        Cliente: $('#frmIdxSolicitudActualizacionPC').find('input[id="Cliente"]').val(),
                        Marca: $('#frmIdxSolicitudActualizacionPC').find('input[id="Marca"]').val(),
                        Ejecutivo: $('#frmIdxSolicitudActualizacionPC').find('input[id="Ejecutivo"]').val(),
                        ESTADO: $('#frmIdxSolicitudActualizacionPC').find('input[id="ESTADO"]').val(),
                        Sla_EstadoAprobracionDescipcion: $('#frmIdxSolicitudActualizacionPC').find('input[id="Sla_EstadoAprobracionDescipcion"]').val(),
                    });
                }
            },
            schema: {
                data: "lista",
                total: "pageSize",
                type: 'json',
                model: {
                    fields: {
                        EmpCCod: { type: "string" },
                        IdSolicitudActualizacion: { type: "string" },
                        Sla_Anio: { type: "string" },
                        Sla_Nro: { type: "string" },
                        Sla_EstadoAprobracion: { type: "string" },
                        Sla_EstadoAprobracionDescipcion: { type: "string" },

                        OPCCTipPC: { type: "String" },
                        OPCNAno: { type: "String" },
                        OPCNNro: { type: "String" },

                        Cliente: { type: "String" },
                        Marca: { type: "string" },
                        OPCFecEmi: { type: "date" },
                        Ejecutivo: { type: "string" },
                        TipoMercado: { type: "string" },

                        MotivoDescripcion: { type: "string" },

                        FECHA_REG: { type: "date" },
                        USUARIO_REG: { type: "string" },

                        sla_FechaMod: { type: "string" },
                        sla_HoraMod: { type: "string" },
                        sla_UsuarioMod: { type: "string" },

                        sla_FechaApru: { type: "string" },
                        sla_HoraApru: { type: "string" },
                        sla_UsuarioApru: { type: "string" },

                        TotalPage: { type: "string" },
                        SerialKey: { type: "string" },
                        SerialKey_PC: { type: "string" },
                        COLOR_ESTADO: { type: "string" },
                        OrdenesManufactura: { type: "string" },
                    }
                }
            },
            pageSize: 10,
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
        },
        scrollable: true,
        dataBound: onDataBound,
        pageable: true,
        selectable: true,
        toolbar: kendo.template($("#templateSolicitudActualizacionPC").html()),
        noRecords: {
            template: '<br /> ' +
                ' <div> ' +
                ' <div class="mainbox col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3"> ' +
                ' <div class="alert alert-info alert-dismissable" align="center"> ' +
                ' NO SE ENCONTRARON REGISTROS ' +
                ' </div> ' +
                ' </div> ' +
                ' </div>'
        },

        columns: [
            {
                field: "IdSolicitudActualizacion",
                title: "IdSolicitudActualizacion",
                width: 120
            },
            {
                field: "Sla_Anio",
                title: "Año",
                width: 60
            }, {
                field: "Sla_Nro",
                title: "Nro",
                width: 60
            },
            {
                field: "Sla_EstadoAprobracionDescipcion",
                title: "Estado de Solicitud",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 160
            },
            {
                field: "EmpCCod",
                title: "Empresa",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 0
            },
            {
                field: "OPCCTipPC",
                title: "Tipo PC",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 80
            },
            {
                field: "OPCNAno",
                title: "Año",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 60
            }, {
                field: "OPCNNro",
                title: "Nro",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 60
            },
            {
                field: "OrdenesManufactura",
                title: "Manufactura",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 200
            },
            {
                field: "Cliente",
                title: "Cliente",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 290
            },
            {
                field: "Marca",
                title: "Marca",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 180
            },
            {
                field: "OPCFecEmi",
                title: "F. Emision",
                format: "{0: dd/MM/yyyy}",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 100
            },
            {
                field: "Ejecutivo",
                title: "Ejecutivo",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 310
            },
            {
                field: "TipoMercado",
                title: "Tipo Mercado",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 100
            },
            {
                field: "MotivoDescripcion",
                title: "Motivo",
                attributes: {
                    style: "color: black; background-color: #= COLOR_ESTADO #"
                },
                width: 200
            }, {
                field: "SerialKey",
                title: "SerialKey",
                width: 200
            }

        ]
    }).data("kendoGrid");

    grid.hideColumn(0);
    grid.hideColumn(4);
    grid.hideColumn(15);
}

function ActualizarTablaSolicitud() {
    var grid = $('#gridSolicitudActualizacion').data("kendoGrid");
    grid.dataSource.read();
    grid.refresh();
}

function CargarSwitch() {
    $("#chkEstadoAnulado").kendoSwitch({
        checked: false,
        messages: {
            checked: "Si",
            unchecked: "No"
        },
        change: function (e) {
            if (e.checked) {
                $("#ESTADO").val("I");
            } else {
                $("#ESTADO").val("A");
            }
            ActualizarTablaSolicitud();
        }
    });

  

}


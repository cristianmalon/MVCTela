$(document).ready(function () {
    //ListarParametros()
    Lista2()
    ListarMaquinaRango1()
    function Lista2() {
        //var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
        dataSource2 = new kendo.data.DataSource({
            transport: {
                read: {
                    //url: "/Recurso/ListarParametroMaquinaForRango",
                    //dataType: "json",
                    type: "POST",
                    url: "/Recurso/ListarParametroMaquinaForRango",
                    contentType: "application/json",
                    dataType: 'json',
                    beforeSend: function () {
                        bloquoteObject();
                    },
                    complete: function () {
                        desbloqObject();
                    }
                },
                update: {
                    type: "POST",
                    url: "/Recurso/ActualizaRangoParametroMasivo",
                    contentType: "application/json",
                    dataType: 'json'
                },
                destroy: {
                    type: "POST",
                    url: "/Recurso/ActualizaRangoParametro",
                    contentType: "application/json",
                    dataType: 'json'
                },
                create: {
                    type: "POST",
                    url: "/Recurso/ActualizaRangoParametro",
                    contentType: "application/json",
                    dataType: 'json'
                },
                parameterMap: function (options, operation) {
                    //console.log(options.models)
                    if (operation !== "read" && options.models) {
                        //console.log('xxxxxx')
                        //console.log(options)
                        console.log(operation)
                        //return JSON.stringify(options.models)
                        var grid = $("#grid2").data("kendoGrid")
                        //console.log(grid._data)
                        var dataList = []

                        grid._data.forEach(function (item, idx) {
                            var obj = {
                                IDPRMM02: item.IDPRMM02,
                                Marcado: item.Marcado,
                                Obligatorio: item.Obligatorio,
                                Rango: item.Rango,
                                RangoMin: item.RangoMin,
                                RangoMax: item.RangoMax,
                                Usuario: item.Usuario,
                                Estacion: item.Estacion,
                                Orden: idx
                            }
                            dataList.push(obj)
                        })

                        return JSON.stringify(dataList)
                    } else {
                        return JSON.stringify({
                            MaqCCod: document.getElementById('selectMaquina').value
                        })
                    }

                    //return JSON.stringify(options.models[0])
                    //console.log(11)
                    //if (operation !== "read" && options.models) {
                    //    console.log(222)
                    //    return { models: kendo.stringify(options.models) };
                    //}
                    //if (operation !== "read" && options.models) {
                    //    console.log(222)
                    //    return { models: kendo.stringify(options.models) };
                    //}
                    //else {

                    //    return JSON.stringify({
                    //        MaqCCod:"MTN001"
                    //        })
                    //    //return JSON.stringify({
                    //    //    ePack: {
                    //    //        EmpCCod: $("#frmindexPack").find("input[id='hdEmpCCod']").val(),
                    //    //        OPCCTipPC: $("#frmindexPack").find("input[id='hdOPCCTipPC']").val(),
                    //    //        OPCNAno: $("#frmindexPack").find("input[id='hdOPCNAno']").val(),
                    //    //        OPCNNro: $("#frmindexPack").find("input[id='hdOPCNNro']").val(),
                    //    //        OPCNItemDsp: $("#frmindexPack").find("input[id='hdOPCNItemDsp']").val(),
                    //    //        OPCNItemDsp: $("#frmindexPack").find("input[id='hdOPCNItemDsp']").val(),
                    //    //        DCPOPCNItemRC: $('#frmindexPack').find('input[id="hdDCPOPCNItemRC"]').val(),
                    //    //        OPCNItemD: $('#frmindexPack').find('input[id="hdOPCNItemD"]').val(),
                    //    //        ESTADO: 'A',
                    //    //    },
                    //    //    ESTADO: 'A'
                    //    //});
                    //}
                }
                //destroy: {
                //    url: crudServiceBaseUrl + "/detailproducts/Destroy",
                //    dataType: "jsonp"
                //},
                //parameterMap: function (options, operation) {
                //    if (operation !== "read" && options.models) {
                //        return { models: kendo.stringify(options.models) };
                //    }
                //}
            },
            requestStart: function (e) {
                if (e.type != "read") {
                    //kendoConsole.log(kendo.format("Request start ({0})", e.type));
                }
            },
            requestEnd: function (e) {
                if (e.type != "read") {
                    //kendoConsole.log(kendo.format("Request end ({0})", e.type));
                }
            },
            //pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            group: [{
                field: "TipoTenido",
                dir: "asc",

            }, {
                field: "Proceso",
                dir: "asc",

            }],
            batch: true,
            schema: {
                data: "result",
                model: {
                    id: "IDPRMM02",
                    fields: {
                        IDPRMM02: { editable: false, nullable: true },
                        TipoTenidoCodigo: { type: "string", editable: false },
                        ProcesoCodigo: { type: "string", editable: false },
                        Orden: { type: "number", editable: false },
                        ParametroId: { type: "number", editable: false },

                        TipoTenido: { type: "string", editable: false },
                        Proceso: { type: "string", editable: false },
                        Parametro: { type: "string", editable: false },
                        UnidadMedida: { type: "string", editable: false },

                        Obligatorio: { type: "boolean", editable: true },
                        Rango: { type: "boolean", editable: true },
                        RangoMin: { type: "number", editable: true },
                        RangoMax: { type: "number" },
                    }
                }
            }
        });

        $("#grid2").kendoGrid({
            dataSource: dataSource2,
            columnMenu: {
                filterable: false
            },
            height: 680,
            editable: "incell",
            //pageable: true,
            sortable: true,
            //navigatable: true,
            resizable: true,
            reorderable: true,
            //groupable: true,
            filterable: true,
            //dataBound: onDataBound,
            //toolbar: ["excel", "pdf", "search"],
            //toolbar:["create","save"],
            toolbar: kendo.template($("#templateListaFichaTecnica").html()),
            //toolbar: ["save", "cancel"],
            reorderable: { rows: true },
            columns: [
                { draggable: true, width: "40px" },
                {
                    field: "TipoTenidoCodigo",
                    title: "TipoTenidoCodigo",
                    width: 300,
                    hidden: true,
                },
                {
                    field: "IDPRMM02",
                    title: "IDPRMM02",
                    width: 300,
                    hidden: true,
                }, {
                    field: "ProcesoCodigo",
                    title: "ProcesoCodigo",
                    width: 300,
                    hidden: true
                }, {
                    field: "ParametroId",
                    title: "ParametroId",
                    width: 300,
                    hidden: true
                },
                {
                    field: "Orden",
                    title: "Orden",
                    width: 65,
                    //hidden: true
                },
                {
                    field: "TipoTenido",
                    title: "TipoTenido",
                    width: 180,
                    hidden: true
                }, {
                    field: "Proceso",
                    title: "Proceso",
                    width: 120
                }, {
                    field: "Parametro",
                    title: "Parametro",
                    width: 180
                }, {
                    field: "UnidadMedida",
                    title: "U. Medida",
                    width: 100
                },
                {
                    field: "Obligatorio",
                    title: "Obligatorio",
                    width: 90

                },

                {
                    field: "Rango",
                    title: "Rango",
                    width: 90
                }, {
                    field: "RangoMin",
                    title: "RangoMin",
                    width: 110
                }, {
                    field: "RangoMax",
                    title: "RangoMax",
                    width: 110
                },
                //{ command: ["edit"], title: "&nbsp;", width: "80px" }
            ],
            /*editable: "inline"*/
            editable: true
        });
    }


    $("#grid .k-grid-content").on("change", "input.chkbx", function (e) {
        var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));

        dataItem.set("Obligatorio", this.checked);
    });
    function ListarParametros() {
        fetch("/Recurso/ListarParametroMaquinaForRango", {
            method: 'POST', // or 'PUT'
            //headers: {
            //    'Content-Type': 'application/json',
            //},
            body: JSON.stringify({ MaqCCod: "MTN030" }),
        })
            .then(Response => Response.json())
            .then(function (datos) {
                console.log(datos.result)

                datos.result.forEach(function (item) {
                    console.log(item)
                    var myHtmlContent = `<tr>
<td>${item.TipoTenidoCodigo}</td>
<td>${item.ProcesoCodigo}</td>
<td>${item.Orden}</td>
<td>${item.ParametroId}</td>
<td>${item.TipoTenido}</td>
<td>${item.Proceso}</td>
<td>${item.Parametro}</td>
<td>${item.UnidadMedida}</td>
<td>${item.Obligatorio}</td>
<td>${item.Rango}</td>
<td>${item.RangoMin}</td>
<td>${item.RangoMax}</td>
</tr>`
                    var tableRef = document.getElementById('tblParametroRango').getElementsByTagName('tbody')[0];

                    var newRow = tableRef.insertRow(tableRef.rows.length);
                    newRow.innerHTML = myHtmlContent;

                });

            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function ListarMaquinaRango1() {
        fetch("/Maquina/ListarMaquinas", {
            method: 'GET', // or 'PUT'
            //headers: {
            //    'Content-Type': 'application/json',
            //},
            //body: JSON.stringify({ MaqCCod: "TIN01" }),
        })
            .then(Response => Response.json())
            .then(function (datos) {
                console.log(datos)
                var selectElement = document.getElementById('selectMaquinaRango1');

                //for (var age = 12; age <= 100; age++) {
                //    selectElement.add(new Option(age));
                //}
                //foreach( datos.datos
                //var opt = document.createElement('option');
                //opt.value = "";
                //opt.innerHTML = "Seleccione";
                //selectElement.appendChild(opt);
                datos.Datos.forEach(function (item) {
                    var opt = document.createElement('option');
                    opt.value = item.MaqCCod;
                    opt.innerHTML = item.MaqCCod + ' - ' + item.Descripcion;
                    selectElement.appendChild(opt);

                    //console.log(item)
                    //selectElement.add(new Option(MaqCCod));

                })


            })
            .catch(function (error) {
                console.log(error)
            })
    }

    $(btnCopiar).on("click", function () {
        fetch("/Recurso/CopiarConfiguracionMaquina", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                MaquinaDestino: document.getElementById('selectMaquinaRango1').value,
                Maquina: document.getElementById('selectMaquina').value
            })
        })
            .then(function (response) {
                console.log('tttttttthheen')
                console.log(response)
                return response.json();
            })
            .then(function (data) {
                console.log('tttttttthheen2')
                console.log(data);
                if (data.rpta) {
                    Swal.fire(
                        'Exito!',
                        'Información Guardada correctamente!',
                        'success'
                    )
                }

            })
            .catch(function () {
                console.log('catch')
                console.log('Booo');
            });
    })


})
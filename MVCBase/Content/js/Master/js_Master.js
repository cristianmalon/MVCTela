import * as Events from '/Content/js/_General/js_Events.js';

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
//function getMenu() {
const getMenu = () => {
    return axios({
        url: '/Home/GetMenu?UserID=1'
        //method: 'get',
        //timeout: 8000,
        //headers: {
        //    'Content-Type': 'application/json',
        //}
    })
        .then(res => res.data)
    //.catch((error) => {
    //    console.error('error 2')
    //});        
}


const drawElement = (element) => {
    var li = document.createElement("li");
    switch (element.TipoMenu) {
        case 1:
            li.innerHTML = 'aaa'
            li.className = "nav-item";
            {
                var a = document.createElement("a");
                a.className = "nav-link"
                a.href = "#"
                {
                    var i = document.createElement("i");
                    i.className = "nav-icon fas fa-tachometer-alt";
                    a.appendChild(i);

                    var p = document.createElement("p");
                    p.innerHTML = element.Nombre;
                    a.appendChild(p);
                    {
                        if (element.Hijos != null) {
                            if (element.Hijos.length > 0) {
                                var i2 = document.createElement("i");
                                i2.className = "right fas fa-angle-left";
                                p.appendChild(i2);
                            }
                        }
                    }
                }
                li.appendChild(a);
            }
            break;

        case 2:
            li.className = "nav-header";
            li.innerHTML = "EXAMPLES"
            break;
    }
    return li;
}
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


const drawMenu = (data) => {
    let ulmenu = document.getElementById("ulMenu");
    console.log(1)
    data.forEach(element => {
        console.log(element)
        var li = drawElement(element)

        //let ulmenu2 = document.getElementById("ulMenu");
        if (element.Hijos != null) {
            if (element.Hijos.length > 0) {
                var ulMenu2 = document.createElement("ul");
                ulMenu2.id = "ulMenu"
                element.Hijos.forEach(element2 => {
                    var li2 = drawElement(element2)

                    if (element2.Hijos != null) {
                        if (element2.Hijos.length > 0) {
                            var ulMenu3 = document.createElement("ul");
                            ulMenu3.id = "ulMenu"

                            element2.Hijos.forEach(element3 => {
                                var li3 = drawElement(element3)

                                ulMenu3.appendChild(li3);
                            })

                            li2.appendChild(ulMenu3)
                        }
                    }


                    ulMenu2.appendChild(li2);
                })
                li.appendChild(ulMenu2)
            }
        }
        ulmenu.appendChild(li);
        console.log(2)
    })

    console.log(6)

}



const drawMenu2 = (data) => {
    console.log(data)
    let ulmenu = document.getElementById("ulMenu");

    data.forEach(element => {
        var li = document.createElement("li");
        switch (element.TipoMenu) {
            case 1:

                li.className = "nav-item";
                {
                    var a = document.createElement("a");
                    a.className = "nav-link"
                    a.href = "#"
                    {
                        var i = document.createElement("i");
                        i.className = "nav-icon fas fa-tachometer-alt";
                        a.appendChild(i);

                        var p = document.createElement("p");
                        p.innerHTML = element.Nombre;
                        a.appendChild(p);
                        {
                            var i2 = document.createElement("i");
                            i2.className = "right fas fa-angle-left";
                            p.appendChild(i2);
                        }
                    }
                    li.appendChild(a);

                    if (element.Hijos.length > 0) {

                        element.Hijos.forEach(element2 => {
                            var ul2 = document.createElement("ul")
                            ul2.className = "nav nav-treeview";
                            ul2.style = "display: none;";
                            {
                                var li2 = document.createElement("li");
                                li2.className = "nav-item";
                                {
                                    var a2 = document.createElement("a");
                                    a2.className = "nav-link"
                                    a2.href = "../../index.html"
                                    {
                                        var i_2 = document.createElement("i");
                                        i_2.className = "nav-icon fas fa-tachometer-alt";
                                        a2.appendChild(i_2);

                                        var p2 = document.createElement("p");
                                        p2.innerHTML = element2.Nombre;
                                        a2.appendChild(p2);
                                        {
                                            var i_22 = document.createElement("i");
                                            i_22.className = "right fas fa-angle-left";

                                            if (element2.Hijos != null) {
                                                if (element2.Hijos.length > 0) {
                                                    p2.appendChild(i_22);
                                                }
                                            }
                                        }
                                    }
                                    li2.appendChild(a2);
                                    //
                                    if (element2.Hijos != null) {
                                        if (element2.Hijos.length > 0) {

                                            element.Hijos.forEach(element2 => {
                                                var ul3 = document.createElement("ul")
                                                ul3.className = "nav nav-treeview";
                                                ul3.style = "display: none;";
                                                {
                                                    var li3 = document.createElement("li");
                                                    li3.className = "nav-item";
                                                    {
                                                        var a2 = document.createElement("a");
                                                        a2.className = "nav-link"
                                                        a2.href = "../../index.html"
                                                        {
                                                            var i_2 = document.createElement("i");
                                                            i_2.className = "nav-icon fas fa-tachometer-alt";
                                                            a2.appendChild(i_2);

                                                            var p2 = document.createElement("p");
                                                            p2.innerHTML = element2.Nombre;
                                                            a2.appendChild(p2);
                                                            {
                                                                var i_22 = document.createElement("i");
                                                                i_22.className = "right fas fa-angle-left";

                                                                //if (element2.Hijos != null) {
                                                                //    if (element2.Hijos.length > 0) {
                                                                //        p2.appendChild(i_22);
                                                                //    }
                                                                //}
                                                            }
                                                        }
                                                        li3.appendChild(a2);
                                                    }
                                                    ul2.appendChild(ul3)
                                                }
                                                li2.appendChild(ul3);
                                            })


                                        }
                                    }


                                }
                                ul2.appendChild(li2)
                            }
                            li.appendChild(ul2);
                        })


                    }
                }
                break;
            case 2:
                li.className = "nav-header";
                li.innerHTML = "EXAMPLES"
                break;
            default:
            // code block
        }
        ulmenu.appendChild(li);
    });
}

docReady(function () {
    
    axios.interceptors.response.use((response) => {
        console.log('Response was received');
        return response;
    }, error => {
        console.error('error 1')
        return Promise.reject(error);
    });

    if (!Events.isLogged()) {
        window.location.href = "/Login";
    }
    const btnLogout = document.querySelectorAll('#btnLogout')[0]
    btnLogout.addEventListener("click", Events.logout)
    //btnLogout.addEventListener("click", function () { console.log('logout')})


    getMenu()
        .then(res =>
        //console.log(res)
        {
            res = {
                "result": true,
                "Datos": [
                    {
                        "IdMenu": 1,
                        "TipoMenu": 1,
                        "Nombre": "M1",
                        "Descripcion": "Menu 1",
                        "Icon": "fas-fa",
                        "Controler": null,
                        "Action": null,
                        "IdEstado": 0,
                        "Hijos": [
                            {
                                "IdMenu": 2,
                                "TipoMenu": 1,
                                "Nombre": "M1-H1",
                                "Descripcion": "Padre Menu 1",
                                "Icon": "fas-fa",
                                "Controler": null,
                                "Action": null,
                                "IdEstado": 0,
                                "Hijos": null,
                                "Opciones": null
                            },
                            {
                                "IdMenu": 3,
                                "TipoMenu": 1,
                                "Nombre": "M1-H2",
                                "Descripcion": "Padre Menu 1",
                                "Icon": "fas-fa",
                                "Controler": null,
                                "Action": null,
                                "IdEstado": 0,
                                "Hijos": [
                                    {
                                        "IdMenu": 4,
                                        "TipoMenu": 1,
                                        "Nombre": "M1H2-SH1",
                                        "Descripcion": "Padre Menu 1 Hijo 2",
                                        "Icon": "fas-fa",
                                        "Controler": null,
                                        "Action": null,
                                        "IdEstado": 0,
                                        "Hijos": null,
                                        "Opciones": null
                                    },
                                    {
                                        "IdMenu": 5,
                                        "TipoMenu": 1,
                                        "Nombre": "M1H2-SH2",
                                        "Descripcion": "Padre Menu 1 Hijo 2",
                                        "Icon": "fas-fa",
                                        "Controler": null,
                                        "Action": null,
                                        "IdEstado": 0,
                                        "Hijos": null,
                                        "Opciones": null
                                    }
                                ],
                                "Opciones": null
                            },
                            {
                                "IdMenu": 6,
                                "TipoMenu": 1,
                                "Nombre": "M1-H3",
                                "Descripcion": "Padre Menu 2",
                                "Icon": "fas-fa",
                                "Controler": null,
                                "Action": null,
                                "IdEstado": 0,
                                "Hijos": [
                                    {
                                        "IdMenu": 7,
                                        "TipoMenu": 1,
                                        "Nombre": "M1H3-SH1",
                                        "Descripcion": "Padre Menu 2 Hijo 2",
                                        "Icon": "fas-fa",
                                        "Controler": null,
                                        "Action": null,
                                        "IdEstado": 0,
                                        "Hijos": null,
                                        "Opciones": null
                                    },
                                    {
                                        "IdMenu": 8,
                                        "TipoMenu": 1,
                                        "Nombre": "M1H3-SH2",
                                        "Descripcion": "Padre Menu 2 Hijo 2",
                                        "Icon": "fas-fa",
                                        "Controler": null,
                                        "Action": null,
                                        "IdEstado": 0,
                                        "Hijos": null,
                                        "Opciones": null
                                    }
                                ],
                                "Opciones": null
                            }
                        ],
                        "Opciones": null
                    },
                    {
                        "IdMenu": 9,
                        "TipoMenu": 2,
                        "Nombre": "M2",
                        "Descripcion": "Prueb",
                        "Icon": "fas-fa",
                        "Controler": null,
                        "Action": null,
                        "IdEstado": 0,
                        "Hijos": [],
                        "Opciones": null
                    },
                    {
                        "IdMenu": 10,
                        "TipoMenu": 1,
                        "Nombre": "M3",
                        "Descripcion": "Menu 2",
                        "Icon": "fas-fa",
                        "Controler": null,
                        "Action": null,
                        "IdEstado": 0,
                        "Hijos": [
                            {
                                "IdMenu": 11,
                                "TipoMenu": 1,
                                "Nombre": "M3-H1",
                                "Descripcion": "Padre Menu 2",
                                "Icon": "fas-fa",
                                "Controler": null,
                                "Action": null,
                                "IdEstado": 0,
                                "Hijos": null,
                                "Opciones": null
                            }
                        ],
                        "Opciones": null
                    }
                ],
                "msg": "ok"
            }
            drawMenu(res.Datos)
            //drawMenu(res.Datos)
        }
        )
    //const button = document.querySelector('#dataSender');
    //button.addEventListener('click', function (event) {
    //    event.stopPropagation();
    //    console.log('button clicked');
    //});

    $(document).on('click', 'li.menu-open.menu-is-opening', function (event) {
        //console.log($(this).find('ul'))
        //$(this).querySelector("#child")
        console.log('1111')
        //console.log(this.childNodes.item("ul"))
        $(this).find('ul').slideToggle('slow');
        $(this).removeClass('menu-open menu-is-opening')
        //event.stopPropagation();

    })

    //var url = window.location;
    // for single sidebar menu

    //$('ul.nav-sidebar a').filter(function () {
    //    return this.href == url;
    //}).addClass('active');

    //// for sidebar menu and treeview
    //$('ul.nav-treeview a').filter(function () {
    //    return this.href == url;
    //}).parentsUntil(".nav-sidebar > .nav-treeview")
    //    .css({ 'display': 'block' })
    //    .addClass('menu-open').prev('a')
    //    .addClass('active');
});

var dataMenu = {
    "result": true,
    "Datos": [
        {
            "IdMenu": 1,
            "TipoMenu": 1,
            "Nombre": "M1",
            "Descripcion": "Menu 1",
            "Icon": "fas-fa",
            "Controler": null,
            "Action": null,
            "IdEstado": 0,
            "Hijos": [
                {
                    "IdMenu": 2,
                    "TipoMenu": 1,
                    "Nombre": "M1-H1",
                    "Descripcion": "Padre Menu 1",
                    "Icon": "fas-fa",
                    "Controler": null,
                    "Action": null,
                    "IdEstado": 0,
                    "Hijos": null,
                    "Opciones": null
                },
                {
                    "IdMenu": 3,
                    "TipoMenu": 1,
                    "Nombre": "M1-H2",
                    "Descripcion": "Padre Menu 1",
                    "Icon": "fas-fa",
                    "Controler": null,
                    "Action": null,
                    "IdEstado": 0,
                    "Hijos": [
                        {
                            "IdMenu": 4,
                            "TipoMenu": 1,
                            "Nombre": "M1H2-SH1",
                            "Descripcion": "Padre Menu 1 Hijo 2",
                            "Icon": "fas-fa",
                            "Controler": null,
                            "Action": null,
                            "IdEstado": 0,
                            "Hijos": null,
                            "Opciones": null
                        },
                        {
                            "IdMenu": 5,
                            "TipoMenu": 1,
                            "Nombre": "M1H2-SH2",
                            "Descripcion": "Padre Menu 1 Hijo 2",
                            "Icon": "fas-fa",
                            "Controler": null,
                            "Action": null,
                            "IdEstado": 0,
                            "Hijos": null,
                            "Opciones": null
                        }
                    ],
                    "Opciones": null
                },
                {
                    "IdMenu": 6,
                    "TipoMenu": 1,
                    "Nombre": "M1-H3",
                    "Descripcion": "Padre Menu 2",
                    "Icon": "fas-fa",
                    "Controler": null,
                    "Action": null,
                    "IdEstado": 0,
                    "Hijos": [
                        {
                            "IdMenu": 7,
                            "TipoMenu": 1,
                            "Nombre": "M1H3-SH1",
                            "Descripcion": "Padre Menu 2 Hijo 2",
                            "Icon": "fas-fa",
                            "Controler": null,
                            "Action": null,
                            "IdEstado": 0,
                            "Hijos": null,
                            "Opciones": null
                        },
                        {
                            "IdMenu": 8,
                            "TipoMenu": 1,
                            "Nombre": "M1H3-SH2",
                            "Descripcion": "Padre Menu 2 Hijo 2",
                            "Icon": "fas-fa",
                            "Controler": null,
                            "Action": null,
                            "IdEstado": 0,
                            "Hijos": null,
                            "Opciones": null
                        }
                    ],
                    "Opciones": null
                }
            ],
            "Opciones": null
        },
        {
            "IdMenu": 9,
            "TipoMenu": 2,
            "Nombre": "M2",
            "Descripcion": "Prueb",
            "Icon": "fas-fa",
            "Controler": null,
            "Action": null,
            "IdEstado": 0,
            "Hijos": [],
            "Opciones": null
        },
        {
            "IdMenu": 10,
            "TipoMenu": 1,
            "Nombre": "M3",
            "Descripcion": "Menu 2",
            "Icon": "fas-fa",
            "Controler": null,
            "Action": null,
            "IdEstado": 0,
            "Hijos": [
                {
                    "IdMenu": 11,
                    "TipoMenu": 1,
                    "Nombre": "M3-H1",
                    "Descripcion": "Padre Menu 2",
                    "Icon": "fas-fa",
                    "Controler": null,
                    "Action": null,
                    "IdEstado": 0,
                    "Hijos": null,
                    "Opciones": null
                }
            ],
            "Opciones": null
        }
    ],
    "msg": "ok"
}
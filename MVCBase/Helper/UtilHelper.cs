using CAMTEX.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CAMTEX.Web.Helper
{
    public static class UtilHelper
    {

        public static MvcHtmlString CustomMenu(this HtmlHelper helper, List<RUTAS> listaOpcion, string nombreLista)
        {
            var baseUrl = "/Home/Index";//HttpContext.Current.Request.Url.LocalPath;

            var navPrincipal = new TagBuilder("div");
            //navPrincipal.AddCssClass("navbar-default sidebar");
            //navPrincipal.Attributes.Add("role", "navigation");


            var navCollapse = new TagBuilder("div");
            navCollapse.AddCssClass("");

            var principal = new TagBuilder("ul");
            // principal.AddCssClass("nav navbar-nav");
            principal.Attributes.Add("id", nombreLista);
            int menuprincipal = 0;
            foreach (RUTAS item in (from x in listaOpcion where x.RUTAS_PADREKey.Equals(string.Empty) select x).ToList())
            {
                var itemLista = new TagBuilder("li");
                //itemLista.Attributes["Data-Head"] = item.SerialKey.ToString();
                if (menuprincipal == 0)
                {
                    //se oculto esto 15-10
                    //itemLista.AddCssClass("open");
                }



                var link = new TagBuilder("a") { InnerHtml = "<i class='fa fa-lg fa-fw fa-cube txt-color-blue'></i><span class='menu-item-parent'>" + item.DESCRIPCION + " " + "</span>" };
                //link.AddCssClass("dropdown-toggle");
                //link.MergeAttribute("data-toggle", "dropdown");
                //link.MergeAttribute("role", "button");
                //link.MergeAttribute("aria-haspopup", "true");
                //link.MergeAttribute("aria-expanded", "false");

                link.Attributes["href"] = "#";
                var urlHelper = new UrlHelper(helper.ViewContext.RequestContext);
                //if (!string.IsNullOrEmpty(item.RUTA) && item.RUTA != "#")
                //{
                //    var urlHelper = new UrlHelper(helper.ViewContext.RequestContext);

                //    var ccc = urlHelper.Action(item.ACCION, item.CONTROLADOR);

                //    if (item.RUTA.Split('/').Count() == 3)
                //    {
                //        link.Attributes["href"] = urlHelper.Action(item.ACCION,item.CONTROLADOR);

                //    }
                //    else
                //    {
                //        link.Attributes["href"] = urlHelper.Action(item.ACCION, item.CONTROLADOR);
                //    }

                //}
                //else
                //{
                //    link.Attributes["href"] = "#";
                //    //link.InnerHtml += " <span class='fa arrow'></span>";
                //}

                itemLista.InnerHtml = link.ToString();

                LlenarOpcionMenu(itemLista, item, listaOpcion, baseUrl, menuprincipal);
                menuprincipal++;
                principal.InnerHtml += itemLista.ToString();
            }
            navCollapse.InnerHtml += principal;
            navPrincipal.InnerHtml += navCollapse;

            return new MvcHtmlString(principal.ToString());
        }

        public static void LlenarOpcionMenu(TagBuilder itemLista, RUTAS itemOpcion, List<RUTAS> listaOpcion, string baseUrl, int menuprincipal)
        {
            var controlador = baseUrl.Split('/')[1];
            var Accion = baseUrl.Split('/')[2];

            if ((from x in listaOpcion
                 where x.SerialKey == itemOpcion.SerialKey
                 select x).Count() > 0)
            {
                itemLista.AddCssClass("");
                var secundario = new TagBuilder("ul");
                //style = "display: block;"
                /*if (menuprincipal == 4)
                {
                    //se oculto esto 15-10
                    secundario.MergeAttribute("style", $"display: block;");
                }else
                {
                    secundario.MergeAttribute("style", $"display: none;");
                }*/
                secundario.MergeAttribute("style", $"display: block;");


                //secundario.AddCssClass("dropdown-menu");

                foreach (RUTAS item in (from x in listaOpcion
                                        where x.RUTAS_PADREKey == itemOpcion.SerialKey
                                        select x).ToList())
                {
                    var itemDetalle = new TagBuilder("li");

                    if (controlador == item.CONTROLADOR && Accion == item.ACCION)
                    {
                        itemDetalle.AddCssClass("active");
                    }

                    itemDetalle.Attributes["Data-Head"] = itemOpcion.SerialKey.ToString();
                    var link = new TagBuilder("a") { InnerHtml = "<i class='fa fa-lg fa-fw fa-table'></i> <span class='menu-item-parent'>" + item.DESCRIPCION + "</span>" };

                    if (!string.IsNullOrEmpty(item.RUTA) && item.RUTA != "#")
                    {
                        link.Attributes["href"] = item.RUTA;

                    }
                    else
                    {
                        link.Attributes["href"] = "#";
                        link.InnerHtml += "<span class='fa arrow'></span>";
                    }
                    itemDetalle.InnerHtml = link.ToString();

                    LlenarOpcionMenuThirdNivel(itemDetalle, item, listaOpcion);

                    secundario.InnerHtml += itemDetalle.ToString();
                }

                itemLista.InnerHtml += secundario.ToString();
            }
        }

        public static void LlenarOpcionMenuThirdNivel(TagBuilder itemLista, RUTAS itemOpcion, List<RUTAS> listaOpcion)
        {
            if ((from x in listaOpcion
                 where x.RUTAS_PADREKey == itemOpcion.SerialKey
                 select x).Count() > 0)
            {
                itemLista.AddCssClass("");
                var secundario = new TagBuilder("ul");
                secundario.AddCssClass("nav nav-third-level collapse");
                secundario.Attributes.Add("aria-expanded", "false");
                secundario.Attributes.Add("style", "height: 0px;");

                foreach (RUTAS item in (from x in listaOpcion
                                        where x.RUTAS_PADREKey == itemOpcion.SerialKey
                                        select x).ToList())
                {
                    var itemDetalle = new TagBuilder("li");
                    itemDetalle.Attributes["Data-Head"] = itemOpcion.SerialKey.ToString();
                    var link = new TagBuilder("a") { InnerHtml = item.DESCRIPCION };

                    if (!string.IsNullOrEmpty(item.RUTA) && item.RUTA != "#")
                    {
                        link.Attributes["href"] = item.RUTA;
                    }
                    else
                    {
                        link.Attributes["href"] = "#";
                        link.InnerHtml += "<span class='fa arrow'></span>";
                    }
                    itemDetalle.InnerHtml = link.ToString();

                    //LlenarOpcionMenu(itemDetalle, item, listaOpcion);

                    secundario.InnerHtml += itemDetalle.ToString();
                }

                itemLista.InnerHtml += secundario.ToString();
            }
        }


        public static MvcHtmlString Breadcrumb(this HtmlHelper helper)
        {
            var baseUrl = HttpContext.Current.Request.Url.LocalPath;
            string[] data = baseUrl.Split('/');

            var principal = new TagBuilder("ol");
            principal.AddCssClass("breadcrumb");
            //principal.Attributes.Add("id", nombreLista);
            foreach (var item in data)
            {
                var itemLista = new TagBuilder("li");
                itemLista.InnerHtml = item;
                principal.InnerHtml += itemLista.ToString();
            }

            return new MvcHtmlString(principal.ToString());
        }

        public static MvcHtmlString shortcut(this HtmlHelper helper, List<SISTEMAS> listaSistemas)
        {


            var principal = new TagBuilder("ul");


            foreach (SISTEMAS item in listaSistemas)
            {
                var itemLista = new TagBuilder("li");

                //itemLista.AddCssClass("dropdown");

                var link = new TagBuilder("a") { InnerHtml = "<span class='iconbox'> <i class='fa " + item.ICONO + " fa-4x'></i> <span>" + item.DESCRIPCION + " </span> </span>" };
                link.AddCssClass("sis-net jarvismetro-tile big-cubes bg-color-" + item.COLOR);
                link.Attributes["sis"] = item.SISTEMA_ID.ToString();

                link.Attributes["href"] = "#";//item.RUTA_URL;


                itemLista.InnerHtml = link.ToString();


                principal.InnerHtml += itemLista.ToString();
            }

            return new MvcHtmlString(principal.ToString());
        }
    }
}
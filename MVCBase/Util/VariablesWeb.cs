using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Web;
using CAMTEX.Entidades;
using System.Web.Script.Serialization;
using System.Net.NetworkInformation;

namespace MVCBase.Util
{
    public static class VariablesWeb
    {
        public static String HostName()
        {
            String HostName = String.Empty;

            HostName = System.Net.Dns.GetHostName();

            return HostName;
        }
        public static String IP() {
            System.Web.HttpContext.Current.Session.RemoveAll();
            //Session.RemoveAll();
            //Response.Cache.SetCacheability(HttpCacheability.NoCache);

            var context = System.Web.HttpContext.Current;
            string ip = String.Empty;
            if ( context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null )
                ip = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();
            else if ( !String.IsNullOrWhiteSpace( context.Request.UserHostAddress ) )
                ip = context.Request.UserHostAddress;


            if ( ip == "::1" ) {
                ip = "192.168.144.219"; // ip de maquina del desarrollador
                //ip = "192.168.1.66";
            }

            if ( ip == "127.0.0.1" ) {
                ip = "192.168.144.219";
                //ip = "192.168.1.66";
            }
            return ip;
            //string macAddresses = "";
            //foreach ( NetworkInterface nic in NetworkInterface.GetAllNetworkInterfaces() ) {
            //    Only consider Ethernet network interfaces, thereby ignoring any
            //    loopback devices etc.
            //    if ( nic.NetworkInterfaceType != NetworkInterfaceType.Ethernet ) continue;
            //    if ( nic.OperationalStatus == OperationalStatus.Up ) {
            //        macAddresses += nic.GetPhysicalAddress().ToString();
            //        break;
            //    }
            //}
            //return macAddresses;

        }

        public static string GetMacAddress() {
            string macAddresses = "";
            foreach ( NetworkInterface nic in NetworkInterface.GetAllNetworkInterfaces() ) {
                // Only consider Ethernet network interfaces, thereby ignoring any
                // loopback devices etc.
                if ( nic.NetworkInterfaceType != NetworkInterfaceType.Ethernet ) continue;
                if ( nic.OperationalStatus == OperationalStatus.Up ) {
                    macAddresses += nic.GetPhysicalAddress().ToString();
                    break;
                }
            }
            return macAddresses;
        }

        public static USUARIO Usuario
        {
            get
            {
                var claims = ((ClaimsIdentity)HttpContext.Current.User.Identity).Claims;
                if (claims != null)
                {
                    var objeto = claims.Count() > 1 ? claims.FirstOrDefault(
                        p => p.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/usuario").
                        Value : "";

                    if (!string.IsNullOrEmpty(objeto))
                    {
                        USUARIO retorno = (USUARIO)(new JavaScriptSerializer().Deserialize<USUARIO>(objeto));
                        return retorno;
                    }
                    else
                    {
                        //HttpSessionStateBase["AuthAccount"] = null;
                        //USUARIO retorno = (USUARIO)(new JavaScriptSerializer().Deserialize<USUARIO>(Session("felipe")));
                        //return retorno;
                    }
                }

                return null;
            }
        }
        public static ENUsuario ENUsuario
        {
            get
            {
                var claims = ((ClaimsIdentity)HttpContext.Current.User.Identity).Claims;
                if (claims != null)
                {
                    var objeto = claims.Count() > 1 ? claims.FirstOrDefault(
                        p => p.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/usuario").
                        Value : "";

                    if (!string.IsNullOrEmpty(objeto))
                    {
                        ENUsuario retorno = (ENUsuario)(new JavaScriptSerializer().Deserialize<ENUsuario>(objeto));
                        return retorno;
                    }
                    else
                    {
                        //HttpSessionStateBase["AuthAccount"] = null;
                        //USUARIO retorno = (USUARIO)(new JavaScriptSerializer().Deserialize<USUARIO>(Session("felipe")));
                        //return retorno;
                        ENUsuario retorno = new ENUsuario() { Usuario="Invitado",IdSede=1};
                        return retorno;
                    }
                }

                return null;
            }
        }
        public static List<ROLES> ListaRoles
        {
            get
            {
                var claims = ((ClaimsIdentity)HttpContext.Current.User.Identity).Claims;
                if (claims != null)
                {
                    var ListaRoles = claims.Count() > 1 ? claims.FirstOrDefault(
                        p => p.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/roles").
                        Value : "";

                    if (!string.IsNullOrEmpty(ListaRoles))
                    {
                        List<ROLES> lista = (List<ROLES>)(new JavaScriptSerializer().Deserialize<List<ROLES>>(ListaRoles));
                        return lista;
                    }
                }
                return null;

            }
        }

        public static List<RUTAS> ListaRutas
        {
            get
            {
                var claims = ((ClaimsIdentity)HttpContext.Current.User.Identity).Claims;
                if (claims != null)
                {
                    var ListaRutas = claims.Count() > 1 ? claims.FirstOrDefault(
                        p => p.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/rutas").
                        Value : "";

                    if (!string.IsNullOrEmpty(ListaRutas))
                    {
                        List<RUTAS> lista = (List<RUTAS>)(new JavaScriptSerializer().Deserialize<List<RUTAS>>(ListaRutas));
                        return lista;
                    }
                }
                return null;

            }
        }

        public static List<SISTEMAS> ListaSistemas
        {
            get
            {
                var claims = ((ClaimsIdentity)HttpContext.Current.User.Identity).Claims;
                if (claims != null)
                {
                    var Listasistemas = claims.Count() > 1 ? claims.FirstOrDefault(
                        p => p.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sistemas").
                        Value : "";

                    if (!string.IsNullOrEmpty(Listasistemas))
                    {
                        List<SISTEMAS> lista = (List<SISTEMAS>)(new JavaScriptSerializer().Deserialize<List<SISTEMAS>>(Listasistemas));
                        return lista;
                    }
                }
                return null;

            }
        }
        public static int oIdAplicacion
        {
            get
            {
                if (HttpContext.Current.Session["IdAplicacion"] != null)
                {
                    return (int)HttpContext.Current.Session["IdAplicacion"];
                }
                return 0;
            }
            set { HttpContext.Current.Session["IdAplicacion"] = value; }
        }

        public static string MensajeException { get; set; }

        /// <summary>
        /// Ruta del servidor donde actualmente estamos validados
        /// </summary>
        public static string RutaServidor
        {
            get
            {
                if (HttpContext.Current.Session["oRutaServidor"] != null)
                {
                    return (string)HttpContext.Current.Session["oRutaServidor"];
                }
                return "";
            }
            set { HttpContext.Current.Session["oRutaServidor"] = value; }
        }
    }
}
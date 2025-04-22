using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CAMTEX.Web.Claims
{
    public static class TiposClaims
    {
        public static string NamespaceBase =
           "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";
        //public static string Permisos = NamespaceBase + "permisos";
        public static string Usuario = NamespaceBase + "usuario";
        public static string ENUsuario = NamespaceBase + "ENUsuario";
        public static string ListaRoles = NamespaceBase + "roles";
        public static string DireccionIP = NamespaceBase + "direccionip";
        public static string ListaRutas = NamespaceBase + "rutas";
        public static string ListaSistemas = NamespaceBase + "sistemas";
        //public static string Opcion = NamespaceBase + "opcion";
    }
}
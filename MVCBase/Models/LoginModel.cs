using CAMTEX.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CAMTEX.Web.Models
{
    public class LoginModel
    {
        public string NombreUsuario { get; set; }
        public string Clave { get; set; }
        public string Proyecto { get; set; }
        public int IdProyecto { get; set; }
        public int IdSede { get; set; }
        public string Email { get; set; }
        public int TipoUsuario { get; set; }
        //public List<ENProyecto> ListaProyectos { get; set; }
        public List<ENSede> ListaSede { get; set; }
    }
}
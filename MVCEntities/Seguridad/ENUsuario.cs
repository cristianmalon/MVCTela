using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    public class ENUsuario
    {
        [DataMember] public string SUsrId { get; set; }
        public int IdUsuario { get; set; }
        public int IdProyecto { get; set; }
        public int IdSede { get; set; }
        public int IdTrabajador { get; set; }
        public int IdPerfil { get; set; }
        public string Usuario { get; set; }
        public string Nombres { get; set; }
        public string Cargo { get; set; }
        public string Proyecto { get; set; }
        public string Email { get; set; }
        public string Clave { get; set; }
        public string ClaveEncriptada { get; set; }
        public int Estado { get; set; }
        public int IdSistema { get; set; }
        public string EmailRecuperacion { get; set; }
        public DateTime? FechaCambioClave { get; set; }
        public DateTime? FechaUltimoIngreso { get; set; }
        public DateTime? FechaVigencia { get; set; }
        [DataMember] public string EmpCCod { get; set; }

        [DataMember] public Int64 SISTEMA_ID { get; set; }
        [DataMember] public List<ROLES> ListaRoles { get; set; }
        [DataMember] public List<RUTAS> ListaRutas { get; set; }
        [DataMember] public List<SISTEMAS> ListaSistemas { get; set; }
        [DataMember] public string AUTHKEY { get; set; }
    }
}



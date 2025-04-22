using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class Supervisor
    {
        [DataMember] public string CodEmpresa { get; set; }
        [DataMember] public string Codigo { get; set; }
        [DataMember] public string Password { get; set; }
        [DataMember] public string Descripcion { get; set; }
        [DataMember] public int Valido { get; set; }
        [DataMember] public string Cargo { get; set; }
    }
}

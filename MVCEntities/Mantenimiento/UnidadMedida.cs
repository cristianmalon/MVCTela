using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class UnidadMedida
    {
        [DataMember] public int UnidadMedidaId { get; set; }
        [DataMember] public string Codigo { get; set; }
        [DataMember] public string Descripcion { get; set; }
    }
}

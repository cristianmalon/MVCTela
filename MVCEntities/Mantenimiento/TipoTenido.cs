using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class TipoTenido:EntidadBase
    {
        [DataMember] public string TipoTenidoCodigo { get; set; }
        [DataMember] public string Descripcion { get; set; }
        [DataMember] public string TipoTenidoObservacion { get; set; }
    }
}

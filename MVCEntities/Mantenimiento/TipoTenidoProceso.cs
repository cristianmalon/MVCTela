using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class TipoTenidoProceso : EntidadBase
    {
        [DataMember] public int TipoTenidoProcesoID { get; set; }
        [DataMember] public int ProcesoTenidoID { get; set; }
        [DataMember] public string TipoTenidoCodigo { get; set; }
        [DataMember] public string ProcesoCodigo { get; set; }
        [DataMember] public string Descripcion { get; set; }
        [DataMember] public string TipoTenidoDescripcion { get; set; }

        [DataMember] public int EstadoPrevio { get; set; }
        [DataMember] public int EstadoTenido { get; set; }
        [DataMember] public int EstadoLavado { get; set; }

        [DataMember] public string Usuario { get; set; }
        [DataMember] public string Estacion { get; set; }
        [DataMember] public string Cadena { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class ProcesoTenido
    {
        [DataMember] public int ProcesoTenidoID { get; set; }
        [DataMember] public string ProcesoCodigo { get; set; }
        [DataMember] public string ProcesoDescripcion { get; set; }
    }
}

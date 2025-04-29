using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class E_Transportista : EntidadBase
    {
        [DataMember] public string TraDDes { get; set; }
        [DataMember] public string TraCCod { get; set; }
    }
}

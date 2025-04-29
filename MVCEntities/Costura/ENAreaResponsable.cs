using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    public class ENAreaResponsable:EntidadBase
    {
        [DataMember] public string AreaResponsableCod { get; set; }
        [DataMember] public string AreaResponsable { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    public class ACFB01: EntidadBase
    {
        [DataMember] public string AcfID { get; set; }
        [DataMember] public string AcfCCOD { get; set; }
        [DataMember] public string AcfDdes { get; set; }
        [DataMember] public string AcfDMne { get; set; }
        [DataMember] public string AcfNewSis { get; set; }
        [DataMember] public DateTime? FechaReg { get; set; }
    }
}

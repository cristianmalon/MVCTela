using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    public class TECB01:EntidadBase
    {
        [DataMember] public string TecID { get; set; }
        [DataMember] public string TecCCOD { get; set; }
        [DataMember] public string TecDdes { get; set; }
        [DataMember] public string TecDMne { get; set; }
        [DataMember] public string TecNewSis { get; set; }
        [DataMember] public DateTime? FechaReg { get; set; }
    }
}

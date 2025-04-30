using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    public class ACQB01: EntidadBase
    {
        [DataMember] public string AcqID { get; set; }
        [DataMember] public string AcqCCOD { get; set; }
        [DataMember] public string AcqDdes { get; set; }
        [DataMember] public string AcqDMne { get; set; }
        [DataMember] public string AcqNewSis { get; set; }
        [DataMember] public string AcqSclase { get; set; }
        [DataMember] public DateTime? FechaReg { get; set; }
    }
}

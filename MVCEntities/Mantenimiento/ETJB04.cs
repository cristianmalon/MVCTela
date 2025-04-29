using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    public class ETJB04: EntidadBase
    {
        [DataMember] public int EtjID { get; set; }
        [DataMember] public string ETJCCOD { get; set; }
        [DataMember] public string ETjCTDi { get; set; }
        [DataMember] public string ETjDTDi { get; set; }
        [DataMember] public string ETjDMne { get; set; }
        [DataMember] public DateTime? FechaReg { get; set; }
    }
}

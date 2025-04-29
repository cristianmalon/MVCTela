using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class ETJB01: EntidadBase
    {
        [DataMember] public int EtjID { get; set; }
        [DataMember] public string ETJCCOD { get; set; }
        [DataMember] public string ETjDDes { get; set; }
        [DataMember] public string ETjDMne { get; set; }
        [DataMember] public string ETjSTip { get; set; }
        [DataMember] public DateTime? FechaReg { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class ENItemSAP
    {
        [DataMember] public string ItemName { get; set; }
        [DataMember] public string CodigoSap { get; set; }
        [DataMember] public string CentroCostos { get; set; }
    }
}

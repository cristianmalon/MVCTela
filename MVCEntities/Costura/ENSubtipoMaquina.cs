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
    public class ENSubtipoMaquina
    {
        [DataMember] public int IdTmiB01 { get; set; }
        [DataMember] public int IdTmiB02 { get; set; }
        [DataMember] public string TMIDDes { get; set; }
    }
}

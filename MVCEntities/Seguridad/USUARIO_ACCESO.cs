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
    public class USUARIO_ACCESO
    {
        [DataMember] public string SUsrId { get; set; }
        [DataMember] public String SEvnId { get; set; }
        [DataMember] public String SSisId { get; set; }
        [DataMember] public String SPgmId { get; set; }
    }
}

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
    public class ENMotivo : EntidadBase
    {
        [DataMember] public int IdMotivo { get; set; }
        [DataMember] public string Motivo { get; set; }
        [DataMember] public string AreaResponsableCod { get; set; }
        [DataMember] public int? Mecanico { get; set; }
        [DataMember] public int? IdTipoMotivo { get; set; }
        [DataMember] public string AreaResponsableDes { get; set; }
    }
}

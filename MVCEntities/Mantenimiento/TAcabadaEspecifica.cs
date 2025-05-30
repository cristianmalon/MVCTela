using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace CAMTEX.Entidades
{
    public class TAcabadaEspecifica
    {
        [DataMember] public string      TaeCod { get; set; }
        [DataMember] public string      TaeDes { get; set; }
        [DataMember] public string      TaeMne { get; set; }
        [DataMember] public int         TaeRap { get; set; }
        [DataMember] public int         TaeAnio { get; set; }
        [DataMember] public int         TaeNroDis { get; set; }
        [DataMember] public int         TaeVer { get; set; }
        [DataMember] public int         TaeDen { get; set; }
        [DataMember] public int         TaeAncho { get; set; }
        [DataMember] public int         TaeAlto { get; set; }
        [DataMember] public string      TaeLCAnt { get; set; }
        [DataMember] public string      TaeAcaQui { get; set; }
        [DataMember] public string      TaeAcaFis { get; set; }
        [DataMember] public string      TaeTipoSal { get; set; }
        [DataMember] public string      TaeTecEst { get; set; }
        [DataMember] public string      TaeSentEst { get; set; }
        [DataMember] public string      TaeApa { get; set; }

        [DataMember] public string      TaeTipTej { get; set; }
        [DataMember] public string      TaeCodTCE { get; set; }


    }
}

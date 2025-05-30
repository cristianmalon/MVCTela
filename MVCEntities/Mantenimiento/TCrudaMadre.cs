using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace CAMTEX.Entidades
{
    public class TCrudaMadre:EntidadBase
    {

        [DataMember] public string TcmCod { get; set; }
        [DataMember] public string TcmDes { get; set; }
        [DataMember] public string TcmMne { get; set; }
        [DataMember] public int TcmDen { get; set; }
        [DataMember] public int TcmAncho { get; set; }
        [DataMember] public int TcmAlto { get; set; }
        [DataMember] public decimal TcmLMalla { get; set; }
        [DataMember] public int TcmCurPul{ get; set; }
        [DataMember] public  int TcmColPul { get; set; }
        [DataMember] public string TcmTitulo { get; set; }
        [DataMember] public string TcmDesg { get; set; }
        [DataMember] public string TcmApa { get; set; }

        [DataMember] public int TcmFicTej { get; set; }

        [DataMember] public string TcmTipTej { get; set; }

    }
}

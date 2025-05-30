using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace CAMTEX.Entidades
{
    public class TCrudaEspecifica
    {
        [DataMember] public string  TceCod { get; set; }
        [DataMember] public string  TceDes { get; set; }
        [DataMember] public string  TceMne { get; set; }
        [DataMember] public int     TceRcrud { get; set; }
        [DataMember] public string  TceCodR { get; set; }
        [DataMember] public int     TceAnioRap { get; set; }
        [DataMember] public int     TceNumRap { get; set; }
        [DataMember] public int     TceVRap { get; set; }
        [DataMember] public int     TceDen { get; set; }
        [DataMember] public int     TceAncho { get; set; }
        [DataMember] public int     TceAlto { get; set; }
        [DataMember] public decimal TceLMalla { get; set; }
        [DataMember] public int     TceCurPul { get; set; }
        [DataMember] public int     TceColPul { get; set; }
        [DataMember] public string  TceTitulo { get; set; }
        [DataMember] public string  TceDesg { get; set; }
        [DataMember] public string  TceApa { get; set; }



        [DataMember] public int TceFicha { get; set; }
        [DataMember] public int TceSec { get; set; }
        [DataMember] public string TceTipTej { get; set; }

    }
}

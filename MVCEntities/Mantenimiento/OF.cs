using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class OF
    {
        [DataMember] public string EmpCCod { get; set; }
        [DataMember] public string OFaCTDc { get; set; }
        [DataMember] public int OFaNAno { get; set; }
        [DataMember] public string OFaNNro { get; set; }
        [DataMember] public string Partida { get; set; }
        [DataMember] public string Cliente { get; set; }
        [DataMember] public int PedidoTextilAnio { get; set; }
        [DataMember] public string PedidoTextilNro { get; set; }
        [DataMember] public string ColorCodigo { get; set; }
        [DataMember] public string Color { get; set; }
        [DataMember] public string TelaCodigo { get; set; }
        [DataMember] public string Tela { get; set; }
        [DataMember] public string TipoTenido { get; set; }
        [DataMember] public string Reproceso{ get; set; }
        [DataMember] public string MaquinaProgramada { get; set; }
        

    }
}

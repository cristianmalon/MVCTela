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
    public class ENEficiencia_Ticket
    {
        [DataMember] public string FECHA { get; set; }
        [DataMember] public string TURNO { get; set; }
        [DataMember] public string CODLINEA { get; set; }
        [DataMember] public string DESLINEA { get; set; }
        [DataMember] public string CODTRABAJADOR { get; set; }
        [DataMember] public string DESTRABAJADOR { get; set; }
        [DataMember] public string TIPOMAQUINA { get; set; }
        [DataMember] public string CATEGORIA { get; set; }
        [DataMember] public string CODOPERACION { get; set; }
        [DataMember] public string DESOPERACION { get; set; }
        [DataMember] public string TIEMPOSTANDAR { get; set; }
        [DataMember] public string TICKESTLEIDOS { get; set; }
        [DataMember] public string MINDISPONIBLES { get; set; }
        [DataMember] public string PRENDAS { get; set; }
        [DataMember] public string MINPRODUCIDOS { get; set; }
        [DataMember] public string META { get; set; }
    }
}

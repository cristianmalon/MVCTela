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
    public class ENProgramacionMecanico : EntidadBase
    {
        [DataMember] public int IdProgramacionMecanico { get; set; }
        [DataMember] public int IdRpmD01 { get; set; }
        [DataMember] public string EPLCCOD { get; set; }
        [DataMember] public string EPLDNOM { get; set; }
        [DataMember] public DateTime? FechaProgramacion { get; set; }

        [DataMember] public string cantidadAlerta { get; set; }
        [DataMember] public string MinParadaMayor { get; set; }

        [DataMember] public string Maquina { get; set; }
        [DataMember] public string InicioAlerta { get; set; }
        [DataMember] public string InicioAtencion { get; set; }
        [DataMember] public string TiempoEspera { get; set; }
        [DataMember] public string TiempoAtencion { get; set; }

        [DataMember] public int IdLinea { get; set; }
        [DataMember] public string Linea { get; set; }
    }
}

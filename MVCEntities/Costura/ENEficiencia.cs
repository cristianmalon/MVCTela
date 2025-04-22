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
    public class ENEficiencia
    {
        [DataMember] public string EMPCCOD { get; set; }
        [DataMember] public string ANIOSEMANA { get; set; }
        [DataMember] public string SEMANA { get; set; }
        [DataMember] public string CODIGO { get; set; }
        [DataMember] public string NOMBRE  { get; set; }
        [DataMember] public string EFICIENCIA { get; set; }
        [DataMember] public string EFICIENCIAPROMEDIO { get; set; }
        [DataMember] public string CATEGORIA { get; set; }
        [DataMember] public string PUESTO { get; set; }
        [DataMember] public string MINUTOSPRODUCIDOS { get; set; }
        [DataMember] public string MINUTOSDISPONIBLES { get; set; }
        [DataMember] public string LINEA { get; set; }
        [DataMember] public string MINUTOSREAL { get; set; }
        [DataMember] public string MINUTOSMETA { get; set; }
        [DataMember] public string EFICIENCIAINDIVIDUAL { get; set; }
        [DataMember] public string EFICIENCIASALIDA { get; set; }

        [DataMember] public string EPLCCOD { get; set; }
        [DataMember] public DateTime XFECINI { get; set; }
        [DataMember] public DateTime XFECFIN { get; set; }

    }
}

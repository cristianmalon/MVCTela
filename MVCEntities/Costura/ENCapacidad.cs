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
    public class ENCapacidad : EntidadBase
    {
        [DataMember] public int IdCapacidad { get; set; }
        [DataMember] public string PlantaServicioDes { get; set; }
        [DataMember] public int PlantaServicio { get; set; }
        [DataMember] public int Horas { get; set; }
        [DataMember] public int Minutos { get; set; }
        [DataMember] public int PersonalLinea { get; set; }
        [DataMember] public decimal EficienciaLinea { get; set; }
        [DataMember] public decimal Cuota { get; set; }
        [DataMember] public int Capacidad { get; set; }
    }
}


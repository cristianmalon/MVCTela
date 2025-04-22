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
    public class ENUbicacion: EntidadBase
    {
        [DataMember] public int IdUbicacion { get; set; }
        [DataMember] public string Ubicacion { get; set; }
        //[DataMember] public int IdEstado { get; set; }
    }
}

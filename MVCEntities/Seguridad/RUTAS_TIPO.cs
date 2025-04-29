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
    public class RUTAS_TIPO : EntidadBase
    {
        [DataMember]
        public Int64 RUTAS_TIPO_ID { get; set; }

        [DataMember]
        [Display(Name = "Descripcion")]
        [Required(ErrorMessage = "Debe agregar una descripcion")]
        public String DESCRIPCION { get; set; }
    }
}

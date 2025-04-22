using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace CAMTEX.Entidades
{
    [DataContract]
    public class SISTEMAS : EntidadBase
    {
        [DataMember]
        public Int64 SISTEMA_ID { get; set; }

        [Required(ErrorMessage = "Debe ingresar el campo Descripción")]
        [Display(Name = "DESCRIPCION")]
        [DataMember]
        public String DESCRIPCION { get; set; }
        [DataMember]
        [Required(ErrorMessage = "Debe ingresar el campo Descripción Corta")]
        [Display(Name = "DESCRIPCION CORTA")]
        public String DESCRIPCION_CORTA { get; set; }
        [DataMember]
        public String RUTA_URL { get; set; }
        [DataMember]
        public String ICONO { get; set; }
        [DataMember]
        public String COLOR { get; set; }
        [DataMember]
        public String SUsrId { get; set; }

        [DataMember]
        public String SISTEMAKey { get; set; }
    }
}

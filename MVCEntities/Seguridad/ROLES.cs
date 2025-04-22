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
    public class ROLES : EntidadBase
    {
        [DataMember]
        public Int64 ROLES_ID { get; set; }

        [DataMember]
        [Display(Name = "Descripcion")]
        [Required(ErrorMessage = "Debe agregar una descripcion")]
        public String DESCRIPCION { get; set; }

        [DataMember]
        public Int64 SISTEMA_ID { get; set; }

        [DataMember]
        public String DESCRIPCION_CORTA_SIS { get; set; }

        [DataMember]
        [Display(Name = "Sistema")]
        [Required(ErrorMessage = "Debe seleccionar un sistema")]
        public String SISTEMAKey { get; set; }

        [DataMember]
        public List<SISTEMAS> ListaSistemas { get; set; }

        [DataMember]
        public List<RUTAS> ListaRutas{ get; set; }
    }
}

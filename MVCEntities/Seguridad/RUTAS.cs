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
    public class RUTAS : EntidadBase
    {
        [DataMember]
        public Int64 RUTAS_ID { get; set; }

        [DataMember]
        [Display(Name = "Sistema")]
        [Required(ErrorMessage = "Debe seleccionar un sistema")]
        public String SISTEMAKey { get; set; }

        [DataMember]
        [Display(Name = "Tipo de ruta")]
        [Required(ErrorMessage = "Debe seleccionar un tipo de ruta")]
        public String RUTAS_TIPOKey { get; set; }

        [DataMember]
        [Display(Name = "Ruta padre")]
        [Required(ErrorMessage = "Debe seleccionar una ruta padre")]
        public String RUTAS_PADREKey { get; set; }

        [DataMember]
        [Display(Name = "Descripcion")]
        [Required(ErrorMessage = "Debe agregar una descripcion")]
        public String DESCRIPCION { get; set; }

        [DataMember]
        [Display(Name = "Area")]
        [Required(ErrorMessage = "Debe ingresar una area")]
        public String AREA { get; set; }

        [DataMember]
        [Display(Name = "Controlador")]
        [Required(ErrorMessage = "Debe ingresar una controlador")]
        public String CONTROLADOR { get; set; }

        [DataMember]
        [Display(Name = "Accion")]
        [Required(ErrorMessage = "Debe ingresar una accion")]
        public String ACCION { get; set; }

        [DataMember]
        public String RUTA { get; set; }

        [DataMember]
        public Int64 SISTEMA_ID { get; set; }

        [DataMember]
        public Int64 RUTAS_TIPO_ID { get; set; }

        [DataMember]
        public String DESCRIPCION_RUTA_TIPO { get; set; }

        [DataMember]
        public String DESCRIPCION_CORTA_SIS { get; set; }

        [DataMember]
        public Int64 RUTAS_PADRE_ID { get; set; }

        [DataMember]
        public RUTAS_TIPO RUTAS_TIPO { get; set; }

        [DataMember]
        public List<SISTEMAS> ListaSistemas { get; set; }

        [DataMember]
        public List<RUTAS_TIPO> ListaRutasTipo { get; set; }

        [DataMember]
        public List<RUTAS> ListaRutasPadre { get; set; }

    }
}
